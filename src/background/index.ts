// Background service worker
import { getAllPrompts, searchPrompts, trackPromptUsage } from '../database/operations';
import { LLMPlatform } from '../types';

console.log('[Prompt Vault] Background script loaded');

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Prompt Vault] Message received:', message.type);

  switch (message.type) {
    case 'CAPTURE_PROMPT':
      handleCapturePrompt(message.data);
      sendResponse({ success: true });
      break;

    case 'OPEN_POPUP':
      chrome.action.openPopup();
      sendResponse({ success: true });
      break;

    case 'SEARCH_PROMPTS':
      handleSearchPrompts(message.query).then(sendResponse);
      return true; // Keep channel open for async response

    case 'TRACK_USAGE':
      handleTrackUsage(message.promptId, message.platform).then(sendResponse);
      return true;

    case 'GET_ALL_PROMPTS':
      handleGetAllPrompts().then(sendResponse);
      return true;

    case 'GOOGLE_SHEETS_SYNC':
      handleGoogleSheetsSync(message.webAppUrl, message.prompts).then(sendResponse);
      return true;

    case 'GOOGLE_SHEETS_TEST':
      handleGoogleSheetsTest(message.webAppUrl).then(sendResponse);
      return true;

    default:
      sendResponse({ error: 'Unknown message type' });
  }
});

// Store captured prompt temporarily for popup to retrieve
let capturedPrompt: any = null;

function handleCapturePrompt(data: any) {
  capturedPrompt = data;
  console.log('[Prompt Vault] Prompt captured:', data);

  // Store in chrome.storage for popup to access
  chrome.storage.local.set({ capturedPrompt: data });
}

async function handleSearchPrompts(query: string) {
  try {
    let prompts;

    if (!query || query.trim() === '') {
      // Get all prompts, prioritize favorites
      prompts = await getAllPrompts();
      prompts.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0);
      });
      prompts = prompts.slice(0, 20); // Limit to 20 results
    } else {
      // Search prompts
      prompts = await searchPrompts(query);
      prompts = prompts.slice(0, 20);
    }

    return { success: true, prompts };
  } catch (error) {
    console.error('[Prompt Vault] Error searching prompts:', error);
    return { success: false, error: (error as Error).message };
  }
}

async function handleTrackUsage(promptId: string, platform: LLMPlatform) {
  try {
    await trackPromptUsage(promptId, platform);
    return { success: true };
  } catch (error) {
    console.error('[Prompt Vault] Error tracking usage:', error);
    return { success: false, error: (error as Error).message };
  }
}

async function handleGetAllPrompts() {
  try {
    const prompts = await getAllPrompts();
    return { success: true, prompts };
  } catch (error) {
    console.error('[Prompt Vault] Error getting prompts:', error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Handle Google Sheets sync request
 * Makes the actual fetch call from the background script to avoid CORS issues
 */
async function handleGoogleSheetsSync(webAppUrl: string, prompts: any[]) {
  try {
    console.log('[Prompt Vault] Google Sheets sync started');

    const response = await fetch(webAppUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompts: prompts.map(p => ({
          id: p.id,
          title: p.title,
          content: p.content,
          category: p.category,
          tags: p.tags,
          platform: p.platform,
          createdAt: p.createdAt,
          lastUsed: p.lastUsed,
          usageCount: p.usageCount,
          isFavorite: p.isFavorite,
        })),
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('[Prompt Vault] Sync failed with status:', response.status);
      return {
        success: false,
        message: 'Sync failed. Check your Google Apps Script deployment settings.',
        error: 'HTTP_ERROR',
      };
    }

    const contentType = response.headers.get('content-type');
    let result;

    if (contentType?.includes('application/json')) {
      result = await response.json();

      if (result.success === false) {
        return {
          success: false,
          message: result.error || 'Sync failed',
          error: 'SCRIPT_ERROR',
        };
      }
    }

    console.log('[Prompt Vault] Sync completed successfully');
    return {
      success: true,
      message: `Successfully synced ${prompts.length} prompts to Google Sheets`,
      promptCount: prompts.length,
    };
  } catch (error) {
    console.error('[Prompt Vault] Sync error:', error);

    if (error instanceof TypeError && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
      return {
        success: false,
        message: 'Could not connect to Google Sheets. Check your URL and internet connection.',
        error: 'NETWORK_ERROR',
      };
    }

    return {
      success: false,
      message: `Sync error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: 'UNKNOWN_ERROR',
    };
  }
}

/**
 * Test connection to Google Apps Script
 * Makes the fetch call from background script to avoid CORS issues
 */
async function handleGoogleSheetsTest(webAppUrl: string) {
  try {
    console.log('[Prompt Vault] Testing Google Sheets connection');

    const response = await fetch(webAppUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompts: [],
        test: true,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('[Prompt Vault] Connection test failed with status:', response.status);
      return {
        success: false,
        message: 'Connection failed. Make sure your script is deployed with "Anyone" access.',
        error: 'CONNECTION_FAILED',
      };
    }

    console.log('[Prompt Vault] Connection test successful');
    return {
      success: true,
      message: 'Connection successful! Ready to sync.',
    };
  } catch (error) {
    console.error('[Prompt Vault] Connection test error:', error);

    if (error instanceof TypeError && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
      return {
        success: false,
        message: 'Cannot reach Google Sheets. Check your URL and try again.',
        error: 'NETWORK_ERROR',
      };
    }

    return {
      success: false,
      message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: 'UNKNOWN_ERROR',
    };
  }
}

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[Prompt Vault] Extension installed');
    // Could open welcome page or tutorial
  } else if (details.reason === 'update') {
    console.log('[Prompt Vault] Extension updated');
  }
});

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

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[Prompt Vault] Extension installed');
    // Could open welcome page or tutorial
  } else if (details.reason === 'update') {
    console.log('[Prompt Vault] Extension updated');
  }
});

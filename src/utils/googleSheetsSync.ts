import { Prompt } from '../types';

export interface SyncConfig {
  webAppUrl: string;
  lastSync?: Date;
  enabled: boolean;
}

export interface SyncResult {
  success: boolean;
  message: string;
  promptCount?: number;
  error?: string;
}

/**
 * Sync prompts to Google Sheets via Apps Script Web App
 * Routes the request through the background script to avoid CORS issues
 */
export async function syncToGoogleSheets(
  webAppUrl: string,
  prompts: Prompt[]
): Promise<SyncResult> {
  if (!webAppUrl || !webAppUrl.trim()) {
    return {
      success: false,
      message: 'Please enter a valid Google Apps Script URL',
      error: 'MISSING_URL',
    };
  }

  // Validate URL format
  if (!webAppUrl.includes('script.google.com/macros/s/')) {
    return {
      success: false,
      message: 'Invalid URL format. Please use the Google Apps Script Web App URL.',
      error: 'INVALID_URL',
    };
  }

  try {
    // Send message to background script to perform the sync
    const response = await chrome.runtime.sendMessage({
      type: 'GOOGLE_SHEETS_SYNC',
      webAppUrl: webAppUrl.trim(),
      prompts: prompts,
    });

    return response;
  } catch (error) {
    console.error('Sync error:', error);

    // Check for common errors
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
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
 * Routes the request through the background script to avoid CORS issues
 */
export async function testConnection(webAppUrl: string): Promise<SyncResult> {
  if (!webAppUrl || !webAppUrl.trim()) {
    return {
      success: false,
      message: 'Please enter a Google Apps Script URL',
      error: 'MISSING_URL',
    };
  }

  if (!webAppUrl.includes('script.google.com/macros/s/')) {
    return {
      success: false,
      message: 'Invalid URL. Must be a Google Apps Script Web App URL.',
      error: 'INVALID_URL',
    };
  }

  try {
    // Send message to background script to test the connection
    const response = await chrome.runtime.sendMessage({
      type: 'GOOGLE_SHEETS_TEST',
      webAppUrl: webAppUrl.trim(),
    });

    return response;
  } catch (error) {
    console.error('Connection test error:', error);

    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
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

/**
 * Get sync configuration from storage
 */
export async function getSyncConfig(): Promise<SyncConfig | null> {
  try {
    const result = await chrome.storage.local.get('googleSheetsSync');
    return result.googleSheetsSync || null;
  } catch (error) {
    console.error('Error getting sync config:', error);
    return null;
  }
}

/**
 * Save sync configuration to storage
 */
export async function saveSyncConfig(config: SyncConfig): Promise<void> {
  try {
    await chrome.storage.local.set({ googleSheetsSync: config });
  } catch (error) {
    console.error('Error saving sync config:', error);
    throw error;
  }
}

/**
 * Update last sync timestamp
 */
export async function updateLastSync(): Promise<void> {
  const config = await getSyncConfig();
  if (config) {
    config.lastSync = new Date();
    await saveSyncConfig(config);
  }
}

/**
 * Format date for display
 */
export function formatLastSync(date: Date | undefined | null): string {
  if (!date) return 'Never';

  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;

  return new Date(date).toLocaleDateString();
}

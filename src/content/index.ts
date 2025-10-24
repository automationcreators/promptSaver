import { detectPlatform, waitForElement, getInputElement } from '../utils/platformDetector';
import { extractCurrentPrompt } from '../utils/promptExtractor';
import './captureButton';
import './slashCommand';

console.log('[Prompt Vault] Content script loaded');

// Initialize when page loads
async function initialize() {
  const platform = detectPlatform();

  if (!platform) {
    console.log('[Prompt Vault] Platform not detected');
    return;
  }

  console.log(`[Prompt Vault] Detected platform: ${platform}`);

  // Wait for input element to be available
  const inputElement = await waitForElement('textarea, div[contenteditable="true"]');

  if (!inputElement) {
    console.log('[Prompt Vault] Input element not found');
    return;
  }

  console.log('[Prompt Vault] Input element found, initializing features');

  // Features will auto-initialize from their respective modules
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// Listen for dynamic page changes (SPAs)
const observer = new MutationObserver(() => {
  const platform = detectPlatform();
  if (platform) {
    const button = document.querySelector('.prompt-vault-capture-btn');
    if (!button) {
      // Re-initialize if button disappears
      setTimeout(initialize, 1000);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

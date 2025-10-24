import { detectPlatform, getInputElement, waitForElement, getCurrentPlatformConfig } from '../utils/platformDetector';
import { extractCurrentPrompt } from '../utils/promptExtractor';

// Create and inject capture button
async function createCaptureButton() {
  const platform = detectPlatform();
  if (!platform) return;

  // Remove existing button if any
  const existing = document.querySelector('.prompt-vault-capture-btn');
  if (existing) existing.remove();

  // Wait for input to be available using platform-specific selectors
  const config = getCurrentPlatformConfig();
  if (!config) return;

  const inputElement = await waitForElement(config.inputSelector, 3000);
  if (!inputElement) return;

  // Create button
  const button = document.createElement('button');
  button.className = 'prompt-vault-capture-btn';
  button.setAttribute('data-platform', platform); // Add platform attribute for CSS targeting
  button.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
    <span>Save Prompt</span>
  `;

  button.title = 'Save current prompt to Prompt Vault';

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await capturePrompt();
  });

  // Position button relative to input
  positionButton(button, inputElement);

  // Re-position on window resize
  window.addEventListener('resize', () => positionButton(button, inputElement));
}

function positionButton(button: HTMLElement, inputElement: HTMLElement) {
  const platform = detectPlatform();
  const rect = inputElement.getBoundingClientRect();

  // Platform-specific positioning
  if (platform === 'gemini') {
    // For Gemini, append to body and let CSS handle positioning
    document.body.appendChild(button);
    return;
  }

  // Insert button near the input area
  // Try to find parent container
  let container = inputElement.parentElement;

  // Look for a suitable container
  while (container && container !== document.body) {
    if (container.classList.contains('relative') ||
        window.getComputedStyle(container).position === 'relative' ||
        window.getComputedStyle(container).position === 'absolute') {
      break;
    }
    container = container.parentElement;
  }

  if (container && container !== document.body) {
    container.style.position = 'relative';
    container.appendChild(button);
  } else {
    // Fallback: append to body with fixed positioning
    document.body.appendChild(button);
    button.style.position = 'fixed';
    button.style.top = `${rect.top - 50}px`;
    button.style.right = '20px';
    button.style.zIndex = '10000';
  }
}

async function capturePrompt() {
  const extracted = extractCurrentPrompt();

  if (!extracted) {
    showNotification('No prompt to capture', 'error');
    return;
  }

  // Send to background script to open popup with pre-filled data
  chrome.runtime.sendMessage({
    type: 'CAPTURE_PROMPT',
    data: extracted,
  });

  showNotification('Prompt captured! Edit in popup.', 'success');

  // Open popup
  chrome.runtime.sendMessage({ type: 'OPEN_POPUP' });
}

function showNotification(message: string, type: 'success' | 'error' = 'success') {
  const notification = document.createElement('div');
  notification.className = `prompt-vault-notification prompt-vault-notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => notification.classList.add('show'), 10);

  // Hide and remove
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize
createCaptureButton();

// Re-create button on page changes (for SPAs)
setInterval(() => {
  const existing = document.querySelector('.prompt-vault-capture-btn');
  if (!existing) {
    createCaptureButton();
  }
}, 2000);

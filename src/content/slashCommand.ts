// Quick command system for prompt access - uses ";;" trigger
import { getInputElement, detectPlatform } from '../utils/platformDetector';
import { insertPromptAtCursor, setPromptContent } from '../utils/promptExtractor';

let commandActive = false;
let commandOverlay: HTMLElement | null = null;
let lastPrompts: any[] = []; // Cache for direct lookup
let semicolonCount = 0;
let semicolonTimer: ReturnType<typeof setTimeout> | null = null;
let selectedIndex = 0; // For keyboard navigation

// Check if extension context is still valid
function isExtensionContextValid(): boolean {
  try {
    return !!(chrome && chrome.runtime && chrome.runtime.id);
  } catch (e) {
    return false;
  }
}

// Listen for ";;" trigger to access prompts
function initializeSlashCommand() {
  document.addEventListener('keydown', handleKeyDown, true);
}

function handleKeyDown(e: KeyboardEvent) {
  const inputElement = getInputElement();
  if (!inputElement) return;

  // Handle overlay keyboard navigation
  if (commandActive && commandOverlay) {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      hideCommandOverlay();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      selectHighlightedResult();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveSelection(1);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveSelection(-1);
      return;
    }
  }

  // Only trigger on input element
  if (document.activeElement !== inputElement) return;

  // Detect ";;" trigger
  if (e.key === ';') {
    const value = getInputValue(inputElement);

    // Check if this creates ";;" at the end
    if (value.endsWith(';') || value === '') {
      // Will become ";;" after this keystroke
      setTimeout(() => {
        const newValue = getInputValue(inputElement);
        if (newValue.endsWith(';;')) {
          showCommandOverlay();
        }
      }, 0);
    }
  }

  // Monitor typing after ";;" for direct lookup
  if (commandActive && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    setTimeout(() => {
      const value = getInputValue(inputElement);
      const match = value.match(/;;(.*)$/);
      if (match) {
        const query = match[1];
        updateSearchAndFilter(query);
      }
    }, 0);
  }
}

function getInputValue(element: HTMLElement): string {
  if (element.hasAttribute('contenteditable')) {
    return element.textContent || '';
  } else if (element.tagName === 'TEXTAREA') {
    return (element as HTMLTextAreaElement).value;
  }
  return '';
}

async function showCommandOverlay() {
  if (commandActive) return; // Already showing

  commandActive = true;
  selectedIndex = 0;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'prompt-vault-slash-overlay';
  overlay.innerHTML = `
    <div class="prompt-vault-slash-container">
      <div class="prompt-vault-slash-header">
        <div class="prompt-vault-slash-hint">
          💡 Tip: Type <code>;;</code> followed by prompt name for instant insert. Use ↑↓ to navigate, Enter to select, Esc to close.
        </div>
      </div>
      <div class="prompt-vault-slash-results">
        <div class="prompt-vault-slash-loading">Loading prompts...</div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  commandOverlay = overlay;

  // Position near input
  positionOverlay();

  // Load and display prompts
  loadPrompts('');

  // Close on click outside container
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      hideCommandOverlay();
    }
  });
}

function hideCommandOverlay(clearInput = true) {
  commandActive = false;
  if (commandOverlay) {
    commandOverlay.remove();
    commandOverlay = null;
  }

  // Remove ";;" from input if requested
  if (clearInput) {
    const inputElement = getInputElement();
    if (inputElement) {
      const value = getInputValue(inputElement);
      const match = value.match(/;;(.*)$/);
      if (match) {
        const textBeforeSemicolons = value.substring(0, value.length - match[0].length);
        setInputValue(inputElement, textBeforeSemicolons);
      }
    }
  }

  selectedIndex = 0;
  lastPrompts = [];
}

function setInputValue(element: HTMLElement, value: string) {
  if (element.hasAttribute('contenteditable')) {
    element.textContent = value;
  } else if (element.tagName === 'TEXTAREA') {
    (element as HTMLTextAreaElement).value = value;
  }
}

function positionOverlay() {
  if (!commandOverlay) return;

  const inputElement = getInputElement();
  if (!inputElement) return;

  const rect = inputElement.getBoundingClientRect();
  const container = commandOverlay.querySelector('.prompt-vault-slash-container') as HTMLElement;

  if (container) {
    container.style.top = `${rect.top - 360}px`;
    container.style.left = `${rect.left}px`;
    container.style.width = `${Math.max(rect.width, 400)}px`;
  }
}

async function loadPrompts(query: string) {
  if (!commandOverlay) return;

  const resultsContainer = commandOverlay.querySelector('.prompt-vault-slash-results');
  if (!resultsContainer) return;

  // Check if extension context is valid
  if (!isExtensionContextValid()) {
    console.warn('[Prompt Vault] Extension context invalidated. Please refresh the page.');
    resultsContainer.innerHTML = '<div class="prompt-vault-slash-error">Extension reloaded. Please refresh this page.</div>';
    return;
  }

  try {
    // Request prompts from background script
    const response = await chrome.runtime.sendMessage({
      type: 'SEARCH_PROMPTS',
      query,
    });

    if (!response || !response.prompts) {
      resultsContainer.innerHTML = '<div class="prompt-vault-slash-empty">No prompts found</div>';
      return;
    }

    const prompts = response.prompts;
    lastPrompts = prompts; // Cache for direct lookup

    if (prompts.length === 0) {
      resultsContainer.innerHTML = '<div class="prompt-vault-slash-empty">No prompts found</div>';
      return;
    }

    // Render prompts
    resultsContainer.innerHTML = prompts
      .map(
        (prompt: any, index: number) => `
        <div class="prompt-vault-slash-item" data-id="${prompt.id}" data-index="${index}">
          <div class="prompt-vault-slash-item-header">
            <span class="prompt-vault-slash-item-title">${escapeHtml(prompt.title)}</span>
            ${prompt.isFavorite ? '<span class="prompt-vault-slash-item-favorite">⭐</span>' : ''}
          </div>
          <div class="prompt-vault-slash-item-preview">${escapeHtml(
            prompt.content.substring(0, 100)
          )}${prompt.content.length > 100 ? '...' : ''}</div>
          <div class="prompt-vault-slash-item-meta">
            <span class="prompt-vault-slash-item-category">${escapeHtml(prompt.category || 'Uncategorized')}</span>
            ${prompt.usageCount > 0 ? `<span class="prompt-vault-slash-item-usage">Used ${prompt.usageCount}x</span>` : ''}
          </div>
        </div>
      `
      )
      .join('');

    // Add click handlers
    resultsContainer.querySelectorAll('.prompt-vault-slash-item').forEach((item) => {
      item.addEventListener('click', () => {
        const promptId = item.getAttribute('data-id');
        if (promptId) {
          selectPrompt(promptId, prompts);
        }
      });
    });
  } catch (error) {
    console.error('[Prompt Vault] Error loading prompts:', error);
    resultsContainer.innerHTML = '<div class="prompt-vault-slash-error">Error loading prompts</div>';
  }
}

// Update search and filter results
function updateSearchAndFilter(query: string) {
  loadPrompts(query);
}

// Move selection up or down
function moveSelection(direction: number) {
  if (!commandOverlay) return;

  const items = commandOverlay.querySelectorAll('.prompt-vault-slash-item');
  if (items.length === 0) return;

  // Remove previous highlight
  items.forEach(item => item.classList.remove('prompt-vault-slash-item-selected'));

  // Update selected index
  selectedIndex = Math.max(0, Math.min(items.length - 1, selectedIndex + direction));

  // Add highlight to new selection
  const selectedItem = items[selectedIndex];
  selectedItem.classList.add('prompt-vault-slash-item-selected');

  // Scroll into view if needed
  selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// Select the highlighted result
function selectHighlightedResult() {
  if (!commandOverlay) return;

  const items = commandOverlay.querySelectorAll('.prompt-vault-slash-item');
  if (items.length === 0) return;

  const selectedItem = items[selectedIndex];
  if (selectedItem) {
    const promptId = selectedItem.getAttribute('data-id');
    if (promptId && lastPrompts.length > 0) {
      selectPrompt(promptId, lastPrompts);
    }
  }
}

async function selectPrompt(promptId: string, prompts: any[]) {
  const prompt = prompts.find((p: any) => p.id === promptId);
  if (!prompt) {
    console.error('[Prompt Vault] Prompt not found:', promptId);
    return;
  }

  // First, clear the ";;" from input
  const inputElement = getInputElement();
  if (inputElement) {
    const value = getInputValue(inputElement);
    const match = value.match(/;;(.*)$/);
    if (match) {
      const textBeforeSemicolons = value.substring(0, value.length - match[0].length);
      setInputValue(inputElement, textBeforeSemicolons);
    }
  }

  // Small delay to ensure input is cleared
  await new Promise(resolve => setTimeout(resolve, 50));

  // Insert prompt content
  const success = setPromptContent(prompt.content);

  if (success) {
    console.log('[Prompt Vault] Prompt inserted successfully');

    // Track usage (only if extension context is valid)
    if (isExtensionContextValid()) {
      try {
        chrome.runtime.sendMessage({
          type: 'TRACK_USAGE',
          promptId,
          platform: detectPlatform(),
        });
      } catch (error) {
        console.error('[Prompt Vault] Error tracking usage:', error);
      }
    }

    // Close overlay without clearing input again
    hideCommandOverlay(false);
  } else {
    console.error('[Prompt Vault] Failed to insert prompt');
    hideCommandOverlay();
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize
initializeSlashCommand();

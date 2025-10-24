// Quick command system for prompt access - uses ";;" trigger
import { getInputElement, detectPlatform } from '../utils/platformDetector';
import { insertPromptAtCursor } from '../utils/promptExtractor';

let commandActive = false;
let commandOverlay: HTMLElement | null = null;
let lastPrompts: any[] = []; // Cache for direct lookup

// Listen for ";;" trigger to access prompts
function initializeSlashCommand() {
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('keyup', handleKeyUp, true);
}

function handleKeyDown(e: KeyboardEvent) {
  const inputElement = getInputElement();
  if (!inputElement) return;

  // Check if we're focused on the input
  if (document.activeElement !== inputElement) return;

  // Check for ";" key (first semicolon)
  if (e.key === ';' && !commandActive) {
    const value = getInputValue(inputElement);

    // Check if we just typed the first ";" (might be starting ";;")
    // Don't trigger yet, wait for the second ";"
    if (value.endsWith(';')) {
      // Second semicolon detected
      e.preventDefault();
      e.stopPropagation();
      showCommandOverlay();
    }
  }

  // Check for Escape to close
  if (e.key === 'Escape' && commandActive) {
    e.preventDefault();
    hideCommandOverlay();
  }

  // Check for Enter to insert first result
  if (e.key === 'Enter' && commandActive) {
    e.preventDefault();
    selectFirstResult();
  }
}

function handleKeyUp(e: KeyboardEvent) {
  if (!commandActive) return;

  const inputElement = getInputElement();
  if (!inputElement || document.activeElement !== inputElement) return;

  const value = getInputValue(inputElement);

  // Extract search query after ";;"
  const match = value.match(/;;([^\s]*)$/);
  if (match) {
    const query = match[1];

    // If there's a query, try direct lookup first
    if (query.length > 0) {
      tryDirectLookup(query);
    } else {
      // Just ";;" with no name - show all prompts
      updateCommandResults('');
    }
  } else {
    hideCommandOverlay();
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
  commandActive = true;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'prompt-vault-slash-overlay';
  overlay.innerHTML = `
    <div class="prompt-vault-slash-container">
      <div class="prompt-vault-slash-header">
        <input type="text"
               class="prompt-vault-slash-search"
               placeholder="Type prompt name or search..."
               autofocus />
        <div class="prompt-vault-slash-hint">
          💡 Tip: Type <code>;;</code> followed by prompt name for instant insert
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

  // Handle search input
  const searchInput = overlay.querySelector('.prompt-vault-slash-search') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value;
      loadPrompts(query);
    });
  }

  // Close on click outside
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      hideCommandOverlay();
    }
  });
}

function hideCommandOverlay() {
  commandActive = false;
  if (commandOverlay) {
    commandOverlay.remove();
    commandOverlay = null;
  }

  // Remove ";;" from input if present
  const inputElement = getInputElement();
  if (inputElement) {
    const value = getInputValue(inputElement);
    const match = value.match(/;;[^\s]*$/);
    if (match) {
      setInputValue(inputElement, value.substring(0, value.length - match[0].length));
    }
  }
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

function updateCommandResults(query: string) {
  loadPrompts(query);
}

// Try to find and insert prompt by exact or fuzzy name match
async function tryDirectLookup(query: string) {
  try {
    // Request all prompts
    const response = await chrome.runtime.sendMessage({
      type: 'GET_ALL_PROMPTS',
    });

    if (!response || !response.prompts) {
      updateCommandResults(query);
      return;
    }

    const prompts = response.prompts;
    lastPrompts = prompts;

    // Normalize query for comparison (lowercase, remove spaces/dashes)
    const normalizedQuery = query.toLowerCase().replace(/[\s-_]/g, '');

    // Try exact match first (by normalized title)
    let match = prompts.find((p: any) => {
      const normalizedTitle = p.title.toLowerCase().replace(/[\s-_]/g, '');
      return normalizedTitle === normalizedQuery;
    });

    // If no exact match, try fuzzy match (starts with)
    if (!match) {
      match = prompts.find((p: any) => {
        const normalizedTitle = p.title.toLowerCase().replace(/[\s-_]/g, '');
        return normalizedTitle.startsWith(normalizedQuery);
      });
    }

    // If found match, insert immediately
    if (match && query.length >= 3) { // Require at least 3 chars for auto-insert
      const success = insertPromptAtCursor(match.content);

      if (success) {
        // Track usage
        chrome.runtime.sendMessage({
          type: 'TRACK_USAGE',
          promptId: match.id,
          platform: detectPlatform(),
        });

        hideCommandOverlay();
        return;
      }
    }

    // No direct match or query too short - show search results
    updateCommandResults(query);

  } catch (error) {
    console.error('[Prompt Vault] Error in direct lookup:', error);
    updateCommandResults(query);
  }
}

// Select the first result when Enter is pressed
function selectFirstResult() {
  if (!commandOverlay) return;

  const firstItem = commandOverlay.querySelector('.prompt-vault-slash-item');
  if (firstItem) {
    const promptId = firstItem.getAttribute('data-id');
    if (promptId && lastPrompts.length > 0) {
      selectPrompt(promptId, lastPrompts);
    }
  }
}

async function selectPrompt(promptId: string, prompts: any[]) {
  const prompt = prompts.find((p: any) => p.id === promptId);
  if (!prompt) return;

  // Insert prompt content
  const success = insertPromptAtCursor(prompt.content);

  if (success) {
    // Track usage
    chrome.runtime.sendMessage({
      type: 'TRACK_USAGE',
      promptId,
      platform: detectPlatform(),
    });

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

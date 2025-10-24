import { LLMPlatform } from '../types';
import { getCurrentPlatformConfig, getInputElement } from './platformDetector';

export interface ExtractedPrompt {
  content: string;
  platform: LLMPlatform;
  url: string;
  timestamp: Date;
}

export function extractCurrentPrompt(): ExtractedPrompt | null {
  const config = getCurrentPlatformConfig();
  if (!config) return null;

  const inputElement = getInputElement();
  if (!inputElement) return null;

  let content = '';

  // Special handling for Gemini's rich-textarea
  if (config.name === 'gemini' && inputElement.tagName === 'RICH-TEXTAREA') {
    // Try to find the contenteditable div inside rich-textarea
    const innerEditor = inputElement.querySelector('div[contenteditable="true"]') ||
                       inputElement.querySelector('.ql-editor');
    if (innerEditor) {
      content = innerEditor.textContent || innerEditor.innerText || '';
    } else {
      // Fallback to getting all text from the element
      content = inputElement.textContent || inputElement.innerText || '';
    }
  }
  // Handle contenteditable divs
  else if (inputElement.hasAttribute('contenteditable')) {
    content = inputElement.innerText || inputElement.textContent || '';
  }
  // Handle textareas
  else if (inputElement.tagName === 'TEXTAREA') {
    content = (inputElement as HTMLTextAreaElement).value;
  }

  content = content.trim();

  if (!content) return null;

  return {
    content,
    platform: config.name,
    url: window.location.href,
    timestamp: new Date(),
  };
}

export function extractAllPromptsFromPage(): ExtractedPrompt[] {
  const config = getCurrentPlatformConfig();
  if (!config || !config.promptSelector) return [];

  const promptElements = document.querySelectorAll(config.promptSelector);
  const prompts: ExtractedPrompt[] = [];

  promptElements.forEach((element) => {
    const content = (element.textContent || '').trim();
    if (content) {
      prompts.push({
        content,
        platform: config.name,
        url: window.location.href,
        timestamp: new Date(),
      });
    }
  });

  return prompts;
}

export function setPromptContent(content: string): boolean {
  const config = getCurrentPlatformConfig();
  const inputElement = getInputElement();
  if (!inputElement) return false;

  // Special handling for Gemini's rich-textarea
  if (config?.name === 'gemini' && inputElement.tagName === 'RICH-TEXTAREA') {
    const innerEditor = inputElement.querySelector('div[contenteditable="true"]') ||
                       inputElement.querySelector('.ql-editor') as HTMLElement;
    if (innerEditor) {
      innerEditor.focus();
      innerEditor.innerHTML = '';
      innerEditor.textContent = content;

      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      innerEditor.dispatchEvent(inputEvent);

      // Also dispatch on the rich-textarea element
      inputElement.dispatchEvent(inputEvent);
      return true;
    }
  }
  // Handle contenteditable divs
  else if (inputElement.hasAttribute('contenteditable')) {
    inputElement.focus();

    // Clear existing content
    inputElement.innerHTML = '';

    // Set new content
    inputElement.textContent = content;

    // Trigger input event to notify the platform
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    inputElement.dispatchEvent(inputEvent);

    // Place cursor at end
    const range = document.createRange();
    const sel = window.getSelection();
    if (inputElement.childNodes.length > 0) {
      range.setStart(inputElement.childNodes[0], content.length);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }
  // Handle textareas
  else if (inputElement.tagName === 'TEXTAREA') {
    const textarea = inputElement as HTMLTextAreaElement;
    textarea.focus();
    textarea.value = content;

    // Trigger input event
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    textarea.dispatchEvent(inputEvent);

    // Place cursor at end
    textarea.selectionStart = textarea.selectionEnd = content.length;
  }

  return true;
}

// Insert prompt at cursor position
export function insertPromptAtCursor(content: string): boolean {
  const config = getCurrentPlatformConfig();
  const inputElement = getInputElement();
  if (!inputElement) return false;

  // Special handling for Gemini's rich-textarea
  if (config?.name === 'gemini' && inputElement.tagName === 'RICH-TEXTAREA') {
    const innerEditor = inputElement.querySelector('div[contenteditable="true"]') ||
                       inputElement.querySelector('.ql-editor') as HTMLElement;
    if (innerEditor) {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) {
        return setPromptContent(content);
      }

      const range = sel.getRangeAt(0);
      range.deleteContents();
      const textNode = document.createTextNode(content);
      range.insertNode(textNode);

      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      sel.removeAllRanges();
      sel.addRange(range);

      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      innerEditor.dispatchEvent(inputEvent);
      inputElement.dispatchEvent(inputEvent);
      return true;
    }
  }
  else if (inputElement.hasAttribute('contenteditable')) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      return setPromptContent(content);
    }

    const range = sel.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(content);
    range.insertNode(textNode);

    // Move cursor to end of inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    sel.removeAllRanges();
    sel.addRange(range);

    // Trigger input event
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    inputElement.dispatchEvent(inputEvent);
  }
  else if (inputElement.tagName === 'TEXTAREA') {
    const textarea = inputElement as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    textarea.value = text.substring(0, start) + content + text.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + content.length;

    // Trigger input event
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    textarea.dispatchEvent(inputEvent);
  }

  return true;
}

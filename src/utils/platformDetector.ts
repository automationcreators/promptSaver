import { LLMPlatform } from '../types';

export interface PlatformConfig {
  name: LLMPlatform;
  hostnames: string[];
  inputSelector: string;
  submitButtonSelector?: string;
  chatContainerSelector?: string;
  promptSelector?: string;
}

// Platform detection configurations
export const PLATFORM_CONFIGS: PlatformConfig[] = [
  {
    name: 'claude',
    hostnames: ['claude.ai'],
    inputSelector: 'div[contenteditable="true"][data-testid="chat-input"], div[contenteditable="true"][placeholder*="Reply"], div.ProseMirror[contenteditable="true"], fieldset div[contenteditable="true"]',
    chatContainerSelector: 'div[class*="ChatThread"]',
    promptSelector: 'div[data-test-id="user-message"], div[data-testid="user-message"]',
  },
  {
    name: 'chatgpt',
    hostnames: ['chat.openai.com', 'chatgpt.com'],
    inputSelector: '#prompt-textarea, textarea[data-id], div[contenteditable="true"]',
    chatContainerSelector: 'main',
    promptSelector: 'div[data-message-author-role="user"]',
  },
  {
    name: 'grok',
    hostnames: ['grok.x.com', 'grok.com', 'x.com/i/grok'],
    inputSelector: 'textarea[placeholder*="Ask"], textarea[placeholder*="ask"], div[contenteditable="true"][role="textbox"]',
    chatContainerSelector: 'main',
    promptSelector: 'div[data-testid="messageGroup"]',
  },
  {
    name: 'perplexity',
    hostnames: ['www.perplexity.ai'],
    inputSelector: 'textarea[placeholder*="Ask"], div[contenteditable="true"]',
    chatContainerSelector: 'main',
    promptSelector: 'div[class*="prose"]',
  },
  {
    name: 'gemini',
    hostnames: ['gemini.google.com'],
    inputSelector: 'rich-textarea[aria-label*="Enter"], rich-textarea, div[contenteditable="true"][aria-label*="prompt"], div.ql-editor[contenteditable="true"]',
    chatContainerSelector: 'chat-window',
    promptSelector: 'message-content[message-author="user"]',
  },
  {
    name: 'meta',
    hostnames: ['www.meta.ai'],
    inputSelector: 'textarea, div[contenteditable="true"][role="textbox"]',
    chatContainerSelector: 'main',
    promptSelector: 'div[data-scope="messages"]',
  },
];

export function detectPlatform(): LLMPlatform | null {
  const hostname = window.location.hostname;

  for (const config of PLATFORM_CONFIGS) {
    if (config.hostnames.some(h => hostname.includes(h))) {
      return config.name;
    }
  }

  return null;
}

export function getPlatformConfig(platform: LLMPlatform): PlatformConfig | undefined {
  return PLATFORM_CONFIGS.find(c => c.name === platform);
}

export function getCurrentPlatformConfig(): PlatformConfig | null {
  const platform = detectPlatform();
  if (!platform) return null;
  return getPlatformConfig(platform) || null;
}

export function getInputElement(): HTMLElement | null {
  const config = getCurrentPlatformConfig();
  if (!config) return null;

  const selectors = config.inputSelector.split(',').map(s => s.trim());

  for (const selector of selectors) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) return element;
  }

  return null;
}

export function getChatContainer(): HTMLElement | null {
  const config = getCurrentPlatformConfig();
  if (!config || !config.chatContainerSelector) return null;

  return document.querySelector(config.chatContainerSelector) as HTMLElement;
}

export function waitForElement(selector: string, timeout: number = 5000): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}

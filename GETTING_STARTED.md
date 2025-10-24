# Getting Started with Prompt Vault

## Installation & Setup

### 1. Install Dependencies
```bash
cd PromptVault
npm install
```

### 2. Build the Extension
```bash
npm run build
```

This will create a `dist/` directory with the compiled extension.

### 3. Load in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist/` directory from this project

The extension is now installed!

## Development Mode

For development with hot reload:

```bash
npm run watch
```

This will watch for file changes and automatically rebuild. You'll need to manually reload the extension in Chrome after changes.

## Usage

### Capturing Prompts

1. Go to any supported LLM platform:
   - Claude.ai
   - ChatGPT (chat.openai.com or chatgpt.com)
   - Grok (grok.x.com)
   - Perplexity (perplexity.ai)
   - Gemini (gemini.google.com)
   - Meta AI (meta.ai)

2. Type your prompt in the input box
3. Click the "Save Prompt" button that appears near the input
4. Edit the title, category, tags, and notes in the popup
5. Click "Save Prompt"

### Using Slash Command

1. On any LLM platform, type `/` in the input box
2. A popup will appear showing your saved prompts
3. Start typing to filter prompts
4. Click a prompt to insert it

### Managing Prompts

1. Click the extension icon to open the popup
2. Browse, search, and manage your prompts
3. Star favorites for quick access
4. View statistics and usage metrics

## Features Overview

### MVP Features (Implemented)
- ✅ Multi-platform support (Claude, ChatGPT, Grok, Perplexity, Gemini, Meta)
- ✅ One-click prompt capture
- ✅ Manual prompt entry with rich metadata
- ✅ Slash command (`/`) for quick access
- ✅ Fuzzy search filtering
- ✅ Favorites/starred prompts
- ✅ Usage tracking (count, last used, per-platform stats)
- ✅ Categories and folders
- ✅ Tags
- ✅ Template variable support
- ✅ Local storage with IndexedDB
- ✅ Statistics dashboard

### Planned Features
- ⏳ Automatic classification (AI-powered)
- ⏳ Folder hierarchy with drag-and-drop
- ⏳ Multi-select and bulk operations
- ⏳ Model-specific prompt optimization suggestions
- ⏳ Smart suggestions based on context
- ⏳ Duplicate detection
- ⏳ History crawler for bulk import
- ⏳ Bulk upload (JSON, CSV, Markdown)
- ⏳ Chrome Sync for cross-device access
- ⏳ Export to Notion, Obsidian
- ⏳ AI Brain integration
- ⏳ Standalone web UI

## Template Variables

Prompt Vault supports TextBlaze-style template variables:

```
{formtext: name=email, default=user@example.com}
{formmenu: GPT-4; Claude; Gemini; default=Claude}
{formdate: YYYY-MM-DD}
{formnumber: name=count, default=5}
```

The system automatically detects variables and marks prompts accordingly.

## Troubleshooting

### Button Not Appearing
- Refresh the page
- Check that you're on a supported LLM platform
- Check the console for errors (F12 → Console)

### Slash Command Not Working
- Make sure the input box is focused
- Try typing `/` at the start or after a space
- Check that you have prompts saved

### Extension Not Loading
- Make sure you built the project (`npm run build`)
- Check that Developer Mode is enabled in Chrome
- Try reloading the extension in `chrome://extensions/`

## Project Structure

```
PromptVault/
├── src/
│   ├── background/       # Background service worker
│   ├── content/          # Content scripts (capture button, slash command)
│   ├── popup/            # Extension popup UI
│   ├── components/       # React components
│   ├── database/         # IndexedDB operations
│   ├── utils/            # Utilities (platform detection, extraction)
│   └── types/            # TypeScript types
├── public/
│   └── icons/            # Extension icons
├── manifest.json         # Chrome extension manifest
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Contributing

This is part of a personal AI Brain and knowledge management system. Future enhancements will integrate with the broader ecosystem.

## Support

For issues or questions, refer to the main project documentation or the code comments.

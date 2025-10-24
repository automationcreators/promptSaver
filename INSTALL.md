# Installation Instructions

## ✅ Extension is Built and Ready!

The extension has been successfully built in the `dist/` folder.

## Load in Chrome

1. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/` in your Chrome browser
   - OR: Click the three dots menu → Extensions → Manage Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to and select the `dist/` folder inside the PromptVault directory:
     ```
     /Users/elizabethknopf/Documents/claudec/active/AIBrainKnowledgeSystem/PromptVault/dist
     ```
   - Click "Select"

4. **Verify Installation**
   - You should see "Prompt Vault" appear in your extensions list
   - The extension icon should appear in your Chrome toolbar

## Usage

### Test the Extension

1. **Visit a Supported Platform:**
   - https://claude.ai
   - https://chat.openai.com or https://chatgpt.com
   - https://grok.x.com
   - https://www.perplexity.ai
   - https://gemini.google.com
   - https://www.meta.ai

2. **Look for the "Save Prompt" Button:**
   - Type something in the chat input
   - A blue "Save Prompt" button should appear near the input box
   - Click it to capture and save your prompt

3. **Use the Slash Command:**
   - Type `/` in the chat input
   - A popup will appear with your saved prompts
   - Type to search, click to insert

4. **Open the Extension Popup:**
   - Click the Prompt Vault icon in your Chrome toolbar
   - Browse, search, edit, and manage your prompts
   - View statistics and usage metrics

## Troubleshooting

### Button Not Showing
- Refresh the page (F5)
- Check that you're on one of the supported platforms
- Open the console (F12) and look for any errors

### Extension Not Loading
- Make sure you selected the `dist/` folder, not the root PromptVault folder
- Check that all files exist in the dist/ folder
- Try removing and re-loading the extension

### Slash Command Not Working
- Make sure the input box is focused
- Type `/` at the start or after a space
- Make sure you have saved at least one prompt first

## Development

If you want to make changes:

1. Edit files in the `src/` folder
2. Run `npm run build`
3. Click the refresh icon on the extension in chrome://extensions/

## Features

- ✅ Capture prompts from any LLM platform
- ✅ Slash command (/) for quick insertion
- ✅ Organize with categories, folders, and tags
- ✅ Favorite/star important prompts
- ✅ Usage tracking and analytics
- ✅ Template variable support
- ✅ Search and filter
- ✅ Local storage (IndexedDB)

Enjoy your new prompt management system!

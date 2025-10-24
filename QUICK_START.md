# Prompt Vault - Quick Start Guide

Get up and running with Prompt Vault in 5 minutes!

## For Users: Install & Use

### Installation (2 minutes)

1. **Download** the extension
   - Get from [Chrome Web Store](#) (coming soon)
   - Or download from [GitHub Releases](https://github.com/automationcreators/promptSaver/releases)

2. **Install** in Chrome
   ```
   1. Unzip the downloaded file
   2. Open chrome://extensions/
   3. Enable "Developer mode" (top-right toggle)
   4. Click "Load unpacked"
   5. Select the "dist" folder
   ```

3. **Pin** the extension
   - Click puzzle icon 🧩 in toolbar
   - Find "Prompt Vault"
   - Click pin 📌

Done! The blue Prompt Vault icon is now in your toolbar.

### First Prompt (1 minute)

1. Go to [claude.ai](https://claude.ai) or [chatgpt.com](https://chatgpt.com)
2. Type a prompt: "Explain quantum physics simply"
3. Look for the blue "Save Prompt" button
4. Click it
5. Edit title/category if you want
6. Click Save

Your first prompt is saved! 🎉

### Use a Saved Prompt (30 seconds)

**Method 1: Quick Command `;;` (fastest)**
```
Direct insert:
1. Click in any chat input
2. Type ;;code-review
3. → Prompt inserted instantly!

Browse mode:
1. Click in any chat input
2. Type ;;
3. Search for your prompt
4. Click to insert
```

**Method 2: From Popup**
```
1. Click Prompt Vault icon
2. Find your prompt
3. Click to see details
4. Click "Insert" or "Copy"
```

---

## For Developers: Build & Modify

### Setup (5 minutes)

```bash
# Clone the repo
git clone https://github.com/automationcreators/promptSaver.git
cd promptSaver

# Install dependencies
npm install

# Build
npm run build

# Load in Chrome
# 1. Go to chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select the "dist/" folder
```

### Development Workflow

```bash
# Watch mode (auto-rebuild on changes)
npm run watch

# Type checking
npm run type-check

# After making changes:
# 1. Wait for rebuild (watch mode)
# 2. Go to chrome://extensions/
# 3. Click reload icon on Prompt Vault card
# 4. Refresh the LLM page you're testing on
```

### Project Structure

```
src/
├── background/      # Background service worker
├── content/         # Content scripts (button, slash command)
├── popup/           # Extension popup UI (React)
├── components/      # React components
├── database/        # IndexedDB operations (Dexie)
├── utils/           # Helper functions
└── types/           # TypeScript types

public/
└── icons/           # Extension icons

manifest.json        # Chrome extension configuration
```

### Key Files to Know

- **manifest.json**: Extension configuration, permissions, URLs
- **src/content/captureButton.ts**: The "Save Prompt" button logic
- **src/content/slashCommand.ts**: The "/" overlay functionality
- **src/popup/App.tsx**: Main popup interface
- **src/database/schema.ts**: Database structure
- **src/utils/platformDetector.ts**: LLM platform detection

### Adding a New LLM Platform

Edit `src/utils/platformDetector.ts`:

```typescript
{
  name: 'newplatform',
  hostnames: ['newplatform.com'],
  inputSelector: 'textarea, div[contenteditable="true"]',
  chatContainerSelector: 'main',
  promptSelector: 'div[data-message]',
}
```

Then update:
1. `manifest.json` - add host permissions
2. Test on the platform
3. Add platform-specific CSS if needed

---

## For Sharers: Help Others Install

### Share the Extension (GitHub Releases)

1. **Build the extension**
   ```bash
   npm run build
   cd dist
   zip -r ../promptSaver-v1.0.0.zip .
   cd ..
   ```

2. **Create GitHub Release**
   - Go to your repo
   - Click "Releases" → "Create a new release"
   - Tag: `v1.0.0`
   - Title: "Prompt Vault v1.0.0"
   - Description: See [PUBLISHING.md](./PUBLISHING.md)
   - Attach `promptSaver-v1.0.0.zip`
   - Click "Publish release"

3. **Share the link**
   ```
   https://github.com/automationcreators/promptSaver/releases/latest
   ```

### Installation Instructions for Others

Send them this:

```markdown
## Install Prompt Vault

1. Download: [Latest Release](https://github.com/automationcreators/promptSaver/releases/latest)
2. Unzip the file
3. Open Chrome and go to: chrome://extensions/
4. Toggle "Developer mode" ON (top-right)
5. Click "Load unpacked"
6. Select the "dist" folder from the unzipped files
7. Pin the extension (click puzzle icon 🧩, then pin 📌)

Done! Start using it on Claude, ChatGPT, Gemini, etc.

Full guide: https://github.com/automationcreators/promptSaver/blob/main/USER_GUIDE.md
```

---

## For Publishers: Chrome Web Store

See the complete guide: [PUBLISHING.md](./PUBLISHING.md)

**Quick Steps:**
1. Pay $5 developer fee (one-time)
2. Build and zip extension
3. Fill out store listing
4. Upload screenshots
5. Add privacy policy
6. Submit for review (1-3 days)

**After Approval:**
- Users install with one click
- Automatic updates
- Review system
- Usage analytics

---

## Google Sheets Backup Setup

### For Users (10 minutes)

Follow the detailed guide: [GOOGLE_SHEETS_INTEGRATION.md](./GOOGLE_SHEETS_INTEGRATION.md)

**Quick Summary:**
1. Create a Google Sheet
2. Add column headers
3. Create an Apps Script
4. Deploy as web app
5. Copy the URL
6. Paste in Prompt Vault settings
7. Click "Sync Now"

Your prompts are backed up! ✅

---

## Resources

### Documentation
- 📖 [README](./README.md) - Project overview
- 👤 [USER_GUIDE](./USER_GUIDE.md) - Complete usage instructions
- 🚀 [PUBLISHING](./PUBLISHING.md) - Chrome Web Store guide
- 💾 [GOOGLE_SHEETS_INTEGRATION](./GOOGLE_SHEETS_INTEGRATION.md) - Backup setup

### Support
- 🐛 [Report Issues](https://github.com/automationcreators/promptSaver/issues)
- 💬 [Discussions](https://github.com/automationcreators/promptSaver/discussions)
- 📧 Email: your.email@example.com

### Community
- ⭐ Star on GitHub
- 🔄 Fork and modify
- 🤝 Contribute improvements
- 📣 Share with friends

---

## Common Questions

### Can I use this on Firefox?
Not yet, but it's on the roadmap! Chrome extension only for now.

### Is my data safe?
Yes! All data stored locally in your browser. No external servers. No tracking.

### Can I export my prompts?
Yes! Settings → Export → Choose JSON or CSV

### Does it work offline?
Yes! Once installed, it works without internet (except Google Sheets sync).

### Can I customize the button appearance?
Not yet, but coming soon! You can modify `src/content/content.css` if you're technical.

### How do I backup my prompts?
Three ways:
1. Settings → Export to JSON (manual)
2. Settings → Export to CSV (manual)
3. Google Sheets sync (automatic)

### Can I share prompts with my team?
Not built-in yet, but you can:
1. Export to JSON and share the file
2. Use Google Sheets sync and share the sheet
3. Coming in v2: Built-in team features

---

## Next Steps

- ✅ Install the extension
- ✅ Save your first prompt
- ✅ Try the slash command
- ✅ Set up Google Sheets backup
- ✅ Star the project on GitHub
- ✅ Share with colleagues who use LLMs

Happy prompting! 🚀

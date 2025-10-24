# Prompt Vault

Universal LLM Prompt Manager - Capture, organize, and reuse prompts across Claude, ChatGPT, Grok, Perplexity, Gemini, and Meta.

> **🚀 Want to build your own extension like this?** Check out our comprehensive guides:
> - 📖 **[BUILD_WITH_CLAUDE_CODE.md](./BUILD_WITH_CLAUDE_CODE.md)** - Complete tutorial: From idea to published extension in 6 hours
> - 🎯 **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** - 5-minute demo script for presentations
>
> Built with [Claude Code](https://claude.com/claude-code) - AI pair programming at its best!

## Features

### Core Features
- **Multi-Platform Support**: Works across Claude, ChatGPT, Grok, Perplexity, Gemini, and Meta
- **One-Click Capture**: Button to capture prompts from current chat
- **Manual Entry**: Add prompts manually with rich metadata
- **Automatic Classification**: AI-powered categorization of prompts
- **Quick Command**: Type `;;` for instant prompt access with direct name lookup and fuzzy search
- **Template Variables**: TextBlaze-style variables like `{formtext}`, `{formmenu}`

### Advanced Features
- **Folder Organization**: Hierarchical folder structure with drag-and-drop
- **Favorites & Pins**: Quick access to most-used prompts
- **Usage Analytics**: Track usage frequency, last used, platform stats
- **Smart Suggestions**: Context-aware prompt recommendations
- **Duplicate Detection**: Identify and merge similar prompts
- **Multi-select Operations**: Bulk actions (delete, tag, export, move)
- **Model-Specific Optimization**: Prompt improvement suggestions per LLM
- **History Crawler**: Bulk extract prompts from chat history
- **Cross-Device Sync**: Chrome Storage Sync integration
- **Export Options**: Notion, Obsidian, JSON, CSV formats
- **AI Brain Integration**: API for broader knowledge system

## Installation

### For End Users (Chrome Web Store)
🚀 **Coming Soon!** Prompt Vault will be available on the Chrome Web Store.

For now, see [Manual Installation](#manual-installation-from-release) below.

### Manual Installation (From Release)

1. **Download the latest release**
   - Go to the [Releases page](https://github.com/automationcreators/promptSaver/releases)
   - Download `promptSaver-vX.X.X.zip`
   - Unzip the file to a location on your computer

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right corner)
   - Click **Load unpacked**
   - Select the unzipped `dist/` folder
   - The Prompt Vault icon should appear in your extensions toolbar!

3. **Pin the extension** (recommended)
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "Prompt Vault" and click the pin icon
   - This keeps the extension easily accessible

### For Developers

#### Prerequisites
- Node.js 18+ and npm
- Git

#### Setup
```bash
# Clone the repository
git clone https://github.com/automationcreators/promptSaver.git
cd promptSaver

# Install dependencies
npm install

# Build the extension
npm run build
```

#### Development Mode
```bash
# Watch mode - rebuilds on file changes
npm run watch

# Type checking
npm run type-check
```

#### Load in Chrome
1. Navigate to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist/` directory
5. Make changes to the code and click the refresh icon on the extension card

## Project Structure

```
PromptVault/
├── src/
│   ├── background/       # Background service worker
│   ├── content/          # Content scripts for LLM platforms
│   ├── popup/            # Extension popup UI
│   ├── components/       # Shared React components
│   ├── database/         # IndexedDB schema and operations
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript type definitions
├── public/
│   └── icons/            # Extension icons
├── manifest.json         # Chrome extension manifest
└── package.json
```

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: TailwindCSS
- **Database**: IndexedDB (via Dexie.js)
- **Search**: Fuse.js (fuzzy search)
- **Icons**: Lucide React
- **Sync**: Chrome Storage API

## Usage Guide

### Capturing Prompts

#### Method 1: Save Button
1. Navigate to any supported platform (Claude, ChatGPT, Gemini, etc.)
2. Type your prompt in the input box
3. Look for the **Save Prompt** button (appears near the input)
4. Click it to save the prompt
5. Edit metadata (title, category, tags) in the popup

#### Method 2: Quick Command (`;;`)
**Fast Path - Direct Name Lookup:**
1. Type `;;prompt-name` in any chat input
2. Prompt instantly inserts (if name matches)
3. Example: `;;code-review` → instant insert!

**Discovery Path - Browse All:**
1. Type `;;` alone in any chat input
2. Search overlay appears with all prompts
3. Start typing to filter
4. Click a prompt to insert it

### Managing Prompts

- **Search**: Use the search bar in the popup to find prompts
- **Filter**: Filter by category, platform, or favorites
- **Edit**: Click any prompt to edit its content and metadata
- **Delete**: Use the delete button on individual prompts
- **Export**: Export your prompts to JSON or CSV format

### Organizing Prompts

- **Categories**: Organize prompts into categories (e.g., "Code Review", "Writing", "Analysis")
- **Tags**: Add multiple tags for flexible organization
- **Favorites**: Star frequently-used prompts for quick access
- **Usage Tracking**: See how often you use each prompt

## Troubleshooting

### Extension Won't Load
- Make sure you selected the `dist/` folder, not the project root
- Ensure Developer mode is enabled in `chrome://extensions/`
- Check for errors in the extension card (red text)
- Try removing and re-adding the extension

### Button Not Appearing
- Refresh the page after installing the extension
- Check if the website is supported (see Features section)
- Open DevTools Console (F12) and look for `[Prompt Vault]` messages
- Some websites update their UI frequently - try reloading

### Prompts Not Saving
- Open the extension popup to verify the database is working
- Check Chrome's storage: `chrome://settings/content/all?search=storage`
- Clear the extension's data and try again
- Check browser console for errors

### Data Backup

**Option 1: Google Sheets Backup** (Recommended)
1. Open the popup
2. Click Settings (gear icon) → Backup tab
3. Follow the [5-minute setup guide](./GOOGLE_SHEETS_SETUP.md)
4. Click "Sync Now" anytime to backup
5. Your prompts sync to your personal Google Sheet!

**Option 2: Manual Export**
1. Open the popup
2. Click Settings (gear icon)
3. Click "Export All Prompts"
4. Save the JSON file somewhere safe

## Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update types in `src/types/`

4. **Test thoroughly**
   - Test on all supported platforms
   - Check that the extension builds: `npm run build`
   - Verify no TypeScript errors: `npm run type-check`

5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe what you changed and why
   - Link any related issues
   - Add screenshots for UI changes

### Code Style

- Use TypeScript for all new code
- Follow the existing component patterns
- Use functional components with hooks
- Keep components small and focused
- Add JSDoc comments for public functions

### Adding a New Platform

To add support for a new LLM platform:

1. Update `src/utils/platformDetector.ts`:
   ```typescript
   {
     name: 'newplatform',
     hostnames: ['newplatform.com'],
     inputSelector: 'textarea, div[contenteditable="true"]',
     chatContainerSelector: 'main',
     promptSelector: 'div[data-message]',
   }
   ```

2. Test the selectors work on the platform
3. Add platform-specific CSS if needed in `src/content/content.css`
4. Update manifest.json with the new domain
5. Test capture, insertion, and quick command features (`;;`)

## Roadmap

- [ ] Chrome Web Store publication
- [ ] Google Sheets backup integration
- [ ] Firefox extension version
- [ ] Prompt templates library
- [ ] AI-powered prompt suggestions
- [ ] Team collaboration features
- [ ] Prompt versioning and history
- [ ] Integration with popular note-taking apps

## Publishing to Chrome Web Store

See [PUBLISHING.md](./PUBLISHING.md) for detailed instructions on publishing this extension.

## License

MIT - See [LICENSE](./LICENSE) file for details

## Support

- **Issues**: [GitHub Issues](https://github.com/automationcreators/promptSaver/issues)
- **Discussions**: [GitHub Discussions](https://github.com/automationcreators/promptSaver/discussions)
- **Email**: your.email@example.com

## Acknowledgments

Built with ❤️ for the AI community. Special thanks to all contributors!

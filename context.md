# Prompt Vault - Project Context

## Project Overview
**Prompt Vault** is a Chrome extension that allows users to capture, organize, and reuse prompts across multiple LLM platforms (Claude, ChatGPT, Grok, Perplexity, Gemini, and Meta).

## Current Status
- **Version**: 1.0.0
- **Build Status**: ✅ Clean (last commit: Auto-sync 2025-11-07)
- **Repository**: github.com/automationcreators/promptSaver

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Database**: IndexedDB (via Dexie.js)
- **Search**: Fuse.js (fuzzy search)
- **Icons**: Lucide React

## Key Features Implemented
1. **Prompt Capture**: One-click capture button for saving prompts
2. **Quick Command**: Type `;;` for instant prompt access with fuzzy search
3. **Organization**: Folder structure, tags, categories, favorites
4. **Analytics**: Usage tracking (frequency, last used, platform stats)
5. **Export Options**: JSON, CSV formats
6. **Google Sheets Sync**: Backup integration capability
7. **Multi-Platform Support**: Works on all major LLM platforms
8. **Template Variables**: TextBlaze-style variables support

## Project Structure
```
src/
├── background/       # Service worker
├── content/          # Content scripts for platforms
├── popup/            # Extension popup UI
├── components/       # Shared React components
├── database/         # IndexedDB operations
├── utils/            # Helper functions (platformDetector, etc.)
└── types/            # TypeScript definitions

dist/                 # Built extension files
public/icons/         # Extension icons
manifest.json         # Chrome manifest v3
```

## Build Commands
```bash
npm install          # Install dependencies
npm run build        # Build extension
npm run watch        # Watch mode for development
npm run type-check   # TypeScript validation
```

## Known Documentation
- **BUILD_WITH_CLAUDE_CODE.md** - Complete build tutorial
- **DEMO_GUIDE.md** - 5-minute demo script
- **PUBLISHING.md** - Chrome Web Store publication guide
- **GOOGLE_SHEETS_SETUP.md** - Backup integration setup
- **USER_GUIDE.md** - End-user documentation
- **README.md** - Main project documentation

## Roadmap (Not Yet Implemented)
- Chrome Web Store publication
- Firefox version
- Prompt templates library
- AI-powered suggestions
- Team collaboration features
- Prompt versioning and history

## Next Steps If Needed
1. Review specific feature implementations in src/ directories
2. Check build status with `npm run build`
3. Run type checking with `npm run type-check`
4. Test extension locally: load `dist/` folder in Chrome
5. For development: use `npm run watch` for auto-rebuild

## Important Notes
- Extension uses Chrome Storage Sync for cross-device sync
- Content scripts inject UI buttons on supported platforms
- Background service worker handles background tasks
- All user data stored in browser's IndexedDB (no server required)
- No external API calls for core functionality

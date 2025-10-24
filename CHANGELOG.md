# Changelog

All notable changes to Prompt Vault will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-10-23

### Added

#### Quick Command Feature (`;;`)
- **New trigger symbol**: Changed from `/` to `;;` (double semicolon) to avoid conflicts with LLM responses and code
- **Direct name lookup**: Type `;;prompt-name` for instant prompt insertion
- **Smart matching algorithm**:
  - Case insensitive matching
  - Ignores spaces, dashes, and underscores
  - Partial matching (starts-with)
  - Minimum 3 characters for auto-insert
- **Browse mode**: Type `;;` alone to open search overlay
- **Keyboard shortcuts**: Enter key selects first result in overlay
- **Visual hint**: Blue info box showing usage tip in overlay

#### Google Sheets Backup
- **One-click sync**: Backup all prompts to Google Sheets
- **Test connection**: Verify Google Apps Script URL before syncing
- **Last sync tracking**: Shows when last backup occurred
- **User-controlled**: No OAuth, users create their own Apps Script webhook
- **Privacy-focused**: Direct connection to user's own Google Sheet
- **Complete setup guide**: Step-by-step instructions in GOOGLE_SHEETS_SETUP.md

#### Gemini Improvements
- **Sidebar button**: Moved "Save Prompt" button to right edge as vertical sidebar
- **Better positioning**: Fixed positioning for Gemini's custom UI
- **Improved prompt capture**: Better detection of Gemini's rich-textarea element

### Changed
- **Trigger symbol**: `/` → `;;` for Quick Command feature
- **Prompt insertion**: Now supports direct name lookup in addition to search
- **Version**: Bumped to 1.1.0

### Fixed
- **Gemini prompt capture**: Now correctly extracts text from rich-textarea elements
- **Gemini button visibility**: Button now appears consistently on Gemini platform
- **Extension loading**: Fixed Vite config to use relative paths for Chrome compatibility

### Documentation
- Added **CHANGELOG.md** (this file)
- Added **FEATURE_QUICK_COMMAND.md**: Deep dive into `;;` trigger feature
- Added **GOOGLE_SHEETS_SETUP.md**: Complete user setup guide for Google Sheets backup
- Added **GOOGLE_SHEETS_INTEGRATION.md**: Technical design document
- Updated **README.md**: New trigger symbol and Google Sheets backup info
- Updated **USER_GUIDE.md**: Comprehensive Quick Command usage instructions
- Updated **QUICK_START.md**: Updated for new features
- Added **PUBLISHING.md**: Complete Chrome Web Store submission guide

## [1.0.0] - 2024-10-21

### Added

#### Core Features
- **Multi-platform support**: Works on Claude, ChatGPT, Grok, Perplexity, Gemini, and Meta AI
- **One-click capture**: Save prompts directly from chat input with blue button
- **Manual entry**: Add prompts manually through popup interface
- **Search & filter**: Fuzzy search with Fuse.js
- **Categories & tags**: Organize prompts with flexible taxonomy
- **Favorites**: Star important prompts for quick access
- **Usage tracking**: Track how often each prompt is used
- **Export options**: Export to JSON or CSV

#### Interface
- **React popup**: Clean, modern popup interface with Tailwind CSS
- **Settings panel**: Manage categories, folders, and tags
- **Prompt editor**: Rich editing interface with metadata
- **Statistics view**: See usage stats and prompt counts

#### Storage
- **IndexedDB**: Local storage using Dexie.js
- **Chrome Storage**: Settings persistence
- **No external servers**: All data stays local

#### Developer Features
- **TypeScript**: Full type safety
- **Vite**: Fast build system
- **Modular architecture**: Clean code organization
- **Platform detection**: Automatic LLM platform identification

### Technical Details
- **Manifest V3**: Modern Chrome extension format
- **Content scripts**: Injected on supported LLM platforms
- **Background service worker**: Handles message passing
- **CSS injection**: Platform-specific styling

## [Unreleased]

### Planned Features

#### Near-term (v1.2.0)
- [ ] Tab completion for prompt names
- [ ] Arrow key navigation in overlay
- [ ] Prompt preview on hover
- [ ] Recent prompts in overlay
- [ ] Keyboard shortcut customization

#### Mid-term (v1.3.0)
- [ ] Automatic Google Sheets sync (scheduled)
- [ ] Two-way sync (edit in Sheets, sync back)
- [ ] Import from Google Sheets
- [ ] Prompt templates library
- [ ] AI-powered prompt suggestions

#### Long-term (v2.0.0)
- [ ] Firefox extension
- [ ] Team collaboration features
- [ ] Prompt versioning and history
- [ ] Cross-device sync with OAuth
- [ ] Public prompt library
- [ ] Browser extension for Edge and Safari
- [ ] Mobile companion app

### Known Issues
- None reported yet

## Release Notes Format

### Version Number Format
- **Major** (X.0.0): Breaking changes, major new features
- **Minor** (1.X.0): New features, backwards compatible
- **Patch** (1.0.X): Bug fixes, minor improvements

### Categories
- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

## Migration Guides

### Migrating from 1.0.0 to 1.1.0

#### Quick Command Trigger Change

**Before (v1.0.0):**
```
Type: /
Result: Opens prompt overlay
```

**After (v1.1.0):**
```
Fast: ;;prompt-name → Instant insert
Browse: ;; → Opens prompt overlay
```

**What You Need to Do:**
- Start using `;;` instead of `/`
- Optionally learn your prompt names for faster access
- Nothing else changes - all your data is preserved

#### New Features Available
- Set up Google Sheets backup in Settings → Backup tab
- Use `;;name` for instant prompt insertion
- Enjoy the improved Gemini experience

**No breaking changes**: Extension will work exactly as before if you use `;;` like you used `/`

## Support

### Getting Help
- **Documentation**: See [USER_GUIDE.md](./USER_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/automationcreators/promptSaver/issues)
- **Discussions**: [GitHub Discussions](https://github.com/automationcreators/promptSaver/discussions)

### Reporting Bugs
When reporting bugs, please include:
1. Extension version (check `chrome://extensions/`)
2. Chrome version
3. Platform where issue occurs (Claude, ChatGPT, etc.)
4. Steps to reproduce
5. Expected vs actual behavior
6. Screenshots if applicable

### Suggesting Features
Feature requests are welcome! Please check existing issues first to avoid duplicates.

---

**Note**: Dates are in YYYY-MM-DD format (ISO 8601).

[1.1.0]: https://github.com/automationcreators/promptSaver/releases/tag/v1.1.0
[1.0.0]: https://github.com/automationcreators/promptSaver/releases/tag/v1.0.0

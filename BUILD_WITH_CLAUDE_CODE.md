# Building a Chrome Extension with Claude Code

## Complete Tutorial: From Idea to Published Extension

This guide shows you how to build **PromptSaver**, a Chrome extension for saving and managing AI prompts across multiple platforms (Claude, ChatGPT, Gemini, etc.), using Claude Code as your AI pair programmer.

**What You'll Build:**
- Multi-platform Chrome extension
- Local database with IndexedDB
- Quick Command system with `;;` trigger
- Google Sheets backup integration
- Professional documentation
- Public GitHub repository

**Time Required:** 4-6 hours (can be done in sessions)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Planning & Setup](#phase-1-planning--setup)
3. [Phase 2: Core Extension Development](#phase-2-core-extension-development)
4. [Phase 3: Content Script & Platform Detection](#phase-3-content-script--platform-detection)
5. [Phase 4: Quick Command Feature](#phase-4-quick-command-feature)
6. [Phase 5: Google Sheets Integration](#phase-5-google-sheets-integration)
7. [Phase 6: Documentation & Publishing](#phase-6-documentation--publishing)
8. [Phase 7: Making it Public](#phase-7-making-it-public)
9. [Tips for Working with Claude Code](#tips-for-working-with-claude-code)
10. [Common Issues & Solutions](#common-issues--solutions)

---

## Prerequisites

### Software You Need:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Chrome Browser** - For testing
- **Git** - For version control
- **VS Code** (optional) - Text editor
- **GitHub Account** - For publishing
- **Claude Code** - [Get it here](https://claude.com/claude-code)

### Knowledge Required:
- Basic understanding of Chrome extensions (helpful but not required)
- Familiarity with JavaScript/TypeScript (Claude Code will help!)
- Basic Git/GitHub knowledge

---

## Phase 1: Planning & Setup

### Step 1.1: Define Your Project

**With Claude Code, start by describing what you want to build:**

```
Prompt: "I want to build a Chrome extension that lets me save prompts
from AI chat interfaces like Claude, ChatGPT, and Gemini. It should:
- Add a button to capture the current prompt
- Store prompts locally with categories and tags
- Let me search and reuse prompts quickly
- Work on multiple AI platforms
What's the best tech stack for this?"
```

**Claude Code will suggest:**
- Manifest V3 (modern Chrome extension format)
- React + TypeScript (for UI)
- IndexedDB (local storage)
- Vite (build tool)
- Tailwind CSS (styling)

### Step 1.2: Initialize Project Structure

**Ask Claude Code:**

```
Prompt: "Create the initial project structure for this Chrome extension.
Include package.json, manifest.json, and the basic folder structure."
```

**Claude Code will:**
1. Create `package.json` with dependencies
2. Set up `manifest.json` with required permissions
3. Create folder structure:
   ```
   /src
     /background    - Background service worker
     /content       - Content scripts
     /popup         - Extension popup UI
     /components    - React components
     /utils         - Helper functions
     /database      - IndexedDB schema
     /types         - TypeScript types
   /public
     /icons         - Extension icons
   ```

### Step 1.3: Set Up Build Configuration

**Ask Claude Code:**

```
Prompt: "Set up Vite configuration for building a Chrome extension.
I need it to generate the correct paths and bundle the popup, background,
and content scripts separately."
```

**Key Configuration:**
- `base: './'` for relative paths (critical for Chrome!)
- Separate entry points for popup, background, content
- Build script that copies manifest and assets

### Step 1.4: Create Git Repository

**Ask Claude Code:**

```
Prompt: "Help me initialize a Git repository and create an appropriate
.gitignore file for this project."
```

**Claude Code will:**
- Initialize Git
- Create `.gitignore` excluding `node_modules/`, `dist/`, etc.
- Make initial commit

---

## Phase 2: Core Extension Development

### Step 2.1: Build the Database Layer

**Ask Claude Code:**

```
Prompt: "Create an IndexedDB schema using Dexie.js for storing prompts.
Each prompt should have: id, title, content, category, tags (array),
platform (where it was captured), timestamps, usage count, and favorite flag."
```

**What Claude Code Creates:**
- `src/database/schema.ts` - Dexie database definition
- `src/database/operations.ts` - CRUD operations
- Type-safe database methods

**Example Interaction:**
```typescript
// Claude Code generates this
export async function addPrompt(prompt: Omit<Prompt, 'id'>): Promise<string> {
  return await db.prompts.add({
    ...prompt,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
```

### Step 2.2: Create Popup Interface

**Ask Claude Code:**

```
Prompt: "Build a React popup interface for the extension with tabs:
1. Prompts List - Shows all prompts with search
2. Add/Edit - Form to add new prompts
3. Settings - Categories, folders, tags management
4. Stats - Usage statistics

Use Tailwind CSS for styling."
```

**Claude Code builds:**
- `src/popup/App.tsx` - Main popup component
- `src/components/PromptList.tsx` - Prompt listing
- `src/components/PromptEditor.tsx` - Add/edit form
- `src/components/Settings.tsx` - Settings panel
- `src/components/PromptStats.tsx` - Statistics view

### Step 2.3: Create Background Service Worker

**Ask Claude Code:**

```
Prompt: "Create a background service worker that handles messages between
the content script and popup. It should handle: capturing prompts,
searching prompts, tracking usage, and opening the popup."
```

**Claude Code creates:**
- Message listener for communication
- Storage management
- Popup control

---

## Phase 3: Content Script & Platform Detection

### Step 3.1: Platform Detection System

**This is where Claude Code really shines. Ask:**

```
Prompt: "Create a platform detection system that identifies which AI chat
interface we're on (Claude, ChatGPT, Gemini, Grok, Perplexity, Meta AI).
For each platform, I need to know the input selector, chat container,
and prompt selectors."
```

**Claude Code will:**
1. Research each platform's DOM structure
2. Create configuration object with selectors
3. Build detection function based on hostname
4. Handle edge cases (subdomains, redirects)

**Example Output:**
```typescript
const PLATFORM_CONFIGS = [
  {
    name: 'claude',
    hostnames: ['claude.ai'],
    inputSelector: 'div[contenteditable="true"][data-testid="chat-input"]',
    // ... more selectors
  },
  // ... other platforms
];
```

### Step 3.2: Inject Capture Button

**Ask Claude Code:**

```
Prompt: "Create a content script that injects a 'Save Prompt' button
near the input field on each platform. The button should be styled
with Tailwind-like classes and positioned differently for each platform."
```

**Claude Code builds:**
- Button creation and injection
- Platform-specific positioning
- Event handlers
- CSS styling

**Pro Tip:** If the button doesn't appear correctly on a specific platform:

```
Prompt: "The button on Gemini isn't visible. Can you check the DOM
structure and fix the positioning?"
```

Claude Code will debug and fix it!

### Step 3.3: Extract Prompt Content

**Ask Claude Code:**

```
Prompt: "Create a function that extracts the current prompt text from
the input field. Handle different types: contenteditable divs, textareas,
and Gemini's custom rich-textarea element."
```

**Claude Code handles:**
- Different input types
- Platform-specific quirks
- Text extraction methods
- Error handling

---

## Phase 4: Quick Command Feature

### Step 4.1: Trigger Symbol Selection

**Here's where you collaborate with Claude Code:**

```
You: "I want users to be able to quickly access their prompts by typing
a special symbol. What symbol would have low conflict with normal typing
and LLM responses?"

Claude Code: [Analyzes options and recommends `;;`]

You: "Perfect! Let's implement that."
```

### Step 4.2: Implement Quick Command

**Ask Claude Code:**

```
Prompt: "Implement a Quick Command system:
- Typing ';;' opens a search overlay
- Typing ';;prompt-name' does direct lookup and instant insertion
- Smart fuzzy matching (case insensitive, ignore spaces/dashes)
- Keyboard navigation (Enter to select, Escape to close)
- Auto-insert if query length >= 3 and unique match found"
```

**Claude Code creates:**
1. Keyboard event listeners
2. Overlay UI with search
3. Fuzzy matching algorithm
4. Direct lookup logic
5. Prompt insertion at cursor

### Step 4.3: Test and Refine

**If issues arise:**

```
Prompt: "When I type ';;', the overlay appears but then immediately closes.
Can you debug this?"
```

Claude Code will:
- Check event propagation
- Fix timing issues
- Adjust logic

---

## Phase 5: Google Sheets Integration

### Step 5.1: Design the Integration

**Ask Claude Code:**

```
Prompt: "I want users to back up their prompts to Google Sheets WITHOUT
using OAuth (too complex). What's the simplest approach?"
```

**Claude Code suggests:**
- User creates Google Apps Script webhook
- Extension POSTs data directly to their sheet
- User controls access and privacy
- No API keys needed in extension

### Step 5.2: Create Google Sheets Module

**Ask Claude Code:**

```
Prompt: "Create a Google Sheets sync module with:
1. Test connection function
2. Sync all prompts function
3. Track last sync timestamp
4. Handle errors gracefully
Include TypeScript types."
```

**Claude Code creates:**
- `src/utils/googleSheetsSync.ts`
- Test connection function
- Sync function with error handling
- Configuration management

### Step 5.3: Add UI in Settings

**Ask Claude Code:**

```
Prompt: "Add a 'Backup' tab to Settings with:
- Input field for Google Apps Script URL
- Test Connection button
- Sync Now button
- Last sync timestamp display
- Clear instructions"
```

**Claude Code:**
- Adds new tab to Settings.tsx
- Creates UI components
- Hooks up functionality
- Adds helpful hints

### Step 5.4: Create User Setup Guide

**Ask Claude Code:**

```
Prompt: "Create a complete step-by-step guide for users to set up
Google Sheets backup. Include the Apps Script code they need to copy."
```

Claude Code generates `GOOGLE_SHEETS_SETUP.md` with:
- Step-by-step instructions
- Apps Script code
- Screenshots placeholders
- Troubleshooting tips

---

## Phase 6: Documentation & Publishing

### Step 6.1: Create Core Documentation

**Ask Claude Code to generate documentation:**

```
Prompt: "Create comprehensive documentation:
1. README.md - Project overview, installation, features
2. USER_GUIDE.md - Complete usage instructions
3. CHANGELOG.md - Version history
4. SECURITY.md - Privacy policy and security info
5. QUICK_START.md - Fast-track guide for new users"
```

**Pro Tip:** Be specific about what to include:

```
Prompt: "In the README, make sure to include:
- Feature list with checkboxes
- Installation from source
- Installation from releases
- Usage examples for the ;; command
- Platform support badges
- Contributing guidelines"
```

### Step 6.2: Security Audit

**Before publishing, ask Claude Code:**

```
Prompt: "Audit the codebase for security issues:
1. Check for exposed API keys or secrets
2. Verify .gitignore is comprehensive
3. Scan for hardcoded credentials
4. Check for any data leaks
Generate a security report."
```

**Claude Code will:**
- Run grep searches for common secrets
- Check `.gitignore` configuration
- Verify no sensitive data in code
- Create security report

### Step 6.3: Create Release Package

**Ask Claude Code:**

```
Prompt: "Help me create a release package:
1. Build the extension
2. Create a ZIP file with only dist/ contents
3. Name it promptSaver-v1.1.0.zip
4. Create release notes from the changelog"
```

**Commands Claude Code provides:**
```bash
npm run build
cd dist && zip -r ../promptSaver-v1.1.0.zip .
```

---

## Phase 7: Making it Public

### Step 7.1: Prepare Repository

**Ask Claude Code:**

```
Prompt: "I want to publish this to GitHub. Help me:
1. Review all documentation
2. Replace placeholder URLs with actual ones
3. Update email addresses
4. Create a publishing checklist
What else should I check?"
```

### Step 7.2: Create GitHub Release

**Ask Claude Code:**

```
Prompt: "Help me create a GitHub release:
1. Commit all changes
2. Create and push a git tag v1.1.0
3. Create release notes from CHANGELOG
4. Attach the ZIP file
5. Make the repository public"
```

**Claude Code will:**
- Generate commit message
- Create git tag
- Format release notes
- Provide GitHub CLI commands

### Step 7.3: Chrome Web Store Preparation

**Ask Claude Code:**

```
Prompt: "Create a guide for submitting this to the Chrome Web Store.
Include what screenshots to take, how to write the store description,
and the submission checklist."
```

Claude Code creates `PUBLISHING.md` with Chrome Web Store details.

---

## Tips for Working with Claude Code

### 1. **Be Specific About Your Goals**

**❌ Vague:**
```
"Fix the Gemini button"
```

**✅ Specific:**
```
"The Save Prompt button on Gemini isn't visible. Move it to the far right
edge as a vertical sidebar and ensure it captures text from rich-textarea
elements."
```

### 2. **Iterate in Small Steps**

Build one feature at a time:
1. Platform detection
2. Button injection
3. Prompt capture
4. Quick Command
5. Google Sheets

Don't try to build everything at once!

### 3. **Use Claude Code for Debugging**

When errors occur:
```
Prompt: "I'm getting this error: [paste error]. Here's what I was trying
to do: [explain]. Can you help debug?"
```

### 4. **Ask for Explanations**

```
Prompt: "Explain how the platform detection system works and why we use
hostname matching instead of URL matching."
```

### 5. **Request Best Practices**

```
Prompt: "What's the best way to handle Chrome extension context
invalidation errors? Show me the industry standard approach."
```

### 6. **Test Incrementally**

After each feature:
```
Prompt: "I've implemented [feature]. What should I test to make sure
it works correctly? Give me a test checklist."
```

### 7. **Ask for Refactoring**

```
Prompt: "This code works but feels messy. Can you refactor it to be
more maintainable and follow TypeScript best practices?"
```

### 8. **Document As You Go**

```
Prompt: "Generate JSDoc comments for these functions explaining what
they do, their parameters, and return values."
```

---

## Common Issues & Solutions

### Issue 1: Extension Won't Load

**Symptoms:** Chrome shows errors when loading unpacked extension

**Ask Claude Code:**
```
Prompt: "My extension won't load in Chrome. The error says [paste error].
Check manifest.json and vite.config.ts for issues."
```

**Common Fix:** Add `base: './'` to vite.config.ts

### Issue 2: Content Script Not Injecting

**Symptoms:** No button appears on websites

**Ask Claude Code:**
```
Prompt: "The content script isn't running on [website]. Check the
manifest.json host_permissions and content_scripts configuration."
```

### Issue 3: Platform-Specific Issues

**Symptoms:** Works on Claude but not Gemini

**Ask Claude Code:**
```
Prompt: "The extension works on Claude but not Gemini. Debug the platform
detection and selector configuration for Gemini."
```

### Issue 4: Build Path Issues

**Symptoms:** Popup shows "Cannot load popup"

**Ask Claude Code:**
```
Prompt: "Chrome can't load the popup. I think it's a path issue in the
build. Check if we're using absolute vs relative paths."
```

### Issue 5: Extension Context Invalidated

**Symptoms:** Errors after reloading extension

**Ask Claude Code:**
```
Prompt: "I get 'Extension context invalidated' errors. Add error handling
to check if chrome.runtime is available before sending messages."
```

---

## Project Milestones & Checkpoints

### ✅ Milestone 1: Basic Extension (Day 1)
- [x] Project setup
- [x] Database schema
- [x] Popup UI
- [x] Basic CRUD operations

**Test:** Can you save and view a prompt?

### ✅ Milestone 2: Platform Integration (Day 2)
- [x] Platform detection
- [x] Content script injection
- [x] Capture button appears
- [x] Prompt extraction working

**Test:** Does button appear on all platforms?

### ✅ Milestone 3: Quick Command (Day 3)
- [x] ;; trigger implemented
- [x] Overlay UI
- [x] Direct lookup
- [x] Fuzzy matching

**Test:** Can you type ;;test and get instant results?

### ✅ Milestone 4: Backup Feature (Day 4)
- [x] Google Sheets sync
- [x] Test connection
- [x] Settings UI
- [x] User documentation

**Test:** Can you sync to a real Google Sheet?

### ✅ Milestone 5: Documentation (Day 5)
- [x] README complete
- [x] User guide written
- [x] Security audit
- [x] Publishing guide

**Test:** Can someone else install from your README?

### ✅ Milestone 6: Publishing (Day 6)
- [x] GitHub repository
- [x] Release created
- [x] Repository public
- [x] All URLs correct

**Test:** Does the download link work?

---

## Final Checklist Before Publishing

### Code Quality
- [ ] No console.errors in production
- [ ] All TypeScript errors resolved
- [ ] Extension loads without errors
- [ ] All features tested on all platforms

### Security
- [ ] No API keys in code
- [ ] No secrets in git history
- [ ] .gitignore properly configured
- [ ] SECURITY.md complete

### Documentation
- [ ] README.md complete and accurate
- [ ] All placeholders replaced (YOUR_USERNAME, etc.)
- [ ] Installation instructions tested
- [ ] Links all work

### Repository
- [ ] All files committed
- [ ] Git tag created
- [ ] Release published
- [ ] ZIP file attached

### User Experience
- [ ] Extension works on all listed platforms
- [ ] ;; command feels fast
- [ ] Google Sheets sync works
- [ ] Error messages are helpful

---

## Lessons Learned

### What Worked Well:
1. **Iterative Development** - Building one feature at a time
2. **Claude Code Debugging** - Quick fixes for platform-specific issues
3. **Comprehensive Documentation** - Users can self-serve
4. **Security First** - No OAuth complexity, user owns data

### What to Improve:
1. **Test Earlier** - Test each platform as you build
2. **Document Decisions** - Keep notes on why you chose `;;` vs `/`
3. **User Feedback** - Get real users testing early

### Claude Code Pro Tips:
1. **Save Context** - Keep important decisions in conversation
2. **Ask for Alternatives** - "What are 3 ways to solve this?"
3. **Review Code** - "Review this code for potential issues"
4. **Explain Changes** - "Explain what this code does line by line"

---

## Next Steps

### Phase 8: Polish & Enhancement
- [ ] Add keyboard shortcuts
- [ ] Implement prompt templates
- [ ] Add import/export features
- [ ] Create browser action menu

### Phase 9: Chrome Web Store
- [ ] Take screenshots
- [ ] Write store description
- [ ] Create privacy policy page
- [ ] Submit for review

### Phase 10: Community
- [ ] Share on Reddit (r/ChatGPT, r/ClaudeAI)
- [ ] Post on Twitter/X
- [ ] Create demo video
- [ ] Write blog post

---

## Demo Script

**For showing others how to build with Claude Code:**

### Part 1: The Big Idea (5 min)
"I want to build a Chrome extension that saves prompts from AI chats..."

### Part 2: Rapid Prototyping (10 min)
- Show Claude Code setting up project structure
- Generate database schema
- Create popup UI
- Live demo of building with AI

### Part 3: The Hard Parts Made Easy (10 min)
- Platform detection across 6 different sites
- Show Claude Code figuring out DOM selectors
- Debugging Gemini-specific issues
- Adding error handling

### Part 4: Going Pro (10 min)
- Security audit with Claude Code
- Documentation generation
- Publishing to GitHub
- Creating releases

### Part 5: The Result (5 min)
- Show working extension
- Demo ;; Quick Command
- Show Google Sheets sync
- Public GitHub repo

**Total Time:** 40 minutes

---

## Resources

### Claude Code Documentation:
- [Getting Started](https://docs.claude.com/claude-code)
- [Best Practices](https://docs.claude.com/claude-code/best-practices)
- [Examples](https://docs.claude.com/claude-code/examples)

### Chrome Extension Resources:
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
- [Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

### This Project:
- **GitHub:** https://github.com/automationcreators/promptSaver
- **Issues:** https://github.com/automationcreators/promptSaver/issues
- **Discussions:** https://github.com/automationcreators/promptSaver/discussions

---

## Contributing

Want to improve this guide or the extension?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ask Claude Code to review: "Review my changes for issues"
5. Submit a pull request

---

## Conclusion

Building a Chrome extension with Claude Code is:
- **Faster** - AI handles boilerplate and research
- **Easier** - No need to memorize every API
- **Better** - AI suggests best practices
- **Educational** - Learn by building with an expert

**You built:**
- ✅ A production-ready Chrome extension
- ✅ Multi-platform support
- ✅ Advanced features (Quick Command, Sheets sync)
- ✅ Professional documentation
- ✅ Public open-source project

**Time spent:** ~6 hours with Claude Code vs ~40+ hours solo

---

**Ready to build your own extension? Start here:**

```
Prompt to Claude Code: "I want to build a Chrome extension that [your idea].
What's the best approach and can you help me get started?"
```

Happy building! 🚀

---

*This guide was created using Claude Code to document the process of building PromptSaver with Claude Code. Meta!*

**Version:** 1.0
**Last Updated:** 2025-10-23
**Author:** Built with Claude Code by automationcreators

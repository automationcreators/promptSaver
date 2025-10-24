# Prompt Vault User Guide

Welcome to Prompt Vault! This guide will help you get started and make the most of your prompt management.

## Table of Contents

1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Capturing Prompts](#capturing-prompts)
4. [Managing Your Library](#managing-your-library)
5. [Using Saved Prompts](#using-saved-prompts)
6. [Organizing & Searching](#organizing--searching)
7. [Backup & Export](#backup--export)
8. [Tips & Tricks](#tips--tricks)
9. [Troubleshooting](#troubleshooting)

---

## Installation

### For End Users (Easy Way)

**Coming Soon**: Install directly from Chrome Web Store

### Manual Installation (Current Method)

1. **Download the extension**
   - Go to the [Releases page](https://github.com/automationcreators/promptSaver/releases)
   - Download the latest `promptSaver-vX.X.X.zip`
   - Unzip to a folder on your computer

2. **Install in Chrome**
   - Open Chrome
   - Go to `chrome://extensions/`
   - Toggle **Developer mode** ON (top-right)
   - Click **Load unpacked**
   - Select the `dist` folder from the unzipped files

3. **Pin the extension**
   - Click the puzzle piece 🧩 icon in Chrome toolbar
   - Find "Prompt Vault"
   - Click the pin 📌 icon
   - Now you can access it easily!

---

## Getting Started

### First Launch

1. Click the Prompt Vault icon in your Chrome toolbar
2. The popup opens showing your empty prompt library
3. You're ready to start saving prompts!

### Supported Platforms

Prompt Vault works on:
- ✅ **Claude** (claude.ai)
- ✅ **ChatGPT** (chat.openai.com, chatgpt.com)
- ✅ **Google Gemini** (gemini.google.com)
- ✅ **Grok** (grok.x.com, grok.com)
- ✅ **Perplexity** (perplexity.ai)
- ✅ **Meta AI** (meta.ai)

---

## Capturing Prompts

### Method 1: The Save Button

This is the easiest way to capture prompts:

1. **Navigate** to any supported LLM platform
2. **Type** your prompt in the chat input box
3. **Look** for the blue "Save Prompt" button
   - Appears near the input area
   - On Gemini: vertical button on the right edge
4. **Click** the button
5. **Edit** the prompt details in the popup:
   - Title (auto-suggested or custom)
   - Category
   - Tags
   - Notes

**Example**: On ChatGPT
```
You: [Type] "Explain quantum entanglement like I'm 5"
[Blue "Save Prompt" button appears]
[Click it]
[Popup opens with the prompt ready to save]
```

### Method 2: Manual Entry

Add prompts without typing them in the LLM:

1. Click the Prompt Vault icon
2. Click the **"+ New Prompt"** button
3. Fill in:
   - Prompt content (required)
   - Title
   - Category
   - Tags
4. Click **Save**

**Use case**: Saving prompts from screenshots, emails, or documents

---

## Managing Your Library

### The Popup Interface

Click the Prompt Vault icon to open the popup:

```
┌─────────────────────────────────┐
│  🔍 Search...           ⚙️       │
├─────────────────────────────────┤
│  📊 Stats    ⭐ Favorites        │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │ 💻 Code Review            │  │
│  │ "Review this code for..." │  │
│  │ Used 5x • Updated 2d ago  │  │
│  └───────────────────────────┘  │
│                                  │
│  ┌───────────────────────────┐  │
│  │ ✍️ Writing                │  │
│  │ "Write a blog post about" │  │
│  │ Used 12x • Updated 1w ago │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### Viewing Prompt Details

Click any prompt to see:
- Full content
- Metadata (category, tags, platform)
- Usage statistics
- Edit and delete options

### Editing Prompts

1. Click a prompt to open details
2. Click **Edit**
3. Modify content, title, category, or tags
4. Click **Save**

### Deleting Prompts

1. Click a prompt to open details
2. Click **Delete**
3. Confirm deletion

**Warning**: Deletion is permanent (unless you have a backup)

---

## Using Saved Prompts

### Method 1: Copy & Paste

1. Open the Prompt Vault popup
2. Click a prompt
3. Click **Copy** button
4. Paste into your LLM chat

### Method 2: Quick Command `;;` (Fast!)

This is the power-user feature with two modes:

#### 🚀 Fast Mode: Direct Name Lookup

Type `;;` followed by prompt name for instant insert:

```
Type: ;;code-review
Result: → Prompt inserted instantly!

Type: ;;bug
Result: → "Bug Analysis" inserted (fuzzy match)

Type: ;;cod
Result: → "Code Review" inserted (partial match)
```

**Smart Matching:**
- Ignores spaces, dashes, underscores (`;;codereview` = `;;code-review`)
- Case insensitive
- Matches names starting with your query (3+ characters)

#### 🔍 Browse Mode: Search All Prompts

Type `;;` alone to open the search overlay:

1. Go to any supported LLM platform
2. Click in the chat input
3. Type **`;;`** (double semicolon)
4. A search overlay appears:
   ```
   ┌──────────────────────────────────────┐
   │  💡 Type ;;name for instant insert   │
   │  🔍 Search prompts...                │
   ├──────────────────────────────────────┤
   │  💻 Code Review                      │
   │  ✍️ Writing Assistant                │
   │  📊 Data Analysis                    │
   └──────────────────────────────────────┘
   ```
5. **Type** to filter (fuzzy search works!)
6. **Click** a prompt to insert it

**Keyboard Shortcuts:**
- **Enter** - Insert first result
- **Esc** - Close overlay
- Click outside - Close overlay

---

## Organizing & Searching

### Categories

Keep prompts organized by purpose:

**Default Categories**:
- 📝 General
- 💻 Coding
- ✍️ Writing
- 🎨 Creative
- 📊 Analysis
- 🔬 Research

**Custom Categories**:
1. Open settings ⚙️
2. Go to "Categories"
3. Add your own

**Tips**:
- Keep categories broad (5-10 total)
- Use tags for specific topics

### Tags

Add multiple tags for flexible organization:

**Examples**:
- Prompt: "Review Python code for bugs"
- Tags: `python`, `code-review`, `debugging`

**Adding Tags**:
1. Edit a prompt
2. Type tags separated by commas
3. Save

### Favorites ⭐

Star your most-used prompts:

1. Click a prompt
2. Click the star ⭐ icon
3. Access quickly from "Favorites" filter

### Searching

The search box is powerful:

**Basic Search**:
```
"python" → finds all prompts mentioning Python
```

**Fuzzy Search**:
```
"revw cod" → finds "Review Code"
```

**Search Scope**:
- Title
- Content
- Tags
- Category

---

## Backup & Export

### Why Backup?

Your prompts are stored locally in your browser. If you:
- Clear browser data
- Uninstall the extension
- Switch computers

...you'll lose your prompts. **Backup regularly!**

### Export All Prompts

1. Click Prompt Vault icon
2. Click Settings ⚙️
3. Click **"Export All Prompts"**
4. Choose format:
   - **JSON** (recommended): Full data with metadata
   - **CSV**: Spreadsheet format
5. Save the file somewhere safe

**Recommended**: Monthly backups to cloud storage (Google Drive, Dropbox, etc.)

### Import Prompts

1. Click Settings ⚙️
2. Click **"Import Prompts"**
3. Select your JSON or CSV file
4. Choose import behavior:
   - **Merge**: Keep existing, add new
   - **Replace**: Delete all, import only new

### Google Sheets Auto-Backup (Coming Soon!)

Future feature will automatically sync your prompts to a Google Sheet:
- Real-time backup
- View/edit in spreadsheet
- Share with team
- Version history

Stay tuned for this update!

---

## Tips & Tricks

### 🚀 Power User Tips

1. **Use Keyboard Shortcuts**
   - `Ctrl/Cmd + K`: Open Prompt Vault (if you pin it)
   - `/`: Activate slash command on LLM platforms

2. **Create Template Prompts**
   - Use placeholders: `[INSERT TOPIC]`, `[COMPANY NAME]`
   - Fill in when you use them
   - Save time on common variations

3. **Track What Works**
   - Usage stats show your most-used prompts
   - Refine and optimize your top performers
   - Delete prompts you never use

4. **Organize Early**
   - Set up categories and tags from day one
   - Easier than reorganizing 100+ prompts later

5. **Export Regularly**
   - Set a monthly reminder
   - One minute of backup prevents hours of loss

### 📚 Prompt Library Ideas

Build collections for:

**For Developers**:
- Code review templates
- Bug analysis prompts
- Documentation generators
- Refactoring guidelines

**For Writers**:
- Blog post outlines
- Social media content
- Email templates
- Editing checklists

**For Researchers**:
- Literature review prompts
- Data analysis templates
- Citation formatting
- Summarization requests

**For Students**:
- Study guide generators
- Essay outlines
- Concept explanations
- Practice problem creators

---

## Troubleshooting

### Button Not Showing

**Problem**: "Save Prompt" button doesn't appear on LLM platform

**Solutions**:
1. Refresh the page (Ctrl/Cmd + R)
2. Check if site is supported (see [Supported Platforms](#supported-platforms))
3. Verify extension is enabled:
   - Go to `chrome://extensions/`
   - Find Prompt Vault
   - Toggle should be blue/on
4. Check browser console:
   - Press F12
   - Look for `[Prompt Vault]` messages
   - Screenshot any errors for support

### Slash Command Not Working

**Problem**: Typing `/` doesn't open the overlay

**Solutions**:
1. Make sure cursor is in the chat input
2. Try in a fresh chat/conversation
3. Check if other extensions conflict
4. Reload the extension:
   - `chrome://extensions/`
   - Click reload icon on Prompt Vault

### Prompts Not Saving

**Problem**: Clicking "Save Prompt" doesn't work

**Solutions**:
1. Open popup to verify database is working
2. Check available storage:
   - `chrome://settings/content/all`
   - Search for storage
   - Verify Chrome has space
3. Try clearing extension data:
   - Export prompts first!
   - `chrome://extensions/`
   - Prompt Vault → Details → "Clear storage"
   - Reload extension
   - Import prompts back

### Extension Won't Load

**Problem**: Can't load unpacked extension

**Solutions**:
1. Verify you selected the **`dist/`** folder, not project root
2. Check Developer mode is enabled
3. Look for error messages in red on extension card
4. Try downloading a fresh copy from releases
5. Verify no conflicting extensions

### Search Not Finding Prompts

**Problem**: Search returns no results for known prompts

**Solutions**:
1. Try simpler search terms
2. Check filters aren't too restrictive
3. Verify prompts actually saved (check "All Prompts")
4. Try rebuilding search index:
   - Settings ⚙️
   - "Advanced"
   - "Rebuild Search Index"

### Data Lost After Update

**Problem**: Prompts disappeared after Chrome update

**Solution**:
- Check if you have a backup export file
- Import your backup: Settings → Import
- If no backup: Data may be unrecoverable
- **Prevention**: Export regularly!

---

## Getting Help

### Documentation

- [README](./README.md) - Overview and setup
- [PUBLISHING Guide](./PUBLISHING.md) - For contributors
- This guide - Complete usage instructions

### Support Channels

1. **GitHub Issues** (preferred)
   - Bug reports: Use bug template
   - Feature requests: Use feature template
   - Questions: Use discussions

2. **Email Support**
   - your.email@example.com
   - Include:
     - Chrome version
     - Extension version
     - Platform where issue occurs
     - Screenshots if possible

3. **Community**
   - GitHub Discussions for questions
   - Share tips and tricks
   - Help other users

---

## What's Next?

### Upcoming Features

- ✨ Google Sheets automatic backup
- 🎨 Customizable themes
- 🤝 Team sharing & collaboration
- 📝 Prompt templates library
- 🔄 Version history for prompts
- 🎯 AI-powered prompt suggestions
- 🦊 Firefox extension

### Stay Updated

- Watch the GitHub repository
- Follow release notes
- Join community discussions

---

## Feedback Welcome!

Love Prompt Vault? Have suggestions?

- ⭐ Star us on GitHub
- 📝 Leave a Chrome Web Store review (once published)
- 🐛 Report bugs via GitHub Issues
- 💡 Suggest features in Discussions
- 🎉 Share with friends who use LLMs

Built with ❤️ for the AI community!

---

**Version**: 1.0.0
**Last Updated**: 2024
**License**: MIT

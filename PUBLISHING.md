# Publishing to Chrome Web Store

This guide walks you through publishing Prompt Vault to the Chrome Web Store.

## Prerequisites

### 1. Google Account
You need a Google account to access the Chrome Web Store Developer Dashboard.

### 2. Developer Registration Fee
- One-time fee: **$5 USD**
- Payment required before publishing any extensions
- Processed through Google Payments

### 3. Prepared Assets

Before starting, prepare these materials:

#### Extension Package
- Built extension files in `dist/` folder
- Zipped as `promptSaver-v1.0.0.zip`

#### Store Listing Assets
1. **Icon** (required)
   - 128x128px PNG
   - Already in `public/icons/icon128.png`

2. **Screenshots** (required - at least 1, max 5)
   - 1280x800px or 640x400px
   - Show key features:
     - Prompt capture button
     - Popup interface
     - Slash command in action
     - Prompt editing
     - Settings panel

3. **Promotional Images** (optional but recommended)
   - Small tile: 440x280px
   - Large tile: 920x680px
   - Marquee: 1400x560px

4. **Description Text**
   - Short description (132 characters max)
   - Detailed description (see template below)

## Step-by-Step Publishing Process

### Step 1: Build the Extension

```bash
cd PromptVault
npm run build
```

Verify the `dist/` folder contains:
- `manifest.json`
- `background.js`
- `content.js`
- `popup.html`
- `icons/` folder
- `assets/` folder
- All other necessary files

### Step 2: Create a ZIP File

**Option A: Command Line**
```bash
cd dist
zip -r ../promptSaver-v1.0.0.zip .
cd ..
```

**Option B: Manual**
1. Open the `dist/` folder
2. Select all files inside
3. Right-click → "Compress" (Mac) or "Send to → Compressed folder" (Windows)
4. Rename to `promptSaver-v1.0.0.zip`

⚠️ **Important**: Zip the *contents* of the dist folder, not the folder itself!

### Step 3: Register as a Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Accept the Developer Agreement
4. Pay the $5 registration fee
5. Wait for payment confirmation (usually instant)

### Step 4: Create a New Item

1. Click **"New Item"** button
2. Click **"Choose file"** and select your ZIP
3. Click **"Upload"**
4. Wait for the upload to complete

### Step 5: Fill Out Store Listing

#### Product Details Tab

**Display Name**
```
Prompt Vault - Universal LLM Prompt Manager
```

**Short Description** (132 characters max)
```
Capture, organize, and reuse prompts across Claude, ChatGPT, Gemini, Grok, Perplexity, and Meta AI with one click.
```

**Detailed Description**
```
Prompt Vault is your universal prompt management solution for all major LLM platforms. Never lose a great prompt again!

🚀 KEY FEATURES

✓ Multi-Platform Support
  Works seamlessly with Claude, ChatGPT, Gemini, Grok, Perplexity, and Meta AI

✓ One-Click Capture
  Save prompts instantly with the floating "Save Prompt" button

✓ Slash Command Quick Access
  Type "/" in any chat to search and insert saved prompts

✓ Smart Organization
  - Categorize prompts for easy retrieval
  - Add tags for flexible filtering
  - Star favorites for quick access
  - Track usage statistics

✓ Powerful Search
  Fuzzy search finds prompts even with typos

✓ Privacy-Focused
  All data stored locally in your browser - nothing sent to external servers

✓ Import/Export
  Backup your prompts to JSON or CSV format

📚 PERFECT FOR

- Developers who reuse code review prompts
- Writers who need content templates
- Researchers who refine query patterns
- Anyone using LLMs daily

🎯 HOW IT WORKS

1. Browse to any supported LLM platform
2. Type your prompt in the chat input
3. Click the "Save Prompt" button
4. Organize with categories and tags
5. Reuse anytime with the "/" command

🔒 PRIVACY & SECURITY

- Zero telemetry - we don't collect any data
- Prompts stored locally in IndexedDB
- No external API calls
- Open source - audit the code yourself

💡 PRO TIPS

- Use the "/" command for lightning-fast prompt insertion
- Star your most-used prompts for instant access
- Export regularly to backup your prompt library
- Organize early - categorization saves time later

🆘 SUPPORT

Need help? Found a bug?
- GitHub: github.com/automationcreators/promptSaver
- Email: your.email@example.com

⭐ COMING SOON

- Google Sheets automatic backup
- Prompt templates library
- Team sharing features
- Firefox extension

Built with ❤️ for the AI community
```

**Category**
- Primary: Productivity
- (Optional secondary categories if available)

**Language**
- English (United States)

#### Graphics Tab

1. **Icon**: Upload `public/icons/icon128.png`

2. **Screenshots**: Upload 3-5 screenshots showing:
   - Screenshot 1: Extension in action on Claude/ChatGPT
   - Screenshot 2: Popup interface with saved prompts
   - Screenshot 3: Slash command overlay
   - Screenshot 4: Prompt editing interface
   - Screenshot 5: Settings and export features

3. **Promotional Images** (optional):
   - Small promo tile (440x280)
   - Marquee promo (1400x560)

#### Privacy Tab

**Permissions Justification**

For each permission in manifest.json, explain why it's needed:

1. **storage**
   ```
   Required to save user's prompts locally in the browser using IndexedDB and Chrome Storage API
   ```

2. **activeTab**
   ```
   Required to detect the current LLM platform and inject the capture button into the page
   ```

3. **scripting**
   ```
   Required to insert the content script that enables prompt capture and slash command functionality
   ```

**Host Permissions**
```
The extension needs access to these LLM platforms to provide prompt capture functionality:
- claude.ai - Claude AI assistant
- chat.openai.com, chatgpt.com - ChatGPT
- grok.x.com, grok.com - Grok by X
- perplexity.ai - Perplexity AI
- gemini.google.com - Google Gemini
- meta.ai - Meta AI

No data from these sites is transmitted externally. All prompt data is stored locally.
```

**Privacy Policy** (required)

You must provide a privacy policy. Here's a template:

```
Privacy Policy for Prompt Vault

Last Updated: [DATE]

1. DATA COLLECTION
Prompt Vault does NOT collect, transmit, or share any personal data. All prompts and settings are stored locally in your browser using IndexedDB and Chrome Storage API.

2. DATA STORAGE
- All data is stored locally on your device
- No cloud storage or external servers are used
- No analytics or tracking code is included

3. THIRD-PARTY ACCESS
Prompt Vault does not integrate with any third-party services that could access your data.

4. PERMISSIONS
The extension requires certain permissions to function:
- storage: To save your prompts locally
- activeTab: To detect which LLM platform you're using
- scripting: To inject the capture button interface
- Host permissions: To work on supported LLM platforms

5. DATA EXPORT
Users can export their prompts at any time using the built-in export feature.

6. OPEN SOURCE
The complete source code is available on GitHub for audit and verification.

7. CONTACT
For questions: your.email@example.com
```

Host this privacy policy either:
- On your GitHub repository (e.g., `PRIVACY.md`)
- On a personal website
- On a free hosting service like GitHub Pages

Enter the URL in the privacy policy field.

### Step 6: Distribution Settings

1. **Visibility**
   - Choose "Public" (recommended)
   - Or "Unlisted" if you want to share with specific people only

2. **Regions**
   - Select "All regions" (default)
   - Or choose specific countries

3. **Pricing**
   - Select "Free"

### Step 7: Review and Submit

1. Review all information carefully
2. Check the preview on the right side
3. Click **"Submit for review"**
4. Accept any additional terms

### Step 8: Wait for Review

- Initial review: 1-3 business days (typically)
- You'll receive an email when:
  - Review is complete
  - Extension is published
  - Issues need to be addressed

## Post-Publication

### Update the README

Replace placeholders:
```markdown
# Before
[GitHub Issues](https://github.com/automationcreators/promptSaver/issues)

# After
[GitHub Issues](https://github.com/automationcreators/promptSaver/issues)
```

### Add Chrome Web Store Badge

Once published, add this to your README:

```markdown
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/YOUR_EXTENSION_ID.svg)](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/YOUR_EXTENSION_ID.svg)](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/YOUR_EXTENSION_ID.svg)](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
```

### Promote Your Extension

- Share on Twitter/X, LinkedIn, Reddit (r/ChatGPT, r/ClaudeAI, r/ArtificialInteligence)
- Post on Product Hunt
- Write a blog post or Medium article
- Make a demo video for YouTube
- Share in relevant Discord/Slack communities

## Updating the Extension

When you release a new version:

1. Update version in `manifest.json`:
   ```json
   "version": "1.1.0"
   ```

2. Build and zip:
   ```bash
   npm run build
   cd dist && zip -r ../promptSaver-v1.1.0.zip . && cd ..
   ```

3. Go to Developer Dashboard
4. Click on your extension
5. Click "Package" tab
6. Click "Upload new package"
7. Select the new ZIP file
8. Update description if needed (mention what's new)
9. Submit for review

Updates are usually reviewed faster than initial submissions.

## Common Rejection Reasons

1. **Missing or invalid privacy policy**
   - Solution: Host a proper privacy policy and link it

2. **Overly broad permissions**
   - Solution: Only request necessary permissions and justify each one

3. **Misleading description**
   - Solution: Be accurate about features, don't promise what isn't there

4. **Copyright issues**
   - Solution: Don't use trademarked names in misleading ways
   - ✓ Good: "Works with ChatGPT, Claude, and Gemini"
   - ✗ Bad: "Official ChatGPT Extension"

5. **Functionality issues**
   - Solution: Test thoroughly before submission
   - Test on all supported platforms
   - Verify all features work as described

## Tips for Success

1. **Screenshots are crucial** - Show the extension in action
2. **Write clear descriptions** - Users should understand value immediately
3. **Respond quickly** to reviews - Both good and bad feedback
4. **Update regularly** - Shows the extension is maintained
5. **Monitor reviews** - Address issues users report
6. **Track metrics** - Use the dashboard to see usage patterns

## Resources

- [Chrome Web Store Developer Documentation](https://developer.chrome.com/docs/webstore/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Best Practices](https://developer.chrome.com/docs/webstore/best_practices/)
- [Program Policies](https://developer.chrome.com/docs/webstore/program-policies/)

## Questions?

If you have questions about publishing:
- Check the [Chrome Web Store Developer FAQ](https://developer.chrome.com/docs/webstore/faq/)
- Ask in the GitHub Discussions
- Reach out via email

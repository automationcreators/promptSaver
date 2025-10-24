# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Prompt Vault, please report it responsibly:

1. **DO NOT** open a public GitHub issue
2. Email: elizabeth.knopf@gmail.com with subject "Security: Prompt Vault"
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

## Security Measures

### Data Storage
- ✅ **Local only**: All prompt data stored in IndexedDB on your device
- ✅ **No external servers**: No data transmitted to third parties
- ✅ **No telemetry**: We don't collect any usage data
- ✅ **No tracking**: No analytics or user tracking

### Google Sheets Integration
- ✅ **User-controlled**: You create and own the Google Sheet
- ✅ **Your Apps Script**: You create and host the webhook
- ✅ **Direct connection**: Data goes from your browser to your sheet
- ✅ **No intermediaries**: No third-party servers involved
- ✅ **Revocable**: You can disable anytime by removing the URL

### Code Security
- ✅ **Open source**: All code is auditable on GitHub
- ✅ **No obfuscation**: Source code is readable and transparent
- ✅ **TypeScript**: Type safety reduces bugs
- ✅ **Manifest V3**: Latest Chrome extension security standards

### Environment Variables
- ✅ **.gitignore configured**: Prevents committing secrets
- ✅ **No API keys in code**: Extension doesn't use external APIs
- ✅ **No credentials**: No authentication credentials stored

## What We DON'T Collect

- ❌ Your prompts
- ❌ Your conversations
- ❌ Usage statistics
- ❌ Personal information
- ❌ Browsing history
- ❌ Any data whatsoever

## Permissions Explained

### Required Permissions

**`storage`**
- **Why**: Store your prompts locally
- **Access**: Local device only
- **Data**: Your saved prompts, settings, categories

**`activeTab`**
- **Why**: Detect which LLM platform you're using
- **Access**: Only when you're on supported platforms
- **Data**: Current tab URL to identify platform

**`scripting`**
- **Why**: Inject the "Save Prompt" button and Quick Command overlay
- **Access**: Only on supported LLM platforms
- **Data**: None collected, only UI injection

### Host Permissions

**Why we need access to LLM platforms:**
- `claude.ai/*` - For Claude AI support
- `chat.openai.com/*`, `chatgpt.com/*` - For ChatGPT support
- `grok.x.com/*`, `grok.com/*` - For Grok support
- `perplexity.ai/*` - For Perplexity support
- `gemini.google.com/*` - For Gemini support
- `meta.ai/*` - For Meta AI support

**What we do with this access:**
- Detect input fields
- Inject capture button
- Enable Quick Command (`;;`) feature
- Nothing is transmitted off your device

## Third-Party Dependencies

All dependencies are open source and auditable:

### Runtime Dependencies
- `react`, `react-dom` - UI framework
- `dexie`, `dexie-react-hooks` - IndexedDB wrapper
- `fuse.js` - Fuzzy search
- `lucide-react` - Icons
- `clsx` - CSS utilities
- `nanoid` - ID generation

### Build Dependencies
- `vite` - Build tool
- `typescript` - Type checking
- `tailwindcss` - Styling

All dependencies are installed via npm and can be audited in `package.json`.

## Secure Development Practices

### Code Review
- All changes reviewed before merging
- Security-focused code reviews
- No credentials in code

### Build Process
- Clean builds from source
- No minification that hides code
- Source maps available for debugging

### Version Control
- `.gitignore` prevents committing secrets
- No sensitive data in git history
- Public repository for transparency

## User Security Best Practices

### Protect Your Data
1. **Export regularly**: Use Settings → Export to backup prompts
2. **Use Google Sheets backup**: Automatic backup option
3. **Don't share prompts with sensitive info**: Review before saving
4. **Keep Chrome updated**: Latest security patches

### Google Sheets Backup Security
1. **Don't share your Apps Script URL publicly**
2. **Set Sheet permissions carefully**: Who should view your prompts?
3. **Use a dedicated Google account**: For sensitive prompts
4. **Review Apps Script code**: Make sure you understand what it does
5. **Revoke access if needed**: Delete URL from extension settings

### Chrome Extension Security
1. **Only install from**: Chrome Web Store or verified source
2. **Review permissions**: Understand what the extension can access
3. **Keep updated**: Install updates when available
4. **Verify source**: Check GitHub for authenticity

## Vulnerability Disclosure Timeline

We follow responsible disclosure practices:

1. **Day 0**: Vulnerability reported to us
2. **Day 1-2**: We acknowledge and begin investigation
3. **Day 3-14**: We develop and test a fix
4. **Day 14-30**: We release a patched version
5. **Day 30+**: We publicly disclose details (with reporter credit)

## Security Updates

Security patches are released as soon as possible:
- **Critical**: Within 24-48 hours
- **High**: Within 1 week
- **Medium**: Within 2 weeks
- **Low**: Next regular release

## Compliance

### Privacy Regulations
- **GDPR compliant**: No personal data collection
- **CCPA compliant**: No data sales
- **No tracking**: No cookies, no analytics

### Chrome Web Store Policies
- Follows all Chrome Web Store policies
- Manifest V3 compliant
- Privacy policy published

## Security Audit History

- **2024-10-23**: Initial security review (v1.1.0)
  - No vulnerabilities found
  - All dependencies audited
  - Code reviewed for security issues

## Contact

For security concerns:
- **Email**: elizabeth.knopf@gmail.com
- **Subject**: "Security: Prompt Vault"
- **PGP Key**: [Coming soon]

For general questions:
- **GitHub Issues**: For non-security bugs
- **GitHub Discussions**: For questions and feature requests

## Credits

We appreciate responsible security researchers who help make Prompt Vault safer.

**Hall of Fame** (security researchers who responsibly disclosed vulnerabilities):
- None yet - you could be first!

---

**Last Updated**: 2024-10-23
**Version**: 1.1.0

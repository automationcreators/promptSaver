# Google Sheets Backup Integration

## Overview

This document describes the Google Sheets backup feature for Prompt Vault, allowing users to automatically sync their prompts to a Google Sheet as a backup.

## Features

### Phase 1: Manual Export (Already Implemented via JSON/CSV)
- ✅ Export all prompts to JSON
- ✅ Export all prompts to CSV
- Users can manually upload to Google Sheets

### Phase 2: One-Click Google Sheets Export (Recommended for MVP)
Simple integration without OAuth complexity:

1. **User sets up a Google Sheet**
   - Create a new Google Sheet
   - Make it accessible via link
   - Share with their email

2. **Generate a Google Apps Script Web App**
   - User creates a simple Apps Script in their sheet
   - Script receives prompt data via POST request
   - Writes to the sheet

3. **Extension sends data**
   - User pastes the Apps Script URL into settings
   - Click "Sync to Google Sheets"
   - Extension POSTs JSON data to the URL

**Pros:**
- No OAuth complexity
- No API keys required
- User controls their own sheet
- Easy to set up (5-10 minutes)
- Great learning opportunity

**Cons:**
- Manual setup required
- Not automatic (user must click sync)
- Requires some technical knowledge

### Phase 3: Full OAuth Integration (Future Enhancement)
Complete automation with Google OAuth:
- Automatic background sync
- Real-time updates
- No manual setup
- Requires Chrome Web Store API review

## Phase 2 Implementation Guide

### For Users: Setup Instructions

#### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Prompt Vault Backup"
4. Create headers in row 1:
   ```
   ID | Title | Content | Category | Tags | Platform | Created | Last Used | Usage Count | Is Favorite
   ```

#### Step 2: Create Apps Script

1. In your sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste this script:

```javascript
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const prompts = data.prompts;

    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Clear existing data (except header row)
    if (sheet.getLastRow() > 1) {
      sheet.deleteRows(2, sheet.getLastRow() - 1);
    }

    // Prepare rows of data
    const rows = prompts.map(prompt => [
      prompt.id,
      prompt.title,
      prompt.content,
      prompt.category || '',
      (prompt.tags || []).join(', '),
      prompt.platform || '',
      new Date(prompt.createdAt),
      prompt.lastUsed ? new Date(prompt.lastUsed) : '',
      prompt.usageCount || 0,
      prompt.isFavorite ? 'Yes' : 'No'
    ]);

    // Write all data at once (efficient)
    if (rows.length > 0) {
      sheet.getRange(2, 1, rows.length, 10).setValues(rows);
    }

    // Format the sheet
    sheet.autoResizeColumns(1, 10);
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold');

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: `Successfully synced ${prompts.length} prompts`,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name your project: "Prompt Vault Sync"

#### Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Settings:
   - **Description**: "Prompt Vault Sync Endpoint"
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the Web App URL** - you'll need this!
   - It looks like: `https://script.google.com/macros/s/ABC...XYZ/exec`
6. Click **Done**

#### Step 4: Configure Extension

1. Open Prompt Vault extension
2. Click Settings ⚙️
3. Go to "Backup" tab
4. Paste your Web App URL
5. Click "Test Connection"
6. If successful, click "Sync Now"

### Security Considerations

**Data Privacy:**
- User controls the Google Sheet (their data)
- Apps Script runs under user's Google account
- No third-party servers involved
- Extension only sends data to user's own script

**URL Security:**
- The Apps Script URL is long and random
- Not easily guessable
- User can revoke deployment anytime
- Can set "Who has access" to specific users

**Recommendations:**
- Use a dedicated Google account for sensitive prompts
- Don't share the Apps Script URL publicly
- Periodically check deployment access settings
- Set sheet to "View only" for other users

## Implementation in Extension

### 1. Add Settings Tab

Add a new "Backup" tab to Settings.tsx with:
- Input field for Google Apps Script URL
- "Test Connection" button
- "Sync Now" button
- Last sync timestamp display
- Sync status indicator

### 2. Create Sync Module

`src/utils/googleSheetsSync.ts`:

```typescript
export interface SyncConfig {
  webAppUrl: string;
  lastSync?: Date;
  enabled: boolean;
}

export interface SyncResult {
  success: boolean;
  message: string;
  promptCount?: number;
  error?: string;
}

export async function syncToGoogleSheets(
  webAppUrl: string,
  prompts: Prompt[]
): Promise<SyncResult> {
  try {
    const response = await fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors', // Important for Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompts }),
    });

    // Note: With no-cors, we can't read the response
    // We assume success if no error is thrown
    return {
      success: true,
      message: `Synced ${prompts.length} prompts`,
      promptCount: prompts.length,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Sync failed',
      error: error.message,
    };
  }
}

export async function testConnection(webAppUrl: string): Promise<boolean> {
  try {
    await fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompts: [], test: true }),
    });
    return true;
  } catch (error) {
    return false;
  }
}
```

### 3. Store Configuration

Use Chrome Storage to persist:
```typescript
interface StoredConfig {
  googleSheets: {
    webAppUrl: string;
    lastSync: string; // ISO date string
    enabled: boolean;
  };
}
```

### 4. Add UI Components

In Settings.tsx, add "Backup" tab with:

```tsx
{activeTab === 'backup' && (
  <div className="space-y-4">
    <div>
      <h3 className="font-semibold mb-2">Google Sheets Backup</h3>
      <p className="text-sm text-gray-600 mb-4">
        Sync your prompts to a Google Sheet for backup.
      </p>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Apps Script Web App URL
      </label>
      <input
        type="url"
        value={webAppUrl}
        onChange={(e) => setWebAppUrl(e.target.value)}
        placeholder="https://script.google.com/macros/s/.../exec"
        className="w-full px-3 py-2 border rounded-lg"
      />

      <div className="flex gap-2 mt-3">
        <button onClick={testConnection} className="btn-secondary">
          Test Connection
        </button>
        <button onClick={syncNow} className="btn-primary">
          Sync Now
        </button>
      </div>

      {lastSync && (
        <p className="text-xs text-gray-500 mt-2">
          Last synced: {formatDate(lastSync)}
        </p>
      )}
    </div>

    <div className="border-t pt-4">
      <a
        href="https://github.com/automationcreators/promptSaver/blob/main/GOOGLE_SHEETS_INTEGRATION.md"
        target="_blank"
        className="text-sm text-primary-600 hover:underline"
      >
        📖 Setup Instructions
      </a>
    </div>
  </div>
)}
```

## User Documentation

### Setup Guide

Create `docs/google-sheets-setup.md` with:
1. Screenshots for each step
2. Troubleshooting section
3. Video tutorial (optional)
4. FAQ

### Common Issues

**"Sync Failed" Error:**
- Check URL is correct
- Verify deployment is active
- Check "Who has access" is set to "Anyone"

**Data Not Appearing:**
- Refresh the Google Sheet
- Check Apps Script execution log
- Verify headers match

**Permission Issues:**
- Re-deploy with correct permissions
- Check Google account authorization

## Future Enhancements

### Automatic Sync
- Sync on every prompt save
- Background sync every X hours
- Conflict resolution

### Two-Way Sync
- Import changes from Sheet back to extension
- Edit prompts in Sheet, sync back
- Merge strategies

### Advanced Features
- Multiple sheet support (categories → different sheets)
- Sync filters (only favorites, specific categories)
- Scheduled backups
- Version history tracking
- Team collaboration features

### OAuth Integration
- Full Google Sheets API integration
- One-click setup
- Automatic authorization
- Better error handling
- Real-time sync status

## Testing Checklist

- [ ] Can paste and save Apps Script URL
- [ ] Test connection works
- [ ] Manual sync sends all prompts
- [ ] Google Sheet receives and formats data correctly
- [ ] Error handling works (invalid URL, network error)
- [ ] Last sync timestamp updates
- [ ] Settings persist after closing extension
- [ ] Works with empty prompt library
- [ ] Works with 100+ prompts
- [ ] Instructions are clear for non-technical users

## Rollout Plan

1. **v1.1.0**: Add basic UI and manual sync
2. **v1.2.0**: Add automatic sync option
3. **v1.3.0**: Add import from Sheets
4. **v2.0.0**: Full OAuth integration

## Support Resources

- Setup tutorial video
- Troubleshooting guide
- Community templates (Apps Script variations)
- GitHub discussions for Q&A

## Success Metrics

- % of users who enable Google Sheets backup
- Number of successful syncs per user
- Setup completion rate
- Support tickets related to setup

---

**Note**: This is a great learning feature because:
1. Users learn about Google Apps Script
2. Demonstrates API integration patterns
3. Shows how Chrome extensions interact with external services
4. Teaches about data backup strategies
5. Provides practical value (backup)

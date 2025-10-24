# Google Sheets Backup - Step-by-Step Setup

Follow this guide to set up automatic backup of your prompts to Google Sheets. Takes about 5-10 minutes.

## What You'll Need

- A Google account
- 5-10 minutes
- Your Prompt Vault extension installed

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it: `Prompt Vault Backup`

### Add Column Headers

In the first row, add these headers (A1 through J1):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| ID | Title | Content | Category | Tags | Platform | Created | Last Used | Usage Count | Favorite |

Your sheet should look like this:

```
A1: ID
B1: Title
C1: Content
D1: Category
E1: Tags
F1: Platform
G1: Created
H1: Last Used
I1: Usage Count
J1: Favorite
```

**Tip**: Make row 1 bold and add a light background color to distinguish it as the header row.

---

## Step 2: Create the Apps Script

### Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. You'll see a code editor with some default code
3. **Delete all the existing code** (select all and delete)

### Paste the Script

Copy and paste this entire script:

```javascript
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const prompts = data.prompts;

    // If this is just a test, return success
    if (data.test === true) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Connection test successful'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Clear existing data (except header row)
    if (sheet.getLastRow() > 1) {
      sheet.deleteRows(2, sheet.getLastRow() - 1);
    }

    // Prepare rows of data
    const rows = prompts.map(prompt => [
      prompt.id || '',
      prompt.title || '',
      prompt.content || '',
      prompt.category || '',
      (prompt.tags || []).join(', '),
      prompt.platform || '',
      prompt.createdAt ? new Date(prompt.createdAt) : '',
      prompt.lastUsed ? new Date(prompt.lastUsed) : '',
      prompt.usageCount || 0,
      prompt.isFavorite ? 'Yes' : 'No'
    ]);

    // Write all data at once (efficient)
    if (rows.length > 0) {
      sheet.getRange(2, 1, rows.length, 10).setValues(rows);
    }

    // Format the sheet nicely
    sheet.autoResizeColumns(1, 10);
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    sheet.getRange(1, 1, 1, 10).setBackground('#4285f4');
    sheet.getRange(1, 1, 1, 10).setFontColor('#ffffff');

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: `Successfully synced ${prompts.length} prompts`,
      timestamp: new Date().toISOString(),
      promptCount: prompts.length
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - you can run this in the editor to test
function test() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        prompts: [
          {
            id: 'test-1',
            title: 'Test Prompt',
            content: 'This is a test prompt',
            category: 'Testing',
            tags: ['test', 'demo'],
            platform: 'claude',
            createdAt: new Date().toISOString(),
            usageCount: 5,
            isFavorite: true
          }
        ],
        test: false
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

### Save the Script

1. Click the **Save** icon (💾) or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
2. Name your project: `Prompt Vault Sync`
3. Click **OK**

---

## Step 3: Deploy as Web App

### Start Deployment

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** ⚙️ next to "Select type"
3. Select **Web app**

### Configure Deployment

Fill in these settings:

- **Description**: `Prompt Vault Backup Endpoint`
- **Execute as**: **Me** (your email)
- **Who has access**: **Anyone**

⚠️ **Important**: Set "Who has access" to **Anyone**. This allows your browser extension to connect to the script. Your data is still secure because:
- The URL is long and random
- Only you know the URL
- The script only accepts POST requests with proper JSON
- You can revoke access anytime

### Deploy

1. Click **Deploy**
2. You may need to authorize the script:
   - Click **Authorize access**
   - Select your Google account
   - Click **Advanced** → **Go to Prompt Vault Sync (unsafe)**
   - Click **Allow**
3. Copy the **Web App URL**
   - It looks like: `https://script.google.com/macros/s/ABC...XYZ/exec`
   - Click the **Copy** icon 📋
4. Click **Done**

**Save this URL!** You'll need it in the next step.

---

## Step 4: Configure Prompt Vault Extension

### Open Settings

1. Click the **Prompt Vault** icon in your Chrome toolbar
2. Click the **Settings** icon ⚙️ (gear icon)
3. Click the **Backup** tab

### Add Your URL

1. **Paste** your Web App URL into the text field
2. Click **Test Connection**
3. Wait for the success message: ✅ "Connection successful! Ready to sync."

If you see an error:
- Check the URL is complete and correct
- Make sure "Who has access" is set to "Anyone" in your deployment
- Try redeploying the script

### First Sync

1. Click **Sync Now**
2. Wait for the sync to complete
3. Check your Google Sheet - your prompts should appear!

---

## Troubleshooting

### Error: "Connection failed"

**Solution**:
1. Go back to Apps Script
2. Click **Deploy** → **Manage deployments**
3. Click the **Edit** icon ✏️
4. Make sure "Who has access" is set to **Anyone**
5. Click **Deploy**
6. Copy the new URL and try again

### Error: "Invalid URL format"

**Solution**: Make sure you copied the complete URL from the deployment screen. It should:
- Start with `https://script.google.com/macros/s/`
- End with `/exec`
- Be one long continuous URL with no spaces

### Prompts Not Appearing in Sheet

**Solution**:
1. Check the Apps Script execution log:
   - Open Apps Script
   - Click **Executions** (clock icon on left)
   - Look for errors in recent executions
2. Try running the `test()` function in the script editor
3. Make sure your sheet has the correct headers in row 1

### "Script authorization required"

**Solution**:
1. This is normal on first deployment
2. Click **Authorize access**
3. Select your Google account
4. Click **Advanced** → **Go to Prompt Vault Sync (unsafe)**
5. Click **Allow**

The "unsafe" warning appears because this is your personal script, not a verified Google app. It's completely safe because you wrote the code yourself!

---

## Using Your Backup

### View Your Prompts

Your Google Sheet now contains all your prompts! You can:
- **Sort** by any column (click column header → Data → Sort sheet)
- **Filter** prompts (Data → Create a filter)
- **Search** using Ctrl+F / Cmd+F
- **Export** to Excel, CSV, or PDF (File → Download)

### Share With Team

To share your prompt library:
1. Click **Share** in the top-right of your sheet
2. Add team members' email addresses
3. Set permission level:
   - **Viewer**: Can see prompts only
   - **Commenter**: Can add comments
   - **Editor**: Can modify prompts (⚠️ be careful)

### Regular Syncing

Best practices:
- **Sync weekly** or after adding many new prompts
- **Export monthly** as a local backup (File → Download → CSV)
- **Check the sheet** after syncing to verify data

### Auto-Sync (Coming Soon!)

Future versions will include:
- Automatic sync on prompt save
- Scheduled daily/weekly syncs
- Two-way sync (edit in sheet, sync back to extension)

---

## Advanced Tips

### Multiple Sheets

Want to organize by category?

1. Duplicate your sheet setup
2. Create separate Apps Scripts for each
3. Deploy each with a different URL
4. Manually sync different categories to different sheets

### Version History

Google Sheets automatically tracks changes:
1. Click **File** → **Version history** → **See version history**
2. Browse previous versions
3. Restore if needed

### Conditional Formatting

Highlight favorite prompts:
1. Select the "Favorite" column (J)
2. Format → Conditional formatting
3. Format cells if: **Text is exactly** "Yes"
4. Choose a highlight color (e.g., yellow)

### Formulas

Add useful formulas in new columns:
- **Word count**: `=LEN(C2)-LEN(SUBSTITUTE(C2," ",""))+1`
- **Days since used**: `=TODAY()-H2`
- **Category count**: `=COUNTIF(D:D,D2)`

---

## Privacy & Security

### Your Data is Safe

- ✅ Prompts go directly to **your** Google Sheet
- ✅ **No third-party servers** involved
- ✅ **You control** who has access
- ✅ Script runs under **your Google account**
- ✅ Can revoke access **anytime**

### Revoking Access

To disable the sync:
1. Open Apps Script
2. Deploy → Manage deployments
3. Click **Archive** 🗄️ on your deployment
4. Confirm

Or simply delete the URL from Prompt Vault settings.

### Viewing Script Activity

Check what the script does:
1. Open Apps Script
2. Click **Executions** (clock icon)
3. See all sync attempts and results

---

## Next Steps

✅ Your backup is set up!

Now you can:
- **Sync regularly** to keep your backup current
- **Share** your prompt library with teammates
- **Export** your sheet for offline access
- **Analyze** your prompt usage patterns

Need help? [Open an issue on GitHub](https://github.com/elizabethknopf/promptSaver/issues)

---

## Quick Reference

### What You Need to Remember

1. **Your Web App URL**: Save this somewhere safe
2. **Sync regularly**: Weekly or after major changes
3. **Check your sheet**: Verify syncs worked correctly

### Common Actions

| Action | Steps |
|--------|-------|
| Sync now | Extension → Settings → Backup → Sync Now |
| View sheet | Open your Google Sheet |
| Update script | Apps Script → Edit code → Save → Deploy new version |
| Share sheet | Sheet → Share button → Add emails |
| Export data | Sheet → File → Download → CSV |

---

**That's it!** You now have automatic backup for your prompts. 🎉

Questions? Check the [full integration guide](./GOOGLE_SHEETS_INTEGRATION.md) or [ask on GitHub](https://github.com/elizabethknopf/promptSaver/discussions).

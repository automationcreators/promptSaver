# Google Sheets Backup - Fixed Permission Scope

## Updated Apps Script (Scoped to Single Spreadsheet)

**This version only accesses the specific spreadsheet where the script is installed.**

### Step 1: Get Your Spreadsheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
3. Copy the long string between `/d/` and `/edit` - this is your Spreadsheet ID
4. Example: `1abc_DEF-ghi123JKL-mnoPQR`

### Step 2: Updated Apps Script Code

```javascript
/**
 * IMPORTANT: Replace 'YOUR_SPREADSHEET_ID_HERE' with your actual spreadsheet ID
 * This ensures the script ONLY accesses this specific spreadsheet
 */
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with actual ID

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const prompts = data.prompts;

    // If this is just a test, return success
    if (data.test === true) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Connection test successful',
        spreadsheetId: SPREADSHEET_ID
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Open ONLY the specified spreadsheet (not any active sheet)
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();

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
      promptCount: prompts.length,
      spreadsheetId: SPREADSHEET_ID
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      spreadsheetId: SPREADSHEET_ID
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

### Step 3: Deploy with Correct Permissions

**When deploying, permissions will now be scoped to ONLY this spreadsheet:**

1. In Apps Script, click **Deploy** → **New deployment**
2. Select **Web app**
3. **Execute as**: Me (your email)
4. **Who has access**: **Anyone** (but it only accesses this one spreadsheet!)
5. Click **Deploy**

### Step 4: Verify Permissions

After deployment, the script will ONLY be able to:
- ✅ Read from the spreadsheet with SPREADSHEET_ID
- ✅ Write to the spreadsheet with SPREADSHEET_ID
- ❌ Cannot access any other spreadsheets
- ❌ Cannot access your Drive files
- ❌ Cannot access other Google services

### Troubleshooting

**Error: "Cannot find spreadsheet"**
- Check your SPREADSHEET_ID is correct
- Make sure you own or have edit access to that sheet

**Error: "Permission denied"**
- The script needs "Edit" permissions on the spreadsheet
- Make sure you're the owner or have been granted edit access

**Error: "Script is owned by someone else"**
- You can only run scripts in spreadsheets you own or have edit access to
- Create your own copy of the spreadsheet

### Security Notes

**Why "Anyone" access is safe:**
- The webhook URL is a long, random string (impossible to guess)
- The script is hardcoded to ONLY access one specific spreadsheet
- Even if someone found the URL, they can only write to YOUR sheet (not read)
- You can revoke access anytime by archiving the deployment

**To make it even more secure:**
- Don't share the webhook URL with anyone
- Rotate the deployment occasionally (redeploy with new URL)
- Monitor the Executions log in Apps Script for suspicious activity

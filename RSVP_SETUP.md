# RSVP → Google Sheet setup

The RSVP form posts each submission to a Google Apps Script web app, which
appends a row to your Google Sheet. One-time setup, ~5 minutes.

## 1. Create the sheet

1. Go to [sheets.new](https://sheets.new) and name it e.g. "Wedding RSVPs".

## 2. Add the script

1. From inside the sheet: **Extensions → Apps Script** (this links the script
   to the sheet, so no ID is needed).
2. Select all the sample code in `Code.gs`, replace it with this, then
   **Save** (disk icon):

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Attending', 'Guests', 'Guest name', 'Dietary', 'Message']);
    }
    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      d.at || new Date().toISOString(),
      d.name || '',
      d.attending || '',
      d.guests || '',
      d.guestName || '',
      d.dietary || '',
      d.message || ''
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## 3. Deploy as a web app

1. **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. **Deploy**. Approve the Google permission prompt (it's your own script).
5. Copy the **Web app URL** (ends in `/exec`).

## 4. Point the site at it

**Local dev** — create `.env.local` in the project root:

```
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
```

**Production (Vercel)** — Project → Settings → Environment Variables, add
`VITE_RSVP_ENDPOINT` with the same URL, then **redeploy** (Vite bakes env vars
in at build time, so a rebuild is required).

## Notes

- Test by submitting the form; a new row should appear in the sheet within a
  second or two.
- If you ever change the Apps Script code, use **Deploy → Manage deployments →
  edit → Version: New version** so the URL stays the same.
- The form shows "Thank you!" as long as the request is sent. Because the
  browser can't read Apps Script's cross-origin response, success is assumed on
  send — so verify a test row lands in the sheet after setup.

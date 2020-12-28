/*********************************************************************************************************
*
* Instructions
* 1. Create a new Google Sheet (or open your current sheet). 
* 2. Open Google Apps Script.
* 3. At top, click Resources -> Libraries -> add this library: M1lugvAXKKtUxn_vdAG9JZleS6DrsjUUV 
and select Version 8 (or latest version). Save.
* 4. Delete all text in the scripting window and paste all this code.
* 5. Run onOpen().
* 6. Then run parseObject() from the Code or from the spreadsheet.
* 7. Accept the permissions and after running, the spreadsheet should update.
*
*********************************************************************************************************/

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Functions')
  .addItem('Return 60M Beta', 'parseObject')
  .addToUi();
}

/*********************************************************************************************************
*
* Scrape web content.
* 
* @param {String} query The search string to look for
*
* @return {String} Desired web page content.
*
* References
* https://www.reddit.com/r/googlesheets/comments/kkjsup/importxml_formula_imported_content_is_empty/
*
*********************************************************************************************************/

function getData(query) {
  var url = query;  
  var fromText = '"beta60":';
  var toText = ',';
  
  var content = UrlFetchApp.fetch(url).getContentText();
  
  // For debugging, download source of URL to Google Drive since it's too much text for console log
  //  DriveApp.createFile("Website Data", content);
  
  var scraped = Parser
  .data(content)
  .setLog()
  .from(fromText)
  .to(toText)
  .build();
  console.log("scraped: " + scraped);
  return scraped;
}

/*********************************************************************************************************
*
* Print scraped web content to Google Sheet.
* 
*********************************************************************************************************/

function parseObject(){
  
  //  Declare variables
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var sheet = spreadsheet.getActiveSheet();
  var cell = sheet.getActiveCell();
  var site = "https://seekingalpha.com/symbol/AMZN/overview";
  var returnData = getData(site);
  
  //  Print returned value to screen
  ui.alert(returnData);  
  
//  Print to cell to the right of current cell, uncomment to use
  sheet.getRange(cell.getRow(), cell.getColumn() + 1).setValue(returnData);
}
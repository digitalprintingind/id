    
/******************************************************************************
 * This tutorial is based on the work of mckennapsean https://github.com/dwyl/html-form-send-email-via-google-script-without-server  *
 * But has been modified to show how you can use Apps Script to also make the form   *
 * All credit still goes to Sean for original tutorial and any issues/complaints/questions to me. *
 ******************************************************************************/

var TO_ADDRESS = "ridwanvs@gmail.com"; // change this ...

function doGet(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    MailApp.sendEmail(TO_ADDRESS, "Contact VCard",
                      JSON.stringify(e.parameters));
    return HtmlService.createTemplateFromFile('file:///D:/Pribadi/Vcard%20KIA/index.html#contacts')
                      .evaluate().setTitle('Contact vCard');
    record_data(e);
    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// new property service GLOBAL
var SCRIPT_PROP = PropertiesService.getScriptProperties();
// see: https://developers.google.com/apps-script/reference/properties/

/**
 * select the sheet
 */
function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}

/**
 * record_data inserts the data received from the html form submission
 * formObject is the data received from the form
 */
function record_data(formObject) {
  try {
    var doc     = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet   = doc.getSheetByName('responses'); // select the responses sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row     = [ new Date() ]; // first element in the row should always be a timestamp
    // loop through the header columns
    for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column
      if(headers[i].length > 0) {
        row.push(formObject[headers[i]]); // add data to row
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    
    MailApp.sendEmail(TO_ADDRESS, "E-mail Contact vCard",
                      JSON.stringify(formObject));
  }
  catch(error) {
    return error;
  }
  finally {
    return;
  }

}
# google-sheets-expiry-alert
function checkSheet() {
  var config = {
    sheetName: "EmployeeName", // название листа = имя сотрудника
    daysCol: 7,                // колонка с оставшимися днями
    nameCol: 2,                // колонка с именами экспатов
    email: "employee@example.com" // email сотрудника для уведомлений
  };

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(config.sheetName);
  if (!sheet) return;

  var lastRow = sheet.getLastRow();
  if (lastRow < 3) return;

  var names = sheet.getRange(3, config.nameCol, lastRow - 2).getValues();
  var days  = sheet.getRange(3, config.daysCol, lastRow - 2).getValues();

  var message = config.sheetName + 
    ", у данных сотрудников истекает срок действия визы:\n";
  var found = false;

  for (var i = 0; i < names.length; i++) {
    if (days[i][0] == 30 || days[i][0] == 15) {
      message += names[i][0] + " — осталось " + days[i][0] + " дней\n";
      found = true;
    }
  }

  if (found) {
    MailApp.sendEmail(config.email, "Напоминание о визах", message);
  }
}

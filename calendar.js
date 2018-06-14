window.onload = init;
// Today's year, month(0-11) and day(1-31)
var thisYear, thisMonth, thisDay, diaS;
 // The "onload" handler, run after the page is fully loaded.
function init() {
   setToday();
   document.getElementById("setDay").onchange  = diaS;
   document.getElementById("btnShow").onchange  =  diaS ;
   document.getElementById("btnToday").onclick = clear;
}
// Set thisYear, thisMonth, thisDay to Today
function clear(){ 
   var Table = document.getElementById("tableCalendar");
   Table.innerHTML = "";
   document.getElementById('setDay').value = ''
   setToday();
}

function setToday() {
   var now   = new Date();         // today
   thisDay   = now.getDate();      // 1-31
   thisMonth = now.getMonth();     // 0-11
   thisYear  = now.getFullYear();  // 4-digit year
 
   document.getElementById("selMonth").selectedIndex = thisMonth;
   document.getElementById("tfYear").value = thisYear;
   document.getElementById("tfDay").value = thisDay;
}
// Print the month-calendar for the given 4-digit year and month (0-11)
function printCalendar(year, month, iday, setdays) {
   var daysInMonth = getDaysInMonth(year, month + 1 );  // number of days
   var firstDayOfMonth = (new Date(year, month, 1)).getDay();  // 0-6 for Sun to Sat

   if(month > 11){
      month = 0;
      year++;
   }
cMonth = getMonthByName(month);

   var tableInnerHTML = "<caption class='heads'>"+ year +"</caption><caption>"+ cMonth +"</caption><tr><th class='heads'>Sun</th><th class='heads'>Mon</th><th class='heads'>Tue</th>"
         + "<th class='heads'>Wed</th><th class='heads'>Thu</th><th class='heads'>Fri</th><th class='heads'>Sat</th></tr>";
 
   var tdCellCount = 0;  // count of table's <td> cells
   var diasd = parseInt(iday);
   
   var setday = parseInt(setdays) -1;

    if ((isLeapYear(year)) && (month == 1)){
      daysInMonth = 29;
   } else if (month == 1){
      daysInMonth = 28;
   }
 
   if (firstDayOfMonth !== 0) {  // Leave these cells blank
      tableInnerHTML += "<tr><td colspan='" + firstDayOfMonth + "'></td>";
      tdCellCount = firstDayOfMonth;
   }

   for (var day = 1 ; day <= daysInMonth; day++) {
      if (tdCellCount % 7 === 0) {  // new table row
         tableInnerHTML += "<tr>";
   }
      if ((day < iday) || (day > diasd + setday )){
         tableInnerHTML += "<td class ='disa'>" + day + "</td>";
      } else if (day == 1){
         tableInnerHTML += "<td class='firstday'>" + day + "</td>";
      } else if ((tdCellCount % 7 === 0)  || (tdCellCount % 7 === 6)){
         tableInnerHTML += "<td class='weekend'>" + day + "</td>";
      } else  {
         tableInnerHTML += "<td class='week'>" + day + "</td>";
      } 

      tdCellCount++;
      if (tdCellCount % 7 === 0) {
         tableInnerHTML += "</tr>";
      }
   }
   // print the remaining cells and close the row
   var remainingCells = 7 - tdCellCount % 7;
   if (remainingCells < 7) {
      tableInnerHTML += "<td colspan='" + remainingCells + "'></td></tr>";
   }

   var node = document.createElement("TABLE"); 
   var  linebreak = document.createElement("p");

   node.innerHTML = tableInnerHTML; 
   linebreak.innerHTML = " <br>Continue...<br><br> ";

  if (diasd + setday >daysInMonth){
          
      day = diasd + setday - daysInMonth; 

      document.getElementById("tableCalendar").appendChild(node); 
      document.getElementById("tableCalendar").appendChild(linebreak);
      printCalendar(year, month + 1, 1,day);

      } else {
        document.getElementById("tableCalendar").appendChild(node);
      }

}
// The onchange handler for the SetDays
function diaS() {

   var month = document.getElementById("selMonth").selectedIndex;;
   var year  = document.getElementById("tfYear").value;
   var iday   = document.getElementById("tfDay").value;
   var setdays = document.getElementById("setDay").value;

   if ((isValidDays(iday)) && (isValidYear(year) && (isValidSetDays(setdays)))){
      printCalendar(year, month, iday, setdays);
   }
   
}
// Validate the year
function isValidYear(year) {
   if (year < 1 || year > 9999) {
      alert ("The year must be between 1 and 9999.");
      document.getElementById("tfYear").focus();
      return false;
   } else {
      return true;
   }
}
// Validate the Days
function isValidDays(iday) {
   var month = document.getElementById("selMonth").selectedIndex;
   var year  = document.getElementById("tfYear").value;
   console.log(getDaysInMonth(year, month + 1 ));
   if (iday < 1 || iday > getDaysInMonth(year, month + 1 )) {
      alert ("The day must be between 1 and end of the month.");
      document.getElementById("tfDay").focus();
      return false;
   } else {
      return true;
   }
}
// Validate the SetDays
function isValidSetDays(setdays){
      if (setdays < 1 || setdays > 9999) {
      alert ("The SetDays must be between 1 and 9999.");
      document.getElementById("setDay").focus();
      return false;
   } else {
      return true;
   }

}
//######################TABLE#########################################
// Return true if the given year is a leap year
function isLeapYear(year) {
   return ((year % 4) === 0 && ((year % 100) !== 0 || (year % 400) === 0));
}
 
// Return the number of days in the given month (1-12) of the year (xxxx)
function getDaysInMonth(year, month) {
   if (month === 2) {
      if (isLeapYear(year)) {
         return 29;
      } else {
         return 28;
      }
   } else if ((month === 1) || (month === 3) || (month === 5) || (month === 7)
       || (month === 8) || (month === 10) || (month === 12)) {
      return 31;
   } else {
      return 30;
   }
}

function getMonthByName(month){
   var cMonth;
   switch (month) {
       case 0:
           cMonth = "January";
           break;
       case 1:
           cMonth = "February";
           break;
       case 2:
           cMonth = "March";
           break;
       case 3:
           cMonth = "April";
           break;
       case 4:
           cMonth = "May";
           break;
       case 5:
           cMonth = "June";
           break;
       case 6:
           cMonth = "July";
           break;
       case 7:
           cMonth = "August";
           break;
       case 8:
           cMonth = "September";
           break;
       case 9:
           cMonth = "October";
           break;
       case 10:
           cMonth = "November";
           break;
       case 11:
           cMonth = "December";
      
   }
return cMonth;
}
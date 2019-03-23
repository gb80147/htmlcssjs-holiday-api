function momentGenerator() {

  var h1Text = $("h1");

  var mom = moment();
  mom.month(6);
  mom.date(18);

  var myBirthday = mom.format("DDD dddd ");

  h1Text.text(myBirthday);
}

//funzione che restituisce l'anno
function getYear(year) {

  var mom = moment();

  mom.year(year);

  var myYear = mom.format("YYYY")

  return myYear
}

//funzione che restituisce il nome del mese che vogliamo(in questo caso è 0(gennaio))
function getMonthName(month) {

  var mom = moment();
  mom.month(month);

  var monthName = mom.format("MMMM");

  return monthName;
}

//funzione che ci dice quanti giorni ha il mese selezionato
function getMonthDayCount(year, month) {

  var mom = moment();
  mom.month(month);
  mom.year(year);

  var dayCount = mom.daysInMonth();

  return dayCount;
}

//funzione che ritorna la data: "11 Gennaio 19"
function getHumanDate(year, month, day) {

  var mom = moment();
  mom.date(day);
  mom.month(month);
  mom.year(year);

  var date = mom.format("DD ddd");

  return date;
}

function getMachineDate(year, month, day) {

  var mom = moment();
  mom.date(day);
  mom.month(month);
  mom.year(year);

  var date = mom.format("YYYY-MM-DD");

  return date;
}

//funzione che attraverso l'API ottiene i giorni festivi
function printHolidays(year, month) {

  var output = {

    year: year,
    month: month
  }
  $.ajax({

    url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: output,
    success: function(data, state) {

      if(data.success){

        printAPI(data.response)
      }
    },
    error: function(request, state, error) {
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

//funzione che stampa i giorni festivi
function printAPI(holidays) {

  for (var i = 0; i < holidays.length; i++) {

    var holiday = holidays[i];
    var holidayName = holiday.name;
    var holidayDate = holiday.date;
    var divHoliday = $("div[data-date='" + holidayDate + "']");

    divHoliday.addClass("red");
    divHoliday.html(divHoliday.text() + "<div>" + holidayName + "</div>");
  }

}

//funzione che stampa i giorni del mese nell'ID
function printDays(year, month) {

  var dayCount = getMonthDayCount(year, month);
  var ulDayList = $("#daysList");

  var template = $("#dayTemplate").html();
  var compiled = Handlebars.compile(template);

  for(var day=1; day<=dayCount; day++){

    var tempDate = {

      date: getHumanDate(year, month, day),
      machineDate: getMachineDate(year, month, day)
    }

    var liDay = compiled(tempDate);
    ulDayList.append(liDay);
  }
}

//funzione che stampa il nome del mese nell'ID
function printTitle(year, month) {

  var h3Year = $("#year")
  var h1MonthName = $("#monthName");
  var h4DayCount = $("#dayCount");
  var myYear = getYear(year);
  var monthName = getMonthName(month);
  var dayCount = getMonthDayCount(year, month);

  h3Year.text(myYear);
  h1MonthName.text(monthName);
  h4DayCount.text("1-" + dayCount)
}

function init(){

  var year = 2018;
  var month = 0;

  printTitle(year, month);
  printDays(year, month);
  printHolidays(year, month);
}
$(document).ready(init);

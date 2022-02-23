console.log("This page works!");

// define any DOM element references 
var todaysDateEl = $("#currentDay"); //date and time are showing here
var todaysTimeEl = $("currentTime"); //created this in case i wanted to do time separate
var currMoment = moment(); //moment variable
var userInfoEl = $("#container"); //entire area where time displays
var timeOptionsEl = $("<tr>"); //create new elements
var timeList = $("#timeList"); // print to html
var userDataInputEl = $("input-group-append"); //user input

// moment function using moment api to display date and time
today = { text: moment().format("h:00 A"), hour: moment().hour() };
console.log(today);
$(todaysDateEl).text(currMoment.format("LLLL"));
console.log("time displays!!!");

// Time Table Container Section
// TODO Convert from military time to business hours
var timeOptions = [
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];
console.log("time options array", timeOptions);

//  for i create a new <tr> for each [index] time option (length) from timeOptions list above
function renderData() {
  for (var i = 0; i < timeOptions.length; i++) {
    console.log("timeOption length", timeOptions.length);
    console.log("loop running", timeOptions[i]);

    // create new element for rows in table
    var timeOption = timeOptions[i]; // get time at current index
    console.log(i, timeOption);

    var newRowEl = $("<tr>"); //create new <tr> entire element in html
    var timeColumnEl = $("<td>"); // create new <td>
    timeColumnEl.addClass("timestamp");
    var detailsInputEl = $("<td>"); //create new input
    var userDataInput = $("<input>");
    var itemButtonEl = $("<td>");
    itemButtonEl
      .addClass("input-group mb-3 btn btn-outline-secondary saveBtn")
      .text("save");
    userDataInput.addClass("input-group mb-3 text form-control button-addn2");

    newRowEl.append(timeColumnEl, detailsInputEl, itemButtonEl);

    timeColumnEl.text(timeOption);
    detailsInputEl.html(userDataInput);

    console.log(newRowEl);
    timeList.append(newRowEl);

    // with some formatting conditions for past, present, future events
    if (moment(currMoment).format("hh") > i) {
      newRowEl.addClass("past"); //gray
    } else if (moment(currMoment).format("hh") < i) {
      newRowEl.addClass("future"); //red
    } else if (moment(currMoment).format("hh") == i){
      newRowEl.addClass("present"); //green
    };

    console.log("moment" , moment(currMoment).format("hh")); 
    console.log("hour block", timeOption.split(" ")[0]); 


    //retrieve the store value from local storage into the input element. 
    var storedVal = localStorage.getItem(timeOption); 
    console.log("LS Val", storedVal, "for ", timeOption); 
    //set the value for input element in case if the 
    userDataInput.val(storedVal); 

  }
}

renderData();


// store to local storage
$(".saveBtn").click(function () {
  //alert("Clicked the save button", $(this));

  //grab the hour -- takes place of key in the localstorage 
  var hourEL = $(this).parent("tr").find(".timestamp").text();
  console.log(hourEL);

  //grab the description -- takes place of value in the localstorage 
  var discEl = $(this).parent("tr").find("input").val();
  console.log(discEl);

  //Save it to localStorage.setItem(key, value)
  localStorage.setItem(hourEL, discEl);
});


// date display at the top of the calendar
var today = moment()
$("#currentDay").text(today.format("dddd, MMMM Do"));

// variable to store timeblocks
var timeBlocks = [
    {
        id: "0",
        time: "09",
        hour: "9 AM",
        text: ""
    },
    {
        id: "1",
        time: "10",
        hour: "10 AM",
        text: ""
    },
    {
        id: "2",
        time: "11",
        hour: "11 AM",
        text: ""
    },
    {
        id: "3",
        time: "12",
        hour: "12 PM",
        text: ""
    },
    {
        id: "4",
        time: "13",
        hour: "1 PM",
        text: ""
    },
    {
        id: "5",
        time: "14",
        hour: "2 PM",
        text: ""
    },
    {
        id: "6",
        time: "15",
        hour: "3 PM",
        text: ""
    },
    {
        id: "7",
        time: "16",
        hour: "4 PM",
        text: ""
    },
    {
        id: "8",
        time: "17",
        hour: "5 PM",
        text: ""
    },
]

// saves text data to local storage
function saveTextData() {
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
}
// updating text data
function updateTextData() {
    timeBlocks.forEach(function (currentHour) {
        $(`#${currentHour.id}`).val(currentHour.text);
    })
}
// displays the text
function displayTextData() {
    var storedTextData = JSON.parse(localStorage.getItem("timeBlocks"))
    if (storedTextData) {
        timeBlocks = storedTextData
    }
    saveTextData()
    updateTextData()
}

// displays timeblocks
timeBlocks.forEach( function(currentHour) {
    // creating row
    var row = $("<form>").attr({"class":"row"});
    $(".container").append(row)

    // adding time area
    var time = $("<div>")
        .attr({"class":"hour col-md-1 text-right pt-2 pr-2"})
        .text(`${currentHour.hour}`)
    row.append(time)

    // adding text area
    var text = $("<div>").attr({"class": "description col-md-10"})
    var textArea = $("<textarea>").attr({"id": currentHour.id})
    text.append(textArea)
    row.append(text)
    
    // setting color of timeblock (indication of past, present, and future)
    if (currentHour.time < moment().format("HH")) {
        textArea.attr({"class": "past"})
    } else if (currentHour.time === moment().format("HH")) {
        textArea.attr({"class": "present"})
    } else if (currentHour.time > moment().format("HH")) {
        textArea.attr({"class": "future"})
    }

    // adding save button
    var saveButton = $("<button>").attr({"class": "saveBtn col-md-1"})
    // adding button icon from fontawesome
    var iEl = $('<i class="fas fa-save"></i>')
    saveButton.append(iEl)
    row.append(saveButton)

})

displayTextData()

// clicking save button to save data
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    // returns value of id attribute which is used as the index
    var savedDataIndex = $(this).siblings(".description").children(".future").attr("id")
    // replacing/updating text to the row that was "clicked" (only with class name "future")
    timeBlocks[savedDataIndex].text = $(this).siblings(".description").children(".future").val()
    saveTextData()
    updateTextData()
})
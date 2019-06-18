var today = new Date();

function ClosedDays(date) {
    var day = date.getDay();
    //return [day != [disableddates]];

    var m = date.getMonth();
    var d = date.getDate();
    var y = date.getFullYear();

    // First convert the date in to the mm-dd-yyyy format
    // Take note that we will increment the month count by 1
    //var currentdate = (m + 1) + '-' + d + '-' + y;

    // We will now check if the date belongs to disableddates array
    for (var i = 0; i < (closedDays.length); i++) {

        // Now check if the current date is in disabled dates array.
        if ($.inArray(day, closedDays) != -1) {
            return [false];
        }
        else {
            return OwnBooking(date);
        }
    }

    return OwnBooking(date);
}

function OwnBooking(date) {
    var m = date.getMonth();
    var d = date.getDate();
    var y = date.getFullYear();

    // First convert the date in to the mm-dd-yyyy format 
    // Take note that we will increment the month count by 1 
    var currentdate = (m + 1) + '-' + d + '-' + y;

    // We will now check if the date belongs to disableddates array 
    for (var i = 0; i < ownBooking.length; i++) {

        // Now check if the current date is in disabled dates array. 
        if ($.inArray(currentdate, ownBooking) != -1) {
            return [true, 'own-booking'];
        }
        else {
            return Booking(date);
        }
    }

    return Booking(date);
}

function Booking(date) {
    //Times;

    var m = date.getMonth();
    var d = date.getDate();
    var y = date.getFullYear();

    // First convert the date in to the mm-dd-yyyy format 
    // Take note that we will increment the month count by 1 
    var currentdate = (m + 1) + '-' + d + '-' + y;

    // We will now check if the date belongs to disableddates array 
    for (var i = 0; i < booking.length; i++) {

        // Now check if the current date is in disabled dates array. 
        if ($.inArray(currentdate, booking) != -1) {
            return [false];
        }
        else {
            return multiSelect(date);
        }
    }

    return multiSelect(date);
}

//https://stackoverflow.com/questions/1452066/jquery-ui-datepicker-multiple-date-selections
var dates = new Array();

function multiSelect(date) {
    var year = date.getFullYear();
    // months and days are inserted into the array in the form, e.g "01/01/2009", but here the format is "1/1/2009"
    var month = padNumber(date.getMonth() + 1);
    var day = padNumber(date.getDate());
    // This depends on the datepicker's date format
    var dateString = month + "/" + day + "/" + year;

    var gotDate = jQuery.inArray(dateString, dates);
    if (gotDate >= 0) {
        // Enable date so it can be deselected. Set style to be highlighted
        return [true, "ui-state-highlight"];
    }
    // Dates not in the array are left enabled, but with no extra style
    return [true, ""];
}

function addDate(date) {
    if (jQuery.inArray(date, dates) < 0)
        dates.push(date);
}

function removeDate(index) {
    dates.splice(index, 1);
}

// Adds a date if we don't have it yet, else remove it
function addOrRemoveDate(date) {
    var index = jQuery.inArray(date, dates);
    if (index >= 0)
        removeDate(index);
    else
        addDate(date);
}

// Takes a 1-digit number and inserts a zero before it
function padNumber(number) {
    var ret = new String(number);
    if (ret.length == 1)
        ret = "0" + ret;
    return ret;
}

if ($("#Dates").val().length > 0) {
    dates = $("#Dates").val().split(',');
}

jQuery("#datepicker").datepicker({
    dayNamesMin: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
    firstDay: 1,
    monthNames: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
    nextText: "Næste",
    prevText: "Forrige",
    minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    onSelect: function (dateText, inst) {
        addOrRemoveDate(dateText);
        $("#Dates").val(dates);
    },
    beforeShowDay: ClosedDays,
});
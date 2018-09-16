//----------------------------------------------------------------------------------------
// SONGSTER API
//----------------------------------------------------------------------------------------

// hide the table
$("#artist-search").hide();

// take in the form input value when it is submitted and run it through the getTabs function

$("#tab-form").on("submit", function(event) {
    event.preventDefault();
    var userInput = $("#tab-search").val().trim();
    $("tbody").empty();
    getTabs(userInput);
    $("#artist-search").fadeIn(2000);
    document.getElementById("tab-form").reset();
});

// function to fill up the data table from the getTabs resulting children

function fillTable(child) {

    // console log entire child object
    console.log(child);

    // set variable to hold chords icon
    var chords = "";

    // chords if true or if false
    if (child.chordsPresent === true) {
        chords = "✅";
    } else {
        chords = "❌";
    }
    
    // create an empty variable to hold tab links
    var types = [];
    var guitarTabUrl = "";
    var bassTabUrl = "";
    var playerTabUrl = "";
    var chordsTabUrl = "";

    // for teach item in the tab types array do this stuff
    child.tabTypes.forEach(function(type) {

        // if there is a guitar tab...
        if (type === "TEXT_GUITAR_TAB") {
            guitarTabUrl = "<a href='http://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + child.title + "&a=" + child.artist.name + "&track=guitar&inst=guitar'> Guitar Tab</a>";
            types.push(guitarTabUrl);

        // if there is a bass tab...            
        } else if (type === "TEXT_BASS_TAB") {
            bassTabUrl = "<a href='http://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + child.title + "&a=" + child.artist.name + "&track=bass&inst=bass'> Bass Tab</a>";
            types.push(bassTabUrl);
        }

        // if there is a player tab...
        if (type === "PLAYER") {
            playerTabUrl = "<a href='http://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + child.title + "&a=" + child.artist.name + "&track=player'> Tab Player</a>";
            types.push(playerTabUrl);
        }
        if (type === "CHORDS") {
            chordsTabUrl = "<a href='https://www.songsterr.com/a/wsa/" + child.artist.name + "-" + child.title + "-chords-s" + child.id + "'> View Chords</a>";
            types.push(chordsTabUrl);
        }
    })

    // fill table with child data
    $("tbody").append(
        "<tr>"
        + "<td>" + child.title + "</td>"
        + "<td>" + types + "</td>"
        + "<td>" + chords + chordsTabUrl + "</td>"
        + "</tr>"
    )
};

// function to get list of tabs via the songsterr.com API

function getTabs(userInput) {

    userInput = userInput.replace(/\s/g, "&");

    var queryURL = "http://www.songsterr.com/a/ra/songs/byartists.json?artists=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(songsterr) {
        songsterr.forEach(function(child) {
            fillTable(child);
        })

        $('#artist-search').DataTable();
    })
};
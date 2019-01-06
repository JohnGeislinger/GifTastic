let topics = ["samuel l jackson", "nicholas cage", "john travolta", "dave chappelle", "melissa mccarthy", "leonardo dicaprio", "nick offerman", "chris pratt", "tina fey", "tracy morgan"];



function buttonGenerator() {
    $("#buttonArea").empty();

    for(i = 0; i < topics.length; i++) {
        button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning m-1 border border-dark shadow search").attr("data-name", topics[i]);
        $("#buttonArea").append(button);
    };
};

$(document).on("click", ".search", function() {
    let queryResult = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryResult + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        let results = response.data;
        console.log(results);

        for (let i = 0; i < results.length; i++) {
            // Create a div for the gif
            let gifDiv = $('<div class="float-left">');

            // Create a paragraph for the result item's rating
            let p = $("<p>").text("Rating: " + results[i].rating);

            // Variable for the animated source result
            let gif = results[i].images.fixed_height.url;

            // Variagble for the still source result
            let gifPause = results[i].images.fixed_height_still.url;

            // Variable to store all the results and link all the attributes to the gif
            let gifImage = $(`<img class="img-fluid rounded p-1 gif" style="width: 100%;" src="${gifPause}" data-still="${gifPause}" data-animate="${gif}" data-state="still"></img>`);

            // Append the paragraph and image to the newly created div
            gifDiv.append(gifImage);
            gifDiv.append(p);

            // Prepend the new div to the gifArea in the HTML
            $("#gifArea").prepend(gifDiv);
        }
    })
});

$(document).on("click", ".gif", function(event) {
    event.preventDefault();

    let state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#search-button").on("click", function(event) {
    event.preventDefault();

    newTopic = $("#topic-input").val().trim();
    topics.push(newTopic);
    console.log(topics);
    buttonGenerator();
});

buttonGenerator();
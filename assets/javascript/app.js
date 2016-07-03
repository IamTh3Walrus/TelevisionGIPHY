$(document).ready(function() {
    populateButtons(tvShows, 'televisionButton', '#televisionButtons');

});

var tvShows = ["The Dick Van Dyke Show", "Leave it to Beaver", "Cheers", "Diff'rent Strokes", "The Mary Tyler Moore Show", "Mork and Mindy", "Welcome Back, Kotter", "Adventures of Superman", "Dragnet", "Get Smart"];

function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}

$(document).on('click', '.televisionButton', function() {
    $('#shows').empty();
    $('.televisionButton').removeClass('active');
    $(this).addClass('active');

    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type +
        "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({ url: queryURL, method: 'GET' })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var televisionDiv = $('<div class="television-item">')

                var rating = results[i].rating;

                var p = $('<p>').text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var showImage = $('<img>');
                showImage.attr('src', still);
                showImage.attr('data-still', still);
                showImage.attr('data-animate', animated);
                showImage.attr('data-state', 'still')
                showImage.addClass('showImage');

                televisionDiv.append(p)
                televisionDiv.append(showImage)

                $('#shows').append(televisionDiv);
            }

        });
});

$(document).on('click', '.showImage', function() {
    var state = $(this).attr('data-state');

    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addShow').on('click', function() {
    var newShow = $('input').eq(0).val();

    if (newShow.length > 2) {
        tvShows.push(newShow);
    }

    populateButtons(tvShows, 'televisionButton', '#televisionButtons');

    return false;
});

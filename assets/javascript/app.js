$('button').on('click', function() {
	var television = $(this).data('television');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + television + 
	"&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response){


			var results = response.data;
			for (var i=0; i< results.length; i++){
				if(results[i].rating == "r" || results[i].rating == "pg-13"){

				}else{
					var televisionDiv = $('<div>');
					var p = $('<p>').text("Rating: " + results[i].rating);
					var televisionImage = $('<img>');
					televisionImage.attr('src', results[i].images.fixed_height.url);
					televisionDiv.append(p);
					televisionDiv.append(televisionImage);
					$('#gifsDumpArea').prepend(televisionDiv);
				}

					
			}

		});

});
$(document).on('ready', function(){
	var rowString = $('#movie-row').html();
	var buildResultRow = _.template(rowString);
	var app = Backbone.Router.extend({
		routes :  {
			"" : 'home',
			'home' : 'home',
			'search/:query' : 'search'
		},
		home : function(){
			console.log('home');
			$('#search').hide();
		},
		search: function(query){
			console.log('search'+query);
			$.get('http://omdbapi.com/?',{s:query},onResultsReceived,'JSON');
			function onResultsReceived(movieResults){

				console.log(movieResults);
				var newMovieResults = movieResults.Search;
				$('#search').show();
				//$('.results').append("<span>Results(click to add to watchlist)</span>");
				for(var i=0;i<newMovieResults.length;i++){
					var movie = newMovieResults[i]; 
					var row = buildResultRow(movie);

					$('.results').append(row);
				}
				$('.movie-row').click(addToWatch);
 				console.log("movie-row clicked");
				function addToWatch(e) {
				$('.watchlist').append(this);
				}			
			}
		}

	});	
	var myRouter = new app();
	Backbone.history.start();

 	$('button').click(inputform);
 	function inputform(event) {
		event.preventDefault();

    	var goToPage = "search/" + $('#input-box').val();
    	myRouter.navigate(goToPage, {trigger: true});
    	//$('#search').html("<span>Results(LOADING)</span>");
	}

});	

 
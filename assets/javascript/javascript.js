$(document).ready(function() { 
    
  var topics = ["nature", "basketball", "hedgehogs", "france", "laugh", "mountains"];

  function displayGifInfo(){

  	// Reference the button that was clicked and pull information from there
  	var searchTerm = $(this).attr("topic-name");
  	// Limiting the search to 10 GIFs
  	var limit = 10;
  	// Generating the queryURL to input into the AJAX call
  	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +  searchTerm + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";

  	// Debugging
  	// console.log("queryURL:", queryURL);

  	// Creating an AJAX call for the specific topic being clicked
  	$.ajax({
  		url: queryURL,
  		method: "GET"
  	}).done(function(response) {

  		// Debugging
  		// console.log("response:", response);

      var results = response.data;

  		for (var i = 0;i < results.length; i++) {
    		// Creating the div that will hold the generated GIFs
    		var gifDiv = $('<div class = "gifDiv">'); 
    		// Create a variable to store the GIF file (we want the fixed height version)... could also do 
    		// var gifURL = results[i].images.fixed_height.url;
    		
        // Create an image tag to hold the GIF files and attach attributes to
        var gifImg = $('<img class="gif">');
        gifImg.attr("src", results[i].images.fixed_height_still.url)
        gifImg.attr("data-state", "still")
        gifImg.attr("data-animate", results[i].images.fixed_height.url)
        gifImg.attr("data-still", results[i].images.fixed_height_still.url)

    		// Create a variable to store the rating data
    		var rating = results[i].rating;
    		// Create a "p" to store text from rating
    		var p = $("<p>");
    		// Put information and images where they need to go
    		p.text("Rating: " + rating);
    		// Append the elements to where they need to go on the page
    		gifDiv.append(gifImg);
    		gifDiv.append(p);

        // Debugging
        // console.log("gifDiv", gifDiv)
        // console.log("gifImg", gifImg)

        $("#gifHolder").prepend(gifDiv)
  		};

      $(".gif").on("click", function(event) {
          event.preventDefault();
          console.log($(".gif"))
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");

        }
      });
  	});
  };

  
  

  // On start click, the queryURL will be constructed using user inputs
  function createButtons (){

    $("#btnHolder").empty();

  	// Looping through the GIF topics
  	for (var i=0; i<topics.length; i++) {

  		// Using jQuery to create a button for string in the "topics" array
  		var $gifBtn = $('<button>');
  		// Adding class "topic" to each button
  		$gifBtn.attr("class", "topic btn btn-primary");
  		// Adding attribute to distinguish one button from another
  		$gifBtn.attr("topic-name", topics[i])
  		// Putting "topic[i]" text inside the generated button
  		$gifBtn.text(topics[i])
  		// Add the button to the page within the "btnHolder"
  		$("#btnHolder").append($gifBtn);

  		// Debugging
  		console.log($gifBtn, "gif button");

  	};
  };

  // if ($("#topic-input").val() !=="") {
    $("#add-topic").on("click", function(event) {
          event.preventDefault();

          // This line grabs the input from the textbox
          var topic = $("#topic-input").val().trim();

          // Adding movie from the textbox to our array
          topics.push(topic);
          console.log("here")

          $("#topic-input").val("")

          // Calling createButtons which handles the processing of our movie array
          createButtons();
        });

    // } 
    // else {
    //   alert("Please add a topic");
    // }

  $(document).on("click", ".topic", displayGifInfo)

 	createButtons();
 
});

    
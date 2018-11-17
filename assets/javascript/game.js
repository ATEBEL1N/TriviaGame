
$(document).ready(function(){

var winCounter = 0;
var lossCounter = 0;


var game = {
	
	time:25,

 	trivia: {
 		q1: {question: "Beers are broken into two basic types, of which sub-types are created.  What are the two basic types of beer?", 
 			a1: "Ales and Lagers", 
 			a2: "Fermented and non-fermented", 
 			a3: "Saison and Ales", 
 			a4: "Soured and Un-Soured"
 		}, 
		
		q2: {question: "The amount of alcohol in beers sold or created and sold in the United States is measured using what method??", 
			a1:"ABP - Alcohol by percentage", 
			a2:"ABV - Alcohol by volume", 
			a3:"Proof", 
			a4:"ABW - Alcohol by weight"
		}, 

		q3: {question: "A S.M.A.S.H. beer stands for which of the following?", 
			a1:"A partially sour mashed beer", 
			a2:"A single malt and single hop beer", 
			a3:"A salt-mashed and un-hopped style beer", 
			a4:"A beer in which the hops and grains are smashed using a stone"
		}, 
		
		q4: {question: "Commercial beer production volumes are measured in barrels.  A full barrel of beer has 31 gallons of beer in it.  How many 12 ounce bottles are in 1 full barrel of beer?  (Round it).", 
			a1:"24", 
			a2:"248", 
			a3:"525", 
			a4:"661"
		}, 
	}, 
	

// FUNCTION DECLARATIONS
// ==============================================================================		
    start: function(){
	    var counter = setInterval(game.count, 1000);
	    if (game.time < 0) {
			game.results();
			clearInterval(counter);
		
		}
	    //set timeout here?
	},
	stop: function() {
		var currentTime = game.timeConverter(game.time);
		if (game.time < 0) {
			game.results();
			clearInterval(currentTime);
			//result page shows
		}
		// else{
		// 	clearInterval();
		// }
		},
	count: function(){
        game.time--;
        currentTime = game.timeConverter(game.time);
        $("#timer").html("<h3>" + currentTime + "</h3>");
        //console.log(currentTime);
        if (game.time < 0) {
			game.results();
			clearInterval(currentTime);
		}
    },//end count

	timeConverter: function(t){
	    //takes the current time in seconds and converts it to minutes and seconds (mm:ss).
	    var minutes = Math.floor(t/60);
	    var seconds = t - (minutes * 60);
	    if (seconds < 10){
	        seconds = "0" + seconds;
	    }
	    if (minutes === 0){
	        minutes = "00";
	    } else if (minutes < 10){
	        minutes = "0" + minutes;
	    }
	
	    return minutes + ":" + seconds;
	}, //end timeConverter

	displayFirstQuestion: function(){
		$("#question").html("<h2>" + game.trivia.q1.question + "</h2>");
		$("#a1").html("<p id='a1'>" + game.trivia.q1.a1 + "</p>");
		$("#a2").html("<p id='a2'>" + game.trivia.q1.a2 + "</p>");
		$("#a3").html("<p id='a3'>" + game.trivia.q1.a3 + "</p>");
		$("#a4").html("<p id='a4'>" + game.trivia.q1.a4 + "</p>");

		$("#a1").click(function() {
			console.log("Clicked a1");
			$("#a1").data('clicked', true);
			winCounter++;
			game.nextQuestion();
			
		});
		
		$("#a2, #a3, #a4").click(function() {
			if(jQuery("#a1").data('clicked')){
				game.nextQuestion();
				winCounter++;
			}
			else{
	
				lossCounter++;
				game.nextQuestion();
			}
		});
	
	},

	nextQuestion: function(){
		$("#a1").data('clicked', null);
		$("#question").html("<h2>" + game.trivia.q2.question + "</h2>");
		$("#a1").html("<p id='a1'>" + game.trivia.q2.a1 + "</p>");
		$("#a2").html("<p id='a2'>" + game.trivia.q2.a2 + "</p>");
		$("#a3").html("<p id='a3'>" + game.trivia.q2.a3 + "</p>");
		$("#a4").html("<p id='a4'>" + game.trivia.q2.a4 + "</p>");
		$("#a2").click(function() {
		
			$("#a2").data('clicked', true);

			winCounter++;

			game.thirdQuestion();

		});

		$("#a1, #a2, #a4").click(function() {

			lossCounter++;
	
			game.thirdQuestion();
		});
	 }, 

	thirdQuestion: function(){
		$("#a3").data('clicked', null);
		$("#question").html("<h2>" + game.trivia.q3.question + "</h2>");
		$("#a1").html("<p id='a1'>" + game.trivia.q3.a1 + "</p>");
		$("#a2").html("<p id='a2'>" + game.trivia.q3.a2 + "</p>");
		$("#a3").html("<p id='a3'>" + game.trivia.q3.a3 + "</p>");
		$("#a4").html("<p id='a4'>" + game.trivia.q3.a4 + "</p>");
	
	
		$("#a2").click(function() {
			console.log("Clicked a2");
			$("#a2").data('clicked', true);
		
			winCounter++;
		
			game.lastQuestion();
			
		});
	
		$("#a1, #a3, #a4").click(function() {

			lossCounter++;
			
			game.lastQuestion();
		});
	 }, 

	 lastQuestion: function(){
		$("#a2").data('clicked', null);
		$("#question").html("<h2>" + game.trivia.q4.question + "</h2>");
		$("#a1").html("<p id='a1'>" + game.trivia.q4.a1 + "</p>");
		$("#a2").html("<p id='a2'>" + game.trivia.q4.a2 + "</p>");
		$("#a3").html("<p id='a3'>" + game.trivia.q4.a3 + "</p>");
		$("#a4").html("<p id='a4'>" + game.trivia.q4.a4 + "</p>");
	
		$("#a4").click(function() {
			console.log("Clicked a4");
			$("#a4").data('clicked', true);
		
			winCounter++;
			game.results();

		});
	
		$("#a1, #a2, #3").click(function() {


			lossCounter++;

			game.results();
		});
	 },

	results: function(){
		$("#timer").html(null);
		$("#question").html("<h2> Game Over! </h2>");
		$("#a1").html("<p id='a1'> Correct answers: " + winCounter + "</p>");
		$("#a2").html("<p id='a2'> Incorrect answers: " + lossCounter + "</p>");
		$("#a3").html("<p> To play again, refresh page. </p>");
		$("#a4").html(null);
		game.stop();
	},

}; //game
// FUNCTION CALLS
	// ==============================================================================

	$("#timer").on('click', game.start());
	$("#question").on('click', game.displayFirstQuestion());
	

}); 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("bt" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("What is the incorrect finger position for typing the letters 'ASDF' on the keyboard?", ["Index fingers", "Pinky fingers"," Middle fingers", "Thumb fingers"], "Thumb fingers"),

    new Question("Which finger should be used to press the letter 'J' on the keyboard?", ["Index finger", "Pinky finger", "Middle finger", "Ring finger"], "Middle finger"),
    

    new Question("How many fingers are typically used in touch typing?", ["6", "4","10", "8"], "10"),
    

    new Question("What are the recommended techniques for typing capital letters?", ["Caps lock", "Hold shift","Use opposite hand for shift", "None of the above"], "Use opposite hand for shift"),

    new Question("Thumb finger is used to click which button?", ["Caps lock", "R,F,V", "backspace", "SpaceBar"], "SpaceBar"),

    new Question("What does the term 'WPM' stand for in touch typing?", ["Words Per Minute", "Word Processing Machine","Written Paragraph Method", "Word Position Mastery"], "Words Per Minute"),

    new Question("How can you locate the home row position without looking at the keyboard?", ["Practice typing with eyes closeed", "Use tactile indicators","Memorize key position", "All of the above"], "All of the above"),

    new Question("What is the primary purpose of the 'Shift' key in touch typing?", ["To switch between uppercase and lowercase letters", "To delete characters","To move the cursor to the beginning of a line", "None of the above"], "To switch between uppercase and lowercase letters"),

    new Question("What should be the position of your wrists while touch typing?", ["Resting flat on the desk", " Elevated above the keyboard","resting lightly above the keys", "Pressing firmly against the keys"], "resting lightly above the keys"),

    new Question("What is the recommended finger placement for typing the letter 'Q' on the keyboard??", ["Index finger", "Middle finger","Pinky finger", "Thumb"], "Pinky finger"),
        

];


var quiz = new Quiz(questions);


populate();
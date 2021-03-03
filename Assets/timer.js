//global variables
var remainingSeconds = 60;
var currentQuestionIndex = 0;
var correctAnswerCount = 0;
var wrongAnswerCount = 0;
var questionRemainingCount = 10;
var timer;

// retrieving our score and converting it back into an array

var pastScore = JSON.parse(localStorage.getItem("scores"));

var navigationDivEl = document.querySelector('#stats');
var timerLabelEl = document.querySelector("#timerlabel");
var timerCountSpanEl = document.querySelector("#timerCount");
var linkToLeaderBoardBtnEl = document.querySelector('#viewLeaderBtn');
var correctCountSpanEl = document.querySelector("#correctCount");
var wrongCountSpanEl = document.querySelector("#wrongCount");
var questionsRemainingCountSpanEl = document.querySelector("#questionsRemainingCount");

var mainDivEl = document.querySelector("#main");


//this objects stores the details the question for the quiz
var questionsObjects = [

    {
        question: "Which of the following function of String object combines the text of two strings and returns a new string?",
        choices: [
            "add()",
            "merge()",
            "concat()",
            "append()",
        ],
        correctAnswer: 3,
    },
    //Question 2 
    {
        question: "Which of the following function of Array object removes the last element from an array and returns that element?",
        choices: [
            "pop()",
            "push()",
            "join()",
            "map()",
        ],
        correctAnswer: 1,

    },

    //Question 3 

    {
        question: "All user-defined objects and built-in objects are descendants of an object called Object?",
        choices: [
            "true",
            "false",
            "bananas",
            "both",
        ],
    correctAnswer: 1,

    },

    //Question 4

    {
        question: "Which of the following function of Array object represents the source code of an object?",
        choices: [
            "toSource()",
            "splice()",
            "toString()",
            "unshift()",
        ],
        correctAnswer: 1,

    },

    //Question 5 

    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: [
            "<src>",
            "<javascript>",
            "<js>",
            "<script>",
        ],
        correctAnswer: 4,

    },

    //Question 6 

    {
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        choices: [
            "<script src='xxx.js'",
            "<script href='xxx.js'",
            "<script name='xxx.js'",
            "<script id='xxx.js'",
        ],
        correctAnswer: 1,

    },

    //Question 7 

    {
        question: "How do you declare a JavaScript variable?",
        choices: [
            "v variableName",
            "variable Name",
            "var variablenName",
            "Bananas",
        ],
        correctAnswer: 3,

    },

    //Question 8 

    {
        question: "Which operator is used to assign a value to a variable?",
        choices: [
            "*",
            "=",
            "x",
            "/",
        ],
        correctAnswer: 2,

    },

    //Question 9 

    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: [
            "onClick",
            "onPop",
            "CatchEmAll",
            "MickeyMouse",
        ],
        correctAnswer: 1,

    },

    //Question 10 

    {
        question: "The external JavaScript file must contain the <script> tag",
        choices: [
            "True",
            "Yes",
            "False",
            "Si",
        ],
        correctAnswer: 3,

    },
];

//call function to load elements on the instructions or first page

window.onload = displayQuizInstructions();

function displayQuizInstructions() {
    // add element to the html document and set its attributes//
    var quizTitleEl = document.createElement("h1");
    var quizDirectionsEl = document.createElement("h5");
    var quizStartBtnEl = document.createElement("button");

    quizTitleEl.textContent = "Coding Pop Quiz";
    quizDirectionsEl.textContent = "Pop Quiz? try to answer the Questions about Code-related within the 60 seconds time limit, Remember that incoorect answer will penalize your remainin time by ten seconds";
    quizStartBtnEl.textContent = "Start Quiz";

    timerCountSpanEl.textContent = remainingSeconds + "seconds";
    correctCountSpanEl.textContent = correctAnswerCount;
    wrongCountSpanEl.textContent = wrongAnswerCount;
    questionsRemainingCountSpanEl.textContent = questionsRemainingCount;

    mainDivEl.appendChild(quizTitleEl);
    mainDivEl.appendChild(quizDirectionsEl);
    mainDivEl.appendChild(quizStartBtnEl);

    //add event listeners to button

    quizStartBtnEl.addEventListener("click", startQuiz);
    linkToLeaderBoardBtnEl.addEventListener("click", displayHighscores);
}

//user clicks start button to call this function

function startQuiz() {
    //Remove content in main div

    removeAllChildNodes(mainDivEl);
    var timer = setInterval(function () {
        remainingSeconds--;
        // show updated time
        timerCountSpanEl.textContent = remainingSeconds + "seconds";
        if (
            remainingSeconds > 0 &&
            currentQuestionIndex === questionsObjects.length
        ) {
            clearInterval(timer);
            endQuiz();
            goodJobMessage();
        }
        if (remainingSeconds <= 0) {
            clearInterval(timer);
            endQuiz();
            outOfTimeMessage();
        }
    }, 1000);

    getQuestions();
}


// Create element for the quiz contents outside of the createQuizElement() functions so that variables can be refrenced in other functions

var questionsLabelEl = document.createElement("h3");
var questionTextEl = document.createElement("h1");
var listEl = document.createElement("ul");
var answerEl = document.createElement("div");
var answerBoxEl = document.createElement("div");
var answerImgEl = document.createElement("img");
var answerTextEl = document.createElement("span");

function getQuestions() {
    //set text contect of elements
    mainDivEl.setAttribute("style", "background: black");
    answerEl.classList.add("d-flex", "justify-center-center");
    answerBoxEl.classList.add('answerBox');
    answerImgEl.classList.add("imgs");


    // append elements
    mainDivEl.appendChild(questionsLabelEl);
    mainDivEl.appendChild(questionTextEl);
    mainDivEl.appendChild(listEl);
    mainDivEl.appendChild(answerEl);
    answerBoxEl.appendChild(answerImgEl);
    answerBoxEl.appendChild(answerTextEl);

    // Set text content of question and choices//

    questionTextEl.textContent = questionsObjects[currentQuestionIndex].question;
    questionsLabelEl.textContent =
        "Question " + (currentQuestionIndex + 1) + "/10";
    listEl.innerHTML = "";
    questionsObjects[currentQuestionIndex].choices.forEach(function (choice, i) {
        var choiceEl = document.createElement("li");
        choiceEl.setAttribute("class", "choice");
        choiceEl.setAttribute("value", i + 1);
        choiceEl.textContent = i + 1 + choice;
        listEl.appendChild(choiceEl);
        choiceEl.addEventListener("click", checkAnswer);
    });
}

function checkAnswer() {
    if (this.value !== questionsObjects[currentQuestionIndex].correctAnswer) {
        remainingSeconds -= 10;
        if (remainingSeconds <= 0) {
            endQuiz();
        }
        timerCountSpanEl.textContent = remainingSeconds + "seconds";
        wrongChoice();
    } else {
        correctChoice();
    }
    setTimeout(function () {
        answerEl.classList.add("hide");
    }, 1000);
    currentQuestionIndex++;
    questionsRemainingCount--;
    questionsRemainingCountSpanEl.textContent = questionsRemainingCount;
    if (currentQuestionIndex === questionsObjects.length) {
        endQuiz();
        goodJobMessage();
    } else {
        getQuestions();
    }
}

function correctChoice() {
    answerEl.classList.remove("hide");
    answerTextEl.textContent = "Correct!!";
    correctAnswerCount++;
    correctCountSpanEl.textContent = correctAnswerCount;
}

function wrongChoice() {
    answerEl.classList.remove("hide");
    answerTextEl.textContent = "Wrong Choice!!";
    wrongAnswerCount++;
    wrongCountSpanEl.textContent = wrongAnswerCount;
}

function endQuiz() {
    removeAllChildNodes(mainDivEl);
    createEndQuizContent();
}

var endContainer = document.createElement("div");
var endMessageEl = document.createElement("h2");
var submitFormEl = document.createElement("form");
var scoreLabelEl = document.createElement("label");
var scoreEl = document.createElement("span");
var lineBreak = document.createElement("br");
var nameLabelEl = document.createElement("label");
var nameInputEl = document.createElement("input");
var submitNameBtnEl = document.createElement("button");
var inputErrorAlertEl = document.createElement("h5");

function createEndQuizContent() {
    scoreLabelEl.textContent = "Your Final Score is: ";
    nameLabelEl.textContent = "Enter your Name: ";
    submitNameBtnEl.textContent = "Submit";
    nameInputEl.setAttribute("type", "text");
    nameInputEl.setAttribute("placeholder", "name user");
    nameInputEl.value = "";
    inputErrorAlertEl.classList.add("hide", "inputError");
    endContainer.classList.add("endScreenContainer");
    scoreLabelEl.setAttribute("id", "finalScoreLabel");
    scoreEl.setAttribute("id", "finalScore");

    mainDivEl.appendChild(endContainer);
    endContainer.appendChild(endMessageEl);
    endContainer.appendChild(submitFormEl);
    endContainer.appendChild(scoreLabelEl);
    scoreLabelEl.appendChild(scoreEl);
    endContainer.appendChild(lineBreak);
    endContainer.appendChild(nameLabelEl);
    endContainer.appendChild(nameInputEl);
    endContainer.appendChild(submitNameBtnEl);
    endContainer.appendChild(inputErrorAlertEl);

    submitNameBtnEl.addEventListener("click", checkUserInput);
}

function goodJobMessage() {
    endMessageEl.textContent =
        "Nice Job! You are All Done with" + remainingSeconds + "seconds lefts!";
    scoreEl.textContent = remainingSeconds;
    timerCountSpanEl.textContent = remainingSeconds + "seconds";
    mainDivEl.setAttribute("style", "background: #34a853; padding-top: 30px; padding-bottom: 30px;"
    );
}

function outOfTimeMessage() {
    endMessageEl.textContent = "You Ran out of time";
    remainingSeconds = 0;
    scoreEl.textContent = remainingSeconds;
    timerCountSpanEl.textContent = remainingSeconds + "seconds";
    mainDivEl.setAttribute("style", "background: #34a853; padding-top: 30px; padding-bottom: 30px;"
    );
}

//Function to Validate user input when submitting score

function checkUserInput() {
    if (nameInputEl.value === "") {
        //input is left blank
        inputErrorAlertEl.classList.remove("hide");
        inputErrorAlertEl.textContent = "You must enter your name to proceed";
        setTimeout(function () {
            inputErrorAlertEl.classList.add("hide");
        }, 2000);
        submitNameBtnEl.addEventListener("click", checkUserInput);
    } else {
        saveUserScore();
    }
}

// function to save user's Name and Score Storage as a key value pair //

function saveUserScore() {
    if (pastScore === null) {
        pastScore = [];
    }

    var newScoreObj = {
        name: nameInputEl.value,
        score: remainingSeconds,
    };

    pastScore.push(newScoreObj);
    localStorage.setItem("scores", JSON.stringify(pastScore));

    displayHighscores();
}

//Function to display the scores saved in local storages whe the quiz is over or when the "view leadboard" button is clicked//

function displayHighscores() {
    removeAllChildNodes(mainDivEl);


    // create content //

    var highscoresTitleEl = document.createElement("h1");
    var highscoresListEl = document.createElement("table");
    var tblHeaderEl = document.createElement("thead");
    // var highScoresTableRow = document.createElement("tr");
    var nameColHeaderEl = document.createElement("th");
    var scoreColHeaderEl = document.createElement("th");
    var tblBodyEl = document.createElement("tbody");
    var backBtnEl = document.createElement("button");
    var clearBtnEl = document.createElement("button");

    highscoresTitleEl.textContent = "HighSchores"
    backBtnEl.textContent = "Back to Beginning";
    clearBtnEl.textContent = "Clear Highscores";
    nameColHeaderEl.textContent = "Player"
    scoreColHeaderEl.textContent = "Score";
    mainDivEl.setAttribute("style", "background: grey;");
    highscoresListEl.setAttribute("id", "highscoreList");

    mainDivEl.appendChild(highscoresTitleEl);
    mainDivEl.appendChild(highscoresListEl);
    highscoresListEl.appendChild(tblHeaderEl);
    tblHeaderEl.appendChild(nameColHeaderEl);
    tblHeaderEl.appendChild(scoreColHeaderEl);
    highscoresListEl.appendChild(tblBodyEl);
    mainDivEl.appendChild(backBtnEl);
    mainDivEl.appendChild(clearBtnEl);


    if (localStorage.getItem("scores") !== null) {

        var highScore = pastScore[0].score;

        for (var i = 0; i < pastScore.length; i++) {

            var newTableRow = document.createElement("tr");
            var newNameEl = document.createElement("td");
            var newScoreEl = document.createElement("td");

            newNameEl.textContent = pastScore[i].name;
            newScoreEl.textContent = pastScore[i].score;

            newTableRow.appendChild(newNameEl);
            newTableRow.appendChild(newScoreEl);

            // list highscore in descending order

            if (pastScore[i].score >= highScore) {
                tblBodyEl.prepend(newTableRow);
                highScore = pastScore[i].score;
            } else {
                tblBodyEl.appendChild(newTableRow);
            }
        }
    } else {
        var noHighscoresEl = document.createElement("tr");
        var noHighscoresTextEl = document.createElement("td");
        noHighscoresTextEl.textContent = "you do not have any highscores yet!";
        noHighscoresTextEl.setAttribute("colspan", "2");
        noHighscoresEl.appendChild(noHighscoresTextEl);
        tblBodyEl.appendChild(noHighscoresEl);
    }
    //add event listeners to the two buttons

    backBtnEl.addEventListener("click", backToBeginning);
    clearBtnEl.addEventListener("click", clearHighscoresList);

}

function backToBeginning() {
    removeAllChildNodes(mainDivEl);
    resetVariables();
    displayQuizInstructions();
}

function resetVariables() {
    remainingSeconds = 60;
    currentQuestionIndex = 0;
    correctAnswerCount = 0;
    wrongAnswerCount = 0;
    questionsRemainingCount = 10;
    mainDivEl.setAttribute("style", "background: black");
}

function clearHighscoresList() {
    localStorage.removeItem("scores");
    pastScore = [];
    displayHighscores();
}
//Function to clear the main div //
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

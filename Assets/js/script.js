// Set global variables
var scores = document.getElementById('score');
var clock = document.getElementById('timer');
var userScore = document.getElementById('user-score');
var leaderboard = document.getElementById('leaderboard');
var clearScores = document.getElementById('clear');
var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var submit = document.getElementById('submit');
var userInitials = document.getElementById('initials');
var playAgain = document.getElementById('play-again');
var leaderBoardList = document.getElementById('leaders');
var leaderBoardButton = document.getElementById('high-scores');
var currentQuestionIndex;
var sec = 60;
var score = 0;

// Add an event listener to wait for the user to click 'start'
startButton.addEventListener('click', startGame);

//Shuffle the questions prior to the quiz starting using a switching algorithm.
function shuffleArray(passedArray) {
    for (var i = 0; i < passedArray.length; i++) {
        var rand = Math.floor(Math.random() * passedArray.length);
        var temp = passedArray[i];
        passedArray[i] = passedArray[rand];
        passedArray[rand] = temp;
    }
    return passedArray;
}

//Create Timer
function timer() {
    var timer = setInterval(function () {
        document.getElementById('timer').textContent = 'Time: ' + sec;
        if (sec <= 0) {
            clearInterval(timer);
            endQuiz()
        }
        sec--;
    }, 1000);
}

// Create an empty array to append the shuffled order of questions into.
var shuffled = [];

// Create a function that starts the game.
// Start timer, hide non-relavent html elements, and initialize random questions.
function startGame() {
    timer();
    startButton.classList.add('hide');
    description.classList.add('hide');
    leaderBoardButton.classList.add('hide');
    shuffled = shuffleArray(questionArray);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    initializeQuestion(shuffled);
}

// Show the question once they have been randomized.
function initializeQuestion(shuffledQuestions) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// This function is for when the game ends and the leaderboard is shown. Otherwise, the page would show an error and reset, losing user score.
function clearAnswers() {
    answerButtonsEl.innerHTML = "";
}

function showQuestion(currentQuestionObject) {
    // Modify the "question" element in the html to show corresponding question in the questionArray.
    questionEl.textContent = currentQuestionObject.questionText;
    // Clear previous answers from buttons to make room for new ones.
    clearAnswers();
    // Populate each button with corresponding text and add an event listener for when the user selects an answer choice
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.answers[0].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.answers[0].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.answers[1].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.answers[1].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.answers[2].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.answers[2].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.answers[3].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.answers[3].correct);
    })
}

// Check to see if the user satatement is correct and to see if they have answered all of the questions.
function selectAnswer(isCorrect) {
    if (isCorrect == true) {
        score += 10;
        alert('Correct! You get 10 points!');
    } else {
        sec -= 10;
        alert('Wrong! you lose 10 seconds!');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex == shuffled.length) {
        alert("The quiz is now over");
        endQuiz();
    } else {
        showQuestion(shuffled[currentQuestionIndex]);
    }
}

// Once time has expired or all of the questions have been answered, hide all HTML elements except the prompt to enter initials.
// Also set the sec to zero so the timer doesn't keep running in the background.
function endQuiz() {
    sec = 0;
    questionContainerEl.classList.add('hide');
    scores.classList.remove('hide');
    leaderBoardButton.classList.remove('hide');
    userScore.textContent = 'You Scored ' + score + ' Points!';
}

// Create global empty string and empty array to populate within later functions.
var initialsToAdd = "";
var listOfScores = [];

// Make the "view high scores" button clickable.
submit.addEventListener('click', function (event) {
    event.preventDefault();
    showLeaderboard();
})

// Push the current user score to local storage to show later.
function addScores(initials, score) {
    var newScore = {
        initials: initials,
        score: score
    }
    listOfScores.push(newScore);
    localStorage.setItem('listOfScores', JSON.stringify(listOfScores));
}

// This starts the game over is the user clicks "play again".
function startAgain() {
    sec = 60;
    score = 0;
    leaderboard.classList.add('hide');
    startGame();
}

// Makes the "play again" button clickable.
playAgain.addEventListener('click', function () {
    startAgain();
})

// Clears local storage if the user clicks "clear Scores".
function clearLeaderboard() {
    localStorage.clear();
    leaderBoardList.innerHTML = "";
}

// Makes the "clear scores" button clickable.
clearScores.addEventListener('click', function () {
    clearLeaderboard();
})

// This hides all of the non-essential HTML elements and also populates the leaderboard with initials and scores from local storage.
function showLeaderboard() {
    initialsToAdd = userInitials.value;
    addScores(initialsToAdd, score);
    scores.classList.add('hide');
    leaderboard.classList.remove('hide');
    leaderBoardList.innerHTML = "";
    var displayScores = JSON.parse(localStorage.getItem("listOfScores"));
    for (i = 0; i < displayScores.length; i++) {
        let newLeader = document.createElement("li");
        newLeader.setAttribute("class", "listOfLeaders");
        newLeader.append(document.createTextNode(`${displayScores[i].initials} ----- ${displayScores[i].score}`));
        leaderBoardList.append(newLeader);
    }
}

// Makes the "view high scores" text clickable.
leaderBoardButton.addEventListener('click', function () {
    startButton.classList.add('hide');
    description.classList.add('hide');
    questionContainerEl.classList.add('hide');
    scores.classList.add('hide');
    showLeaderboard();
});

// Create the questions and Answers in an array to reference in showQuestion.
var questionArray = [
    {
        questionText: 'What is the format used for storing and transporting data?',
        answers: [
            { text: 'JASON', correct: false },
            { text: 'JSON', correct: true },
            { text: 'jQuery', correct: false },
            { text: 'JavaScript', correct: false }
        ],
    }, {
        questionText: 'What does "css" stand for?',
        answers: [
            { text: 'cascading style sheets', correct: true },
            { text: 'create something special', correct: false },
            { text: 'cool style sheets', correct: false },
            { text: 'call syntax sheets', correct: false }
        ],
    }, {
        questionText: 'What is used to enclose an array?',
        answers: [
            { text: 'Nothing', correct: false },
            { text: 'Quotation Marks', correct: false },
            { text: 'Curly Brackets', correct: false },
            { text: 'Square Brackets', correct: true }
        ],
    }, {
        questionText: 'How would you check if A is equal to 2?',
        answers: [
            { text: 'A ?= 2', correct: false },
            { text: 'A != 2', correct: false },
            { text: 'A == 2', correct: true },
            { text: 'Is A 2?', correct: false }
        ],
    }, {
        questionText: 'How do you comment something out in Javascript?',
        answers: [
            { text: '<!--', correct: false },
            { text: '#', correct: false },
            { text: '//', correct: true },
            { text: 'comment:', correct: false }
        ],
    }, {
        questionText: 'What is used to declare a variable in JavaScript?',
        answers: [
            { text: 'var =', correct: true },
            { text: 'var: ', correct: false },
            { text: 'variable: ', correct: false },
            { text: 'var()', correct: false }
        ],
    }, {
        questionText: 'What is used to see if a value AND data type are the same?',
        answers: [
            { text: '&&', correct: false },
            { text: '/=', correct: false },
            { text: '==', correct: false },
            { text: '===', correct: true }
        ]
    }
]
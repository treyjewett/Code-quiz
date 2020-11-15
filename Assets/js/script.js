var scores = document.getElementById('score');
var clock = document.getElementById('timer');
var leaderboard = document.getElementById('leaders');
var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var submit = document.getElementById('submit');
var userInitials = document.getElementById('initials');
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
            quizTimeout();
        }
        sec--;
    }, 1000);
}

var shuffled = [];

// Create a function that starts the game.
function startGame() {
    timer();
    startButton.classList.add('hide');
    description.classList.add('hide')
    shuffled = shuffleArray(questionArray);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    initializeQuestion(shuffled);
}

function initializeQuestion(shuffledQuestions) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

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

function selectAnswer(isCorrect) {
    console.log(isCorrect);
    if (isCorrect == true) {
        score += 10;
        alert('Correct! You get 10 points!')
    } else {
        sec -= 10;
        alert('Wrong! you lose 10 seconds!')
    }
    currentQuestionIndex++;
    if (currentQuestionIndex == shuffled.length) {
        endQuiz();
    }
    console.log(currentQuestionIndex);
    showQuestion(shuffled[currentQuestionIndex]);
}

function quizTimeout() {
    alert('You have run out of time.');
    endQuiz();
}

function endQuiz() {
    alert("The quiz is over");
    questionContainerEl.classList.add('hide');
    scores.classList.remove('hide');
    userInitials = textInput.value();
    var jsonInitials = JSON.stringify(userInitials);
    var jsonScore = JSON.stringify(score);
    localStorage.setItem({user: jsonInitials, score:jsonScore});
    showLeaderboard();
}

function showLeaderboard() {

}

// Create the questions and Answers in an array to reference in showQuestion.
var questionArray = [
    {
        questionText: "What is the format used for storing and transporting data?",
        answers: [
            { text: 'JASON', correct: false },
            { text: 'JSON', correct: true },
            { text: 'jQuery', correct: false },
            { text: 'JavaScript', correct: false }
        ],
    }, {
        questionText: "What does 'css' stand for?",
        answers: [
            { text: 'cascading style sheets', correct: true },
            { text: 'create something special', correct: false },
            { text: 'cool style sheets', correct: false },
            { text: 'call syntax sheets', correct: false }
        ],
    }, {
        questionText: "What is used to enclose an array?",
        answers: [
            { text: 'Nothing', correct: false },
            { text: 'Quotation Marks', correct: false },
            { text: 'Curly Brackets', correct: false },
            { text: 'Square Brackets', correct: true }
        ],
    }, {
        questionText: "How would you check if A is equal to 2?",
        answers: [
            { text: 'A ?= 2', correct: false },
            { text: 'A != 2', correct: false },
            { text: 'A == 2', correct: true },
            { text: 'Is A 2?', correct: false }
        ],
    }, {
        questionText: "How do you comment something in Javascript?",
        answers: [
            { text: '<!--', correct: false },
            { text: '#', correct: false },
            { text: '//', correct: true },
            { text: 'comment:', correct: false }
        ],
    }, {
        questionText: "What is used to declare a variable in JavaScript?",
        answers: [
            { text: 'var =', correct: true },
            { text: 'var: ', correct: false },
            { text: 'variable: ', correct: false },
            { text: 'var()', correct: false }
        ],
    }, {
        questionText: "What is used to see if a value AND data type are the same?",
        answers: [
            { text: '&&', correct: false },
            { text: '/=', correct: false },
            { text: '==', correct: false },
            { text: '===', correct: true }
        ]
    }
]
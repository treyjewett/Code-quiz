var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var currentQuestionIndex;
var sec = 60;
var score = 0;

// Add an event listener to wait for the user to click 'start'
startButton.addEventListener('click', startGame);

//Shuffle the questions prior to the quiz starting using a switching algorithm.
function shuffleArray(passedArray) {
    console.log("this is my passedArray: " + passedArray[1].questionText);
    for (var i = 0; i < passedArray.length; i++) {
        var rand = Math.floor(Math.random() * passedArray.length);
        var temp = passedArray[i];
        passedArray[i] = passedArray[rand];
        passedArray[rand] = temp;
        console.log("testing: " + passedArray[i].questionText);
    }
    console.log("this is my passedArray: " + passedArray[1].questionText);
    return passedArray;
}

//Create Timer
function timer() {
    var timer = setInterval(function () {
        document.getElementById('timer').textContent = 'Time: ' + sec;
        if (sec <= 0) {
            clearInterval(timer);
            // endQuiz;
        }
        sec--;
    }, 1000);
}

// Create a function that starts the game.
function startGame() {
    timer();
    startButton.classList.add('hide');
    description.classList.add('hide')
    shuffledQuestions = shuffleArray(questionArray);
    console.log("this is my questionArray: " + shuffledQuestions[1].questionText);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    initializeQuestion();
}

function initializeQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    while (currentQuestionIndex < questionArray.length) {
        console.log(currentQuestionIndex);
        showQuestion(questionArray[++currentQuestionIndex]);
    }
    // endQuiz
}

function showQuestion(shuffledQuestions) {
    // Modify the "question" element in the html to show corresponding question in the questionArray.
    questionEl.textContent = question.questionText;
    // Populate each button with corresponding text and add an event listener for when the user selects an answer choice
    var answerButton = document.getElementById('answer-buttons').children[0];
    answerButton.textContent = question.answers[0].text;
    answerButton.addEventListener("click", function () {
        selectAnswer(question.answers[0].correct);
    });
    var answerButton = document.getElementById('answer-buttons').children[1];
    answerButton.textContent = question.answers[1].text;
    answerButton.addEventListener("click", function () {
        selectAnswer(question.answers[1].correct);
    });
    var answerButton = document.getElementById('answer-buttons').children[2];
    answerButton.textContent = question.answers[2].text;
    answerButton.addEventListener("click", function () {
        selectAnswer(question.answers[2].correct);
    });
    var answerButton = document.getElementById('answer-buttons').children[3];
    answerButton.textContent = question.answers[3].text;
    answerButton.addEventListener("click", function () {
        selectAnswer(question.answers[3].correct);
    });
}

function selectAnswer(isCorrect) {
    console.log(isCorrect);
    if (isCorrect == true) {
        score += 10;
    } else {
        sec -= 10;
    }
    // currentQuestionIndex++;
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
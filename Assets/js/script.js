
var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerBtns = document.getElementById('answer-buttons');
var currentQuestionIndex;
var sec = 60;
var score = 0;


// Add an event listnener to wait for the user to click 'start'
startButton.addEventListener('click', startGame);

// Shuffle the questions prior to the quiz starting using a switching algorithm.
function shuffleArray(array) {
    for (var i; i < array.length; i++) {
        var rand = Math.floor(Math.random() * array.length);
        var temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
    }
    return array;
}

// Create Timer
function timer() {
    var timer = setInterval(function() {
        document.getElementById('timer').textContent = 'Time: ' + sec;
        if (sec <= 0) {
            clearInterval(timer);
            // endQuiz;
        } 
        sec--;
    }, 1000);
}


function startGame() {
    timer();
    startButton.classList.add('hide');
    description.classList.add('hide');
    shuffleArray(array);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    initializeQuestions();
}

// Show questions until questions run out.
// Initialize event listeners for each answer choice.
function initializeQuestions() {
    showQuestion(array[currentQuestionIndex++])
    while (currentQuestionIndex < array.length) {
        showQuestion(array[currentQuestionIndex++]);
        //checker();
    }
    // endQuiz;
}

function showQuestion(question) {
    //add the question text to the screen
    questionEl.textContent = question.question;
    //loop through for each answer choice
    for(var i = 0; i < question.answers.length; i++){
        console.log("Hit");
        //create a new button
        var answerButton = document.createElement("BUTTON");
        answerButton.textContent = question.answers[i].text;
        answerButton.setAttribute("CorrectAnswer", question.answers[i].correct);
        answerButton.classList.add('btn');
        // TODO:answerButton.addEventListener('click', checker(event));
        
        //add button to answerButton Array
        answerBtns.appendChild(answerButton);
    }
}

// Create the questions and Answers in an array to reference in showQuestion.
var array = [
    {
        question: "What is the format used for storing and transporting data?",
        answers: [
            {text: 'JASON', correct: false},
            {text: 'JSON', correct: true},
            {text: 'jQuery', correct: false},
            {text: 'JavaScript', correct: false}
        ],
        question: "What does 'css' stand for?",
        answers: [
            {text: 'cascading style sheets', correct: true},
            {text: 'create something special', correct: false},
            {text: 'cool style sheets', correct: false},
            {text: 'call syntax sheets', correct: false}
        ],
        question: "What is used to enclose an array?",
        answers: [
            {text: 'Nothing', correct: false},
            {text: 'Quotation Marks', correct: false},
            {text: 'Curly Brackets', correct: false},
            {text: 'Square Brackets', correct: true}
        ],
        question: "How would you check if A is equal to 2?",
        answers: [
            {text: 'A ?= 2', correct: false},
            {text: 'A != 2', correct: false},
            {text: 'A == 2', correct: true},
            {text: 'Is A 2?', correct: false}
        ],
        question: "How do you comment something in Javascript?",
        answers: [
            {text: '<!--', correct: false},
            {text: '#', correct: false},
            {text: '//', correct: true},
            {text: 'comment:', correct: false}
        ],
        question: "What is used to declare a variable in JavaScript?",
        answers: [
            {text: 'var =', correct: true},
            {text: 'var: ', correct: false},
            {text: 'variable: ', correct: false},
            {text: 'var()', correct: false}
        ],
        question: "What is used to see if a value AND data type are the same?",
        answers: [
            {text: '&&', correct: false},
            {text: '/=', correct: false},
            {text: '==', correct: false},
            {text: '===', correct: true}
        ]
    }
]

// Check to see if the user click the right answer to the question.
function checker() {
    //if (array.answers[correct] == true) {
        score += 10;
   // } else {
        sec -= 10;
 //   }
}

function endQuiz() {
    questionContainerEl.classList.add('hide');
}
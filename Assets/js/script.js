var startButton = document.getElementById('start-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
//var answer1 = document.getElementsByClassName(;
var currentQuestionIndex;

startButton.addEventListener('click', startGame);

function shuffleArray(array) {
    for (var i; i < array.length; i++) {
        var rand = Math.floor(Math.random() * array.length);
        var temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
    }
    return array;
}

function startGame() {
    startButton.classList.add('hide');
    shuffleArray(array);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    showQuestion(array[currentQuestionIndex]);
    currentQuestionIndex++;
}

function showQuestion(array) {
    questionEl.innerText = array.question;
    console.log(answerButtonsEl);
    console.log("------------------------------------------------------------------------");
    console.log(answerButtonsEl.answer-btn-1);
    answerButtonsEl[0] = array.answers[0].text;
}

function selectAnswer() {
    
}

var array = [
    {
        question: "What is the format used for storing and transporting data?",
        answers: [
            {text: 'JASON', correct: false},
            {text: 'JSON', correct: true},
            {text: 'jQuery', correct: false},
            {text: 'JavaScript', correct: false}
        ]
    }
]

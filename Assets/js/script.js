var startButton = document.getElementById('start-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var currentQuestionIndex;

startButton.addEventListener('click', startGame);

function shuffledQuestions(question) {
    for (var i; i < questions.length; i++) {
        return Math.floor(Math.random() * question.length);
    }
}

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions();
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = questions.question;
}

function selectAnswer() {
    
}

var questions = [
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

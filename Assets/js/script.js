var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var userInitials = document.getElementById('user-initials');
var resetButton = document.getElementById('reset')
var sec = 60;
var score = 0;

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

// Add an event listener to wait for the user to click 'start', then begin the quiz.
startButton.addEventListener('click', function () {
    timer();
    questionContainerEl.classList.remove('hide');
    startButton.classList.add('hide');
    description.classList.add('hide');
    createQuestion();
});

// Use a for loop to populate the HTML with question text at index [i] and answers attached to that question.
// Also set the data type for each question for validation later.
function createQuestion() {
    var questionNumber = 0;
    if (questionNumber === questionArray.length) {
        endQuiz;
    } else {
        questionContainerEl.append(`<p>${questionArray[questionNumber].questionText}`);
        for (i = 0; i < questionArray[questionNumber].answers.length; i++) {
            answerButtonsEl.append(`<button class="answer${i} answerBtn btn" dataType = "${questionArray[questionNumber].answers[i].correct}">${questionArray[questionNumber].answers[i].text}</button>`);
            questionNumber++;
        }
    }
}

// Check whether or not the user selected the correct answer and apply consequences accordingly.
function handleAnswer() {
    if (answerButtonsEl.dataType === true) {
        score += 10;
        alert('Correct! You get 10 points!');
    } else {
        sec -= 10;
        alert('Wrong! you lose 10 seconds!');
    }
}

// After each answer selection has been checked, make sure to clear the answers so they can be re-filled in the next iteration of the for-loop.
function clearAnswers() {
    answerButtonsEl.innerHTML = "";
}

// Once the user clicks their selection, the selection is checked for correctness, the answerButton HTML text is cleared, and a new question is created.
answerButtonsEl.addEventListener('click', function () {
    handleAnswer();
    clearAnswers();
    createQuestion();
})

// When the game ends, the user has the option to log their initials to keep their score.
// addInitials.addEventListener('click', function() {
//     userInitials.textInput.value();
//     var jsonInitials = JSON.stringify(userInitials);
//     var jsonScore = JSON.strungify(score);
//     localStorage.setItem({user: jsonInitials, score: jsonScore});
// })

// If a user wishes to clear all of the high-scores listed, this fuction will do just that.
// resetButton.addEventListener('click', function() {
//     localStorage.clear();
// })

// Once a user has reached the final question, they will be shown the score display page.
function endQuiz() {
    alert("The quiz is over");
}

// If a user runs out of time prior to completing the quiz, they will be shown this message.
function quizTimeout() {
    alert(`You have run out of time. Here is your score: ${score}`);
    endQuiz();
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

// function showQuestion(currentQuestionObject) {
//     // Modify the "question" element in the html to show corresponding question in the questionArray.
//     questionEl.textContent = currentQuestionObject.questionText;
//     // Populate each button with corresponding text and add an event listener for when the user selects an answer choice
//     var answerbtn = document.createElement('answerbtn');
//     answerbtn.textContent = currentQuestionObject.answers[0].text;
//     answerbtn.classList.add('btn');
//     document.getElementById('answer-buttons').appendChild(answerbtn);
//     answerbtn.addEventListener('click', function () {
//         selectAnswer(currentQuestionObject.answers[0].correct);
//     })
//     var answerbtn = document.createElement('answerbtn');
//     answerbtn.textContent = currentQuestionObject.answers[1].text;
//     answerbtn.classList.add('btn');
//     document.getElementById('answer-buttons').appendChild(answerbtn);
//     answerbtn.addEventListener('click', function () {
//         selectAnswer(currentQuestionObject.answers[1].correct);
//     })
//     var answerbtn = document.createElement('answerbtn');
//     answerbtn.textContent = currentQuestionObject.answers[2].text;
//     answerbtn.classList.add('btn');
//     document.getElementById('answer-buttons').appendChild(answerbtn);
//     answerbtn.addEventListener('click', function () {
//         selectAnswer(currentQuestionObject.answers[2].correct);
//     })
//     var answerbtn = document.createElement('answerbtn');
//     answerbtn.textContent = currentQuestionObject.answers[3].text;
//     answerbtn.classList.add('btn');
//     document.getElementById('answer-buttons').appendChild(answerbtn);
//     answerbtn.addEventListener('click', function () {
//         selectAnswer(currentQuestionObject.answers[3].correct);
//     })
    // var answerButton = document.getElementById('answer-buttons').children[0];
    // answerButton.textContent = shuffledQuestions.answers[0].text;
    // answerButton.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     selectAnswer(shuffledQuestions.answers[0].correct);
    // });
    // var answerButton = document.getElementById('answer-buttons').children[1];
    // answerButton.textContent = shuffledQuestions.answers[1].text;
    // answerButton.addEventListener("click", function () {
    //     selectAnswer(shuffledQuestions.answers[1].correct);
    // });
    // var answerButton = document.getElementById('answer-buttons').children[2];
    // answerButton.textContent = shuffledQuestions.answers[2].text;
    // answerButton.addEventListener("click", function () {
    //     selectAnswer(shuffledQuestions.answers[2].correct);
    // });
    // var answerButton = document.getElementById('answer-buttons').children[3];
    // answerButton.textContent = shuffledQuestions.answers[3].text;
    // answerButton.addEventListener("click", function () {
    //     selectAnswer(shuffledQuestions.answers[3].correct);
    // });
// }
const questions = [
    {
        question: "Which famous scientist developed the theory of relativity?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Nikola Tesla", correct: false },
        ],
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "San Marino", correct: false },
            { text: "Liechtenstein", correct: false },
        ],
    },
    {
        question: "Which fictional city is the home of Batman?",
        answers: [
            { text: "Metropolis", correct: false },
            { text: "Gotham", correct: true },
            { text: "Central City", correct: false },
            { text: "Star City", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Pt", correct: false },
            { text: "Hg", correct: false },
        ],
    },
    {
        question: "Which instrument is known as the 'king of instruments'?",
        answers: [
            { text: "Piano", correct: false },
            { text: "Violin", correct: false },
            { text: "Organ", correct: true },
            { text: "Trumpet", correct: false },
        ],
    },
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressElement = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

document.getElementById("start-btn").addEventListener("click", startQuiz);

function startQuiz() {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    progressElement.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    progressElement.innerHTML = "";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

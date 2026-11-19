/* =========================
   FOTBOLLSQUIZ
========================= */

const questions = [
  {
    question: "Vilket land vann VM 2022?",
    options: ["Frankrike", "Argentina", "Brasilien", "Kroatien"],
    answer: "Argentina"
  },
  {
    question: "Vilken klubb spelar på Anfield?",
    options: ["Arsenal", "Chelsea", "Liverpool", "Everton"],
    answer: "Liverpool"
  },
  {
    question: "Hur många spelare har ett lag på planen vid avspark?",
    options: ["9", "10", "11", "12"],
    answer: "11"
  },
  {
    question: "Vilket land vann dam-VM 2023?",
    options: ["England", "USA", "Spanien", "Sverige"],
    answer: "Spanien"
  },
  {
    question: "Vilket lag vann Champions League 2025/26?",
    options: ["Real Madrid", "Inter", "PSG", "Bayern München"],
    answer: "PSG"
  }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("quiz-question");
const optionsElement = document.getElementById("quiz-options");
const feedbackElement = document.getElementById("quiz-feedback");
const nextButton = document.getElementById("next-question");
const resultElement = document.getElementById("quiz-result");

function showQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("question-number").textContent =
    "Fråga " + (currentQuestion + 1) + " av " + questions.length;

  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";
  feedbackElement.textContent = "";
  nextButton.style.display = "none";

  q.options.forEach(function(option) {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", function() {
      checkAnswer(button, option);
    });

    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedAnswer) {
  const correctAnswer = questions[currentQuestion].answer;

  const buttons = optionsElement.querySelectorAll("button");

  buttons.forEach(function(button) {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    feedbackElement.textContent = "Rätt svar! 💗";
  } else {
    selectedButton.classList.add("wrong");
    feedbackElement.textContent =
      "Inte riktigt! Rätt svar är " + correctAnswer + ".";
  }

  nextButton.style.display = "inline-block";

  if (currentQuestion === questions.length - 1) {
    nextButton.textContent = "Se mitt resultat";
  } else {
    nextButton.textContent = "Nästa fråga →";
  }
}

nextButton.addEventListener("click", function() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionElement.style.display = "none";
  optionsElement.style.display = "none";
  feedbackElement.style.display = "none";
  nextButton.style.display = "none";

  document.getElementById("question-number").style.display = "none";

  resultElement.style.display = "block";

  resultElement.innerHTML =
    "<h2>QUIZET ÄR KLART! 🏆</h2>" +
    "<p>Du fick " + score + " av " + questions.length +
    " rätt!</p>" +
    "<button class='button' onclick='restartQuiz()'>" +
    "Spela igen</button>";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  questionElement.style.display = "block";
  optionsElement.style.display = "grid";
  feedbackElement.style.display = "block";

  document.getElementById("question-number").style.display = "block";

  resultElement.style.display = "none";
  showQuestion();
}

showQuestion();


/* =========================
   OMROSTNING
========================= */

const votes = {
  Messi: 0,
  Ronaldo: 0,
  Pele: 0,
  Maradona: 0
};

let hasVoted = false;

function vote(player) {
  if (hasVoted) {
    return;
  }

  votes[player]++;
  hasVoted = true;

  const buttons = document.querySelectorAll(".poll-options button");

  buttons.forEach(function(button) {
    button.disabled = true;
  });

  document.getElementById("poll-result").textContent =
    "Du röstade på " + player + "! Tack för din röst 💗";
}


/* =========================
   SKICKA IN PODDFORSLAG
========================= */

document.getElementById("suggestion-form")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const topic = document.getElementById("topic").value;

    const subject = encodeURIComponent(
      "Förslag till Heels & Cleats"
    );

    const body = encodeURIComponent(topic);

    window.location.href =
      "mailto:dinmail@example.com?subject=" +
      subject + "&body=" + body;
  });
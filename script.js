const Questions = [
  {
    question: "Which of the following is an example of system software?",
    answers: [
      { text: "Microsoft Word", correct: false },
      { text: "Google Chrome", correct: false },
      { text: "Adobe Photoshop", correct: false },
      { text: "Linux", correct: true },
    ],
  },
  {
    question: "What does the abbreviation RAM stand for?",
    answers: [
      { text: "Read Access Memory", correct: false },
      { text: "Random Access Memory", correct: true },
      { text: "Real Application Memory", correct: false },
      { text: "Remote Access Memory", correct: false },
    ],
  },
  {
    question: "Which device is primarily used to input data into a computer?",
    answers: [
      { text: "Monitor", correct: false },
      { text: "Printer", correct: false },
      { text: "Keyboard", correct: true },
      { text: "Speakers", correct: false },
    ],
  },
  {
    question: "What is the main function of the ALU in a CPU?",
    answers: [
      { text: "To store data", correct: false },
      { text: "To perform arithmetic and logic operations", correct: true },
      { text: "To control the computer's operations", correct: false },
      { text: "To manage memory", correct: false },
    ],
  },
  {
    question:
      "In OOPs, what is the process of combining data and functions together called?",
    answers: [
      { text: "Inheritance", correct: false },
      { text: "Polymorphism", correct: false },
      { text: "Encapsulation", correct: true },
      { text: "Abstraction", correct: false },
    ],
  },
];

// Page elements
let goBtn = document.querySelector(".goBtn");
let page1 = document.querySelector(".user");
let page2 = document.querySelector(".container"); // corrected
let userInput = document.querySelector(".userInput");
const questionEl = document.querySelector(".Question");
const answerEl = document.querySelector(".answer");
const nextBtn = document.querySelector(".next-btn");

let currentQSIndex = 0;
let score = 0;

// Entry page logic
goBtn.addEventListener("click", () => {
  let inputValue = userInput.value.trim();
  if (inputValue === "") {
    alert("Please Enter Your Name to OPEN Quiz App");
  } else {
    page2.style.display = "block";
    page1.style.display = "none";
    startQuiz();
  }
});

// Start quiz
function startQuiz() {
  currentQSIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  showQs();
}

// Show question
function showQs() {
  resetState();
  let currentQs = Questions[currentQSIndex];
  questionEl.innerHTML = `${currentQSIndex + 1}. ${currentQs.question}`;

  currentQs.answers.forEach((answer) => {
    const p = document.createElement("p");
    p.innerText = answer.text;
    p.classList.add("answer1");
    if (answer.correct) p.dataset.correct = true;
    p.addEventListener("click", selectAns);
    answerEl.appendChild(p);
  });
}

// Reset state
function resetState() {
  nextBtn.style.display = "none";
  answerEl.innerHTML = ""; // remove previous answers
}

// Handle answer selection
function selectAns(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Show correct answer
  Array.from(answerEl.children).forEach((p) => {
    if (p.dataset.correct === "true") {
      p.classList.add("correct");
    }
    p.style.pointerEvents = "none"; // disable further clicks
  });

  nextBtn.style.display = "block";
}

// Next button
nextBtn.addEventListener("click", () => {
  currentQSIndex++;
  if (currentQSIndex < Questions.length) {
    showQs();
  } else {
    showScore();
  }
});

// Show final score
function showScore() {
  questionEl.innerHTML = `Hi ${userInput.value}, You Scored ${score} out of ${Questions.length}!`;
  answerEl.innerHTML = "";
  nextBtn.innerText = "Play Again 😇";
  nextBtn.style.display = "block";

  nextBtn.addEventListener("click", () => {
    location.reload(); // simple reset
  });
}

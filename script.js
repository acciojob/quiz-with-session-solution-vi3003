// Define the quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const submitButton = document.getElementById("submit");
const questionsElement = document.getElementById("questions");

// Get the saved progress from session storage
const savedProgress = JSON.parse(sessionStorage.getItem("progress"));
// Submit the quiz and show the score
submitButton.addEventListener("click", showScore);

// If there is saved progress, use it. Otherwise, start from the beginning.
let userAnswers = savedProgress ? savedProgress : [];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Save the user's answer when they select a choice
function saveAnswers() {
  const choiceElements = document.querySelectorAll("input[type=radio]");
  for (let i = 0; i < choiceElements.length; i++) {
    const choiceElement = choiceElements[i];
    choiceElement.addEventListener("change", function (event) {
      const answer = event.target.value;
      userAnswers[parseInt(event.target.name.split("-")[1], 10)] = answer;
      sessionStorage.setItem("progress", JSON.stringify(userAnswers));
    });
  }
}

function showScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const userAnswer = userAnswers[i];
    if (userAnswer === question.answer) {
      score++;
    }
  }
  localStorage.setItem("score", score);
  const scoreElement = document.getElementById("score");
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;
}

renderQuestions();
saveAnswers();

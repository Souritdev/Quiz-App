const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Charles Dickens", correct: false },
    ],
  },
  {
    question: "What is the square root of 64?",
    answers: [
      { text: "6", correct: false },
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
    ],
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Great White Shark", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


currentQuestion.answers.forEach(answer =>{
  const button = document.createElement("button");
  button.innerHTML = answer.text;
  button.classList.add("btn");
  answerButtons.appendChild(button);
  if(answer.correct){
    button.dataset.correct = answer.correct;
  }
  button.addEventListener("click", selectAnswer);
  });

}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }else{
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Play Again!";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if (currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})


startQuiz();
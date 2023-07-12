let highScoresArray = [];

const btn = document.querySelector("button");
const timer = document.querySelector(".timer");
const mainHeading = document.querySelector("#main-heading");
const text = document.querySelector("#text");
const container = document.querySelector(".container");
const form = document.querySelector("form");
const answer = document.querySelector("#answer");
const input = document.querySelector("input");
const link = document.querySelector("a");
const buttonContainer = document.querySelector(".container-buttons");

const questions = [
  {
    question: "Which of the following is NOT a primitive data type in JavaScript?",
    answers: ["String", "SmallInt", "Number", "Boolean"],
    correctAnswer: 1,
  },
  {
    question: "How do you find the minimum of x and y using JavaScript?",
    answers: ["min(x, y)", "Math.min(xy)", "Math.min(x, y)", "min(xy)"],
    correctAnswer: 2,
  },
  {
    question: "What will the code return?\n(3 < 7)",
    answers: ["true", "false", "NaN", "Syntax Error"],
    correctAnswer: 0,
  },
  {
    question: "Which statement CANNOT be used to declare a variable in JavaScript?",
    answers: ["let", "let", "int", "const"],
    correctAnswer: 2,
  },
  {
    question: "What is the correct way to write an array in JavaScript?",
    answers: [
      'let colors = ["red", "green", blue"]',
      'let colors = (1:"red", 2:"green", 3:"blue")',
      'let colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
      'let colors = "red", "green", blue',
    ],
    correctAnswer: 0,
  },
  {
    question: "How do you round the number 7.25 to the nearest integer?",
    answers: ["round(7.25)", "Math.rnd(7.25)", "Math.round(7.25)", "rnd(7.25)"],
    correctAnswer: 2,
  },
  {
    question: "Which of the following is NOT a looping structure in JavaScript?",
    answers: ["for", "foreach", "while", "do-while"],
    correctAnswer: 1,
  },  
  {
    question:
      'How do you write a conditional statement for executing some statements only if "i" is equal to or greater than 5?',
    answers: [
      'if i >=5 then',
      'if (i >=5)',
      'if i >=5',
      'if i =<5',
    ],
    correctAnswer: 1,
  },
  {
    question:
      'How do you write a conditional statement for executing some statements only if variable x is equal to variable y?',
    answers: [
      'if (x equals y)',
      'if x=y then',
      'if (x == y)',
      'if x=y',
    ],
    correctAnswer: 2,
  },
   {
     question:
       'Which event occurs when the user clicks on an HTML element?',
     answers: [
       'onmouseclick',
       'onmouseover',
       'onclick',
       'onchange'
     ],
     correctAnswer:2
   }
];


let currentQuestionIndex = 0;
let randomizedQuestions = [];

btn.addEventListener("click", (e)=>{
  e.preventDefault();

  //Initializing clock as global variable to be used in other functions.
  clock = setInterval(decreaseTimer, 1000);

  displayQuestion();
});

link.addEventListener("click", function (event) {
  event.preventDefault();
  highScores();
});

// Toggles whether high score form is hidden or not based on form attribute "state"
toggleForm(form.getAttribute("state"));


function loseGame() {
  clearInterval(clock);
  clearButtons();
  timer.innerHTML = 0;
  mainHeading.innerHTML =
    "Sorry, you lost on time. Would you like to play again?";
  container.setAttribute("style", "align-items: center;");
  answer.style.display = "none";

  createButton("Play Again", function () {
    document.location.href = "./index.html";
  });
}

//Ticks down clock by 1 second. If timer reaches 0, the game is lost.
function decreaseTimer() {
  if (timer.innerHTML > 0) {
    timer.innerHTML -= 1;
  } else {
    loseGame();
  }
}

//Ticks down clock by 10 seconds for a wrong answer. If timer reaches 0, the game is lost.
function decreaseTimerBy10() {
  if (timer.innerHTML >= 10) {
    timer.innerHTML -= 10;
    wrongAnswer();
  } else {
    loseGame();
  }
}

function wrongAnswer() {
  answer.innerHTML = "Wrong answer!";
}

function correctAnswer() {
  answer.innerHTML = "Correct!";
}

//Creates a button in the main flexbox container with given text and callback function on click
function createButton(text, callback) {
  let button = document.createElement("button");
  button.innerHTML = text;
  button.addEventListener("click", callback);
  container.appendChild(button);
}

//Hides all buttons
function clearButtons() {
  let buttons = document.querySelectorAll("button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
}

// Toggles whether high score form is hidden or not based on form attribute "state"
function toggleForm(state) {
  if (state === "show") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

//Sorting function used for high scores (from StackOverflow)
function compare(a, b) {
  if (a.time > b.time) return -1;
  if (a.time < b.time) return 1;
  return 0;
}

//Gets high scores saved in local storage (if any) and appends high score to sorted array, which is then saved in local storage
function saveScore() {
  if (localStorage.getItem("scores")) {
    highScoresArray = JSON.parse(localStorage.getItem("scores"));
  }
  highScoresArray.push({
    initials: input.value.toUpperCase().slice(0, 2),
    time: timer.innerHTML,
  });
  localStorage.setItem("scores", JSON.stringify(highScoresArray.sort(compare)));

  highScores();
}

function renderScores(scores) {
  if (scores) {
    for (i = 0; i < scores.length; i++) {
      let initials = document.createElement("span");
      let time = document.createElement("span");

      initials.innerHTML = scores[i].initials;
      time.innerHTML = scores[i].time + "s";

      //Creates a container for high scores and appends each high score within
      let containerScores = document.createElement("div");
      containerScores.setAttribute("class", ".container-scores");
      document.querySelector(".container-scores").appendChild(containerScores);
      containerScores.appendChild(initials);
      containerScores.appendChild(time);
    }
  } else {
    //Removes empty container in case of no high scores to clear screen space
    document.querySelector(".container-scores").remove();
  }
}

//Shows the high scores page
function highScores() {
  container.setAttribute("style", "align-items: center;");
  text.setAttribute("style", "display: none");
  answer.innerHTML = "";
  mainHeading.innerHTML = "HIGH SCORES";
  document.querySelector("a").remove();
  document.querySelector("p").style.display = "none";

  clearButtons();

  //Hides form for entering initials
  form.setAttribute("state", "hidden");
  toggleForm(form.getAttribute("state"));

  //Creates a link in the header to return to home page
  let a = document.createElement("a");
  a.innerHTML = "Take Quiz";
  a.setAttribute("href", "./index.html");
  document.querySelector("header").appendChild(a);

  //Renders high scores to the page using scores saved in local storage (if any)
  renderScores(JSON.parse(localStorage.getItem("scores")));

  //Clears high scores from local storage
  createButton("Clear Scores", function () {
    localStorage.clear();
    renderScores(localStorage.getItem("scores"));
  });

  createButton("Go Back", function () {
    document.location.href = "./index.html";
  });
}

function getHighScore() {
  answer.innerHTML = "";
  mainHeading.innerHTML = `Your high score is: ${timer.innerHTML}s`;
  text.innerHTML = "Please enter your initials and click Submit.";
  text.setAttribute("style", "display: contents");
  container.setAttribute("style", "align-items: center;");

  clearButtons();

  clearInterval(clock);

  //Shows form for entering initials
  form.setAttribute("state", "show");
  toggleForm(form.getAttribute("state"));

  //Creates button to go back to home page
  let back = document.createElement("button");
  back.innerHTML = "Go Back";
  back.addEventListener("click", function () {
    document.location.href = "./index.html";
  });
  buttonContainer.appendChild(back);

  //Creates button to submit form and save high score to local storage
  let submit = document.createElement("button");
  submit.innerHTML = "Submit";
  submit.addEventListener("click", function (event) {
    //Prevents page refresh on click
    event.preventDefault();

    saveScore();
  });
  buttonContainer.appendChild(submit);

  //Saves high score to local storage if entering via keyboard
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      saveScore();
    }
  });
}


function displayQuestion() {
  if (currentQuestionIndex === 0) {
    randomizedQuestions = [...questions].sort(() => Math.random() - 0.5);
  }
  
  const currentQuestion = randomizedQuestions[currentQuestionIndex];
  
  text.style.display = "none";
  btn.style.display = "none";
  
  container.setAttribute("style", "align-items: center;");
  
  mainHeading.innerHTML = currentQuestion.question;
  
  clearButtons();
  
  // Randomize the order of the answers
  const randomizedAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);
  
  // Find the index of the correct answer in the randomized answers array
  const correctAnswerIndex = randomizedAnswers.findIndex(
    (answer) => answer === currentQuestion.answers[currentQuestion.correctAnswer]
  );
  
  randomizedAnswers.forEach((answer, index) => {
    if (index === correctAnswerIndex) {
      createButton(answer, nextQuestion);
    } else {
      createButton(answer, decreaseTimerBy10);
    }
  });
}
function nextQuestion() {
  correctAnswer();
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    getHighScore();
  }
}

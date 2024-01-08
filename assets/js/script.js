//multiple choice questions getting from "https://www.interviewbit.com/javascript-mcq/"
var questions = [
	{
		question: "Javascript is an _______ language",
		answers: [
			{ choice: "1. Object-Oriented", id: "1" },
			{ choice: "2. Object-Based", id: "2" },
			{ choice: "3. Procedural", id: "3" },
			{ choice: "4. None of the above", id: "4" },
		],
		hit: "1",
	},

	{
		question:
			"Which of the following keywords is used to define a variable in Javascript?",
		answers: [
			{ choice: "1. var", id: "1" },
			{ choice: "2. let", id: "2" },
			{ choice: "3. Both A and B", id: "3" },
			{ choice: "4. None of the above", id: "4" },
		],
		hit: "3",
	},

	{
		question:
			"How can a datatype be declared to be a constant type?",
		answers: [
			{ choice: "1. const", id: "1" },
			{ choice: "2. var", id: "2" },
			{ choice: "3. let", id: "3" },
			{ choice: "4. constant", id: "4" },
		],
		hit: "1",
	},

	{
		question: "What keyword is used to check whether a given property is valid or not?",
		answers: [
			{ choice: "1. in", id: "1" },
			{ choice: "2. is in", id: "2" },
			{ choice: "3. exists", id: "3" },
			{ choice: "4. lies", id: "4" },
		],
		hit: "1",
	},

	{
		question: "Which of the following are closures in Javascript?",
		answers: [
			{ choice: "1. Node", id: "1" },
			{ choice: "2. Vue", id: "2" },
			{ choice: "3. React", id: "3" },
			{ choice: "4. Cassandra", id: "4" },
		],
		hit: "4",
	},
];

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

// Quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Start quiz and hide frontpage

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and deduct time for wrong answer, go to next question

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackEl.style.color = "red";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// End quiz by hiding questions, stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save score in local storage along with users' name

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;

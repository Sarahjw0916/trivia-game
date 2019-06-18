var triviaQuestions = [
  {
    question:
      "In the world of Legend of Zelda, what is the first game within the timeline?",
    answerList: [
      "Twilight Princess",
      "Skyward Sword",
      "The Adventure of Link",
      "Ocarina of Time"
    ],
    answer: 1
  },
  {
    question:
      "What is the name of the creatures on the mountain that glow blue at night in Breath of the Wild?",
    answerList: ["Korok", "Stahls", "Blupees", "Satori"],
    answer: 2
  },
  {
    question:
      "What is the name of the large birds you can ride in Skyward Sword?",
    answerList: ["Kass", "Medohs", "Ritos", "Loftwings"],
    answer: 3
  },
  {
    question: "What region is Death Mountain found in?",
    answerList: ["Hebra", "Eldin", "Lanaryu", "Faron"],
    answer: 1
  },
  {
    question: "Which of these has NOT been a companion of Link?",
    answerList: ["Hilda", "Fi", "Tatl", "King of Red Lions"],
    answer: 0
  },
  {
    question:
      "How many Zelda games are there currently? Main games and spinoffs(June 2019)",
    answerList: ["22", "10", "14", "28"],
    answer: 3
  },
  {
    question: "Which game is getting a remake coming out this year?",
    answerList: [
      "Majoras Mask",
      "A Link between Worlds",
      "Links Awakening",
      "A Link to the Past"
    ],
    answer: 2
  },
  {
    question:
      "Link has only spoken twice, saying 'Come on!' as a co-op character in Windwaker and ____ in Twilight Princess?",
    answerList: ["Let's go.", "Duck!", "Watch out!", "Giddy up!"],
    answer: 3
  },
  {
    question: "What is the name of the main villain through the game series?",
    answerList: ["Ghirahim", "Ganon", "Yuga", "Zant"],
    answer: 1
  },
  {
    question: "What is Link's portion of the triforce?",
    answerList: ["Power", "Wisdom", "Courage", "none of the above"],
    answer: 2
  },
  {
    question: "Which popular side character has 4 spinoff games?",
    answerList: ["Midna", "Revali", "Medli", "Tingle"],
    answer: 3
  },
  {
    question: "what year was the first Legend of Zelda game released?",
    answerList: ["1990", "1986", "1987", "1995"],
    answer: 1
  },
  {
    question: "What movie did they get inspiration for Links appearance?",
    answerList: ["Laura Croft", "Indiana Jones", "Peter Pan", "Twilight"],
    answer: 3
  },
  {
    question: "Which of the following is NOT an island in Phantom Hourglass?",
    answerList: [
      "Spirit Island",
      "Isle of Gust",
      "Star Island",
      "Goron Island"
    ],
    answer: 2
  },
  {
    question:
      "What is the name of the leader of the Bomber's in Majora's Mask?",
    answerList: ["Tim", "Benny", "Jake", "Jim"],
    answer: 3
  }
];

var gifArray = [
  "question1",
  "question2",
  "question3",
  "question4",
  "question5",
  "question6",
  "question7",
  "question8",
  "question9",
  "question10",
  "question11",
  "question12",
  "question13",
  "question14",
  "question15"
];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
  correct: "Yes, that's right!",
  incorrect: "No, that's not it.",
  endTime: "Out of time!",
  finished: "Alright! Let's see how well you did."
};

$("#startBtn").on("click", function() {
  $(this).hide();
  newGame();
});
console.log(newGame());
$("#startOverBtn").on("click", function() {
  $(this).hide();
  newGame();
});

function newGame() {
  $("#finalMessage").empty();
  $("#correctAnswers").empty();
  $("#incorrectAnswers").empty();
  $("#unanswered").empty();
  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  newQuestion();
}

function newQuestion() {
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#gif").empty();
  answered = true;

  //sets up new questions & answerList
  $("#currentQuestion").html(
    "Question #" + (currentQuestion + 1) + "/" + triviaQuestions.length
  );
  $(".question").html(
    "<h2>" + triviaQuestions[currentQuestion].question + "</h2>"
  );
  for (var i = 0; i < 4; i++) {
    var choices = $("<div>");
    choices.text(triviaQuestions[currentQuestion].answerList[i]);
    choices.attr({ "data-index": i });
    choices.addClass("thisChoice");
    $(".answerList").append(choices);
  }
  countdown();
  //clicking an answer will pause the time and setup answerPage
  $(".thisChoice").on("click", function() {
    userSelect = $(this).data("index");
    clearInterval(time);
    answerPage();
  });
}

function countdown() {
  seconds = 15;
  $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
  answered = true;
  //sets timer to go down
  time = setInterval(showCountdown, 1000);
}

function showCountdown() {
  seconds--;
  $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
  if (seconds < 1) {
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage() {
  $("#currentQuestion").empty();
  $(".thisChoice").empty(); //Clears question page
  $(".question").empty();

  var rightAnswerText =
    triviaQuestions[currentQuestion].answerList[
      triviaQuestions[currentQuestion].answer
    ];
  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
  $("#gif").html(
    '<img src = "assets/images/' +
      gifArray[currentQuestion] +
      '.gif" width = "400px">'
  );
  //checks to see correct, incorrect, or unanswered
  if (userSelect == rightAnswerIndex && answered == true) {
    correctAnswer++;
    $("#message").html(messages.correct);
  } else if (userSelect != rightAnswerIndex && answered == true) {
    incorrectAnswer++;
    $("#message").html(messages.incorrect);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
  } else {
    unanswered++;
    $("#message").html(messages.endTime);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
    answered = true;
  }

  if (currentQuestion == triviaQuestions.length - 1) {
    setTimeout(scoreboard, 5000);
  } else {
    currentQuestion++;
    setTimeout(newQuestion, 5000);
  }
}

function scoreboard() {
  $("#timeLeft").empty();
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#gif").empty();

  $("#finalMessage").html(messages.finished);
  $("#correctAnswers").html("Correct Answers: " + correctAnswer);
  $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
  $("#unanswered").html("Unanswered: " + unanswered);
  $("#startOverBtn").addClass("reset");
  $("#startOverBtn").show();
  $("#startOverBtn").html("Start Over?");
}

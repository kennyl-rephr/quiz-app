const QUIZ = {
  currentQuestion: 0,
  totalQuestions: 5,
  correctAnswers: 0,
  questions: [
    { name: "1. which country is the wine Bourdeaux from?", options: ["USA","Canada","France","Italy"], answer: 3, submittedAnswer: 1},
    { name: "2. In addition to California, Chardonnay is also commonly produced in:", options: ["Tuscany","Oregon","New Zealand","Burgandy"], answer: 4, submittedAnswer: 1},
    { name: "3. Champagne is only produced in", options: ["Italy","France","Spain","USA"], answer: 2, submittedAnswer: 1},
    { name: "4. how long is a bottle of opened red wine good for before it oxidizes and deteriorates?", options: ["24 hours","2-3 days","1 week","2 weeks"], answer: 2, submittedAnswer: 1},
    { name: "5. why should you always hold the wine glass by the stem, and not the bowl?", options: ["basic dining etiquatte","avoid dirtying wine glass","avoid changing the temperature of the wine","looks cooler"], answer: 3, submittedAnswer: 1},
  ]
};

function showBeginButton() {
  // display the button
  $("#js-btn-begin-quiz").removeClass("hidden");
  // hide progress tracker
  $("#js-progress-container").addClass("hidden");
}

function generateSummary() {
  let summaryString = "";

  for (i=0; i < QUIZ.totalQuestions; i++ ) {
    let question = QUIZ.questions[i];
    let correctAnswer = question.options[question.answer-1]
    summaryString += `<div>${question.name}<br/>correct answer: ${correctAnswer}<br/></div>`
  }
  $("#js-detailed-summary")[0].innerHTML = summaryString;
  console.log(summaryString);
  console.log($("#js-detailed-summary"));
}

function handleBeginQuiz() {
  $("#js-btn-begin-quiz").click(function(event) {
    // hide begin button
    $(this).toggleClass("hidden");
    //reset QUIZ stats
    QUIZ.correctAnswers = 0;
    QUIZ.currentQuestion = 0;
    //hide summary if it's showing
    $("#js-results-container").addClass("hidden");
    // show the form
    $(".js-quiz-form").toggleClass("hidden");
    // show progress container
    $("#js-progress-container").toggleClass("hidden");
    // initialize progress container
    $("#js-current-question").text(QUIZ.currentQuestion+1);
    $("#js-correct-answers").text(QUIZ.correctAnswers);
    $("#js-total-questions").text(QUIZ.totalQuestions);
    // show question 1
    showNextQuestion();
  })
}

function handleNextQuestion() {
  $("#js-btn-next-question").click(function(event) {
    // hide answer feedback
    $("#js-answer-feedback").css("visibility", "hidden");
    // set radio button checked to 1st option
    $("#js-option1").prop("checked", true)
    //enable submit button
    $("#js-btn-submit").attr("disabled", false);

    // if this is final question, show summary
    // otherwise, next question
    if (QUIZ.currentQuestion + 1 === QUIZ.totalQuestions) {
      showSummary();
    } else {
      QUIZ.currentQuestion ++;
      showNextQuestion();
    }
  });
}

function showSummary() {
  //hide quiz
  $(".js-quiz-form").toggleClass("hidden");
  // hide next question button
  $("#js-btn-next-question").css("visibility","hidden");
  //show results
  $("#js-results-container").toggleClass("hidden");
  let results = $("#js-quiz-results");
  results.text(`your total score is ${QUIZ.correctAnswers}/${QUIZ.totalQuestions}`);
  generateSummary();
  // give option to start quiz again
  // change button name to "restart quiz"
  $("#js-btn-begin-quiz").text("restart quiz");
  showBeginButton();
}

function handleAnswerSubmit() {
  $(".js-quiz-form").submit(function(event) {
    // stop form from submitting
    event.preventDefault();
    // console.log($("input[name='options']:checked").val());
    // check the answer and display feedback
    let userAnswer = $("input[name='options']:checked").val();
    let currentQuestion = QUIZ.questions[QUIZ.currentQuestion];
    if(userAnswer == currentQuestion.answer) {

      $("#js-answer-feedback").removeClass();
      $("#js-answer-feedback").css("visibility", "visible");
      $("#js-answer-feedback").text("your answer is correct!")
      $("#js-answer-feedback").addClass("correct");

      QUIZ.correctAnswers++;
    } else {

      $("#js-answer-feedback").removeClass();
      $("#js-answer-feedback").css("visibility", "visible");
      $("#js-answer-feedback").text(`your answer is incorrect.\nthe correct answer is ${currentQuestion.options[currentQuestion.answer-1]}`)
      $("#js-answer-feedback").addClass("incorrect");

    }

    //save submitted answer
    QUIZ.

    //update progress tracker

    $("#js-correct-answers").text(QUIZ.correctAnswers);
    $("#js-total-questions").text(QUIZ.totalQuestions);

    // show next question button
    $("#js-btn-next-question").css("visibility", "visible");

    //disable submit button
    $("#js-btn-submit").attr("disabled", true);

  });
}

function showNextQuestion() {
  // hide next question button
  $("#js-btn-next-question").css("visibility", "hidden");
  // check which question we at
  let currentQuestion = QUIZ.questions[QUIZ.currentQuestion];

  let title = $("#js-question-title");
  // get handle for question Title
  let option1 = $("#js-label-option1");
  let option2 = $("#js-label-option2");
  let option3 = $("#js-label-option3");
  let option4 = $("#js-label-option4");

  //change all of the above to new question
  title.text(currentQuestion.name);
  option1.text(currentQuestion.options[0]);
  option2.text(currentQuestion.options[1]);
  option3.text(currentQuestion.options[2]);
  option4.text(currentQuestion.options[3]);

  //update progress tracker
  $("#js-current-question").text(QUIZ.currentQuestion+1);

}

$(function() {
  //when document is ready, show a begin quiz button
  // when begin quizz button is clicked on, show question 1
  // when an answer is submitted, check answer and provide feedback. show button to next question
  // if next question button is pressed, show next question. if this is the last question, show quiz summary
  showBeginButton();
  handleBeginQuiz();
  handleNextQuestion();
  handleAnswerSubmit();
});

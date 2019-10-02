const QUIZ = {
  currentQuestion: 0,
  totalQuestions: 4,
  correctAnswers: 0,
  questions: [
    { name: "question 1 title", options: ["option 11","option 21","option 31","option 41"], answer: 1},
    { name: "question 2 title", options: ["option 12","option 22","option 32","option 42"], answer: 2},
    { name: "question 3 title", options: ["option 13","option 23","option 33","option 43"], answer: 3},
    { name: "question 4 title", options: ["option 14","option 24","option 34","option 44"], answer: 4},
  ]
};

function showBeginButton() {
  // display the button
  $(".js-quiz-container").append("<button type='button' id='js-btn-begin-quiz'>begin quiz</button>");
}

function handleBeginQuiz() {
  $("#js-btn-begin-quiz").click(function(event) {
    // hide begin button
    $(this).toggleClass("hidden");
    // show the form
    $(".js-quiz-form").toggleClass("hidden");
    // show question 1
    showNextQuestion();
  })
}

function showSummary() {
  let quiz = QUIZ;
  //hide quiz
  $(".js-quiz-form").toggleClass("hidden");
  //show results
  $("#js-results-container").toggleClass("hidden");
  let results = $("#js-quiz-results");  
  results.text(`your total score is ${quiz.correctAnswers}/${quiz.totalQuestions}`);

  //hide quiz
  //show button again
}

function handleAnswerSubmit() {
  console.log("in handleAnswerSubmit");
  $(".js-quiz-form").submit(function(event) {
    // stop form from submitting
    event.preventDefault();
    // console.log($("input[name='options']:checked").val());
    // check the answer and display feedback
    let quiz = QUIZ;
    let userAnswer = $("input[name='options']:checked").val();
    let currentQuestion = quiz.questions[quiz.currentQuestion];
    if(userAnswer == currentQuestion.answer) {
      alert("your answer is correct!");
      quiz.correctAnswers++;
    } else {
      alert(`your answer is incorrect.\nthe correct answer is ${currentQuestion.answer}`);
    }

    // if this is final question, show summary
    // otherwise, next question
    if (quiz.currentQuestion + 1 === quiz.totalQuestions) {
      showSummary();
    } else {
      quiz.currentQuestion ++;
      showNextQuestion();
    }

  });
}

function showNextQuestion() {
  // check which question we at
  let quiz = QUIZ;
  let currentQuestion = quiz.questions[quiz.currentQuestion];

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

}

$(function() {
  //when document is ready, show a begin quiz button
  // when begin quizz button is clicked on, show question 1
  // when an answer is submitted, check answer and provide feedback. show button to next question
  // if next question button is pressed, show next question. if this is the last question, show quiz summary
  showBeginButton();
  handleBeginQuiz();
  handleAnswerSubmit();
});

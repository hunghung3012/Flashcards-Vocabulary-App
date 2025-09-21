 let words = JSON.parse(localStorage.getItem("words")) || [];
    let remainingQuestions = [];
    let currentQuestion = null;
    let quizType = null;

    function startQuiz() {
      remainingQuestions = [...words];
      nextQuestion();
    }

    function nextQuestion() {
      $("#result").text("");
      $("#options").empty();
      $("#answer-input").hide().val("");
      $("#submit-btn").hide();
      $("#next-btn").hide();

      if (remainingQuestions.length === 0) {
        $("#question").text("🎉 Bạn đã hoàn thành quiz!");
        return;
      }

      let randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      currentQuestion = remainingQuestions.splice(randomIndex, 1)[0];

      quizType = Math.random() > 0.5 ? "choice" : "fill";
      let direction = Math.random() > 0.5 ? "en-vn" : "vn-en";

      if (quizType === "choice") {
        renderChoiceQuestion(direction);
      } else {
        renderFillQuestion(direction);
      }
    }

    function renderChoiceQuestion(direction) {
      let questionText, correctAnswer;
      if (direction === "en-vn") {
        questionText = `Từ "${currentQuestion.en}" nghĩa là gì?`;
        correctAnswer = currentQuestion.vn;
      } else {
        questionText = `Từ "${currentQuestion.vn}" trong tiếng Anh là gì?`;
        correctAnswer = currentQuestion.en;
      }

      $("#question").text(questionText);

      let options = [correctAnswer];
      while (options.length < 4) {
        let rand = words[Math.floor(Math.random() * words.length)];
        let opt = (direction === "en-vn") ? rand.vn : rand.en;
        if (!options.includes(opt)) {
          options.push(opt);
        }
      }

      options = options.sort(() => Math.random() - 0.5);
      const labels = ["A", "B", "C", "D"];

      options.forEach((opt, i) => {
        let $div = $("<div>")
          .addClass("option")
          .text(`${labels[i]}. ${opt}`)
          .on("click", function () {
            if (opt === correctAnswer) {
              $(this).addClass("correct");
              $("#result").text("✅ Chính xác!");
            } else {
              $(this).addClass("wrong");
              $("#result").text(`❌ Sai rồi. Đáp án đúng: ${correctAnswer}`);
            }
            disableOptions();
            $("#next-btn").show();
          });
        $("#options").append($div);
      });
    }

    function renderFillQuestion(direction) {
      let questionText, correctAnswer;
      if (direction === "en-vn") {
        questionText = `Điền nghĩa tiếng Việt của từ "${currentQuestion.en}"`;
        correctAnswer = currentQuestion.vn;
      } else {
        questionText = `Điền nghĩa tiếng Anh của từ "${currentQuestion.vn}"`;
        correctAnswer = currentQuestion.en;
      }

      $("#question").text(questionText);
      $("#answer-input").show();
      $("#submit-btn").show();

      $("#submit-btn").off("click").on("click", function () {
        let ans = $("#answer-input").val().trim().toLowerCase();
        if (ans === correctAnswer.toLowerCase()) {
          $("#result").text("✅ Chính xác!");
        } else {
          $("#result").text(`❌ Sai rồi. Đáp án đúng: ${correctAnswer}`);
        }
        $("#next-btn").show();
      });

      $("#answer-input").off("keypress").on("keypress", function (e) {
        if (e.which === 13) {
          $("#submit-btn").click();
        }
      });
    }

    function disableOptions() {
      $(".option").off("click");
    }

    $("#next-btn").on("click", nextQuestion);

    $(document).ready(function () {
      startQuiz();
    });
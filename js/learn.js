if (!localStorage.getItem("words")) {
    localStorage.setItem("words", JSON.stringify([
      { id: 1, en: "apple", vn: "quả táo", description: "A round fruit that is sweet and crunchy." },
      { id: 2, en: "dog", vn: "con chó", description: "A domestic animal, often kept as a pet." },
      { id: 3, en: "school", vn: "trường học", description: "A place where students go to learn." }
    ]));
  }

  let words = JSON.parse(localStorage.getItem("words"));
  let currentIndex = 0;

  function showWord() {
    if (currentIndex < words.length) {
      let currentWord = words[currentIndex];
      $("#word").text(`${currentWord.id}. ${currentWord.en}`);
      $("#meaning").html(`<strong>${currentWord.vn}</strong>`);
      $("#description").text(currentWord.description);
      $("#cardInner").removeClass("is-flipped");
      updateProgress();

      // Ẩn/hiện nút
      if (currentIndex === 0) {
        $("#backBtn").hide();
      } else {
        $("#backBtn").show();
      }
      $("#nextBtn").show();

    } else {
      // Khi hoàn thành
      $("#word").text("🎉 Finished!");
      $("#meaning").text("");
      $("#description").text("");
      $("#progressBar")
        .css("width", "100%")
        .text("Done!");

      // Chỉ hiển thị nút Back
      $("#backBtn").show();
      $("#nextBtn").hide();
    }
  }

  function updateProgress() {
    let percent = ((currentIndex + 1) / words.length) * 100;
    $("#progressBar")
      .css("width", percent + "%")
      .text(`${currentIndex + 1} / ${words.length}`);
  }

  // Sự kiện
  $("#cardInner").on("click", function () {
    $(this).toggleClass("is-flipped");
  });

  $("#nextBtn").on("click", function () {
    currentIndex++;
    showWord();
  });

  $("#backBtn").on("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      showWord();
    }
  });

  // Khởi chạy
  $(document).ready(function () {
    showWord();
  });
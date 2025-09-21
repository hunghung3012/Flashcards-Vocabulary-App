$(document).ready(function () {
    if (!localStorage.getItem("words")) {
      const sampleWords = [
        { id: 1, en: "apple", vn: "quả táo", description: "A round fruit that is sweet and crunchy." },
        { id: 2, en: "dog", vn: "con chó", description: "A domestic animal, often kept as a pet." },
        { id: 3, en: "school", vn: "trường học", description: "A place where students go to learn." },
        { id: 4, en: "book", vn: "quyển sách", description: "A set of printed pages bound together." },
        { id: 5, en: "car", vn: "xe hơi", description: "A road vehicle with four wheels powered by an engine." },
        { id: 6, en: "water", vn: "nước", description: "A transparent liquid essential for life." },
        { id: 7, en: "sun", vn: "mặt trời", description: "The star at the center of our solar system." },
        { id: 8, en: "computer", vn: "máy tính", description: "An electronic device for processing data." }
      ];
      localStorage.setItem("words", JSON.stringify(sampleWords));
    }
  });
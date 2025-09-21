  // Init data
    if (!localStorage.getItem("words")) {
      localStorage.setItem("words", JSON.stringify([
        { id: 1, en: "apple", vn: "quả táo", description: "A round fruit that is sweet and crunchy." },
        { id: 2, en: "dog", vn: "con chó", description: "A domestic animal, often kept as a pet." },
        { id: 3, en: "school", vn: "trường học", description: "A place where students go to learn." }
      ]));
    }

    let words = JSON.parse(localStorage.getItem("words")) || [];
    let editMode = false;

    // Render table
    function renderTable() {
      let tbody = $("#wordTableBody");
      tbody.empty();
      words.forEach(word => {
        tbody.append(`
          <tr>
            <td>${word.id}</td>
            <td>${word.en}</td>
            <td>${word.vn}</td>
            <td>${word.description || ""}</td>
            <td>
              <button class="btn btn-primary btn-sm editBtn" data-id="${word.id}">Edit</button>
              <button class="btn btn-danger btn-sm deleteBtn" data-id="${word.id}">Delete</button>
            </td>
          </tr>
        `);
      });
    }

    // Save local
    function saveLocal() {
      localStorage.setItem("words", JSON.stringify(words));
    }

    // Add/Edit word
    $("#wordForm").on("submit", function(e) {
      e.preventDefault();
      let id = $("#wordId").val();
      let en = $("#enInput").val().trim();
      let vn = $("#vnInput").val().trim();
      let desc = $("#descInput").val().trim();

      if (editMode) {
        let index = words.findIndex(w => w.id == id);
        words[index] = { id: parseInt(id), en, vn, description: desc };
      } else {
        let newId = words.length ? words[words.length - 1].id + 1 : 1;
        words.push({ id: newId, en, vn, description: desc });
      }

      saveLocal();
      renderTable();
      $("#wordModal").modal("hide");
      this.reset();
    });

    // Click Add
    $("[data-bs-target='#addWordModal']").on("click", function() {
      editMode = false;
      $("#modalTitle").text("Add New Word");
      $("#wordForm")[0].reset();
      $("#wordId").val("");
      $("#wordModal").modal("show");
    });

    // Click Edit
    $(document).on("click", ".editBtn", function() {
      editMode = true;
      let id = $(this).data("id");
      let word = words.find(w => w.id == id);
      $("#modalTitle").text("Edit Word");
      $("#wordId").val(word.id);
      $("#enInput").val(word.en);
      $("#vnInput").val(word.vn);
      $("#descInput").val(word.description);
      $("#wordModal").modal("show");
    });

    // Click Delete
    $(document).on("click", ".deleteBtn", function() {
      let id = $(this).data("id");
      if (confirm("Are you sure to delete this word?")) {
        words = words.filter(w => w.id != id);
        saveLocal();
        renderTable();
      }
    });

    renderTable();
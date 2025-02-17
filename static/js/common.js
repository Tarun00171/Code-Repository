document.addEventListener("DOMContentLoaded", function () {
    let addEntryBtn = document.getElementById("addEntry");
    let entryForm = document.getElementById("entryForm");
    let closeFormBtn = document.getElementById("closeForm");
    let saveEntryBtn = document.getElementById("saveEntry");
    let codeTable = document.getElementById("codeTable").querySelector("tbody");

    // Open entry form
    addEntryBtn.addEventListener("click", function () {
        entryForm.style.display = "block";
    });

    // Close entry form
    closeFormBtn.addEventListener("click", function () {
        entryForm.style.display = "none";
    });

    // Save new entry
    saveEntryBtn.addEventListener("click", function () {
        let password = document.getElementById("entryPassword").value;
        if (password !== "tarunKHARE@123@coderepository.in") {
            alert("Incorrect Password!");
            return;
        }

        let publisher = document.getElementById("publisher").value;
        let functionName = document.getElementById("functionName").value;
        let description = document.getElementById("description").value;
        let language = document.getElementById("language").value;
        let code = document.getElementById("codeInput").value;
        let prerequisites = document.getElementById("prerequisites").value;

        let newId = codeTable.children.length + 1;
        let row = codeTable.insertRow();
        row.innerHTML = `
            <td>${newId}</td>
            <td>${functionName}</td>
            <td>${language}</td>
            <td><button class="showCode">Show Code</button></td>
            <td>${publisher}</td>
        `;

        entryForm.style.display = "none";
    });

    // Search Functionality
    document.getElementById("search").addEventListener("input", function () {
        let filter = this.value.toLowerCase();
        let rows = codeTable.getElementsByTagName("tr");

        for (let row of rows) {
            let nameCol = row.cells[1]?.innerText.toLowerCase();
            let langCol = row.cells[2]?.innerText.toLowerCase();

            if (nameCol.includes(filter) || langCol.includes(filter)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    });

    // Show Code Modal
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("showCode")) {
            alert("Feature to view full code will be implemented soon!");
        }
    });
});

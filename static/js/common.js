document.addEventListener("DOMContentLoaded", function () {
    let addEntryBtn = document.getElementById("addEntry");
    let loginForm = document.getElementById("loginForm");
    let entryForm = document.getElementById("entryForm");
    let loginBtn = document.getElementById("loginBtn");
    let closeLoginBtn = document.getElementById("closeLogin");
    let closeFormBtn = document.getElementById("closeForm");
    let saveEntryBtn = document.getElementById("saveEntry");
    let codeTable = document.getElementById("codeTable").querySelector("tbody");

    let loggedIn = false;

    // Open login modal on "+" button click
    addEntryBtn.addEventListener("click", function () {
        if (!loggedIn) {
            loginForm.style.display = "block";
        } else {
            entryForm.style.display = "block";
        }
    });

    // Close login form
    closeLoginBtn.addEventListener("click", function () {
        loginForm.style.display = "none";
    });

    // Close entry form
    closeFormBtn.addEventListener("click", function () {
        entryForm.style.display = "none";
    });

    // Validate login credentials
    loginBtn.addEventListener("click", function () {
        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        fetch('storage/emails.txt')
        .then(response => response.text())
        .then(data => {
            let lines = data.split("\n");
            let validUser = lines.some(line => {
                let [storedEmail, storedPassword] = line.split(";");
                return storedEmail.trim() === email.trim() && storedPassword.trim() === password.trim();
            });

            if (validUser) {
                loggedIn = true;
                loginForm.style.display = "none";
                entryForm.style.display = "block";
            } else {
                alert("Invalid email or password!");
            }
        })
        .catch(error => console.error("Error loading credentials:", error));
    });

    // Save new entry
    saveEntryBtn.addEventListener("click", function () {
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

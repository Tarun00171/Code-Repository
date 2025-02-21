document.addEventListener("DOMContentLoaded", function () {
    let codeTable = document.getElementById("codeTable").querySelector("tbody");
    let saveEntryBtn = document.getElementById("saveEntry");
    let loginForm = document.getElementById("loginForm");
    let entryForm = document.getElementById("entryForm");
    let loginBtn = document.getElementById("loginBtn");
    let closeFormBtn = document.getElementById("closeForm");
    let addEntryBtn = document.getElementById("addEntry");

    let loggedInUserId = null;

    // Open login modal
    addEntryBtn.addEventListener("click", function () {
        loginForm.style.display = "block";
    });

    // Handle Login
    loginBtn.addEventListener("click", function () {
        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        fetch('/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.user_id) {
                loggedInUserId = data.user_id;
                loginForm.style.display = "none";
                entryForm.style.display = "block";
            } else {
                alert("Login failed! " + data.error);
            }
        });
    });

    // Save New Code Entry
    saveEntryBtn.addEventListener("click", function () {
        let functionName = document.getElementById("functionName").value;
        let language = document.getElementById("language").value;
        let code = document.getElementById("codeInput").value;
        let prerequisites = document.getElementById("prerequisites").value;

        fetch('/api/save_code', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: loggedInUserId, function_name: functionName, language, code, prerequisites })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            entryForm.style.display = "none";
            loadEntries();
        });
    });

    // Load Entries in Table
    function loadEntries() {
        fetch('/api/get_entries')
        .then(response => response.json())
        .then(entries => {
            codeTable.innerHTML = "";
            entries.forEach((entry, index) => {
                let row = codeTable.insertRow();
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${entry.function_name}</td>
                    <td>${entry.language}</td>
                    <td><button class="showCode" data-code="${entry.code}" data-lang="${entry.language}">Show Code</button></td>
                    <td>${entry.user_id}</td>
                `;
            });
        });
    }

    loadEntries();
});

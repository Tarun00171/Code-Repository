document.addEventListener("DOMContentLoaded", function () {
    let adminLoginBtn = document.getElementById("adminLoginBtn");
    let insertUserBtn = document.getElementById("insertUser");
    let saveChangesBtn = document.getElementById("saveChanges");
    let logoutAdmin = document.getElementById("logoutAdmin");
    let userTable = document.getElementById("userTable").querySelector("tbody");

    // Hardcoded Admin Credentials
    const adminEmail = "admin";
    const adminPassword = "admin@123";

    // Admin Login
    adminLoginBtn.addEventListener("click", function () {
        let enteredEmail = document.getElementById("adminEmail").value;
        let enteredPassword = document.getElementById("adminPassword").value;

        if (enteredEmail === adminEmail && enteredPassword === adminPassword) {
            document.getElementById("adminLogin").style.display = "none";
            document.getElementById("userManagementForm").style.display = "block";
            loadUsers();
        } else {
            document.getElementById("adminLoginError").textContent = "Invalid Admin Credentials!";
        }
    });

    // Load Users from MySQL
    function loadUsers() {
        fetch("/api/get_users")
            .then(response => response.json())
            .then(users => {
                users.forEach(user => {
                    addUserRow(user.publisher_name, user.email, user.password, user.state, user.id);
                });
            });
    }

    // Add User Row Function
    function addUserRow(publisher, email, password, state, userId) {
        let row = userTable.insertRow();
        row.dataset.userId = userId;
        row.innerHTML = `
            <td><input type="text" value="${publisher}"></td>
            <td><input type="email" value="${email}"></td>
            <td><input type="password" value="${password}"></td>
            <td>
                <select>
                    <option value="Active" ${state === "Active" ? "selected" : ""}>Active</option>
                    <option value="Hold" ${state === "Hold" ? "selected" : ""}>Hold</option>
                    <option value="Deactivated" ${state === "Deactivated" ? "selected" : ""}>Deactivated</option>
                </select>
            </td>
            <td><button class="removeRow">➖</button></td>
        `;
    }

    // Insert New User
    insertUserBtn.addEventListener("click", function () {
        addUserRow("", "", "", "Active", null);
    });

    // Logout Admin
    logoutAdmin.addEventListener("click", function () {
        document.getElementById("userManagementForm").style.display = "none";
        document.getElementById("adminLogin").style.display = "block";
    });

    // Load users on page load
    loadUsers();
});

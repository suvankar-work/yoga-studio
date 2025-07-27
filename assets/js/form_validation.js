

// ✅ Final form validation & auth logic with localStorage only
document.addEventListener("DOMContentLoaded", function () {
  // === Registration ===
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      document.getElementById("usernameError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("passwordError").textContent = "";
      document.getElementById("confirmPasswordError").textContent = "";

      let hasError = false;
      if (!username) {
        document.getElementById("usernameError").textContent = "Username is required";
        hasError = true;
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("emailError").textContent = "Valid email is required";
        hasError = true;
      }
      if (!password || password.length < 6) {
        document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
        hasError = true;
      }
      if (confirmPassword !== password) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match";
        hasError = true;
      }

      if (hasError) return;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const duplicateEmail = users.find(u => u.email === email);
      const duplicateUsername = users.find(u => u.username === username);

      if (duplicateEmail || duplicateUsername) {
        alert("Email or username already exists.");
        return;
      }

      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      window.location.href = "index.html?showLogin=true";
    });
  }



  // === Show Login Modal if ?showLogin=true ===
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("showLogin") === "true") {
    const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show();
    history.replaceState({}, document.title, "index.html");
  }

  // === Show Welcome User if Logged In ===
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loginBtn = document.getElementById("loginBtn");
  const userWelcomeBox = document.getElementById("userWelcomeBox");
  const userNameDisplay = document.getElementById("userNameDisplay");

  if (loggedInUser && userWelcomeBox && userNameDisplay) {
    if (loginBtn) loginBtn.classList.add("d-none");
    userWelcomeBox.classList.remove("d-none");
    userNameDisplay.textContent = loggedInUser;
  }

  // === Logout ===
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      location.reload();
    });
  }
});
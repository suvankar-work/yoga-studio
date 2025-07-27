document.addEventListener("DOMContentLoaded", function () {
  // =================== LOGIN / WELCOME ====================
  const loggedInUser = localStorage.getItem("loggedInUser");

  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const welcomeText = document.getElementById("welcomeText");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loggedInUser) {
    if (loginBtn) loginBtn.style.display = "none";
    if (registerBtn) registerBtn.style.display = "none";
    if (welcomeText) welcomeText.innerText = `Welcome, ${loggedInUser}`;
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("selectedPlan");
      localStorage.removeItem("selectedSlot");
      window.location.reload();
    });
  }

  // =================== REGISTER → OPEN LOGIN MODAL ====================
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("showLogin") === "true") {
    const loginModalEl = document.getElementById("loginModal");
    if (loginModalEl) {
      const loginModal = new bootstrap.Modal(loginModalEl);
      loginModal.show();

      // Clean URL
      if (window.history.replaceState) {
        const cleanURL = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanURL);
      }
    }
  }

  // =================== LOGIN FORM VALIDATION ====================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // 🔐 Important: prevent form reload!

      const usernameInput = document.getElementById("usernameLogin");
      const passwordInput = document.getElementById("passwordLogin");
      const usernameError = document.getElementById("usernameLoginError");
      const passwordError = document.getElementById("passwordLoginError");

      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      // Reset errors
      usernameError.textContent = "";
      passwordError.textContent = "";

      let hasError = false;

      if (!username) {
        usernameError.textContent = "Username or Email is required.";
        hasError = true;
      }

      if (!password) {
        passwordError.textContent = "Password is required.";
        hasError = true;
      }

      if (hasError) return; // 🔒 Stop here if validation failed

      // Check against stored users
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const matchedUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!matchedUser) {
        usernameError.textContent = "Invalid username or password.";
        return;
      }

      // Save login
      localStorage.setItem("loggedInUser", matchedUser.username);

      // Remember me
      if (document.getElementById("rememberMe").checked) {
        localStorage.setItem("rememberedUser", matchedUser.username);
      } else {
        localStorage.removeItem("rememberedUser");
      }

      // ✅ Login success - Redirect
      window.location.href = "index.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const statusMessage = document.getElementById("status-message");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const socialButtons = Array.from(document.querySelectorAll(".social-button"));

  const setStatus = (message, state) => {
    statusMessage.textContent = message;
    statusMessage.dataset.state = state;
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      navLinks.forEach((nav) => nav.classList.remove("is-active"));
      event.currentTarget.classList.add("is-active");
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = form.elements.namedItem("email");
    const passwordInput = form.elements.namedItem("password");

    const email = typeof emailInput?.value === "string" ? emailInput.value.trim() : "";
    const password = typeof passwordInput?.value === "string" ? passwordInput.value : "";

    if (!email || !password) {
      setStatus("Please fill in both fields before continuing.", "error");
      return;
    }

    setStatus("Login request prepared. Connect to your authentication API to continue.", "success");
  });

  socialButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const providerRaw = button.dataset.provider ?? "social";
      const provider = providerRaw.charAt(0).toUpperCase() + providerRaw.slice(1);
      setStatus(`${provider} login is not wired yet. Replace this placeholder when integrating.`, "info");
    });
  });
});

const year = document.querySelector("#year");
const form = document.querySelector("#contactForm");
const statusText = document.querySelector(".form-status");
const navbarCollapse = document.querySelector("#mainNavbar");

if (year) {
  year.textContent = new Date().getFullYear();
}

document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const activeCollapse = navbarCollapse || document.querySelector(".navbar-collapse");
    const collapse = activeCollapse ? bootstrap.Collapse.getInstance(activeCollapse) : null;

    if (collapse) {
      collapse.hide();
    }
  });
});

if (form && statusText) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    statusText.textContent = "Thanks. Your message is ready to be sent to Devlixe.";
    form.reset();
  });
}

const year = document.querySelector("#year");
const form = document.querySelector("#contactForm");
const statusText = document.querySelector(".form-status");
const navbarCollapse = document.querySelector("#mainNavbar");

year.textContent = new Date().getFullYear();

document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const collapse = bootstrap.Collapse.getInstance(navbarCollapse);

    if (collapse) {
      collapse.hide();
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusText.textContent = "Thanks. Your message is ready to be sent to Devlixe.";
  form.reset();
});

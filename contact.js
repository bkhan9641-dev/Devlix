// EmailJS credentials from your EmailJS dashboard.
const EMAILJS_PUBLIC_KEY = "xomR8eQFqJTeCW6KU";
const EMAILJS_SERVICE_ID = "service_zqgmfns";
const EMAILJS_TEMPLATE_ID = "template_9us9ed9";

const year = document.querySelector("#year");
const form = document.querySelector("#emailjsContactForm");
const sendButton = document.querySelector("#sendButton");
const statusText = document.querySelector("#emailStatus");
const navbarCollapse = document.querySelector("#contactNavbar");
const messageTime = document.querySelector("#messageTime");
const replyToEmail = document.querySelector("#replyToEmail");

// Keep the footer year current without editing the HTML every year.
year.textContent = new Date().getFullYear();

// EmailJS runs fully in the browser, so no backend server is needed.
emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY,
});

// Close the Bootstrap mobile menu after a navigation link is clicked.
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const collapse = bootstrap.Collapse.getInstance(navbarCollapse);

    if (collapse) {
      collapse.hide();
    }
  });
});

function showStatus(message, type) {
  statusText.textContent = message;
  statusText.className = `email-status mt-3 mb-0 ${type}`;
}

function setLoading(isLoading) {
  sendButton.disabled = isLoading;
  sendButton.textContent = isLoading ? "Sending..." : "Send Message";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  // Bootstrap validation prevents empty or invalid fields from being sent.
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    showStatus("Please complete all required fields correctly.", "error");
    return;
  }

  setLoading(true);
  showStatus("Sending your message...", "success");

  // These hidden fields are sent with the form and can be used in EmailJS.
  messageTime.value = new Date().toLocaleString();
  replyToEmail.value = form.elements.email.value.trim();

  // sendForm matches every form field's name attribute to EmailJS variables.
  // Your EmailJS template can use: {{name}}, {{email}}, {{reply_to}},
  // {{service}}, {{message}}, {{title}}, and {{time}}.
  emailjs
    .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
      publicKey: EMAILJS_PUBLIC_KEY,
    })
    .then((response) => {
      console.log("EmailJS success:", response);
      showStatus("Message sent successfully. We will contact you soon.", "success");
      form.reset();
      form.classList.remove("was-validated");
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      showStatus("Message could not be sent. Open the browser console for the EmailJS error details.", "error");
    })
    .finally(() => {
      setLoading(false);
    });
});

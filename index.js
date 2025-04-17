var navBar = document.getElementById("navbar");
window.onscroll = function() {
  if (window.scrollY > 22) {
    navBar.classList.add("scrolled");
  } else {
    navBar.classList.remove("scrolled");
  }
};


document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section"); // Get all sections
  const navLinks = document.querySelectorAll(".nav-link"); // Get all nav links

  function setActiveLink() {
      let scrollPosition = window.scrollY + 100; // Offset for smooth detection

      sections.forEach((section) => {
          if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
              let sectionId = section.getAttribute("id");

              navLinks.forEach((link) => {
                  link.classList.remove("active"); // Remove active class from all links
                  if (link.getAttribute("href").includes(sectionId)) {
                      link.classList.add("active"); // Add active class to the current link
                  }
              });
          }
      });
  }

  window.addEventListener("scroll", setActiveLink); // Run function on scroll
});




//Message API

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('formMessage');

  // Clear previous messages
  formMessage.innerHTML = '';

  // Frontend validation
  const nameRegex = /^[A-Za-z\s]+$/; // only letters and spaces
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!fullname) {
      formMessage.innerHTML = `<div class="alert alert-danger text-center">Full Name is required.</div>`;
      return;
  }

  if (!nameRegex.test(fullname)) {
      formMessage.innerHTML = `<div class="alert alert-danger text-center">Full Name must contain only letters and spaces.</div>`;
      return;
  }

  if (!email) {
      formMessage.innerHTML = `<div class="alert alert-danger text-center">Email is required.</div>`;
      return;
  }

  if (!emailRegex.test(email)) {
      formMessage.innerHTML = `<div class="alert alert-danger text-center">Please provide a valid email address.</div>`;
      return;
  }

  if (!message) {
      formMessage.innerHTML = `<div class="alert alert-danger text-center">Message cannot be empty.</div>`;
      return;
  }

  // Send data to API
  try {
      formMessage.innerHTML = '<div class="text-center">Sending... </div>';

      const response = await fetch('https://myportfolio-api-877i.onrender.com/message', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fullname, email, message })
      });

      const result = await response.json();

      if (response.ok) {
          formMessage.innerHTML = `<div class="alert alert-success text-center">Message sent! I will get back to you as soon as possible.</div>`;
          document.getElementById('contactForm').reset();
      } else {
          formMessage.innerHTML = `<div class="alert alert-danger text-center">${result.message}</div>`;
      }

  } catch (error) {
      formMessage.innerHTML = `<div class="alert alert-danger text-center">Something went wrong. Please try again later.</div>`;
      console.error('Error:', error);
  }
});
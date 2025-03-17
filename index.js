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

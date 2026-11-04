/* ══════════════════════════════════════════════════════════════════════════
   Sumaiya Fahmida Shifa — Personal Portfolio JavaScript
   Interactive theme switching, project filtering, menu toggles & form handling
   ══════════════════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // 1. Current Year Update
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Dark / Light Theme Toggle (Default is always Light)
  const themeToggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector("i");
    if (icon) {
      if (theme === "dark") {
        icon.className = "fas fa-sun";
        themeToggleBtn.setAttribute("aria-label", "Switch to Light Theme");
      } else {
        icon.className = "fas fa-moon";
        themeToggleBtn.setAttribute("aria-label", "Switch to Dark Theme");
      }
    }
  }

  // Initialize theme: Default is light unless explicitly set to dark
  let currentTheme = "light";
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      currentTheme = "dark";
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  } catch (e) {}
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      const isDark = root.getAttribute("data-theme") === "dark";
      const nextTheme = isDark ? "light" : "dark";

      if (nextTheme === "dark") {
        root.setAttribute("data-theme", "dark");
      } else {
        root.removeAttribute("data-theme");
      }

      updateThemeIcon(nextTheme);

      try {
        localStorage.setItem("theme", nextTheme);
      } catch (e) {
        console.error("Could not save theme preference:", e);
      }
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileToggleBtn = document.getElementById("mobile-toggle");
  const navbar = document.getElementById("navbar");

  if (mobileToggleBtn && navbar) {
    mobileToggleBtn.addEventListener("click", function () {
      navbar.classList.toggle("active");
      const icon = mobileToggleBtn.querySelector("i");
      if (icon) {
        if (navbar.classList.contains("active")) {
          icon.className = "fas fa-times";
        } else {
          icon.className = "fas fa-bars";
        }
      }
    });

    // Close menu when link is clicked
    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        navbar.classList.remove("active");
        const icon = mobileToggleBtn.querySelector("i");
        if (icon) icon.className = "fas fa-bars";
      });
    });
  }

  // 4. Project Category Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((b) => b.classList.remove("active"));
      // Add active to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("hidden");
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.transition = "all 0.4s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 5. Active Navbar Link Highlighting on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll, { passive: true });

  // 6. Copy Email to Clipboard
  const copyBtns = document.querySelectorAll("[data-copy]");

  copyBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const emailText = this.getAttribute("data-copy");

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText).then(showCopySuccess).catch(fallbackCopy);
      } else {
        fallbackCopy(emailText);
      }

      function showCopySuccess() {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = "var(--accent-color)";
        btn.style.color = "#ffffff";
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.background = "";
          btn.style.color = "";
        }, 2000);
      }

      function fallbackCopy(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          showCopySuccess();
        } catch (err) {
          alert("Email: " + text);
        }
        document.body.removeChild(textarea);
      }
    });
  });

  // 7. Contact Form Handling
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent = "Please fill in all required fields.";
          formStatus.style.color = "var(--secondary-accent)";
        }
        return;
      }

      // Compose mailto link
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:famidasumaiya765@gmail.com?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.textContent = "Opening your email app to send the message...";
        formStatus.style.color = "var(--accent-color)";
      }

      // Open email client
      window.location.href = mailtoUrl;

      // Reset form after short delay
      setTimeout(() => {
        contactForm.reset();
        if (formStatus) {
          formStatus.textContent = "Thank you! I will get back to you soon.";
          formStatus.style.color = "#10b981";
        }
      }, 2000);
    });
  }
});

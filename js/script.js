async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (el) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      el.innerHTML = await response.text();
    } catch (err) {
      console.error(err);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "header.html");
  loadComponent("footer", "footer.html");

  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");

  if (btnNavEl) {
    btnNavEl.addEventListener("click", function () {
      headerEl.classList.toggle("nav-open");
    });
  }

  // SMOOTH SCROLLING ANIMATION
  const allLinks = document.querySelectorAll(".logo-scroll");

  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");
      console.log(href);

      // Scroll back to top
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Scroll to other section
      if (href !== "#" && href.startsWith("#")) {
        const sectionEl = document.querySelector(href);
        if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile nav
      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.remove("nav-open");
      }
    });
  });

  // STICKY NAVIGATION
  const sectionHeroEl = document.querySelector(".section-hero");

  if (sectionHeroEl) {
    const obs = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];
        if (!ent.isIntersecting) {
          document.body.classList.add("sticky");
        } else {
          document.body.classList.remove("sticky");
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px",
      }
    );

    obs.observe(sectionHeroEl);
  }
});

// Handle dropdown toggle on click
document.querySelectorAll(".nav-dropdown > a").forEach(dropLink => {
  dropLink.addEventListener("click", function (e) {
    e.preventDefault();

    // Close other open dropdowns first
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      if (menu !== this.nextElementSibling) {
        menu.style.display = "none";
      }
    });

    // Toggle this one
    const dropdown = this.nextElementSibling;
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });
});

// Optional: Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".nav-dropdown")) {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      menu.style.display = "none";
    });
  }
});



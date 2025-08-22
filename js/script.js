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

document.addEventListener("DOMContentLoaded", async () => {
  // Load header & footer first
  await loadComponent("header", "header.html");
  await loadComponent("footer", "footer.html");

  const headerEl = document.querySelector(".header");
  const btnNavEl = document.querySelector(".btn-mobile-nav");

  // Mobile nav toggle
  if (btnNavEl) {
    btnNavEl.addEventListener("click", function () {
      headerEl.classList.toggle("nav-open");
    });
  }

  // Smooth scrolling for links
  document.querySelectorAll(".logo-scroll").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");

      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (href.startsWith("#")) {
        const sectionEl = document.querySelector(href);
        if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth" });
      }

      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.remove("nav-open");
      }
    });
  });

  // Dropdown toggle
  document.querySelectorAll(".nav-dropdown > a").forEach(dropLink => {
    dropLink.addEventListener("click", function (e) {
      e.preventDefault();

      // Close other open dropdowns
      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if (menu !== this.nextElementSibling) {
          menu.style.display = "none";
        }
      });

      // Toggle current one
      const dropdown = this.nextElementSibling;
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-dropdown")) {
      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.style.display = "none";
      });
    }
  });

  // Page transition links
  const main = document.querySelector("main");

  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || link.target === "_blank") return;

    link.addEventListener("click", e => {
      if (link.hostname === window.location.hostname) {
        e.preventDefault();
        main.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });

  // Reset transition on load
  main.classList.remove("fade-out");
});

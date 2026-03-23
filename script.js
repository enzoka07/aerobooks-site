(function () {
  const root = document.documentElement;
  const savedLang = localStorage.getItem("aerobooks-lang") || "en";
  const savedTheme = localStorage.getItem("aerobooks-theme") || "auto";

  function applyLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach((el) => {
      el.classList.toggle("hide", el.getAttribute("data-lang") !== lang);
    });

    document.querySelectorAll("[data-lang-button]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang-button") === lang);
      btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
    });

    document.documentElement.setAttribute("lang", lang === "de" ? "de" : "en");
    localStorage.setItem("aerobooks-lang", lang);
  }

  function applyTheme(theme) {
    if (theme === "auto") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }

    document.querySelectorAll("[data-theme-button]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-theme-button") === theme);
      btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
    });

    localStorage.setItem("aerobooks-theme", theme);
  }

  document.addEventListener("click", (event) => {
    const langButton = event.target.closest("[data-lang-button]");
    const themeButton = event.target.closest("[data-theme-button]");

    if (langButton) {
      applyLanguage(langButton.getAttribute("data-lang-button"));
    }

    if (themeButton) {
      applyTheme(themeButton.getAttribute("data-theme-button"));
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(savedLang);
    applyTheme(savedTheme);
  });
})();

(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const storageKey = "ongky-profile-theme";

  if (!toggle) return;

  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme === "dark" || savedTheme === "light") {
      root.dataset.theme = savedTheme;
    }
  } catch {
    // Tema tetap dapat diganti jika penyimpanan browser tidak tersedia.
  }

  const syncToggle = () => {
    const isDark = root.dataset.theme === "dark";
    const label = toggle.querySelector(".theme-toggle__label");
    const icon = toggle.querySelector(".theme-toggle__icon");

    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Aktifkan tema terang" : "Aktifkan tema gelap");
    if (label) label.textContent = isDark ? "Mode terang" : "Mode gelap";
    if (icon) icon.textContent = isDark ? "☀" : "◐";
    if (themeColor) themeColor.setAttribute("content", isDark ? "#0b1421" : "#f3f6fb");
  };

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;

    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Perubahan tema tetap berlaku untuk halaman yang sedang dibuka.
    }

    syncToggle();
  });

  syncToggle();
})();

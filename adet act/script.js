/* ==========================================================
   script.js
   Features: dark/light mode toggle + mobile hamburger menu
   ========================================================== */

// Grab the elements we need from the page
const root = document.documentElement;                    // <html> element, holds the data-theme attribute
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

/**
 * Applies a theme ("light" or "dark") to the page
 * and updates the toggle button text to match.
 */
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  // The button shows the theme you will switch TO
  themeLabel.textContent = theme === "dark" ? "Light" : "Dark";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
}

/**
 * Switches between light and dark, then remembers the choice
 * so it is still there the next time the page opens.
 */
function toggleTheme() {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (error) {
    // Storage can be blocked; the toggle still works without saving
  }
}

/**
 * Picks the starting theme: saved choice first,
 * otherwise the visitor's system preference.
 */
function loadInitialTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (error) {
    // Ignore storage errors and fall back to system preference
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
}

/**
 * Shows or hides the navigation on small screens
 * and keeps the aria attributes in sync for screen readers.
 */
function toggleMenu() {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

/**
 * Closes the mobile menu (used after a nav link is clicked).
 */
function closeMenu() {
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open menu");
}

// Wire up the events
themeToggle.addEventListener("click", toggleTheme);
menuBtn.addEventListener("click", toggleMenu);

// Close the menu when any nav link is clicked
nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Set the theme as soon as the page loads
loadInitialTheme();
// Console + variables
console.log("script.js loaded ✅");
console.log("Page is ready.");
console.log("Waiting for user interaction...");

const body = document.body;
let clickCount = 0;
let isDarkMode = false;

// Functions
function applyTheme() {
  if (isDarkMode) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
}

function setTheme() {
  isDarkMode = !isDarkMode;
  applyTheme();

  if (isDarkMode) {
    localStorage.setItem("portfolio_theme", "dark");
  } else {
    localStorage.setItem("portfolio_theme", "light");
  }

  console.log("Theme toggled. Dark mode:", isDarkMode);
}

function handleCountClick() {
  clickCount++;
  console.log("Button clicked. Count =", clickCount);

  const countText = document.getElementById("countText");
  if (countText) {
    countText.textContent = "Clicks: " + clickCount;
  }
}

function setLastUpdated() {
  const lastUpdated = document.getElementById("lastUpdated");
  if (!lastUpdated) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  lastUpdated.textContent = "Last updated: " + year + "-" + month + "-" + day;
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("portfolio_theme");

  if (savedTheme === "dark") {
    isDarkMode = true;
  } else {
    isDarkMode = false;
  }

  applyTheme();
  console.log("Saved theme loaded:", savedTheme);
}

// Events
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded ✅");

  loadSavedTheme();
  setLastUpdated();

  const themeBtn = document.getElementById("themeBtn");
  const countBtn = document.getElementById("countBtn");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      console.log("Theme button clicked");
      setTheme();
    });
  } else {
    console.log("themeBtn not found");
  }

  if (countBtn) {
    countBtn.addEventListener("click", function () {
      handleCountClick();
    });
  } else {
    console.log("countBtn not found");
  }
});
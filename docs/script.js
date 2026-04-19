console.log("script.js loaded ✅");

const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const countBtn = document.getElementById("countBtn");
const countText = document.getElementById("countText");
const lastUpdated = document.getElementById("lastUpdated");

let clickCount = 0;
let isDarkMode = false;

function updateThemeButton() {
  if (isDarkMode) {
    themeBtn.textContent = "Light Mode";
  } else {
    themeBtn.textContent = "Dark Mode";
  }
}

function applyTheme() {
  if (isDarkMode) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
  updateThemeButton();
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  applyTheme();

  if (isDarkMode) {
    localStorage.setItem("portfolio_theme", "dark");
  } else {
    localStorage.setItem("portfolio_theme", "light");
  }
}

function handleCountClick() {
  clickCount++;
  countText.textContent = "Clicks: " + clickCount;
}

function setLastUpdated() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  lastUpdated.textContent = "Last updated: " + year + "-" + month + "-" + day;
}

function loadTheme() {
  const savedTheme = localStorage.getItem("portfolio_theme");
  isDarkMode = savedTheme === "dark";
  applyTheme();
}

document.addEventListener("DOMContentLoaded", function () {
  loadTheme();
  setLastUpdated();

  themeBtn.addEventListener("click", toggleTheme);
  countBtn.addEventListener("click", handleCountClick);
});
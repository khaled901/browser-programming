// Console + variables
console.log("script.js loaded ✅");
console.log("Page is ready.");
console.log("Waiting for user interaction...");

const body = document.body; // variable
let clickCount = 0;         // state variable
let isDarkMode = false;     // state variable

// Functions
function setTheme() {
  isDarkMode = !isDarkMode;
  body.classList.toggle("dark");
  console.log("Theme toggled. Dark mode:", isDarkMode);
}

function handleCountClick() {
  clickCount++;
  console.log("Button clicked. Count =", clickCount);

  const countText = document.getElementById("countText");
  if (countText) countText.textContent = "Clicks: " + clickCount;
}

// Events
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded ✅");

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

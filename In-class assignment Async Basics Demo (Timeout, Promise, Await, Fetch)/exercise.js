// Get references to UI elements
const output = document.getElementById("output");
const statusText = document.getElementById("status");

// Helper function to print text
function log(message) {
    output.textContent += message + "\n";
}

// Helper function to clear output
function clearOutput() {
    output.textContent = "";
}

// Helper function to update status
function setStatus(text) {
    statusText.textContent = "Status: " + text;
}

/* ==========================================================
   1) ASYNC TIMEOUT
   ========================================================== */

document.getElementById("btnTimeout").onclick = function () {

    clearOutput();
    log("Start");

    setTimeout(function () {
        log("Timeout finished after 2 seconds");
    }, 500);

    log("End");
};

/* ==========================================================
   2) ASYNC PROMISE
   ========================================================== */

function waitOneSecond() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("Promise resolved after 1 second!");
        }, 2000);
    });
}

document.getElementById("btnPromise").onclick = function () {

    clearOutput();
    setStatus("Waiting (Promise)...");

    waitOneSecond().then(function (result) {
        log(result);
        setStatus("Idle");
    });
};

/* ==========================================================
   3) ASYNC / AWAIT
   ========================================================== */

async function runAwaitExample() {

    clearOutput();
    setStatus("Please wait, async/await running...");

    log("Before await");

    const result = await waitOneSecond();

    log("After await");

    log(result);
    setStatus("Idle");
}

document.getElementById("btnAwait").onclick = runAwaitExample;

/* ==========================================================
   4) ASYNC FETCH (REAL WORLD)
   ========================================================== */

async function runFetchExample() {

    clearOutput();
    setStatus("Loading from API...");

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/999999"
        );

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        const data = await response.json();

    log("ID: " + data.id);
    log("Title: " + data.title);

    } catch (error) {

        log("Error: " + error.message);

    } finally {

        setStatus("Idle");
    }
}

document.getElementById("btnFetch").onclick = runFetchExample;
import StopwatchModel from "./StopwatchModel.js";
import StopwatchView from "./StopwatchView.js";

let stopwatchModel = new StopwatchModel();
let stopwatchView = new StopwatchView(stopwatchModel);
let sessions = []; // Initialize sessions array
let sessionCounter = 1; // Initialize session counter

stopwatchModel.setOnTickCallback((elapsedTime) => {
  stopwatchView.updateTimerDisplay(elapsedTime);
});

let startTime;

document.getElementById("startButton").addEventListener("click", () => {
  startTime = Date.now();
  stopwatchModel.start();
});

document.getElementById("stopButton").addEventListener("click", () => {
  if (startTime !== null) {
    const stopTime = Date.now();
    const duration = stopTime - startTime;
    const formattedDuration = formatDuration(duration);
    const sessionEntry = `Session ${sessionCounter}: ${formattedDuration}`; // Format session entry
    sessions.unshift(sessionEntry); // Prepend new session entry to sessions array
    stopwatchView.renderPreviousSessions(sessions);
    startTime = null;
    sessionCounter++; // Increment session counter
  }
  stopwatchModel.stop();
});

function formatDuration(duration) {
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

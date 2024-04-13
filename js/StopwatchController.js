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
let recordedTime = 0; // Variable to store recorded time from PauseButton

document.getElementById("startButton").addEventListener("click", () => {
  if (stopwatchModel.isPaused()) {
    stopwatchModel.resume();
    if (recordedTime !== 0) {
      // If time was recorded from PauseButton
      startTime = Date.now() - recordedTime; // Adjust start time to include time passed during pause
      recordedTime = 0; // Reset recorded time
    } else {
      startTime = Date.now() - stopwatchModel.elapsedTime;
    }
  } else {
    startTime = Date.now();
    stopwatchModel.start();
  }
});

document.getElementById("pauseButton").addEventListener("click", () => {
  if (startTime !== null) {
    recordedTime = Date.now() - startTime; // Record elapsed time from start to pause
  }
  stopwatchModel.pause();
});

document.getElementById("stopButton").addEventListener("click", () => {
  if (startTime !== null) {
    let duration;
    if (recordedTime !== 0) {
      // If time was recorded from PauseButton
      duration = recordedTime + stopwatchModel.elapsedTime; // Calculate total duration
      recordedTime = 0; // Reset recorded time
    } else {
      const stopTime = Date.now();
      duration = stopTime - startTime - stopwatchModel.pauseDuration; // Calculate duration excluding pause time
    }
    const formattedDuration = formatDuration(duration);
    const sessionEntry = `Session ${sessionCounter}: ${formattedDuration}`;
    sessions.unshift(sessionEntry);
    stopwatchView.renderPreviousSessions(sessions);
    startTime = null;
    sessionCounter++;
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

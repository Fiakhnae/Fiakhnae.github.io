export default class StopwatchView {
  constructor(stopwatchModel) {
    this.stopwatchModel = stopwatchModel;
    this.startButton = document.getElementById("startButton");
    this.pauseButton = document.getElementById("pauseButton");
    this.stopButton = document.getElementById("stopButton");
    this.timerDisplay = document.getElementById("timer");
    this.startButton.addEventListener("click", () => this.onStartClick());
    this.pauseButton.addEventListener("click", () => this.onPauseClick());
    this.stopButton.addEventListener("click", () => this.onStopClick());
  }

  onStartClick() {
    this.stopwatchModel.start();
  }

  onPauseClick() {
    this.stopwatchModel.pause();
  }

  onStopClick() {
    this.stopwatchModel.stop();
  }

  updateTimerDisplay(elapsedTime) {
    const formattedTime = this.formatTime(elapsedTime);
    this.timerDisplay.textContent = formattedTime;
  }

  formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  renderPreviousSessions(sessions) {
    const previousSessionsContainer =
      document.getElementById("previousSessions");
    previousSessionsContainer.innerHTML = sessions
      .map((session) => `<p>${session}</p>`)
      .join("");
  }

  pad(num) {
    return num.toString().padStart(2, "0");
  }
}

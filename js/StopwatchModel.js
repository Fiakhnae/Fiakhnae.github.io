export default class StopwatchModel {
  constructor() {
    this.startTime = null;
    this.elapsedTime = 0;
    this.intervalId = null;
    this.onTickCallback = null;
  }

  start() {
    if (!this.startTime) {
      this.startTime = Date.now() - this.elapsedTime;
      this.intervalId = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        if (this.onTickCallback) this.onTickCallback(this.elapsedTime);
      }, 10);
    }
  }

  pause() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.startTime = null;
    this.elapsedTime = 0;
    if (this.onTickCallback) this.onTickCallback(this.elapsedTime);
  }

  setOnTickCallback(callback) {
    this.onTickCallback = callback;
  }
}

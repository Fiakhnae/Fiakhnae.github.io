export default class StopwatchModel {
  constructor() {
    this.startTime = null;
    this.elapsedTime = 0;
    this.pauseStartTime = 0;
    this.pauseDuration = 0;
    this.intervalId = null;
    this.onTickCallback = null;
  }

  start() {
    if (!this.startTime) {
      this.startTime = Date.now() - this.elapsedTime - this.pauseDuration;
      this.intervalId = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime - this.pauseDuration;
        if (this.onTickCallback) this.onTickCallback(this.elapsedTime);
      }, 10);
    }
  }

  pause() {
    this.pauseStartTime = Date.now();
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resume() {
    if (this.pauseStartTime) {
      this.pauseDuration += Date.now() - this.pauseStartTime;
      this.startTime = Date.now() - this.elapsedTime - this.pauseDuration;
      this.intervalId = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime - this.pauseDuration;
        if (this.onTickCallback) this.onTickCallback(this.elapsedTime);
      }, 10);
      this.pauseStartTime = 0;
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.startTime = null;
    this.elapsedTime = 0;
    this.pauseStartTime = 0;
    this.pauseDuration = 0;
    if (this.onTickCallback) this.onTickCallback(this.elapsedTime);
  }

  isPaused() {
    return this.pauseStartTime !== 0;
  }

  setOnTickCallback(callback) {
    this.onTickCallback = callback;
  }
}

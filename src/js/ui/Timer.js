// ==========================================
// ROUND TIMER
// ==========================================

export class Timer {
    constructor(seconds = 120) {
        this._default = seconds;
        this.timeLeft = seconds;
        this.isRunning = false;
        this._interval = null;
        this._displayEl = null;
    }

    linkDisplay(el) { this._displayEl = el; }

    start(onTick) {
        if (this.isRunning) return;
        this.isRunning = true;
        this._interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this._updateDisplay();
                if (onTick) onTick(this.timeLeft);
            } else {
                this.pause();
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        clearInterval(this._interval);
    }

    reset() {
        this.pause();
        this.timeLeft = this._default;
        this._updateDisplay();
    }

    _updateDisplay() {
        if (!this._displayEl) return;
        const m = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const s = (this.timeLeft % 60).toString().padStart(2, '0');
        this._displayEl.textContent = `${m}:${s}`;
        this._displayEl.classList.toggle('low-time', this.timeLeft <= 10 && this.timeLeft > 0);
    }
}

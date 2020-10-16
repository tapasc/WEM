class TimerUp {

    constructor() {
        this.secondsLabel = undefined;
        this.minutesLabel = undefined;
        this.hoursLabel = undefined;
        this.totalSeconds = 0;
        this.setTime = this.setTime.bind(this);
    }
    pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        }
        else {
            return valString;
        }
    }
    setTime() {
        ++this.totalSeconds;
        this.secondsLabel.innerHTML = this.pad(this.totalSeconds % 60);
        this.minutesLabel.innerHTML = this.pad(parseInt(this.totalSeconds / 60));
        this.hoursLabel.innerHTML = this.pad(parseInt(this.totalSeconds / 3600));
    }

    _init() {
        setInterval(this.setTime, 1000);
    }

    set SecondsElement(secondClass) {
        this.secondsLabel = document.querySelector("." + secondClass);
    }
    set MinutesElement(minuteClass) {
        this.minutesLabel = document.querySelector("." + minuteClass);
    }
    set HoursElement(hourClass) {
        this.hoursLabel = document.querySelector("." + hourClass);
    }

}

export default TimerUp;
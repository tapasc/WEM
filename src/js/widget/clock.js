class Clock {

    constructor() {
        this.clock = undefined;
    }

    currentTime() {
        let date = new Date(); /* creating object of Date class */
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        hour = this.updateTime(hour);
        min = this.updateTime(min);
        sec = this.updateTime(sec);
        this.clock.innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
        let t = setTimeout(() => { this.currentTime() }, 1000); /* setting timer */
    }
    updateTime(k) {
        if (k < 10) {
            return "0" + k;
        }
        else {
            return k;
        }
    }
    _init() {
        this.currentTime();
    }

    set ClockElement(className) {
        this.clock = document.querySelector("." + className);
    }

}

export default Clock;
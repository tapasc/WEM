class Observer {
    constructor() {
        this.observers = [];
        this.state = {
            assetLoaded: null,
            popupOpened: null,
            currentView: null,
            score: null,
            currentQuestion: null
        };
    }

    addObserver(fn) {
        //console.log('added observer...', this.observers)
        this.observers.push(fn);
    }
    removeObserver() {

    }
    addState(state) {
        //this.state
    }
    notifyObserver() {
        let observerLength = this.observers.length;

        for (let n = 0; n < observerLength; n++) {
            this.observers[n](this.state);
            //console.log('Observers notified and quit...')
        }
    }

    setState(newState) {
        //console.log('newState',newState)
        this.state = {
            ...this.state,
            ...newState
        };
        this.notifyObserver();
    }
    getState() {
        return this.state;
    }
    getScore() {
        return this.state.score;
    }
}

export default Observer;
import { getApplication } from "../..";

class Randomizer {

    constructor(teams) {
        this._teamsData = teams;
        this._sortedTeams = [];
        this._sortedRounds = [];
        this._selectedRounds = undefined;
        this._totalTeams = undefined;
        this._randomTeam = undefined;
        this._occurrence = 0;
    }

    sortTeams() {
        for (let i = 0; i < this._totalTeams; i++) {
            this._sortedTeams.push(this._teamsData[i]);
            this._sortedRounds.push(this._teamsData[i].roundPlayed);
        }
    }

    validateisStealRound() {
        // let sortedTeams = this._sortedRounds;
        let roundOneCompletedList = [];
        roundOneCompletedList = this._sortedRounds.filter((round) => {
            return parseInt(round) === 1
        })

        //() ? this.makeStealActive = true : this.makeStealActive = false
        //console.log('sortedTeams' + this._sortedRounds.length);
        //console.log('sortedTeams' + roundOneCompletedList.length);
        if (this._sortedRounds.length === roundOneCompletedList.length) {
            this.makeStealActive = true;
        }
    }
    randomize() {
        this.clearFields();
        //need to ad reset variables here. As this function is called multiple times.
        this.sortTeams();
        let _minRound = this._sortedRounds;
        let _minimumPlayed = Math.min(..._minRound)
        let _listTeamsMinPlayed = [];
        let _finalData = undefined;

        _listTeamsMinPlayed = this._sortedTeams.filter((a) => parseInt(a.roundPlayed) === _minimumPlayed)

        if (_listTeamsMinPlayed.length === 1) {
            _finalData = _listTeamsMinPlayed[0].id
            // console.log('_listTeamsMinPlayed@');
        }
        if (_listTeamsMinPlayed.length > 1) {
            let rand = this.shuffle(_listTeamsMinPlayed)[0].id;
            let shuffledArr = this.shuffle(_listTeamsMinPlayed);
            _finalData = rand;
        }
        this._randomTeam = _finalData;
        this.validateisStealRound();
        return _finalData;
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    get sortedOutTeam() {
        let _teams = [];
        for (let i = 0; i < this._totalTeams; i++) {
            _teams.push(this._teamsData[i]);
        }
        return _teams;
    }
    get totalTeams() {
        return this._totalTeams;
    }

    set totalRounds(_d) {
        this._selectedRounds = _d;
    }
    set totalTeams(_d) {
        this._totalTeams = _d;
    }
    set teamsData(_d) {
        this._teamsData = _d;
    }

    set makeStealActive(_d) {
        if (typeof _d === "boolean") {
            getApplication().isStealRoundActive.active = true
            getApplication().isStealRoundActive.occurrence = this._occurrence + 1
        }
    }

    clearFields() {
        this._sortedTeams = [];
        this._sortedRounds = [];
        this._randomTeam = undefined;
    }
}

export default Randomizer;
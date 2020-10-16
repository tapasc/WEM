//css
import './css/base.css';
//templates
//controller
//loader
import { Loader } from './js/assetLoader/Loader';
import Observer from './js/events/Observer';
// import mcq from './templates/mcq.hbs'
// import { mcqController } from './js/mcqController';
import viewFactory from './js/view/viewFactory';
import navManager from './js/navigation/navManager';
import randomizer from "./js/utils/randomizer";

//sandbox code
//sandbox code below
import GameModel from './js/model/questionBank';
//-----------------------------------------
import { _data } from './data/gameData.js'
import device from "current-device"

// import { data } from 'jquery';
let _instance = null;


class Application {
    constructor(configurationData) {
        this._dataConfiguration = configurationData;
        this._audioAssets = this._dataConfiguration.config.assets.audio;
        this._imageAssets = this._dataConfiguration.config.assets.images;
        this._videoAssets = this._dataConfiguration.config.assets.video;
        this._gameQuestions = this._dataConfiguration.config.questions;
        this._ObserverInstance = undefined;
        //stage Elements
        this._topbar = undefined;
        this._auxillary = undefined;
        this._gameContainer = undefined;
        this._loaderElement = undefined;
        this._viewFactory = undefined;
        this._stage = undefined;
        this._navManager = undefined;
        // this._currentView = undefined;

        //-----Game Data-----
        this._totalRounds = undefined;
        this._currentRound = undefined;
        this._totalTeams = undefined;
        // this.isStealRound = undefined;
        this._isStealRoundActive = { 'active': false, 'occurrence': 0 };
        this._currentRandomTeam = undefined;
        this._isPlaySafeRound = undefined;
        this._curentQuestionSelectionID = undefined;
        this._randomizer = undefined;
        this._stealVideoAttempted = false;
        this._stealValue = undefined;
        //this should be global but, as badge index is required on return is kep global
        this._nRandomSelectedBadgeIndex = undefined;
        this._stealOpponentTeamSelected = undefined;
        //***************************************** */
        this._device = undefined;
        this._TeamsData = [
            {
                id: 0,
                class: 'badge0',
                name: 'Team 1',
                roundPlayed: 0,
                score: 3000
            },
            {
                id: 1,
                class: 'badge1',
                name: 'Team 2',
                roundPlayed: 0,
                score: 3000
            },
            {
                id: 2,
                class: 'badge2',
                name: 'Team 3',
                roundPlayed: 0,
                score: 3000
            },
            {
                id: 3,
                class: 'badge3',
                name: 'Team 4',
                roundPlayed: 0,
                score: 3000
            },
            {
                id: 4,
                class: 'badge4',
                name: 'Team 5',
                roundPlayed: 0,
                score: 3000
            }
        ]

        // this._currentView = undefined;
        //Application State
        // this.state = {
        //     assetLoaded: false,
        //     popupOpened: false,
        //     currentView: '',
        //     score: 0,
        //     currentQuestion: -1
        // }
        //
        this._dataModel = undefined;
        this.onAssetLoadComplete = this.onAssetLoadComplete.bind(this);
        this._notify = this._notify.bind(this);
        this._start();
    }

    _start() {
        this.populateElementReference();
        //loader instance
        this._ObserverInstance = new Observer;
        this._ObserverInstance.addObserver(this._notify);

        this.LoaderInstance = new Loader(
            {
                _images: this._imageAssets,
                _audio: this._audioAssets,
                _video: this._videoAssets
            },
            this.onAssetLoadComplete
        );
        this.LoaderInstance.startPreload();
    }
    populateElementReference() {
        //fetch Elements
        this._loaderElement = document.querySelector("#loader");
        this._stage = document.getElementById("stage");
        this._topbar = document.getElementById("topbar");
        this._auxillary = document.getElementById("auxillary");
        this._gameContainer = document.getElementById("gameContainer");
    }
    onAssetLoadComplete(evt) {
        // console.log("@@@@@Asset Loading COMPLETE@@@@@@@@@");
        this._loaderElement.style.visibility = "hidden";
        this._loaderElement.style.opacity = 0;
        // initiate question population
        //sandbox code
        this._dataModel = new GameModel(this._gameQuestions);
        this._dataModel.init();
        this._viewFactory = new viewFactory(this._stage);
        //this._viewFactory.updateView();
        this._navManager = new navManager(this._dataModel, this._viewFactory);
        this._randomizer = new randomizer(this._TeamsData);
        this._navManager.init();
        this._initGameDataModel();
        //Init NavManager after initial data Model is updated

    }
    onAssetLoadProgress(evt) {
        // console.log('asset loading in progress...')
    }
    _initGameDataModel() {
        //-----update initial State and _notify to observers, as splash loads--
        setTimeout(() => {
            getApplication().getObserver().setState({
                assetLoaded: true,
                popupOpened: false,
                currentView: '',
                score: 0,
                currentQuestion: -1
            })
        }, 100);

    }
    assignTeamBackground(teamIndex) {
        let BG = { 0: 'Team_Badge_01', 1: 'Team_Badge_02', 2: 'Team_Badge_03', 3: "Team_Badge_04", 4: 'Team_Badge_05' };
        $(".badgeRunner").css({
            "background": "url(" + this.loader.getImageSource(BG[parseInt(teamIndex)]) + ") -0.9vh -1.2vh /contain no-repeat",
            'background-size':'19.2vh 30vh'
        });
    }
    // commputeTeamData() {
    //     let _teamsList = this.teamsData;
    //     let _selectedTeamCount = this.totalTeams;
    //     // let computedList = _teamsList.map((team) => {
    //     //     if (team.id <= _selectedTeamCount) {
    //     //         return team;
    //     //     }
    //     // });
    //    // console.log('computedList=' + _teamsList);
    //     return this.teamsData;
    // }
    _notify(currentState) {
        // console.log('currentState=', currentState);
        //currentState.assetLoaded == true ? this.onAssetLoadComplete() : '';
    }

    getObserver() {
        return this._ObserverInstance;
    }

    getQuestionBank() {
        return this._dataModel;
    }
    getViewFactory() {
        return this._viewFactory;
    }
    getRandomTeamSelected() {
        // console.log('GETTING CURRENT TEAM AS PER SELECTION' + this._currentRandomTeam);
        return this._currentRandomTeam;
    }
    setRandomTeamSelected(ind) {
        // console.log('SETTING CURRENT TEAM AS PER SELECTION' + ind);
        this._currentRandomTeam = ind;
    }
    getCurrentQuestionSelectionID() {
        return this._curentQuestionSelectionID;
    }
    setCurrentQuestionSelectionID(id) {
        this._curentQuestionSelectionID = id;
    }
    //getters
    get gameToolBar() {
        return this._topbar;
    }
    get auxillary() {
        return this._auxillary;
    }
    get gameContainer() {
        return this._gameContainer;
    }
    get totalRounds() {
        return this._totalRounds;
    }
    get currentRound() {
        return this._currentRound;
    }
    get teamsData() {
        let _teamsList = this._TeamsData;
        let _selectedTeamCount = this.totalTeams;
        let _computedTeams = _teamsList.filter((e) => (e.id < _selectedTeamCount));
        return _computedTeams;
    }
    get isPlaySafeRound() {
        return this._isPlaySafeRound;
    }
    get currentView() {
        return this._currentView;
    }
    get totalTeams() {
        return this._totalTeams;
    }
    get loader() {
        return this.LoaderInstance;
    }
    get randomizerInstance() {
        return this._randomizer;
    }
    get isStealRoundActive() {
        return this._isStealRoundActive;
    }
    get isStealVideoAttempted() {
        return this._stealVideoAttempted;
    }
    get randomSelectedBadgeIndex() {
        return this._nRandomSelectedBadgeIndex;
    }
    get stealOpponent() {
        return this._stealOpponentTeamSelected;
    }
    get stealValue() {
        return this._stealValue;
    }

    // getrandomTeamSelected() {
    //    // console.log('getting random team selected' + this._currentRandomTeam)
    //     return this._currentRandomTeam;
    // }
    //setters

    // setrandomTeamSelected(t) {
    //    // console.log('setting random team selected' + t)
    //     if (t != undefined) {
    //         this._currentRandomTeam = t;
    //     }
    // }
    set totalTeams(_d) {
        if (_d !== undefined) {
            this._totalTeams = _d;
            this._randomizer.totalTeams = _d;
        }
    }
    set isPlaySafeRound(_d) {
        if (_d !== undefined) {
            this._isPlaySafeRound = _d;
        }
    }
    set currentRound(_d) {
        if (_d !== undefined) {
            this._currentRound = _d;
        }
    }
    set totalRounds(_d) {
        if (_d !== undefined) {
            this._totalRounds = _d;
            this._randomizer.totalRounds = _d;
        }
    }
    set currentView(_d) {
        if (_d !== undefined) {
            this._currentView = _d;
        }
    }
    set isStealRoundActive(_d) {
        if (typeof _d === "boolean") {
            this._isStealRoundActive = _d;
        }
    }
    set isStealVideoAttempted(_d) {
        if (typeof _d === "boolean") {
            this._stealVideoAttempted = _d;
        }
    }
    set randomSelectedBadgeIndex(_d) {
        if (typeof _d === "number") {
            this._nRandomSelectedBadgeIndex = _d;
        }
    }
    set stealOpponent(_d) {
        if (typeof _d === "number") {
            // console.log('@@@@@@@@@@setting team opponent with[' + _d + ']');
            this._stealOpponentTeamSelected = _d;
        }
    }
    set stealValue(_d) {
        // console.log('@@@@@@@@@@setting team opponent with[' + _d + ']');
        if (typeof _d === "number") {
            this._stealValue = _d;
        }
    }
}

function getApplication(configurationData) {
    if (!_instance) {
        _instance = new Application(configurationData);
    } else {
        return _instance;
    }
}
window.addEventListener('load', (evt) => {
    getApplication(_data);
})


export { getApplication };

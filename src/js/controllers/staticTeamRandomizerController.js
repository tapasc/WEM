// import buttonclick from '../../audio/4measurehiton5_bfornorm.mp3';
// import randomizer from '../utils/randomizer';

import { getApplication } from '../../index';


const staticTeamRandomizerController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _randomPos5 = ['11.8%', '27.8%', '43.8%', '59.8%', '75.8%'];
    let _randomPos4 = ['13.7%', '33.7%', '53.7%', '73.7%'];
    let _randomPos3 = ['17.3%', '43.7%', '70.7%'];
    let _randomPos2 = ['23.7%', '63.7%'];
    //---------------------------------------------------------
    let _randomBadgePos5 = [
        { teamName0: '7%', teamName1: '26.5%', teamName2: '46.5%', teamName3: '66.7%', teamName4: '86.5%' },
        { teamScore0: '7.8%', teamScore1: '27.5%', teamScore2: '47.5%', teamScore3: '67.7%', teamScore4: '87.8%' },
        { dollarLeft0: '6%', dollarLeft1: '26%', dollarLeft2: '45.5%', dollarLeft3: '65.7%', dollarLeft4: '85.8%' }
    ];
    let _randomBadgePos4 = [
        { teamName0: '9.4%', teamName1: '34.2%', teamName2: '59.2%', teamName3: '85.1%' },
        { teamScore0: '10.4%', teamScore1: '35.2%', teamScore2: '60.2%', teamScore3: '83.7%' },
        { dollarLeft0: '8.3%', dollarLeft1: '33.1%', dollarLeft2: '58.2%', dollarLeft3: '83.2%' },
    ];
    let _randomBadgePos3 = [
        { teamName0: '13.5%', teamName1: '46.5%', teamName2: '80%' },
        { teamScore0: '14.5%', teamScore1: '47.5%', teamScore2: '76.5%' },
        { dollarLeft0: '12.5%', dollarLeft1: '45.5%', dollarLeft2: '81.5%' }
    ];
    let _randomBadgePos2 = [
        { teamName0: "21.8%", teamName1: '71.5%' },
        { teamScore0: '22.6%', teamScore1: "72.7%" },
        { dollarLeft0: '20.8%', dollarLeft1: "70.5%" }
    ];



    let _teamRandomizer = getApplication().randomizerInstance;
    let _numberOfTeams = 5;
    let _observerInstance = getApplication().getObserver();
    let _iteration = 20;//in seconds, this is customizble
    let _nIntervalSpeed = 100;
    let nInterval = undefined;
    let nRandomIDSelected = undefined;
    let _SelectedStealTeam = undefined;
    let _team0Btn = undefined;
    let _team1Btn = undefined;
    let _team2Btn = undefined;
    let _team3Btn = undefined;
    let _team4Btn = undefined;
    let _playSafe = undefined;

    $(_stageReference).append(_templateReference);

    const _init = function () {
        clearStates();
        _assignCSS()
    }
    const _assignCSS = function () {
        let lInstance = getApplication().loader;

        $(".teamRandomizerTemplate .badge").css({
            "background": "url(" + lInstance.getImageSource("Team_no_color") + ") no-repeat",
            'background-size': "contain"
        });
        $(".teamRandomizerTemplate .badgeRunner").css({
            "background": "url(" + lInstance.getImageSource("FM_team_blue") + ") no-repeat",
            'background-size': "contain"
        });
        $(".teamRandomizerTemplate #RightArrowStatic").css({
            "background": "url(" + lInstance.getImageSource("numberone_iconRight") + ") no-repeat",
            'background-size': "contain"
        });

        $(".teamRandomizerTemplate #LeftArrowStatic").css({
            "background": "url(" + lInstance.getImageSource("numberone_icon") + ") no-repeat",
            'background-size': "contain",
            function() {
                //callback can be called here on load
                let evalPos = getRandomPositionStore(getApplication().totalTeams);
                $('.badgeRunner').css('left', evalPos[getApplication().randomSelectedBadgeIndex]);
                $('.steal_btn' + getApplication().randomSelectedBadgeIndex).css("display", "none");
                $(".badge" + getApplication().randomSelectedBadgeIndex + ".team-name").css("color", '#fff');
                $(".badge" + getApplication().randomSelectedBadgeIndex + ".team-score").css("color", '#fff');
                let BadgeVarO = getRandomBadgePositionStore(getApplication().totalTeams);
                let BadgeVar = BadgeVarO.r;
                let BadgeLength = BadgeVarO.c
                // let selectedBadgeIndex = 
                console.log(BadgeLength)
                console.log(BadgeVar)

                if (BadgeLength === 2) {
                    $('.staticRandomizer .teamButtons .badge .dollarAnim0').css({ left: BadgeVar[2].dollarLeft0 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim1').css({ left: BadgeVar[2].dollarLeft1 })

                    $('.staticRandomizer .teamButtons .badge .badge0.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName0 })
                    $('.staticRandomizer .teamButtons .badge .badge1.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName1 })
                    //--------------------------
                    $('.staticRandomizer .teamButtons .badge .badge0.team-score').css({ top: '50%', left: BadgeVar[1].teamScore0 })
                    $('.staticRandomizer .teamButtons .badge .badge1.team-score').css({ top: '50%', left: BadgeVar[1].teamScore1 })
                }


                if (BadgeLength === 3) {
                    $('.staticRandomizer .teamButtons .badge .dollarAnim0').css({ left: BadgeVar[2].dollarLeft0 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim1').css({ left: BadgeVar[2].dollarLeft1 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim2').css({ left: BadgeVar[2].dollarLeft2 })

                    $('.staticRandomizer .teamButtons .badge .badge0.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName0 })
                    $('.staticRandomizer .teamButtons .badge .badge1.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName1 })
                    $('.staticRandomizer .teamButtons .badge .badge2.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName2 })
                    //--------------------------
                    $('.staticRandomizer .teamButtons .badge .badge0.team-score').css({ top: '50%', left: BadgeVar[1].teamScore0 })
                    $('.staticRandomizer .teamButtons .badge .badge1.team-score').css({ top: '50%', left: BadgeVar[1].teamScore1 })
                    $('.staticRandomizer .teamButtons .badge .badge2.team-score').css({ top: '50%', left: BadgeVar[1].teamScore2 })
                }
                if (BadgeLength === 4) {

                    $('.staticRandomizer .teamButtons .badge .dollarAnim0').css({ left: BadgeVar[2].dollarLeft0 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim1').css({ left: BadgeVar[2].dollarLeft1 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim2').css({ left: BadgeVar[2].dollarLeft2 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim3').css({ left: BadgeVar[2].dollarLeft3 })

                    $('.staticRandomizer .teamButtons .badge .badge0.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName0 })
                    $('.staticRandomizer .teamButtons .badge .badge1.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName1 })
                    $('.staticRandomizer .teamButtons .badge .badge2.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName2 })
                    $('.staticRandomizer .teamButtons .badge .badge3.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName3 })
                    //--------------------------
                    $('.staticRandomizer .teamButtons .badge .badge0.team-score').css({ top: '50%', left: BadgeVar[1].teamScore0 })
                    $('.staticRandomizer .teamButtons .badge .badge1.team-score').css({ top: '50%', left: BadgeVar[1].teamScore1 })
                    $('.staticRandomizer .teamButtons .badge .badge2.team-score').css({ top: '50%', left: BadgeVar[1].teamScore2 })
                    $('.staticRandomizer .teamButtons .badge .badge3.team-score').css({ top: '50%', left: BadgeVar[1].teamScore3 })
                }
                if (BadgeLength === 5) {

                    $('.staticRandomizer .teamButtons .badge .dollarAnim0').css({ left: BadgeVar[2].dollarLeft0 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim1').css({ left: BadgeVar[2].dollarLeft1 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim2').css({ left: BadgeVar[2].dollarLeft2 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim3').css({ left: BadgeVar[2].dollarLeft3 })
                    $('.staticRandomizer .teamButtons .badge .dollarAnim4').css({ left: BadgeVar[2].dollarLeft4 })

                    $('.staticRandomizer .teamButtons .badge .badge0.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName0 })
                    $('.staticRandomizer .teamButtons .badge .badge1.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName1 })
                    $('.staticRandomizer .teamButtons .badge .badge2.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName2 })
                    $('.staticRandomizer .teamButtons .badge .badge3.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName3 })
                    $('.staticRandomizer .teamButtons .badge .badge4.team-name').css({ top: '12.4%', left: BadgeVar[0].teamName4 })
                    //--------------------------
                    $('.staticRandomizer .teamButtons .badge .badge0.team-score').css({ top: '50%', left: BadgeVar[1].teamScore0 })
                    $('.staticRandomizer .teamButtons .badge .badge1.team-score').css({ top: '50%', left: BadgeVar[1].teamScore1 })
                    $('.staticRandomizer .teamButtons .badge .badge2.team-score').css({ top: '50%', left: BadgeVar[1].teamScore2 })
                    $('.staticRandomizer .teamButtons .badge .badge3.team-score').css({ top: '50%', left: BadgeVar[1].teamScore3 })
                    $('.staticRandomizer .teamButtons .badge .badge4.team-score').css({ top: '50%', left: BadgeVar[1].teamScore4 })
                }


                assignButtonEvents();
                console.log('RANDOM SELECTED BADGE INDEX---' + getApplication().randomSelectedBadgeIndex);
            }
        });
        // $(".teamRandomizerTemplate").css({
        //     "background": "url(" + lInstance.getImageSource("FM_intro_MC") + ") no-repeat center center #d5c2a1",
        //     'background-size': "cover",
        //     function() {
        //         //callback can be called here on load
        //         let evalPos = getRandomPositionStore(getApplication().totalTeams);
        //         $('.badgeRunner').css('left', evalPos[getApplication().randomSelectedBadgeIndex]);
        //         $('.steal_btn' + getApplication().randomSelectedBadgeIndex).css("display", "none");
        //         assignButtonEvents();
        //     }
        // });
    }


    let assignButtonEvents = function () {
        _team0Btn = $('.steal_btn0').click((e) => { setOpponentTeam(0) });
        _team1Btn = $('.steal_btn1').click((e) => { setOpponentTeam(1) });
        _team2Btn = $('.steal_btn2').click((e) => { setOpponentTeam(2) });
        _team3Btn = $('.steal_btn3').click((e) => { setOpponentTeam(3) });
        _team4Btn = $('.steal_btn4').click((e) => { setOpponentTeam(4) });
        _playSafe = $('.play_it_safe_btn').click((e) => { ContinuePlayingSafe(undefined) });
    }

    let setOpponentTeam = function (teamIndex) {
        startDollarAnimation();
        getApplication().stealOpponent = teamIndex;
        _SelectedStealTeam = teamIndex;
    }
    let ContinuePlayingSafe = function (teamIndex) {
        getApplication().stealOpponent = teamIndex;
        showTopicSelectionView();
    }
    let startDollarAnimation = function () {
        let randomDollarValue = [250, 500, 1000];
        let background = ['red', 'green', 'yellow'];
        let count = 0;
        let lastCount = 10;
        // let randomValue = undefined;
        $(".steal_btn" + _SelectedStealTeam).css("visibility", 'visible');


        nInterval = setInterval(() => {
            let _Val = shuffle(randomDollarValue)[0];
            $(".dollarAnim" + _SelectedStealTeam).css('visibility', "visible");
            $(".dollarAnim" + _SelectedStealTeam).css("background", shuffle(background)[0]);
            $(".dollarAnim" + _SelectedStealTeam).html('');
            $(".dollarAnim" + _SelectedStealTeam).html('$' + _Val);
            count++;
            if (count === lastCount) {
                //console.log("@@@@@@@@@@@@@Steal Value is being set to@@@@@@@@@@@@@@@@@" + _Val)
                getApplication().stealValue = _Val;
                showTopicSelectionView();
                clearInterval(nInterval);
            }
        }, 200)
        ////console.log(shuffle(randomDollarValue)[0]);
    }

    let showTopicSelectionView = function () {
        setTimeout(() => {
            _observerInstance.setState({ currentView: 'topicSelectionView' });
        }, 1000);

    }
    let shuffle = function (array) {
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

    let getRandomPositionStore = (tCount) => {
        switch (tCount) {
            case 5:
                return _randomPos5;
                break;
            case 4:
                return _randomPos4;
                break;
            case 3:
                return _randomPos3;
                break;
            case 2:
                return _randomPos2;
                break;
            default:
                throw new Error('get team count error! Team count should be greater than 1...');
        }
    }
    let getRandomBadgePositionStore = (tCount) => {
        switch (tCount) {
            case 5:
                return { r: _randomBadgePos5, c: 5 };
                break;
            case 4:
                return { r: _randomBadgePos4, c: 4 };
                break;
            case 3:
                return { r: _randomBadgePos3, c: 3 };
                break;
            case 2:
                return { r: _randomBadgePos2, c: 2 };
                break;
            default:
                throw new Error('get team count error! Team count should be greater than 1...');
        }
    }
    let clearStates = function () {
        nRandomIDSelected = undefined;
    }
    _init();
}

export { staticTeamRandomizerController }
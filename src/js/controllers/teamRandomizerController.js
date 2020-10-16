// import randomizer from 'random-number-in-range';

import { getApplication } from '../../index';


const teamRandomizerController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    //positions
    let _randomPos5 = ['11.5%', '27.5%', '43.5%', '59.5%', '75.5%'];
    let _randomPos4 = ['13.6%', '33.5%', '53.5%', '73.5%'];
    let _randomPos3 = ['16.5%', '43.5%', '70%'];
    let _randomPos2 = ['23.5%', '63.5%'];
    //backgrounds

    let _teamRandomizer = getApplication().randomizerInstance;
    let _numberOfTeams = 5;
    let _observerInstance = getApplication().getObserver();
    let _loaderInstance = getApplication().loader;
    let _iteration = 19;//in seconds, this is customizble
    let _nIntervalSpeed = 100;
    let nInterval = undefined;
    let dynamicTeamLabel = '';
    let nRandomIDSelected = undefined;
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
        $(".teamRandomizerTemplate #RightArrow").css({
            "background": "url(" + lInstance.getImageSource("numberone_iconRight") + ") no-repeat",
            'background-size': "contain"
        });

        $(".teamRandomizerTemplate #LeftArrow").css({
            "background": "url(" + lInstance.getImageSource("numberone_icon") + ") no-repeat",
            'background-size': "contain"
        });
        $(".teamRandomizerTemplate .badgeRunner").css({
            "background": "url(" + lInstance.getImageSource("FM_team_blue") + ") no-repeat",
            'background-size': "contain",
            function() {
                //callback can be called here on load
                let evalPos = getRandomPositionStore(getApplication().totalTeams);
                $('.badgeRunner').css('left', evalPos[0]);
                getApplication().assignTeamBackground(0);
                setTimeout(() => {
                    // //console.log('Steal video is video' + getApplication().isStealVideoAttempted)
                    // if (getApplication().isStealVideoAttempted) {
                    //     showStaticRandomBadgeState(getApplication().randomSelectedBadgeIndex);
                    // } else {
                    _startRandomization(getApplication().totalTeams, _iteration, _nIntervalSpeed);
                    //}
                    $('#leftBanner').addClass('animateLeftBanner');
                    $('#rightBanner').addClass('animateRightBanner');
                }, 800)
            }
        });
        document.querySelector('#player').setAttribute('src', _loaderInstance.getAudioSource("2measurehiton3"));
        document.querySelector('#player').play();
    }




    let _startRandomization = (teamsC, timeSpan, intervalSpeed) => {
        let iPos = 1;
        let nCounter = 0;
        let randomHeads = getRandomPositionStore(teamsC);
        let lInstance = getApplication().loader;

        //**start random audio */
        document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("random3"));
        document.querySelector('#gameAudio').play();
        //** */
        // let randomBadgePosition = parseInt(randomizer(1, randomHeads.length)) - 1;
        let ranomIDSelected = _teamRandomizer.randomize();
        //store this globally to be reused later visit, when sealQuestion is on
        getApplication().randomSelectedBadgeIndex = ranomIDSelected;
        //******************************************************** */
        let isStealOn = {
            'active': getApplication().isStealRoundActive.active,
            'occurrence': getApplication().isStealRoundActive.occurrence
        };
        //console.log("isStealOn====" + isStealOn.active + ":::" + isStealOn.occurrence);

        nInterval = setInterval(() => {
            let Index = undefined
            if (nCounter === timeSpan) {
                for (let i = 0; i < _teamRandomizer.sortedOutTeam.length; i++) {
                    //console.log(parseInt(_teamRandomizer.sortedOutTeam[i].id) + ":::" + parseInt(ranomIDSelected));
                    if (parseInt(_teamRandomizer.sortedOutTeam[i].id) === parseInt(ranomIDSelected)) {
                        Index = parseInt(i);
                    }
                }

                // getApplication().setRandomTeamSelected((parseInt(randomHeads.indexOf(randomHeads[randomBadgePosition])) + 1));

                //*******
                //*******setting random team +1, as Index is zero based and tem count starts from 1.
                //***********
                getApplication().setRandomTeamSelected(Index + 1);


                $('.badgeRunner').css('left', randomHeads[Index]);
                getApplication().assignTeamBackground(Index);
                // getApplication().assignTeamBackground(ranomIDSelected);
               
                setTimeout(() => {
                    //start label animatio here
                    let animEnd = document.getElementById("randomTeamName");
                    $('#randomTeamName').html("TEAM " + (Index + 1));
                    $('#randomTeamName').addClass('teamEntryAnim')
                    $('#turnLabel').addClass('teamLabelEntryAnim')
                    $('#RightArrow').addClass('animateRightArrow')
                    $('#LeftArrow').addClass('animateLeftArrow')
                    $(".badge" + parseInt(ranomIDSelected) + ".team-name").css("color", '#fff');
                    $(".badge" + parseInt(ranomIDSelected) + ".team-score").css("color", '#fff');
                    


                    animEnd.addEventListener('animationend', function () {
                        setTimeout(() => {
                            document.querySelector('#player').pause();
                        }, 100)
                        setTimeout(function () {
                            //complecated condition logic

                            //1.steal video will be only showed when 1 round is complete
                            //2.Once steal video is showed and set to -1, that step decides if we can go to topicselection or static random screen


                            //3.If this is first time for steal video

                            // if ((isStealOn.active) && (parseInt(isStealOn.occurrence) === 1)) {
                            if ((isStealOn.active) && (!getApplication()._stealVideoAttempted)) {
                                _observerInstance.setState({ currentView: 'stealVideoView' });
                                //got to static stage after showing steal video
                            } else {
                                if ((getApplication().isStealRoundActive.active)) {
                                    _observerInstance.setState({ currentView: 'staticTeamRandomizerView' });
                                } else {
                                    _observerInstance.setState({ currentView: 'topicSelectionView' });
                                }

                            }

                        }, 1000);
                    })
                }, 1000);
                clearInterval(nInterval);
            } else {
                if ((iPos) === teamsC) {
                    iPos = 0;
                    getApplication().assignTeamBackground(iPos);
                    console.log('--'+iPos);
                }
                $('.badgeRunner').css('left', randomHeads[iPos]);
                getApplication().assignTeamBackground(iPos);
                console.log(iPos);
                iPos++;
            }
            nCounter++;
        }, intervalSpeed);
    }
    // let showStaticRandomBadgeState = function (state) {
    //     $('.badgeRunner').css('left', randomHeads[state]);
    //     //showSteallevelButton();
    // }


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
    let clearStates = function () {
        nRandomIDSelected = undefined;
    }
    _init();
}

export { teamRandomizerController }
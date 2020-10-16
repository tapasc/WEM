import { getApplication } from '../../index';


const questionController = function (template, stage, QObject) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    let _loaderInstance = getApplication().loader;
    let Show_btn = undefined;
    let QuestionObjectRef = QObject;
    let Btn_bar = undefined;
    let Correct_btn = undefined;
    let Incorrect_btn = undefined;
    let isCorrect = (parseInt(QObject.answers[0]) === 0) ? true : false;
    let currentQuestionID = QObject.questionID;
    let displayDescription = undefined;
    let _randomPos5 = ['11.5%', '27.5%', '43.5%', '59.5%', '75.5%'];
    let _randomPos4 = ['13.6%', '33.5%', '53.5%', '73.5%'];
    let _randomPos3 = ['16.5%', '43.5%', '70%'];
    let _randomPos2 = ['23.5%', '63.5%'];
    let _playBtn = undefined;
    let _timer_Init = false;
    let _time_interval = undefined;
    let _current_time = undefined;
    //console.log(QObject)
    $(_stageReference).append(_templateReference);


    const _assignDomEvents = () => {
        Show_btn = $('#ShowBtn');
        _playBtn = $('#timer_btn');

        displayDescription = $(".questionDescription");
        Btn_bar = $(".btnBar");
        Correct_btn = $("#CorrectBtn");
        Incorrect_btn = $("#IncorrectBtn");
        $(Show_btn).on('click', (e) => { onShowClicked(); })
        $(Correct_btn).on('click', (e) => { onShowFeedback(e, 'c'); })
        $(Incorrect_btn).on('click', (e) => { onShowFeedback(e, 'i'); })
        $(_playBtn).on('click', (e) => { onTimerBtnClicked(e); })
        startTimer(0, document.querySelector('#timer'));
    }
    const _init = () => {
        let seconds = [.1, .2, .3, .4, .5, .6, .7, .8, .9, 1];
        let counter = 0;

        $(".questionContainer").css("visibility", "visible");
        _assignCSS();

    }
    const _assignCSS = function () {
        let lInstance = getApplication().loader;

        $(".questionTemplate .teamButtons .badge").css({
            "background": "url(" + lInstance.getImageSource("Team_no_color") + ") no-repeat",
            'background-size': "contain"
        });
        $(".questionTemplate .badgeRunner").css({
            "background": "url(" + lInstance.getImageSource("FM_team_blue") + ") no-repeat",
            'background-size': "contain"
        }, function () {

        });
        console.log('Running css application...')
        $(".questionTemplate .teamButtons .badge").css({
            "background": "url(" + lInstance.getImageSource("Team_no_color") + ") no-repeat",
            'background-size': "contain"
        });
        $(".questionTemplate .teamButtons .badgeRunner").css({
            "background": "url(" + lInstance.getImageSource("FM_team_blue") + ") no-repeat",
            'background-size': "contain"
        }, function () {

        });

        let evalPos = getRandomPositionStore(getApplication().totalTeams);
        let rTeam = parseInt(String(getApplication().getRandomTeamSelected()).substr(0, 3));
        $('.questionTemplate .badgeRunner').css('left', evalPos[(rTeam - 1)]);
        getApplication().assignTeamBackground((rTeam - 1));
        $(".questionTemplate .badge" + parseInt((rTeam - 1)) + ".team-name").css("color", '#fff');
        $(".questionTemplate .badge" + parseInt((rTeam - 1)) + ".team-score").css("color", '#fff');
        _assignDomEvents();
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
    const onTimerBtnClicked = (e) => {
        let tmr_icon = document.querySelector("#timer_icon");
        let hasPlay = tmr_icon.classList.contains('pause');
        if (hasPlay) {
            tmr_icon.classList.remove('pause');
            tmr_icon.classList.add('play');
            stopTimer();

        } else {
            tmr_icon.classList.remove('play');
            tmr_icon.classList.add('pause');
            restartTimer(_current_time, document.querySelector('#timer'));
        }
    }
    const startTimer = (duration, display) => {

        var timer = duration, minutes, seconds;

        duration = 90;

        _time_interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;


            if (--timer < 0) {

                if ((timer === -1) && (_timer_Init === true)) {
                    document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("Buzzer"));
                    document.querySelector('#gameAudio').play();
                    $("#timer_btn").addClass('disabled');
                    clearInterval(_time_interval);
                } else {
                    timer = duration;
                    _timer_Init = true;
                }

            }
            _current_time = timer;

        }, 1000);

    }
    const stopTimer = () => {
        clearInterval(_time_interval)
    }
    const restartTimer = () => {
        startTimer(_current_time, document.querySelector('#timer'));
    }
    const onShowClicked = () => {
        $(displayDescription).show();
        $(Show_btn).hide();
        $(Btn_bar).css('visibility', 'visible');
        document.querySelector('#auxillaryAudio').setAttribute('src', _loaderInstance.getAudioSource("guitarhit"));
        document.querySelector('#auxillaryAudio').play();
    }
    const onShowFeedback = (e, feedbackSelection) => {


        stopTimer();
        let TeamData = getApplication().teamsData;
        let currentTeam = "Team " + getApplication().getRandomTeamSelected();
        let stealOpponentTeam = "Team " + (parseInt(getApplication().stealOpponent) + 1);
        let opponentAvailable = getApplication().stealOpponent;
        let betValue = getApplication().stealValue;
        let _isCorrect = undefined;
        console.log('############################################' + betValue);




        //mark currect question as completed
        //QuestionObjectRef.isAnswered = true;
        getApplication().getQuestionBank().updateQuestionCompletion = currentQuestionID;
        // console.log(getApplication().getQuestionBank().QuestionBank);

        if (((feedbackSelection === 'c') && isCorrect) || ((feedbackSelection === 'i') && (!isCorrect))) {
            _isCorrect = true;
            $('.scoreboard').css('visibility', 'visible');
            $('.feedback #tName').html("TEAM " + getApplication().getRandomTeamSelected());
            $('.feedback #tScore').html('$500');

            //play button audio
            document.querySelector('#auxillaryAudio').setAttribute('src', _loaderInstance.getAudioSource("hornhit"));
            document.querySelector('#auxillaryAudio').play();
            //######################detect here if playing in safeMode act accordingly#################.
            //console.log('Answer given is correct..')
            //console.log('stealOpponentTeam' + stealOpponentTeam)
            if (opponentAvailable !== undefined) {
                //console.log("opponentAvailable yes==" + opponentAvailable)
                //deduct from opponent team score
                TeamData.map((team) => {
                    console.log(team.name + "::stealOpponentTeam::" + stealOpponentTeam);
                    if (team.name === stealOpponentTeam) {
                        console.log('before deducting from opponent team==' + stealOpponentTeam + "::score::" + team.score)
                        team.score = parseInt(team.score) - parseInt(betValue);
                        console.log('after deducting from opponent team==' + stealOpponentTeam + "::score::" + team.score)
                    }
                });
                //add to current team score
                TeamData.map((team) => {
                    //console.log(team.name + "::currentTeam::" + currentTeam);
                    if (team.name === currentTeam) {
                        //console.log('before deducting from currentTeam team==' + currentTeam + "::score::" + team.score)
                        team.score = parseInt(team.score) + parseInt(betValue);
                        //console.log('after deducting from currentTeam team==' + currentTeam + "::score::" + team.score)
                    }
                })
            } else {
                //console.log("opponentAvailable no==" + opponentAvailable)
                TeamData.map((team) => {
                    if (team.name === currentTeam) {
                        team.score += 500;
                    }
                })
            }
        } else {
            _isCorrect = false;
            console.log('Answer given is incorrect..')
            $('.feedback #tName').html("Team " + getApplication().getRandomTeamSelected());
            $('.feedback #tScore').html('$0');

            //play button audio
            document.querySelector('#auxillaryAudio').setAttribute('src', _loaderInstance.getAudioSource("loserhitmix"));
            document.querySelector('#auxillaryAudio').play();
            
            
            //######################detect here if playing in safeMode act accordingly#################.
            if (opponentAvailable !== undefined) {
                TeamData.map((team) => {
                    //deduct from opponent team score
                    if (team.name === stealOpponentTeam) {
                        team.score += parseInt(betValue);
                    }
                })
                //add to current team score
                TeamData.map((team) => {

                    if (team.name === currentTeam) {
                        team.score -= parseInt(betValue);
                    }
                })
            } else {
                //do nothing if there is no opponent and playing in safe mode
                // TeamData.map((team) => {

                //     if (team.name === currentTeam) {
                //         team.score += 500;
                //     }
                // })
            }
        }
        TeamData.map((team) => {

            if (team.name === currentTeam) {
                team.roundPlayed = parseInt(team.roundPlayed) + 1;
            }
        })

        //******************
        //******************check for completion by navigating through teams data. rounds played. 
        //******************Fire completion else goto team randomizor
        //****************** 
        let _teams = getApplication().randomizerInstance;
        let _completedTeams = _teams.sortedOutTeam.filter((team) => parseInt(team.roundPlayed) === getApplication().totalRounds)

        if (_completedTeams.length === _teams.sortedOutTeam.length) {
            setTimeout(() => {
                $('.scoreboard').css('visibility', 'hidden');
                _observerInstance.setState({ currentView: 'conclusionVideoView' });
            }, 2000)
        } else {
            if (_isCorrect) {
                setTimeout(() => {
                    $('.scoreboard').css('visibility', 'hidden');
                    _observerInstance.setState({ currentView: 'teamRandomizerView' });
                }, 2000)
            } else {
                _observerInstance.setState({ currentView: 'teamRandomizerView' });
            }

        }

    }


    _init();
}

export { questionController }
import buttonclick from '../../audio/4measurehiton5_bfornorm.mp3';
import { getApplication } from '../../index';


const topicSelectionController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    let _loaderInstance = getApplication().loader;
    let _questionBank = getApplication().getQuestionBank();
    let myQuestions = undefined;
    let displayBoardsList = undefined;
    let displayTitle = [];
    let _questionContainer = undefined;
    let _randomPos5 = ['11.5%', '27.5%', '43.5%', '59.5%', '75.5%'];
    let _randomPos4 = ['13.6%', '33.5%', '53.5%', '73.5%'];
    let _randomPos3 = ['16.5%', '43.5%', '70%'];
    let _randomPos2 = ['23.5%', '63.5%'];
    $(_stageReference).append(_templateReference);

    //  

    let initDisplay = function () {
        myQuestions = _questionBank.QuestionPool;
        displayBoardsList = document.querySelectorAll("topic");
        _questionContainer = document.createElement('div');
        _questionContainer.setAttribute("id", "questionContainer");
        assignCSS();
        createDisplay();
    }

    let assignCSS = function () {
        let lInstance = getApplication().loader;
        $(".topicSelectionTemplate .teamButtons .badge").css({
            "background": "url(" + lInstance.getImageSource("Team_no_color") + ") no-repeat",
            'background-size': "contain"
        });
        $(".topicSelectionTemplate .badgeRunner").css({
            "background": "url(" + lInstance.getImageSource("FM_team_blue") + ") no-repeat",
            'background-size': "contain"
        }, function () {

        });
        document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("3measurehit"));
        document.querySelector('#gameAudio').play();
        //setTimeout(() => {
        // document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("hornhitbig3"));
        // // console.log('src='+_loaderInstance.getAudioSource("mainloop"))
        // document.querySelector('#gameAudio').play();

        //}, 2500)

        $(".badge" + parseInt(getApplication().getRandomTeamSelected) + ".team-name").css("color", '#fff');
        $(".badge" + parseInt(getApplication().getRandomTeamSelected) + ".team-score").css("color", '#fff');
    }
    let populateDisplayBoards = function (boards, titles) {

        let board = Array.prototype.slice.call(boards);
        // console.log('board', board);
        board.map((b, i) => {
            $(b).attr("data-QID", titles[i]["object"]["questionID"]);
            $(b).addClass('rootTopic');

            //$(b).html(titles[i]["text"]);
            let texElement = document.createElement('span');
            texElement.innerHTML = titles[i]["text"];
            // console.log("adding text" + titles[i]["text"]);
            texElement.classList.add('childtopic');

            b.mouseOver = (e) => {
                document.querySelector('#auxillaryAudio').setAttribute('src', _loaderInstance.getAudioSource("scratchroll2"));
                document.querySelector('#auxillaryAudio').play();
                e.currentTarget.classList.remove('animateBoxOut')
                e.currentTarget.classList.add('animateBoxIn')
            }
            b.mouseOut = (e) => {
                e.currentTarget.classList.remove('animateBoxIn')
                e.currentTarget.classList.add('animateBoxOut')
            }



            b.addEventListener('mouseover', function (e) {
                try {
                    this.mouseOver(e);
                }
                catch (e) {
                    // statements to handle any exceptions
                    //logMyErrors(e); // pass exception object to error handler
                }

            })
            b.addEventListener('mouseout', function (e) {
                try {
                    this.mouseOut(e);
                }
                catch (e) {
                    // statements to handle any exceptions
                    //logMyErrors(e); // pass exception object to error handler
                }
            })

            // b.addEventListener('mouseout', (e) => {
            //     mouseOut(e);
            // })
            b.addEventListener('click', function (e) {
                //console.log(e.target.parent)
               
                this.removeEventListener('mouseout', this.mouseOut);
                this.removeEventListener('mouseover', this.mouseOver);
                this.mouseOut = undefined;
                this.mouseOver = undefined;
                delete this.mouseOut;
                delete this.mouseOver;

                displayClicked(e, e.currentTarget.getAttribute('data-qid'));
            });
            b.appendChild(texElement);
        })
    }
    // let mouseOver = function (e) {
    //     document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("scratchroll2"));
    //     document.querySelector('#gameAudio').play();
    //     e.currentTarget.classList.remove('animateBoxOut')
    //     e.currentTarget.classList.add('animateBoxIn')
    // }
    // let mouseOut = function (e) {
    //     e.currentTarget.classList.remove('animateBoxIn')
    //     e.currentTarget.classList.add('animateBoxOut')
    // }
    let createDisplay = function () {
        myQuestions.map((Q) => {
            displayTitle.push({ text: limitDisplayText(Q.questionTitle), "object": Q });
        });
        displayBoardsList = document.querySelectorAll(".topic");

        let evalPos = getRandomPositionStore(getApplication().totalTeams);
        let rTeam = parseInt(String(getApplication().getRandomTeamSelected()).substr(0, 3));
        $('.topicSelectionTemplate .badgeRunner').css('left', evalPos[(rTeam - 1)]);
        getApplication().assignTeamBackground((rTeam - 1));
        $('.topicSelectionTemplate .animatedTeam').html("Team " + parseInt(getApplication().getRandomTeamSelected()))

        populateDisplayBoards(displayBoardsList, displayTitle);
        $(".badge" + (parseInt(getApplication().getRandomTeamSelected()) - 1) + ".team-name").css("color", '#fff');
        $(".badge" + (parseInt(getApplication().getRandomTeamSelected()) - 1) + ".team-score").css("color", '#fff');
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
    let displayClicked = (e, evtID) => {

        let target = e.currentTarget.getAttribute('id');

        let animationEndElement = document.getElementById(target);
        document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("2measurehiton3"));
        document.querySelector('#gameAudio').play();

        switch (target) {
            case "topic010":
                // e.currentTarget.classList.add('scaleTopic01');
                animateTopics(e.currentTarget);
                break;
            case "topic020":
                animateTopics(e.currentTarget);
                // e.currentTarget.classList.add('scaleTopic02');
                break;
            case "topic030":
                animateTopics(e.currentTarget);
                //e.currentTarget.classList.add('scaleTopic03');
                break;
            case "topic040":
                animateTopics(e.currentTarget);
                //e.currentTarget.classList.add('scaleTopic04');
                break;
            case "topic050":
                animateTopics(e.currentTarget);
                // e.currentTarget.classList.add('scaleTopic05');
                break;

        }

        getApplication().setCurrentQuestionSelectionID(evtID);
        animationEndElement.addEventListener('animationend', () => {
            setTimeout(() => {
                _observerInstance.setState({ currentView: 'questionView' });
            }, 500)
        });
        // animationEndElement.animationend = (e) => {
        //     setTimeout(() => {
        //         alert('loading quesionvide')
        //         _observerInstance.setState({ currentView: 'questionView' });
        //     }, 500)

        // }
        //_observerInstance.setState({ currentView: 'questionView' });

        // $(".topic05").addClass("scaleTopic05");

    }
    let animateTopics = function (tar) {
        let target = tar.getAttribute('id');
        let arr = ['topic010', 'topic020', 'topic030', 'topic040', 'topic050'];
        let toAnimate = arr.filter((t) => target != t);
        // let trackElemAnim = document.getElementById(toAnimate[3]);
        // trackElemAnim.addEventListener('MSAnimationEnd', function () {
        //     alert('animation end')
        // });

        $('#' + toAnimate[0]).animate({
            'top': '120%',
            'opacity': '0'
        }, 300)
        $('#' + toAnimate[1]).animate({
            'top': '120%',
            'opacity': '0'
        }, 50)
        $('#' + toAnimate[2]).animate({
            'top': '120%',
            'opacity': '0'
        }, 700)
        $('#' + toAnimate[3]).animate({
            'top': '120%',
            'opacity': '0'
        }, 1000, function () {
            let num = target.substr(5, target.length);
            tar.classList.add('scaleTopic' + num);
            $(".topicSelectionTemplate .badgeRunner").css("display", "none");
            $(".topicSelectionTemplate .teamButtons").css("display", "none");
        })

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
    let limitDisplayText = function (text) {
        let _text = text.substring(0, 50);
        return _text + "...";
    }
    initDisplay();
}

export { topicSelectionController }
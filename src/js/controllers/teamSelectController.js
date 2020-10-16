import buttonclick from '../../audio/4measurehiton5_bfornorm.mp3';
import { getApplication } from '../../index';


const teamSelectController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    let _loaderInstance = getApplication().loader;
    let team_select_btn2 = undefined;
    let team_select_btn3 = undefined;
    let team_select_btn4 = undefined;
    let team_select_btn5 = undefined;

    $(_stageReference).append(_templateReference);


    const _assignCSS = function () {
        let lInstance = getApplication().loader;
        $(".selectTeamCountTemplate").css({
            "background": "url(" + lInstance.getImageSource("teams_bg") + ") no-repeat #d5c2a1",
            'background-size': "220% 145%",
            'background-position': "-32vh -34vh",
            function() {
                //callback can be called here on load
                _assignDomEvents();
            }
        });
        let btn01 = document.querySelector(".select02");
        let btn02 = document.querySelector(".select03");
        let btn03 = document.querySelector(".select04");
        let btn04 = document.querySelector(".select05");

        let hover01 = document.getElementById("button_hover_bottom01");
        let hover02 = document.getElementById("button_hover_bottom02");
        let hover03 = document.getElementById("button_hover_bottom03");
        let hover04 = document.getElementById("button_hover_bottom04");


        btn01.addEventListener('mouseover', function (e) {
            hover01.classList.remove('animateHoverDownTeamSelection');
            hover01.classList.add('animateHoverUpTeamSelection');
        })
        btn01.addEventListener('mouseout', function (e) {
            hover01.classList.remove('animateHoverUpTeamSelection');
            hover01.classList.add('animateHoverDownTeamSelection');
        })
        btn02.addEventListener('mouseover', function (e) {
            hover02.classList.remove('animateHoverDownTeamSelection');
            hover02.classList.add('animateHoverUpTeamSelection');
        })
        btn02.addEventListener('mouseout', function (e) {
            hover02.classList.remove('animateHoverUpTeamSelection');
            hover02.classList.add('animateHoverDownTeamSelection');
        })
        btn03.addEventListener('mouseover', function (e) {
            hover03.classList.remove('animateHoverDownTeamSelection');
            hover03.classList.add('animateHoverUpTeamSelection');
        })
        btn03.addEventListener('mouseout', function (e) {
            hover03.classList.remove('animateHoverUpTeamSelection');
            hover03.classList.add('animateHoverDownTeamSelection');
        })
        btn04.addEventListener('mouseover', function (e) {
            hover04.classList.remove('animateHoverDownTeamSelection');
            hover04.classList.add('animateHoverUpTeamSelection');
        })
        btn04.addEventListener('mouseout', function (e) {
            hover04.classList.remove('animateHoverUpTeamSelection');
            hover04.classList.add('animateHoverDownTeamSelection');
        })
        document.querySelector('#labelAnimate').classList.add('animateLableTeamSelection');
    }
    const _init = () => {
        _assignCSS();
        //_assignDomEvents();
    }

    const _assignDomEvents = () => {
        team_select_btn2 = $(".selectTeamCountTemplate .select02");
        team_select_btn3 = $(".selectTeamCountTemplate .select03");
        team_select_btn4 = $(".selectTeamCountTemplate .select04");
        team_select_btn5 = $(".selectTeamCountTemplate .select05");
        $(team_select_btn2).on('click', (e) => { onTeamSelect(e); })
        $(team_select_btn3).on('click', (e) => { onTeamSelect(e); })
        $(team_select_btn4).on('click', (e) => { onTeamSelect(e); })
        $(team_select_btn5).on('click', (e) => { onTeamSelect(e); })

    }


    const onTeamSelect = (evt) => {
        let selectedBtn = undefined;
        if ($(evt.target).hasClass('select02')) {
            selectedBtn = 2;
        } else if ($(evt.target).hasClass('select03')) {
            selectedBtn = 3;
        } else if ($(evt.target).hasClass('select04')) {
            selectedBtn = 4;
        } else if ($(evt.target).hasClass('select05')) {
            selectedBtn = 5;
        } else {
            throw new Error('Button is undefined is team')
        }
        //**play audio */
        document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("hornhit"));
        document.querySelector('#gameAudio').loop = false; 
        let prom = document.querySelector('#gameAudio').play();
        /** */   
        getApplication().totalTeams = selectedBtn;
        _observerInstance.setState({ currentView: 'roundSelectView' });
    }

    _init();
}

export { teamSelectController }
import buttonclick from '../../audio/4measurehiton5_bfornorm.mp3';
import { getApplication } from '../../index';


const roundSelectController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    let _loaderInstance = getApplication().loader;

    let round_select_btn1 = undefined;
    let round_select_btn2 = undefined;
    let round_select_btn3 = undefined;
    let round_select_btn4 = undefined;
    let round_select_btn5 = undefined;
    let round_select_btn6 = undefined;
    let round_select_btn7 = undefined;

    $(_stageReference).append(_templateReference);



    const _init = () => {
        _assignCSS();

        // _assignDomEvents();
    }


    const _assignDomEvents = () => {
        round_select_btn1 = $(".roundSelectTemplate .round1");
        round_select_btn2 = $(".roundSelectTemplate .round2");
        round_select_btn3 = $(".roundSelectTemplate .round3");
        round_select_btn4 = $(".roundSelectTemplate .round4");
        round_select_btn5 = $(".roundSelectTemplate .round5");
        round_select_btn6 = $(".roundSelectTemplate .round6");
        round_select_btn7 = $(".roundSelectTemplate .round7");
        $(round_select_btn1).on('click', (e) => { onRoundSelect(e); })
        $(round_select_btn2).on('click', (e) => { onRoundSelect(e); })
        $(round_select_btn3).on('click', (e) => { onRoundSelect(e); })
        $(round_select_btn4).on('click', (e) => { onRoundSelect(e); })
        $(round_select_btn5).on('click', (e) => { onRoundSelect(e); })
        $(round_select_btn6).on('click', (e) => { onRoundSelect(e); })
        $(round_select_btn7).on('click', (e) => { onRoundSelect(e); })

    }


    const onRoundSelect = (evt) => {
        let selectedBtn = undefined;
        if ($(evt.target).hasClass('round1')) {
            selectedBtn = 1;
        } else if ($(evt.target).hasClass('round2')) {
            selectedBtn = 2;
        } else if ($(evt.target).hasClass('round3')) {
            selectedBtn = 3;
        } else if ($(evt.target).hasClass('round4')) {
            selectedBtn = 4;
        } else if ($(evt.target).hasClass('round5')) {
            selectedBtn = 5;
        } else if ($(evt.target).hasClass('round6')) {
            selectedBtn = 6;
        } else if ($(evt.target).hasClass('round7')) {
            selectedBtn = 7;
        } else {
            throw new Error('Button is undefined is team')
        }
        //**play audio */
        document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("hornhit"));
        document.querySelector('#gameAudio').loop = false; 
        let prom = document.querySelector('#gameAudio').play();
        /** */      
        getApplication().totalRounds = selectedBtn;
        _observerInstance.setState({ currentView: 'verifySelectionView' });
    }
    const _assignCSS = function () {
        let lInstance = getApplication().loader;
        $(".roundSelectTemplate").css({
            "background": "url(" + lInstance.getImageSource("select_team_count") + ") 0vh -14vh no-repeat #d5c2a1",
            'background-size': "100% 100%",
            function() {
                //callback can be called here on load
                _assignDomEvents();
            }
        });

        let btn01 = document.querySelector(".round1");
        let btn02 = document.querySelector(".round2");
        let btn03 = document.querySelector(".round3");
        let btn04 = document.querySelector(".round4");
        let btn05 = document.querySelector(".round5");
        let btn06 = document.querySelector(".round6");
        let btn07 = document.querySelector(".round7");

        let hover01 = document.getElementById("button_round_hover_bottom01");
        let hover02 = document.getElementById("button_round_hover_bottom02");
        let hover03 = document.getElementById("button_round_hover_bottom03");
        let hover04 = document.getElementById("button_round_hover_bottom04");
        let hover05 = document.getElementById("button_round_hover_bottom05");
        let hover06 = document.getElementById("button_round_hover_bottom06");
        let hover07 = document.getElementById("button_round_hover_bottom07");


        btn01.addEventListener('mouseover', function (e) {
            console.log('over')
            hover01.classList.remove('animateHoverDownRoundSelection');
            hover01.classList.add('animateHoverUpRoundSelection');
        })
        btn01.addEventListener('mouseout', function (e) {
            console.log('out')
            hover01.classList.remove('animateHoverUpRoundSelection');
            hover01.classList.add('animateHoverDownRoundSelection');
        })




        btn02.addEventListener('mouseover', function (e) {
            hover02.classList.remove('animateHoverDownRoundSelection');
            hover02.classList.add('animateHoverUpRoundSelection');
        })
        btn02.addEventListener('mouseout', function (e) {
            hover02.classList.remove('animateHoverUpRoundSelection');
            hover02.classList.add('animateHoverDownRoundSelection');
        })




        btn03.addEventListener('mouseover', function (e) {
            hover03.classList.remove('animateHoverDownRoundSelection');
            hover03.classList.add('animateHoverUpRoundSelection');
        })
        btn03.addEventListener('mouseout', function (e) {
            hover03.classList.remove('animateHoverUpRoundSelection');
            hover03.classList.add('animateHoverDownRoundSelection');
        })




        btn04.addEventListener('mouseover', function (e) {
            hover04.classList.remove('animateHoverDownRoundSelection');
            hover04.classList.add('animateHoverUpRoundSelection');
        })
        btn04.addEventListener('mouseout', function (e) {
            hover04.classList.remove('animateHoverUpRoundSelection');
            hover04.classList.add('animateHoverDownRoundSelection');
        })




        btn05.addEventListener('mouseover', function (e) {
            console.log('up')
            hover05.classList.remove('animateHoverDownRoundSelection');
            hover05.classList.add('animateHoverUpRoundSelection');
        })
        btn05.addEventListener('mouseout', function (e) {
            console.log('out')
            hover05.classList.remove('animateHoverUpRoundSelection');
            hover05.classList.add('animateHoverDownRoundSelection');
        })




        btn06.addEventListener('mouseover', function (e) {
            hover06.classList.remove('animateHoverDownRoundSelection');
            hover06.classList.add('animateHoverUpRoundSelection');
        })
        btn06.addEventListener('mouseout', function (e) {
            hover06.classList.remove('animateHoverUpRoundSelection');
            hover06.classList.add('animateHoverDownRoundSelection');
        })




        btn07.addEventListener('mouseover', function (e) {
            hover07.classList.remove('animateHoverDownRoundSelection');
            hover07.classList.add('animateHoverUpRoundSelection');
        })
        btn07.addEventListener('mouseout', function (e) {
            hover07.classList.remove('animateHoverUpRoundSelection');
            hover07.classList.add('animateHoverDownRoundSelection');
        })
        document.querySelector('#roundAnimate').classList.add('animateLableRoundSelection');
    }
    _init();
}

export { roundSelectController }
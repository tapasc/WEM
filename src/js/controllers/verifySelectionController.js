import buttonclick from '../../audio/4measurehiton5_bfornorm.mp3';
import { getApplication } from '../../index';


const verifySelectionController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    let _loaderInstance = getApplication().loader;
    let Y_btn = undefined;
    let N_btn = undefined;
    $(_stageReference).append(_templateReference);


    const _assignDomEvents = () => {
        Y_btn = $(".verifySelectionTemplate .yes");
        N_btn = $(".verifySelectionTemplate .no");
        $(Y_btn).on('click', (e) => { onClicked(e); })
        $(N_btn).on('click', (e) => { onClicked(e); })
    }
    const _init = () => {
        _assignCSS();

    }

    const onClicked = (e) => {
        let type = $(e.target).hasClass('yes');

        /** */
        if (type) {
            document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("hornhitbig3"));
            // console.log('src='+_loaderInstance.getAudioSource("mainloop"))
            let prom = document.querySelector('#gameAudio').play();


        } else {
            //**play audio */
            document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("hornhit"));
            document.querySelector('#gameAudio').loop = false;
            let prom = document.querySelector('#gameAudio').play();


        }
        if (type) {
            _observerInstance.setState({ currentView: 'introVideoView' });
        } else {
            _observerInstance.setState({ currentView: 'teamSelectView' });
        }

    }

    const _assignCSS = function () {
        let lInstance = getApplication().loader;
        
        $(".verifySelectionTemplate").css({
            "background": "url(" + lInstance.getImageSource("verify_selection") + ") 0vh 0vh no-repeat #d5c2a1",
            'background-size': "100% 100%",
            function() {
                $(".verifySelectionTemplate .verifySelection").addClass('animateVerifyTitle');
                //callback can be called here on load
                _assignDomEvents();
            }
        });
        let btn01 = document.querySelector(".yes");
        let btn02 = document.querySelector(".no");


        let hover01 = document.getElementById("button_hover_bottom01");
        let hover02 = document.getElementById("button_hover_bottom02");



        btn01.addEventListener('mouseover', function (e) {
            hover01.classList.remove('animateHoverDownVerify');
            hover01.classList.add('animateHoverUpVerify');
        })
        btn01.addEventListener('mouseout', function (e) {
            hover01.classList.remove('animateHoverUpVerify');
            hover01.classList.add('animateHoverDownVerify');
        })
        btn02.addEventListener('mouseover', function (e) {
            hover02.classList.remove('animateHoverDownVerify');
            hover02.classList.add('animateHoverUpVerify');
        })
        btn02.addEventListener('mouseout', function (e) {
            hover02.classList.remove('animateHoverUpVerify');
            hover02.classList.add('animateHoverDownVerify');
        })
    }
    _init();
}

export { verifySelectionController }
import mainloop from '../../audio/mainloop.mp3';
import { getApplication } from '../../index';


const splashController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    let _loaderInstance = getApplication().loader;
    let Begin_btn = undefined;

    $(_stageReference).append(_templateReference);


    const _assignDomEvents = () => {

        $(Begin_btn).on('click', () => { onBeginClicked(); });


        //    url(../images/FM_intro_MC.png) center center no-repeat #d5c2a1; 
    }
    const _init = () => {
        Begin_btn = $("#BeginBtn");
        // console.log(_loaderInstance.getAudioSource("mainloop"));
        assignCSS();
    }

    const assignCSS = function () {
        let beginBtn = document.getElementById("BeginBtn");
        let hover = document.getElementById("button_hover_splash_bottom");
        beginBtn.addEventListener('mouseover',function(e){
            hover.classList.remove('animateHoverDownSplash');
            hover.classList.add('animateHoverUpSplash');
        })
        beginBtn.addEventListener('mouseout',function(e){
            hover.classList.remove('animateHoverUpSplash');
            hover.classList.add('animateHoverDownSplash');
        })
        //beginBtn.onmouseover = function(){}
        $(".splashTemplate .bottomBG").css({
            "background": "url(" + _loaderInstance.getImageSource('FM_intro_MC') + ") center -6vh no-repeat",
            'background-size': "111% 111%",
            function() {
                //callback can be called here on load
                //_assignDomEvents();
            }
        });
        $(".splashTemplate .topBG").css({
            "background": "url(" + _loaderInstance.getImageSource('FM_intro_MC_2') + ") center -6vh no-repeat",
            'background-size': "111% 111%",
            function() {
                //callback can be called here on load
                _assignDomEvents();
            }
        });


    }
    const onBeginClicked = () => {
        //alert('asdf');
        document.querySelector('#player').setAttribute('src', _loaderInstance.getAudioSource("gamemusic"));
        // console.log('src='+_loaderInstance.getAudioSource("mainloop"))
        document.querySelector('#player').play();
        // prom.then(()=>{
        // }).catch((error)=>{
        //     alert('manunally enable browser audio...')
        // });

        _observerInstance.setState({ currentView: 'teamSelectView' });
    }


    _init();
}

export { splashController }
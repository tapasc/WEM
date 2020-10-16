import mainloop from '../../audio/mainloop.mp3';
import { getApplication } from '../../index';


const auxillaryController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    let _loaderInstance = getApplication().loader;
    let Close = undefined;

    $(_stageReference).append(_templateReference);


    const _assignDomEvents = () => {

        $(Close).on('click', () => { onBeginClicked(); });


        //    url(../images/FM_intro_MC.png) center center no-repeat #d5c2a1; 
    }
    const _init = () => {
        Close = $("#HelpClose");
        // console.log(_loaderInstance.getAudioSource("mainloop"));
        assignCSS();
    }

    const assignCSS = function () {
        $(".auxillaryTemplate").css({
            "background": "url(" + _loaderInstance.getImageSource('FM_empty_frame_MC') + ") center center no-repeat rgba(213, 194, 161,0.7)",
            'background-size': "contain",
            function() {
                //callback can be called here on load
                _assignDomEvents();
            }
        });
    }
    const onBeginClicked = () => {
        //alert('asdf');
        $('#auxillary').animate({
            top: "-100%"
        }, "fast", () => { })
    }


    _init();
}

export { auxillaryController }
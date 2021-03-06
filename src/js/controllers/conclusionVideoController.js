import { getApplication } from '../../index';


const conclusionVideoController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    $(_stageReference).append(_templateReference);

    let Begin_btn = $("#skipBtn");
    let play_btn = $(".playBtn");
    let video = $("video")[0];

    let onEnd = function (e) {
        getApplication().isStealVideoAttempted = true;
        // _observerInstance.setState({ currentView: 'staticTeamRandomizerView' });
    }

    $(video).on('ended', onEnd);
    $(Begin_btn).on('click', () => {
        //$(video)[0].play();
        getApplication().isStealVideoAttempted = true;
        //_observerInstance.setState({ currentView: 'staticTeamRandomizerView' });
    })
    // $(play_btn).on('click', () => {
    //     $(".stealVideoTemplate .Overlay").hide();
    $(video)[0].play();
    setTimeout(function () {
        let el = document.querySelector(".gameEnd");
        el.style.display = "block";
    }, 7500)
    // })

}

export { conclusionVideoController }
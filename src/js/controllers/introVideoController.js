import buttonclick from '../../audio/4measurehiton5_bfornorm.mp3';
import { getApplication } from '../../index';


const introVideoController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    let _loaderInstance = getApplication().loader;
    $(_stageReference).append(_templateReference);

    let Begin_btn = $("#skipBtn");
    let play_btn = $(".playBtn");
    let video = $("#intro_video");

    document.querySelector('#player').setAttribute('src', _loaderInstance.getAudioSource("quietbackgroundmusic"));
    document.querySelector('#intro_video').setAttribute('src', _loaderInstance.getVideoSource("game_intro"));
    // console.log('src='+_loaderInstance.getAudioSource("mainloop"))
    let prom = document.querySelector('#player').play();
    // prom.then(() => {
    // }).catch((error) => {
    //     alert('manunally enable browser audio...')
    // });
    let onEnd = function (e) {
        _observerInstance.setState({ currentView: 'teamRandomizerView' });
    }

    $(video).on('ended', onEnd);
    $(Begin_btn).on('click', () => {
        //$(video)[0].play();
        document.querySelector('#gameAudio').setAttribute('src', _loaderInstance.getAudioSource("hornhit"));
        console.log('src=' + _loaderInstance.getAudioSource("mainloop"))
        let prom = document.querySelector('#gameAudio').play();
        _observerInstance.setState({ currentView: 'teamRandomizerView' });
    })
    // $(play_btn).on('click', () => {
    $(".introVideoTemplate .Overlay").hide();
    $(video)[0].play();

    //})


    let btn01 = document.querySelector("#skipBtn");
    let hover01 = document.getElementById("button_intro_hover_bottom01");
    btn01.addEventListener('mouseover', function (e) {
        hover01.classList.remove('animateHoverDownIntro');
        hover01.classList.add('animateHoverUpIntro');
    })
    btn01.addEventListener('mouseout', function (e) {
        hover01.classList.remove('animateHoverUpIntro');
        hover01.classList.add('animateHoverDownIntro');
    })


}

export { introVideoController }
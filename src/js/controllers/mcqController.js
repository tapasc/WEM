import buttonclick from '../../audio/4measurehiton5_bfornorm.mp3';
import {getApplication} from '../../index';


const mcqController = function (template) {
    //${template};
    let player = document.querySelector('#player');
    player.setAttribute('src',buttonclick);
    //console.log(buttonclick)
    $('#stage').append(template);
    const nxtBtnHandle = document.querySelector("#nextButton");
    nxtBtnHandle.addEventListener('click', function () {
        //console.log('you have clicked nextQuestion!!');
        //player.play();
        ////console.log(getApplication().getObserver().setState({name:'Microsoft!!'}))
        //console.log(getApplication().getQuestionBank().nextQuestion);
    });

    const prevBtnHandle = document.querySelector("#peviousButton");
    prevBtnHandle.addEventListener('click', function () {
        ////console.log('you have clicked previous!!');
        //player.play();
        ////console.log(getApplication().getObserver().setState({name:'Microsoft!!'}))
        //console.log(getApplication().getQuestionBank().previousQuestion);
        
    });
}

export { mcqController }
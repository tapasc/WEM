import buttonclick from '../../audio/4measurehiton5_bfornorm.mp3';
import { getApplication } from '../../index';
import TimerUp from "../widget/TimerUp"

const topBarController = function (template, stage) {
    let _stageReference = stage;
    let _templateReference = template;
    let _observerInstance = getApplication().getObserver();
    $(_stageReference).append(_templateReference);
    let HelpBtn = document.querySelector(".HelpBtn");
    let ExitBtn = document.querySelector(".ExitBtn");

    let _init = function () {
        let c = new TimerUp();
        let s = "seconds";
        let m = "minutes";
        let h = "hours";
        c.SecondsElement = s;
        c.MinutesElement = m;
        c.HoursElement = h;
        c._init();

        $(".HelpBtn").click((e) => {

            $('#auxillary').animate({
                top: "0%"
            }, "fast", () => { })
        })
        $(".ExitBtn").click((e) => {
            window.close();
            // $('#auxillary').animate({
            //     top: "0%"
            // }, "fast", () => { })
        })
    }


    _init();
}

export { topBarController }
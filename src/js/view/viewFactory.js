//--@Controllers@--//
import { mcqController } from '../controllers/mcqController';
import { splashController } from '../controllers/splashController';
import { topBarController } from '../controllers/topBarController';
import { auxillaryController } from '../controllers/auxillaryController';
import { teamSelectController } from '../controllers/teamSelectController';
import { roundSelectController } from '../controllers/roundSelectController';
import { verifySelectionController } from '../controllers/verifySelectionController';
import { introVideoController } from '../controllers/introVideoController';
import { conclusionVideoController } from '../controllers/conclusionVideoController';
import { stealVideoController } from '../controllers/stealVideoController';
import { teamRandomizerController } from '../controllers/teamRandomizerController';
import { staticTeamRandomizerController } from '../controllers/staticTeamRandomizerController';
import { topicSelectionController } from '../controllers/topicSelectionController';
import { questionController } from '../controllers/questionController';
//--@Templates@--//
import { getApplication } from '../../index';
import topBarTemplate from '../../templates/topBar.hbs';
import auxillaryTemplate from '../../templates/auxillary.hbs';
import mcqTemplate from '../../templates/mcq.hbs';
import teamSelectTemplate from '../../templates/teamSelect.hbs';
import splashTemplate from '../../templates/splash.hbs';
import roundSelecTemplate from '../../templates/roundSelect.hbs';
import verifySelectionTemplate from '../../templates/verifySelection.hbs';
import introVideoTemplate from '../../templates/introVideo.hbs';
import conclusionVideoTemplate from '../../templates/conclusionVideo.hbs';
import stealVideoTemplate from '../../templates/stealVideo.hbs';
import teamRandomizerTemplate from '../../templates/teamRandomizer.hbs';
import staticTeamRandomizerTemplate from '../../templates/staticTeamRandomizer.hbs';
import topicSelectionTemplate from '../../templates/topicSelection.hbs';
import questionTemplate from '../../templates/question.hbs';

class viewFactory {
    constructor(stageRef) {
        this._gameContainer = getApplication().gameContainer;
        this._gameTooBar = getApplication().gameToolBar;
        this._auxillaryContainer = getApplication().auxillary;
        this.QuestionModel = getApplication().getQuestionBank();
        this._observer = getApplication().getObserver();
        //Template Reference
        this._mcq = mcqTemplate;
        this._topBar = topBarTemplate;
        this._auxillaryTemplate = auxillaryTemplate;
        this._teamSelection = teamSelectTemplate;
        this._splashTemplate = splashTemplate;
        this._roundSelect = roundSelecTemplate;
        this._verifySelection = verifySelectionTemplate;
        this._introVideo = introVideoTemplate;
        this._conclusionVideo = conclusionVideoTemplate;
        this._stealVideo = stealVideoTemplate;
        this._teamRandomizer = teamRandomizerTemplate;
        this._staticTeamRandomizer = staticTeamRandomizerTemplate;
        this._topicSelection = topicSelectionTemplate;
        this._question = questionTemplate;
        //this.updateView = this.updateView.bind(this);
    }
    renderDefaultView() {
        //render topBar and othr default view to be rendered
        topBarController(this._topBar({ score: 400 }), this._gameTooBar);
        auxillaryController(this._auxillaryTemplate({ score: 400 }), this._auxillaryContainer);
    }
    updateView(viewType, template, templateData) {
        if (viewType !== "questionView") {
            this.clearView();
        }
        // let _viewType = viewType;
        // let _template = tempate;
        // let _templateData = templateData
        switch (viewType) {
            case 'initialView':
                // this._gameContainer.classList.add(_viewType);
                splashController(this._splashTemplate({}), this._gameContainer);
                //console.log('in initial view update')
                break;
            case 'teamSelectView':
                // this._gameContainer.classList.add(_viewType);
                teamSelectController(this._teamSelection({}), this._gameContainer);
                //console.log('in initial view update');
                break;
            case 'roundSelectView':
                // this._gameContainer.classList.add(_viewType);
                roundSelectController(this._roundSelect({}), this._gameContainer);
                //console.log('in initial view update');
                break;
            case 'topicSelectionView':
                // this._gameContainer.classList.add(_viewType);
                topicSelectionController(this._topicSelection({
                    teamsList: getApplication().teamsData
                }), this._gameContainer);
                //console.log('in initial view update');
                break;
            case 'verifySelectionView':
                // this._gameContainer.classList.add(_viewType);
                verifySelectionController(this._verifySelection({
                    totalTeams: getApplication().totalTeams,
                    totalRounds: getApplication().totalRounds
                }), this._gameContainer);
                //console.log('in initial view update');
                break;
            case 'introVideoView':
                // this._gameContainer.classList.add(_viewType);
                introVideoController(this._introVideo({}), this._gameContainer);
                //console.log('in initial view update');
                break;
            case 'conclusionVideoView':
                // this._gameContainer.classList.add(_viewType);
                conclusionVideoController(this._conclusionVideo({}), this._gameContainer);
                //console.log('in initial view update');
                break;
            case 'stealVideoView':
                // this._gameContainer.classList.add(_viewType);
                stealVideoController(this._stealVideo({}), this._gameContainer);
                //console.log('in initial view update');
                break;
            case 'questionView':
                // this._gameContainer.classList.add(_viewType);
                this.addQuestionContainer();
                //console.log('in initial view update');
                break;
            case 'teamRandomizerView':
                // this._gameContainer.classList.add(_viewType);

                teamRandomizerController(this._teamRandomizer({
                    teamsList: getApplication().teamsData
                }), this._gameContainer);
                //console.log('in initial view update');
                break;
            case 'staticTeamRandomizerView':
                // this._gameContainer.classList.add(_viewType);

                staticTeamRandomizerController(this._staticTeamRandomizer({
                    teamsList: getApplication().teamsData
                }), this._gameContainer);
                //console.log('in initial view update');
                break;
            case 'mcq':
                break;
            default:
                throw new Error('no matching view found!!')
                break;
        }
        //console.log(this.QuestionModel.nextQuestion.questionID);

    }

    addQuestionContainer() {
        let QPoolA = getApplication().getQuestionBank().currentQuestionPool;
        let QselectedIndex = getApplication().getCurrentQuestionSelectionID();
        let selectedQObject = QPoolA.filter((Q) => {
            if (Q.questionID === parseInt(QselectedIndex)) {
                return Q
            }

        })

        let qContainer = document.createElement('div');
        qContainer.setAttribute("id", 'questionContainerOverlay');
        console.log('QPoolA=', QPoolA);
        console.log('QselectedIndex=', QselectedIndex);
        this._gameContainer.appendChild(qContainer);

        questionController(this._question({
            TeamsUp: getApplication().getRandomTeamSelected(),
            teamsList: getApplication().teamsData,
            Question: selectedQObject[0]
        }), qContainer, selectedQObject[0]);
    }

    clearView() {
        // //console.log('######ClearView#########', this._gameContainer.childNodes.length);
        $("#questionContainerOverlay").remove();
        let hasChild = this._gameContainer.childNodes.length;
        if (hasChild > 0) {
            this._gameContainer.removeChild(this._gameContainer.childNodes[0]);
        }

    }
}

export default viewFactory
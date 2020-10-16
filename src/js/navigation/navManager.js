import { getApplication } from '../../index';

class navManager {
    constructor(model, viewFactory) {
        this._model = model;
        this._viewFactoy = viewFactory;
        this._observer = null;
        this._currentQuestion = null;
        this._currentView = null;
        this.notify = this.notify.bind(this);
    }

    init() {
        this._observer = getApplication().getObserver();
        this._observer.addObserver(this.notify);
        this._viewFactoy.renderDefaultView();
    }

    navigateNext() {
        //console.log('going Next....');
    }

    navigatePrevious() {
        //console.log('going Previous....');
    }
    notify(currentState) {
        ////console.log('@@@@@@@@@@@@@@@@' + this._currentView);
        ////console.log('@@@@@@@@@@@@@@@@' + currentState.currentView);
        if (this._currentView !== currentState.currentView) {


            switch (currentState.currentView) {
                case 'initialView':
                    this._currentView = 'initialView';
                    this._viewFactoy.updateView('initialView');
                    break;
                case 'introVideoView':
                    this._currentView = 'introVideoView';
                    this._viewFactoy.updateView('introVideoView');
                    break;
                case 'conclusionVideoView':
                    this._currentView = 'conclusionVideoView';
                    this._viewFactoy.updateView('conclusionVideoView');
                    break;
                case 'stealVideoView':
                    this._currentView = 'stealVideoView';
                    this._viewFactoy.updateView('stealVideoView');
                    break;
                case 'teamSelectView':
                    this._currentView = 'teamSelectView';
                    this._viewFactoy.updateView('teamSelectView');
                    //console.log('view factory updating view with [' + this._currentView + ']')
                    break;
                case 'roundSelectView':
                    this._currentView = 'roundSelectView';
                    this._viewFactoy.updateView('roundSelectView');
                    break;
                case 'verifySelectionView':
                    this._currentView = 'verifySelectionView';
                    this._viewFactoy.updateView('verifySelectionView');
                    break;
                case 'teamRandomizerView':
                    this._currentView = 'teamRandomizerView';
                    this._viewFactoy.updateView('teamRandomizerView');
                    break;
                case 'staticTeamRandomizerView':
                    this._currentView = 'staticTeamRandomizerView';
                    this._viewFactoy.updateView('staticTeamRandomizerView');
                    break;
                case 'topicSelectionView':
                    this._currentView = 'topicSelectionView';
                    this._viewFactoy.updateView('topicSelectionView');
                    break;
                case 'questionView':
                    this._currentView = 'questionView';
                    this._viewFactoy.updateView('questionView');
                    break;
                default:
                    this._currentView = 'initialView';
                    this._viewFactoy.updateView('initialView');
                    break;
            }
            ////console.log(this._viewFactoy.testView())
            //these below are for testing..

            //-----------------below template loaders are used
            //this._viewFactoy.updateView('topicSelectionView');
            //this._viewFactoy.updateView('questionView');
            //this._viewFactoy.updateView('teamSelectView');
            //this._viewFactoy.updateView('roundSelectView');
            //this._viewFactoy.updateView('verifySelectionView');
            //this._viewFactoy.updateView('teamRandomizerView');
            //this._viewFactoy.updateView('teamRandomizerView');
            //-----------------------------------------------


            // this._observer.setState({
            //     currentView:'initialView'
            // })
        }
    }

}

export default navManager;
import Question from './question';

class QuestionBank {
    //isRandomized needs to be set from global question object later
    constructor(questions) {
        this._questionCollection = questions;
        ////console.log(this._questionCollection);
        // this._isRandomized = behaviourConfig.isRandomized;
        this._currentQuestion = -1;
        this._questionBank = [];
        this._currentPool = [];
    }

    _createQuestionBank(_qlist, _lstLength) {
        let qCount = 0;
        const _list = _qlist;

        while (qCount < _lstLength) {
            //console.log(_list[qCount].options);
            const Q = new Question(
                _list[qCount].questionID,
                _list[qCount].questionText,
                _list[qCount].questionTitle,
                _list[qCount].options,
                _list[qCount].answers,
                $(_list[qCount].answerText).html(),
                _list[qCount].time,
                _list[qCount].isShuffled,
                _list[qCount].isAnswered = false
            );

            this._questionBank.push(Q);
            qCount++;
        }
    }

    init() {
        this._createQuestionBank(this._questionCollection, this.questionListLength);
    }

    _evaluateNextQuestion() {
        let _NextQuestion = undefined;

        if ((this.CurrentQuestion === -1) || (this.CurrentQuestion < (this.QuestionBankLength - 1))) {
            this.CurrentQuestion = this.CurrentQuestion + 1;
            _NextQuestion = this.QuestionBank[this.CurrentQuestion];
            ////console.log('increament if' + this.CurrentQuestion)
        } else {
            return 'complete';
        }

        return _NextQuestion;
    }
    _evaluatePreviousQuestion() {
        let _PreviousQuestion = undefined;

        if ((this.CurrentQuestion !== 0) || (this.CurrentQuestion > 0)) {
            this.CurrentQuestion = this.CurrentQuestion - 1;
            _PreviousQuestion = this.QuestionBank[this.CurrentQuestion];
            ////console.log('increament if' + this.CurrentQuestion)
        } else {
            return 'complete';
        }
        return _PreviousQuestion;
    }
    _createPool(pool) {
        let filteredPool = [];
        let PoolCount = pool;
        let PoolLimit = 0;

        if (parseInt(this.QuestionBank.length) < parseInt(PoolCount)) {
            throw new Error('Question Bank has less questions than Minimum Pool count required.')
        }
        this.QuestionBank.map((Q) => {
            if ((!Q.isAnswered) && (PoolLimit != PoolCount)) {
                filteredPool.push(Q);
                PoolLimit++;
            }
        });
        this._currentPool = [];
        this._currentPool = filteredPool;
        return filteredPool;
    }



    //getters and setter
    get questionListLength() {
        return this._questionCollection.length;
    }

    get nextQuestion() {
        return this._evaluateNextQuestion();
    }

    get previousQuestion() {
        return this._evaluatePreviousQuestion();
    }
    get CurrentQuestion() {
        return this._currentQuestion;
    }
    set CurrentQuestion(index) {
        this._currentQuestion = index;
    }
    get QuestionIndex() {

    }
    get QuestionBank() {
        return this._questionBank;
    }
    get QuestionPool() {
        return this._createPool(5);
    }
    get QuestionBankLength() {
        return this._questionBank.length;
    }
    get currentQuestionPool() {
        return this._currentPool;
    }
    set updateQuestionCompletion(questionIndex) {
        let QB = this.QuestionBank;
        QB.map((Q) => {
            if (parseInt(Q.questionID) === parseInt(questionIndex)) {
                Q.updateCompletion = true;
            }
        })

    }
}

export default QuestionBank;
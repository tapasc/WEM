class Question {
    constructor(questionID, questionText, questionTitle, optionsList, answers, answerText, time, isShuffled, isAnswered) {
        this.questionID = questionID;
        this.questionText = questionText;
        this.questionTitle = questionTitle;
        this.optionsList = optionsList;
        this.time = time;
        this.answers = answers;
        this.answerText = answerText
        this.isShuffled = isShuffled
        this.isAnswered = isAnswered;
        //this.behaviourConfig = behaviourConfig;
    }

    set updateCompletion(isComplete) {
        if (typeof isComplete === "boolean") {
            this.isAnswered = isComplete;
        }
    }

}

export default Question; 
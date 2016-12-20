export class Question {
    // Question data
    public question : string;
    public answerA : string;
    public answerB : string;
    public answerC : string;
    public answerD : string;
    public correctAnswer : string;

    constructor(question : string, answerA : string, answerB : string, answerC : string, answerD : string, correctAnswer : string) {
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correctAnswer = correctAnswer;
    }
}
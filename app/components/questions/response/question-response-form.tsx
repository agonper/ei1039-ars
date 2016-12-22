import * as React from 'react';
import {Component} from 'react';
import {reduxForm} from "redux-form";
import {ApplicationState} from "../../../reducers/index";
import {Question} from "../../../model/Question";
import {Card} from "material-ui";
import {CardText} from "material-ui";
import {Toggle} from "material-ui";
import {CardActions} from "material-ui";
import {LinearProgress} from "material-ui";
import {RaisedButton} from "material-ui";
import {questionResponse_Success} from "../../../actions/response-question";


const formName = 'QuestionResponse';

export interface QuestionResponseData {
    question : Question,
    time : number,
    selectedAnswer : string
}

class QuestionResponseComponent extends Component<any, any> {

    render() {
        return (
            <div>
                <div className="row center-xs">
                    <Card>
                        <LinearProgress mode="determinate" style={{marginTop: '20px'}}/>
                        <CardText>
                            <h3>Prueba</h3>
                            <hr/>
                        </CardText>
                        <CardActions>
                            <RaisedButton type="submit" fullWidth={true} label={this.props.questionState.question.answerA}/>
                            <RaisedButton type="submit" fullWidth={true} label={this.props.questionState.question.answerB}/>
                            <RaisedButton type="submit" fullWidth={true} label={this.props.questionState.question.answerC}/>
                            <RaisedButton type="submit" fullWidth={true} label={this.props.questionState.question.answerD}/>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state : ApplicationState) {
    return {
        questionState : state.questionCreation
    };
}

export const QuestionResponseForm = reduxForm(
        {
            form: formName,
            fields: ['question', 'answerA', 'answerB', 'answerC', 'answerD', 'correctAnswer'],
            //initialValues: {question: question.question, answerA: question.answerA, answerB: question.answerB, answerC : question.answerC, answerD: question.answerD, correctAnswer: question.correctAnswer}
    }, mapStateToProps, {questionResponse_Success})(QuestionResponseComponent);


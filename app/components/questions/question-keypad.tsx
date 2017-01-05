import * as React from 'react';
import {
    RaisedButton
} from 'material-ui';
import {
    blue700,
    orange700,
    green700,
    yellow700,
    white
} from 'material-ui/styles/colors';
import {LinearTimeProgress} from "./linear-time-progress";
import {KeypadState} from "../../reducers/keypad";
import {QUESTION_ASKED} from "../../../common/states/question-states";
import {connect} from "react-redux";
import {answerQuestion} from "../../actions/keypad";
import {ApplicationState} from "../../reducers/index";

interface QuestionKeypadProps {
    keypad: KeypadState,
    answerQuestion(questionId: string, answer: string): Promise<any>
}

const QuestionKeypadComponent = (props: QuestionKeypadProps) => {

    const question = props.keypad.course.displayedQuestion;
    const {answering, hasAnswered} = props.keypad;
    const colors = [blue700, orange700, green700, yellow700];

    return (
        <div style={{height: '450px', width: '300px'}}>
            <LinearTimeProgress question={question}/>
            <h1>{(question.title) ? question.title: ' '}</h1>
            <div style={{padding: '10px'}}>
                {question.answers.map((answer, i) => {
                    return (
                        <RaisedButton
                            key={answer.option}
                            onTouchTap={() => props.answerQuestion(question.id, answer.option)}
                            disabled={question.state !== QUESTION_ASKED || answering || hasAnswered}
                            style={{margin: '5px 0 5px 0'}}
                            backgroundColor={colors[i]}
                            labelColor={white}
                            fullWidth={true}
                            label={(answer.text) ? answer.text : answer.option}/>
                    );
                })}
            </div>
        </div>
    );
};

function mapStateToProps(state: ApplicationState) {
    return {
        keypad: state.keypad
    }
}

export const QuestionKeypad = connect(mapStateToProps, {answerQuestion})(QuestionKeypadComponent);
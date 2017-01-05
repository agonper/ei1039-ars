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
import {KeypadQuestion} from "../../reducers/keypad";
import {QUESTION_ASKED} from "../../../common/states/question-states";

interface QuestionKeypadProps {
    question: KeypadQuestion
}

export const QuestionKeypad = (props: QuestionKeypadProps) => {

    const {question} = props;
    const colors = [blue700, orange700, green700, yellow700];

    return (
        <div style={{height: '450px', width: '300px'}}>
            <LinearTimeProgress question={question}/>
            <h1>{(question.title) ? question.title: ' '}</h1>
            <div style={{padding: '10px'}}>
                {question.answers.map((answer, i) => {
                    return (
                        <RaisedButton
                            disabled={question.state !== QUESTION_ASKED}
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
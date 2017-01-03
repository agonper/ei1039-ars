import * as React from 'react';
import {
    List,
    ListItem,
    Paper,
    Avatar
} from 'material-ui';
import {
    transparent,
    blue700,
    orange700,
    green700,
    yellow700,
    lightGreen500,
    red500
} from 'material-ui/styles/colors';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {DisplayedQuestion} from "../../reducers/display-course";
import {LinearTimeProgress} from "./linear-time-progress";

interface QuestionDisplayProps {
    question: DisplayedQuestion,
    displayResponse: boolean
}

export const QuestionDisplay = (props: QuestionDisplayProps) => {

    const {question} = props;
    const colors = [blue700, orange700, green700, yellow700];

    return (
        <div style={{height: '530px', width: '400px'}}>
            <LinearTimeProgress question={question}/>
            <h1>{(question.title) ? question.title: ' '}</h1>
            <div className="start-xs">
                <Paper>
                    <List>
                        {question.answers.map((answer, i) => {
                            return (
                                <ListItem
                                    rightIcon={
                                        (props.displayResponse) ? ((answer.isCorrect) ?
                                        <CheckIcon color={lightGreen500}/> :
                                        <CloseIcon color={red500}/>) : null
                                    }
                                    leftAvatar={
                                        <Avatar
                                        color={colors[i]} backgroundColor={transparent}
                                        style={{left: 8}}>
                                            {answer.option}
                                        </Avatar>
                                    }
                                    key={`${question.id}_${answer.option}`}>

                                        {(answer.text) ? answer.text : ''}
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
            </div>
        </div>
    );
};
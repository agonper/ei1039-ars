import * as React from 'react';
import {
    List,
    ListItem,
    Paper,
    Avatar
} from 'material-ui';
import {} from ''
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

interface QuestionDisplayProps {
    question: DisplayedQuestion
}

export const QuestionDisplay = (props: QuestionDisplayProps) => {

    const {question} = props;
    const colors = [blue700, orange700, green700, yellow700];

    return (
        <div style={{height: '400px', width: '400px'}}>
            <h1>{(question.title) ? question.title: ' '}</h1>
            <div className="start-xs">
                <Paper>
                    <List>
                        {question.answers.map((answer, i) => {
                            return (
                                <ListItem
                                    rightIcon={
                                        (answer.isCorrect) ?
                                        <CheckIcon color={lightGreen500}/> :
                                        <CloseIcon color={red500}/>
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
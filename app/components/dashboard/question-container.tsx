import * as React from 'react';
const {Component} = React;
import {
    AppBar,
    IconButton,
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    RaisedButton
} from 'material-ui';
import {white} from 'material-ui/styles/colors';

import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import InsertChartIcon from 'material-ui/svg-icons/editor/insert-chart';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import VisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off';
import SkipPreviousIcon from 'material-ui/svg-icons/av/skip-previous';
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow';
import StopIcon from 'material-ui/svg-icons/av/stop';
import SkipNextIcon from 'material-ui/svg-icons/av/skip-next';
import OpenInNewIcon from 'material-ui/svg-icons/action/open-in-new'
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';

import {Link} from 'react-router';
import {lightGreen400} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import {DashboardState} from "../../reducers/dashboard";
import {ApplicationState} from "../../reducers/index";
import {FormattedMessage} from 'react-intl';
import {selectQuestionSet} from "../../actions/dashboard";
import {SelectedQuestionState} from "../../reducers/selected-question";
import {findIndex} from 'lodash';
import {QuestionDisplay} from "../questions/question-display";

interface QuestionContainerProps {
    dashboard: DashboardState,
    selectedQuestion: SelectedQuestionState,
    selectQuestionSet(questionSetId: string): any
}

class QuestionContainerComponent extends Component<QuestionContainerProps, any> {

    goBackToQuestionSet() {
        const questionSetId = this.props.selectedQuestion.question.questionSet.id;
        this.props.selectQuestionSet(questionSetId);
    }

    render() {
        if (this.props.selectedQuestion.fetching){
            return (
                <div style={{height: '100%'}} className="row middle-xs center-xs">
                    <div><MoreHorizIcon/></div>
                </div>
            );
        }

        const question = this.props.selectedQuestion.question;
        const {title, questionSet: {questions, course}} = question;
        const id = this.props.dashboard.selectedItemId;
        const questionNumber = findIndex(questions, {id}) + 1;
        const secondaryTitle = <FormattedMessage
                                    id="dashboard.question.label"
                                    defaultMessage="Question (number)"
                                    values={{number: questionNumber}}/>;
        return (
            <div style={{height: '100%'}}>
                <AppBar
                    iconElementLeft={
                        <IconButton
                            onTouchTap={this.goBackToQuestionSet.bind(this)}>
                            <ArrowBackIcon/>
                        </IconButton>
                    }
                    style={{backgroundColor: lightGreen400}}
                    title={(title !== '' ? title : secondaryTitle)}/>
                <Toolbar>
                    <ToolbarGroup firstChild={true}/>
                    <ToolbarGroup>
                        <IconButton>
                            <VisibilityIcon color={white}/>
                        </IconButton>
                        <IconButton>
                            <SkipPreviousIcon color={white}/>
                        </IconButton>
                        <IconButton>
                            <PlayArrowIcon color={white}/>
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon color={white}/>
                        </IconButton>
                        <ToolbarSeparator/>
                        <Link to={`/display/${course.id}`} target="_blank">
                            <RaisedButton
                                primary={true}
                                label={<FormattedMessage id="dashboard.question.project" defaultMessage="Project"/>}
                                icon={<OpenInNewIcon color={white}/>}/>
                        </Link>
                    </ToolbarGroup>
                </Toolbar>

                <div style={{height: '100%'}} className="row middle-xs center-xs col-xs-offset-2 col-xs-8">
                    <QuestionDisplay question={question}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        dashboard: state.dashboard,
        selectedQuestion: state.selectedQuestion
    }
}

export const QuestionContainer = connect(mapStateToProps, {selectQuestionSet})(QuestionContainerComponent);
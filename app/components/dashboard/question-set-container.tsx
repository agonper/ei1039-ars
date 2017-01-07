import * as React from 'react';
const {Component} = React;
import {
    AppBar,
    IconButton,
    RaisedButton,
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator
} from 'material-ui';
import {white} from "material-ui/styles/colors";
import InsertChartIcon from "material-ui/svg-icons/editor/insert-chart";
import VisibilityOffIcon from "material-ui/svg-icons/action/visibility-off";
import OpenInNewIcon from "material-ui/svg-icons/action/open-in-new";
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import {lightGreen400} from 'material-ui/styles/colors';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {connect} from 'react-redux';
import {DashboardState} from "../../reducers/dashboard";
import {ApplicationState} from "../../reducers/index";
import {FormattedMessage, FormattedDate} from 'react-intl';
import {SelectedQuestionSetState, SelectedQuestionSet} from "../../reducers/selected-question-set";
import {selectCourse, toggleAddQuestionModal} from "../../actions/dashboard";
import {Link} from "react-router";
import {displayQuestionSet, clearDisplayedQuestionSet} from "../../actions/course";
import {fetchQuestionSet} from "../../actions/question-set";

interface QuestionSetContainerProps {
    dashboard: DashboardState,
    selectedQuestionSet: SelectedQuestionSetState,
    selectCourse(courseId: string): any,
    toggleAddQuestionModal(): any,
    displayQuestionSet(courseId: string, questionSetId: string): Promise<any>,
    clearDisplayedQuestionSet(courseId: string): Promise<any>,
    fetchQuestionSet(questionSetId: string): Promise<any>
}

const buttonStyle = {
    margin: '5px 0 5px 0'
};

class QuestionSetContainerComponent extends Component<QuestionSetContainerProps, any> {

    goBackToCourse() {
        const courseId = this.props.selectedQuestionSet.questionSet.course.id;
        this.props.selectCourse(courseId);
    }

    renderVisibilityButton(selectedQuestionSet: SelectedQuestionSet) {
        const {displayedQuestionSet} = selectedQuestionSet.course;
        if (displayedQuestionSet && displayedQuestionSet.id === selectedQuestionSet.id) {
            return (
                <IconButton
                    onTouchTap={() => this.props.clearDisplayedQuestionSet(selectedQuestionSet.course.id)
                                          .then(() => this.props.fetchQuestionSet(selectedQuestionSet.id))}>
                    <VisibilityOffIcon color={white}/>
                </IconButton>
            );
        }
        return (
            <IconButton
                onTouchTap={() => this.props.displayQuestionSet(selectedQuestionSet.course.id, selectedQuestionSet.id)
                                      .then(() => this.props.fetchQuestionSet(selectedQuestionSet.id))}>
                <InsertChartIcon color={white}/>
            </IconButton>
        );
    }

    renderToolbar(questionSet: SelectedQuestionSet) {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}/>
                <ToolbarGroup>

                    {this.renderVisibilityButton(questionSet)}

                    <ToolbarSeparator/>

                    <Link to={`/display/${questionSet.course.id}`} target="_blank">
                        <RaisedButton
                            primary={true}
                            label={<FormattedMessage id="dashboard.question.project" defaultMessage="Project"/>}
                            icon={<OpenInNewIcon color={white}/>}/>
                    </Link>
                </ToolbarGroup>
            </Toolbar>
        );
    }

    render() {
        const {fetching, questionSet} = this.props.selectedQuestionSet;
        if (fetching && !questionSet){
            return (
                <div style={{height: '100%'}} className="row middle-xs center-xs">
                    <div><MoreHorizIcon/></div>
                </div>
            );
        }

        const {name, createdAt} = this.props.selectedQuestionSet.questionSet;
        const formattedDate = <FormattedDate
            value={new Date(createdAt)}
            year='numeric'
            month='short'
            day='2-digit'/>;
        return (
            <div style={{height: '100%'}}>
                <AppBar
                    iconElementLeft={
                        <IconButton
                            onTouchTap={this.goBackToCourse.bind(this)}>
                            <ArrowBackIcon/>
                        </IconButton>
                    }
                    style={{backgroundColor: lightGreen400}}
                    title={(name !== '' ? name : formattedDate)}/>

                {this.renderToolbar(this.props.selectedQuestionSet.questionSet)}

                <div style={{height: '100%'}} className="row middle-xs center-xs col-xs-offset-2 col-xs-8">
                    <div style={{height: '200px', width: '250px'}}>
                        <h3><FormattedMessage id="dashboard.question-set.content.title" defaultMessage="Want to add a question?"/></h3>
                        <div className="row">
                            <div className="col-xs-12">
                                <RaisedButton
                                    primary={true}
                                    fullWidth={true}
                                    style={buttonStyle}
                                    onTouchTap={this.props.toggleAddQuestionModal}
                                    label={<FormattedMessage id="dashboard.question-set.content.create-question" defaultMessage="Add a question"/>}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        dashboard: state.dashboard,
        selectedQuestionSet: state.selectedQuestionSet
    }
}

export const QuestionSetContainer = connect(mapStateToProps, {
    selectCourse, toggleAddQuestionModal,
    displayQuestionSet, clearDisplayedQuestionSet,
    fetchQuestionSet
})(QuestionSetContainerComponent);
import * as React from 'react';
const {Component} = React;
import {
    AppBar,
    IconButton,
    RaisedButton
} from 'material-ui';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import {lightGreen400} from 'material-ui/styles/colors';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {connect} from 'react-redux';
import {DashboardState} from "../../reducers/dashboard";
import {ApplicationState} from "../../reducers/index";
import {FormattedMessage, FormattedDate} from 'react-intl';
import {SelectedQuestionSetState} from "../../reducers/selected-question-set";
import {selectCourse} from "../../actions/dashboard";

interface QuestionSetContainerProps {
    dashboard: DashboardState,
    selectedQuestionSet: SelectedQuestionSetState,
    selectCourse(courseId: string): any
}

const buttonStyle = {
    margin: '5px 0 5px 0'
};

class QuestionSetContainerComponent extends Component<QuestionSetContainerProps, any> {

    goBackToCourse() {
        const courseId = this.props.selectedQuestionSet.questionSet.course.id;
        this.props.selectCourse(courseId);
    }

    render() {
        if (this.props.selectedQuestionSet.fetching){
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

                <div style={{height: '100%'}} className="row middle-xs center-xs col-xs-offset-2 col-xs-8">
                    <div style={{height: '200px', width: '250px'}}>
                        <h3><FormattedMessage id="dashboard.question-set.content.title" defaultMessage="Want to add a question?"/></h3>
                        <div className="row">
                            <div className="col-xs-12">
                                <RaisedButton
                                    primary={true}
                                    fullWidth={true}
                                    style={buttonStyle}
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

export const QuestionSetContainer = connect(mapStateToProps, {selectCourse})(QuestionSetContainerComponent);
import * as React from 'react';
const {Component} = React;
import {
    Paper
} from 'material-ui';
import {connect} from 'react-redux';
import {ApplicationState} from "../../reducers/index";
import {DisplayedCourseState} from "../../reducers/display-course";
import {IdleDisplay} from "./idle-display";
import {QuestionDisplay} from "../questions/question-display";
import {subscribeDisplayToCourseChanges, unsubscribeToCourseChanges} from "../../actions/subscription";
import {QUESTION_ANSWERED} from "../../../common/states/question-states";
import {CourseStatsContainer} from "./course-stats-contanier";
import {QuestionSetStatsContainer} from "./question-set-stats-container";

interface DisplayContainerProps {
    displayedCourse: DisplayedCourseState
    subscribeDisplayToCourseChanges(courseId: string): void
    unsubscribeToCourseChanges(courseId: string): void
}

const fullSizeContainerStyle = {
    position: 'fixed',
    top: '70px',
    bottom: 0,
    left: 0,
    right: 0,
    margin: '30px'
};

class DisplayContainerComponent extends Component<DisplayContainerProps, any> {
    componentWillMount() {
        this.props.subscribeDisplayToCourseChanges(this.props.displayedCourse.course.id);
    }

    componentWillUnmount() {
        this.props.unsubscribeToCourseChanges(this.props.displayedCourse.course.id);
    }

    renderContent() {
        const {course} = this.props.displayedCourse;
        const {displayedQuestion, displayedQuestionSet, showStats} = course;
        if (displayedQuestion) {
            const isAnswered = displayedQuestion.state === QUESTION_ANSWERED;
            return (
                <div className="row middle-xs">
                    <QuestionDisplay
                        question={displayedQuestion}
                        displayResponse={isAnswered}
                        displayStudentResponses={isAnswered}/>
                </div>
            );
        }
        if (displayedQuestionSet) {
            return <QuestionSetStatsContainer course={course}/>;
        }
        if (showStats) {
            return <CourseStatsContainer course={course}/>;
        }
        return (
            <div className="row middle-xs">
                <IdleDisplay/>
            </div>
        );
    }

    render() {
        return (
            <div style={fullSizeContainerStyle}>
                <div style={{height: '100%'}} className="row col-lg-offset-2 col-lg-8 center-xs">
                    <Paper style={{height: '100%', width: '100%'}} zDepth={2} className="row center-xs">
                        {this.renderContent()}
                    </Paper>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        displayedCourse: state.displayedCourse
    }
}

export const DisplayContainer = connect(mapStateToProps, {subscribeDisplayToCourseChanges, unsubscribeToCourseChanges})(DisplayContainerComponent);
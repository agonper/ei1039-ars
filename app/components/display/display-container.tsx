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
import {webSocketClient} from "../../adapters/websocket";
import {COURSES_TOPIC} from "../../../common/messages/ws-messages";
import {subscribeToCourseChanges, unsubscribeToCourseChanges} from "../../actions/display";

interface DisplayContainerProps {
    displayedCourse: DisplayedCourseState
    subscribeToCourseChanges(courseId: string): void
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
        this.props.subscribeToCourseChanges(this.props.displayedCourse.course.id);
    }

    componentWillUnmount() {
        this.props.unsubscribeToCourseChanges(this.props.displayedCourse.course.id);
    }

    renderContent() {
        const {displayedQuestion} = this.props.displayedCourse.course;
        if (!displayedQuestion) {
            return <IdleDisplay/>;
        }
        return <QuestionDisplay question={displayedQuestion} displayResponse={false}/>;
    }

    render() {
        return (
            <div style={fullSizeContainerStyle}>
                <div style={{height: '100%'}} className="row col-lg-offset-2 col-lg-8 center-xs">
                    <Paper style={{height: '100%', width: '100%'}} zDepth={2} className="row middle-xs center-xs">
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

export const DisplayContainer = connect(mapStateToProps, {subscribeToCourseChanges, unsubscribeToCourseChanges})(DisplayContainerComponent);
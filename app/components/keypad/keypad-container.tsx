import * as React from 'react';
const {Component} = React;
import {
    Paper
} from 'material-ui';
import {connect} from 'react-redux';
import {ApplicationState} from "../../reducers/index";
import {
    subscribeKeypadToCourseChanges,
    unsubscribeToCourseChanges
} from "../../actions/subscription";
import {IdleKeypad} from "./idle-keypad";
import {KeypadState} from "../../reducers/keypad";
import {QuestionKeypad} from "../questions/question-keypad";

interface KeypadContainerProps {
    keypad: KeypadState,
    subscribeKeypadToCourseChanges(courseId: string): void
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

class KeypadContainerComponent extends Component<KeypadContainerProps, any> {
    componentWillMount() {
        this.props.subscribeKeypadToCourseChanges(this.props.keypad.course.id);
    }

    componentWillUnmount() {
        this.props.unsubscribeToCourseChanges(this.props.keypad.course.id);
    }

    renderContent() {
        const {displayedQuestion} = this.props.keypad.course;
        if (!displayedQuestion) {
            return <IdleKeypad/>;
        }
        return <QuestionKeypad question={displayedQuestion}/>;
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
        keypad: state.keypad
    }
}

export const KeypadContainer = connect(mapStateToProps, {subscribeKeypadToCourseChanges, unsubscribeToCourseChanges})(KeypadContainerComponent);
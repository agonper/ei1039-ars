import * as React from 'react';
import {
    AppBar,
    IconButton
} from 'material-ui';
import {white} from 'material-ui/styles/colors';
import RecordVoiceOverIcon from 'material-ui/svg-icons/action/record-voice-over';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {FormattedMessage} from 'react-intl';
import {DisplayContainer} from "../components/display/display-container";
import {connect} from 'react-redux';
import {ApplicationState} from "../reducers/index";
import {DisplayedCourseState} from "../reducers/display-course";

interface DisplayProps {
    params: {
        courseId: string
    },
    displayedCourse: DisplayedCourseState
}

const fullSizeStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: '20px'
};

export const DisplayComponent = (props: DisplayProps) => {
    if (props.displayedCourse.fetching) {
        return (
            <div style={fullSizeStyle}>
                <div style={{height: '100%'}} className="row middle-xs center-xs">
                    <MoreHorizIcon/>
                </div>
            </div>
        );
    }

    if (props.displayedCourse.error) {
        return (
            <div style={fullSizeStyle}>
                <div style={{height: '100%'}} className="row middle-xs center-xs">
                    <FormattedMessage id="display.course.not-found" defaultMessage="Course not found"/>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AppBar
                iconElementLeft={<IconButton><RecordVoiceOverIcon color={white}/></IconButton>}
                title={props.displayedCourse.course.name}/>
            <DisplayContainer/>
        </div>
    );
};

function mapStateToProps(state: ApplicationState) {
    return {
        displayedCourse: state.displayedCourse
    }
}

export const Display = connect(mapStateToProps)(DisplayComponent);
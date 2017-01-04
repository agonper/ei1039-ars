import * as React from 'react';
import {
    AppBar,
    IconButton
} from 'material-ui';
import {white} from 'material-ui/styles/colors';
import RecordVoiceOverIcon from 'material-ui/svg-icons/action/record-voice-over';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {ApplicationState} from "../reducers/index";
import {KeypadState} from "../reducers/keypad";

interface KeypadProps {
    params: {
        courseId: string
    },
    keypad: KeypadState
}

const fullSizeStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: '20px'
};

export const KeypadComponent = (props: KeypadProps) => {
    const {fetching, course, error} = props.keypad;
    if (fetching && !course) {
        return (
            <div style={fullSizeStyle}>
                <div style={{height: '100%'}} className="row middle-xs center-xs">
                    <MoreHorizIcon/>
                </div>
            </div>
        );
    }

    if (error) {
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
                title={course.name}/>
            {JSON.stringify(props.keypad.course)}
        </div>
    );
};

function mapStateToProps(state: ApplicationState) {
    return {
        keypad: state.keypad
    }
}

export const Keypad = connect(mapStateToProps)(KeypadComponent);
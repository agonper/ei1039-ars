import * as React from 'react';
import {
    AppBar,
    IconButton
} from 'material-ui';
import {white} from 'material-ui/styles/colors';
import RecordVoiceOverIcon from 'material-ui/svg-icons/action/record-voice-over';
import {FormattedMessage} from 'react-intl';

interface DisplayProps {
    params: {
        courseId: string
    }
}

export const Display = (props: DisplayProps) => {
    return (
        <div>
            <AppBar
                iconElementLeft={<IconButton><RecordVoiceOverIcon color={white}/></IconButton>}
                title={<FormattedMessage id="dashboard.courses.title" defaultMessage="Courses"/>}/>
            <div>Hello from display for course: {props.params.courseId}</div>
        </div>
    );
};
import * as React from 'react';
import {AppBar, IconButton} from 'material-ui';
import RecordVoiceOverIcon from 'material-ui/svg-icons/action/record-voice-over';
import {white} from 'material-ui/styles/colors';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl'

export const CustomAppBar = (props: any) => {
    return (
        <AppBar
            title={<FormattedMessage id="app.title" defaultMessage="UJI | ARS"/>}
            iconElementLeft={<Link to="/"><IconButton><RecordVoiceOverIcon color={white}/></IconButton></Link>}/>
    );
};
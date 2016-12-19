import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import RecordVoiceOver from 'material-ui/svg-icons/action/record-voice-over'
import {white} from 'material-ui/styles/colors';
import IconButton from "material-ui/IconButton";
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

export const App =  (props: any) => {
    const PROD = process.env.NODE_ENV === 'production';
    return (
        <div>
            <AppBar
                title={<FormattedMessage id="app.title" defaultMessage="UJI | ARS"/>}
                iconElementLeft={<Link to="/"><IconButton><RecordVoiceOver color={white}/></IconButton></Link>}/>

            {props.children}
            <span style={{bottom: 0, position: 'fixed'}}>Server: {PROD ? 'https://uji-ars.herokuapp.com' : 'http://localhost:8080'}</span>
        </div>
    );
};
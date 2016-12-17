import * as React from 'react';
import Component = React.Component;

import { connect } from 'react-redux';
import {ApplicationState} from "../reducers/index";
import {AuthState} from "../reducers/reducer_auth";

import {AuthBox} from "../components/main/auth-box";


interface MainViewProps {
    auth: AuthState
}

export const mainViewStyle = {
    margin: '10px',
    marginTop: '60px'
};

class MainViewComponent extends Component<MainViewProps, any> {
    render() {
        return (
            <div style={mainViewStyle}>
                <AuthBox />
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) : MainViewProps {
    return {
        auth: state.auth
    }
}

export const MainView = connect(mapStateToProps)(MainViewComponent);
import * as React from 'react';
import Component = React.Component;

import { connect } from 'react-redux';
import {ApplicationState} from "../reducers/index";
import {AuthState} from "../reducers/reducer_auth";

import {AuthBox} from "../components/main/auth-box";


interface MainViewProps {
    auth: AuthState
}

class MainViewComponent extends Component<MainViewProps, any> {
    render() {
        return (
            <div style={{marginTop: '200px'}}>
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
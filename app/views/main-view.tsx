import * as React from 'react';
import Component = React.Component;
import {Hello} from "../components/hello";
import {Link} from "react-router";

import { connect } from 'react-redux';
import {ApplicationState} from "../reducers/index";
import {AuthState} from "../reducers/reducer_auth";

interface MainViewState {
    auth: AuthState
}

class MainViewComponent extends Component<MainViewState, any> {
    render() {
        return (
            <div>
                <Hello framework="Main" compiler="TypeScript"/>
                {this.props.auth.loggedIn ? <Link to="/login">Logout</Link> : <Link to="/login">Login</Link>}
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) : MainViewState {
    return {
        auth: state.auth
    }
}

export const MainView = connect(mapStateToProps)(MainViewComponent);
import * as React from "react";
const {Component, PropTypes} = React;
import {
    IconButton,
    IconMenu,
    MenuItem
} from 'material-ui';
import {white} from "material-ui/styles/colors";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert"
import {FormattedMessage} from "react-intl"
import {LoginState} from "../../reducers/login";
import {ApplicationState} from "../../reducers/index";

import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import {apolloClient} from "../../adapters/graphql";

interface UserMenuComponentProps {
    login: LoginState,
    logout(): any
}

class UserMenuComponent extends Component<UserMenuComponentProps, any> {

    static contextTypes = {
        router: PropTypes.object
    };

    onClickLogoutHandler() {
        this.props.logout();
        apolloClient.resetStore();
        this.context.router.push('/login');
    }

    render() {
        const {loggedIn} = this.props.login;
        if (loggedIn) {
            return (
                <IconMenu
                    iconButtonElement={
                    <IconButton><MoreVertIcon color={white}/></IconButton>
                }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}>

                    <MenuItem onClick={this.onClickLogoutHandler.bind(this)} primaryText={
                    <FormattedMessage id="app.main.logout" defaultMessage="Logout"/>
                }/>
                </IconMenu>
            );
        }
        return <span></span>
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        login: state.login
    };
}

export const UserMenu = connect(mapStateToProps, {logout})(UserMenuComponent);
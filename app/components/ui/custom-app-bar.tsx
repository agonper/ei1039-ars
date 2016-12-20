import * as React from 'react';
const {Component, PropTypes} = React;
import {
    AppBar,
    IconButton,
    IconMenu,
    MenuItem
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import RecordVoiceOverIcon from 'material-ui/svg-icons/action/record-voice-over';
import {white} from 'material-ui/styles/colors';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl'
import {LoginState} from "../../reducers/login";
import {ApplicationState} from "../../reducers/index";

import {connect} from 'react-redux';
import {logout} from "../../actions/auth";

interface CustomAppBarProps {
    login: LoginState,
    logout(): any
}

class CustomAppBarComponent extends Component<CustomAppBarProps, any> {

    static contextTypes = {
        router: PropTypes.object
    };

    renderLoggedMenu() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}>

                <MenuItem onClick={this.onClickLogoutHandler.bind(this)} primaryText={
                    <FormattedMessage id="app.main.logout" defaultMessage="Logout"/>
                }/>
            </IconMenu>
        );
    }

    onClickLogoutHandler() {
        this.props.logout();
        this.context.router.push('/login');
    }

    render() {
        return (
            <AppBar
                title={<FormattedMessage id="app.title" defaultMessage="UJI | ARS"/>}
                iconElementLeft={<Link to="/"><IconButton><RecordVoiceOverIcon color={white}/></IconButton></Link>}
                iconElementRight={this.props.login.loggedIn ? this.renderLoggedMenu() : undefined}/>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        login: state.login
    };
}

export const CustomAppBar = connect(mapStateToProps, {logout})(CustomAppBarComponent);
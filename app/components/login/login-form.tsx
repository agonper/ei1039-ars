import * as React from 'react';
const {Component} = React;
import {
    Card,
    CardHeader,
    CardActions,
    CardText,
    RaisedButton,
    FlatButton,
} from "material-ui";
import LockIcon from 'material-ui/svg-icons/action/lock';
import {Link} from 'react-router';
import {reduxForm} from "redux-form";
import {MainTextField} from "../ui/main-text-field";
import {ApplicationState} from "../../reducers/index";
import PropTypes = React.PropTypes;
import {FormattedMessage} from 'react-intl';
import {validateLogin} from "../../../common/validators/login";
import {loginUser} from "../../actions/auth";

const formName = 'login';

export interface LoginData {
    email: string,
    password: string,
}

export class LoginFormComponent extends Component<any, any> {

    static contextTypes = {
        router: PropTypes.object
    };

    onSubmitHandle(loginData: LoginData) {
        this.props.loginUser(loginData)
            .then(() => this.props.resetForm());
            // TODO transition to home
    }

    render() {
        const {fields, handleSubmit} = this.props;
        const {email, password} = fields;

        const loginErrors = this.props.login.errors;
        if (loginErrors) {
            Object.keys(loginErrors).forEach((field) => {
                fields[field].error = (loginErrors[field]) ? 'login.errors.' + loginErrors[field] : undefined;
            });
        }
        return (
            <div>
                <div className="row center-xs" style={{margin: '10px'}}>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <Card className="start-xs">
                            <form onSubmit={handleSubmit(this.onSubmitHandle.bind(this))}>
                                <CardHeader
                                    title={
                                        <span>
                                            <h1><LockIcon/> <FormattedMessage id="login.title" defaultMessage="Login"/></h1>
                                        </span>
                                    }/>
                                <CardText>
                                    <MainTextField
                                        field={email}
                                        hint="signup.email.hint"
                                        defaultHint="Enter your email"
                                        label="signup.email.label"
                                        defaultLabel="Email"
                                        type="text"/>
                                    <MainTextField
                                        field={password}
                                        hint="signup.password.hint"
                                        defaultHint="Enter your password"
                                        label="signup.password.label"
                                        defaultLabel="Password"
                                        type="password"/>
                                </CardText>
                                <CardActions>
                                    <RaisedButton
                                        type="submit"
                                        label={<FormattedMessage id="login.title" defaultMessage="Login"/>}
                                        primary={true}
                                        disabled={this.props.login.loggingIn} />
                                    <Link to="/signup">
                                        <FlatButton
                                            secondary={true}
                                            label={<FormattedMessage id="login.go-to-signup" defaultMessage="I'm not yet a member"/>}/>
                                    </Link>
                                </CardActions>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        login: state.login
    }
}

export const LoginForm = reduxForm({
    form: formName,
    fields: ['email', 'password'],
    validate: validateLogin
}, mapStateToProps, {loginUser})(LoginFormComponent);

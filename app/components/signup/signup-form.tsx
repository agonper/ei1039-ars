import * as React from 'react';
const {Component} = React;
import {
    Card,
    CardHeader,
    CardActions,
    CardText,
    RaisedButton,
    FlatButton,
    RadioButton,
    RadioButtonGroup
} from "material-ui";
import InputIcon from 'material-ui/svg-icons/action/input'
import {Link} from 'react-router';
import {reduxForm} from "redux-form";
import {MainTextField} from "../ui/main-text-field";
import {createUser, clearSignup} from "../../actions/signup";
import {ApplicationState} from "../../reducers/index";
import {Snackbar} from "material-ui";
import PropTypes = React.PropTypes;
import {FormattedMessage} from 'react-intl';
import {validateSignup} from "../../../common/validators/signup";

const formName = 'signup';

export interface SignupData {
    email: string,
    name: string,
    password: string,
    type: string
}

const radioStyle = {
    margin: '2px'
};

export class SignupFormComponent extends Component<any, any> {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmitHandle(userData: SignupData) {
        this.props.createUser(userData).then(() => this.props.resetForm());
    }

    render() {
        const {fields, handleSubmit} = this.props;
        const {email, name, password, type} = fields;

        const signupErrors = this.props.signup.errors;
        if (signupErrors) {
            Object.keys(signupErrors).forEach((field) => {
                fields[field].error = (signupErrors[field]) ? 'signup.errors.' + signupErrors[field] : '';
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
                                            <h1><InputIcon/> <FormattedMessage id="signup.title" defaultMessage="Signup"/></h1>
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
                                        field={name}
                                        hint="signup.name.hint"
                                        defaultHint="Enter your name"
                                        label="signup.name.label"
                                        defaultLabel="Name"
                                        type="text"/>
                                    <MainTextField
                                        field={password}
                                        hint="signup.password.hint"
                                        defaultHint="Enter your password"
                                        label="signup.password.label"
                                        defaultLabel="Password"
                                        type="password"/>
                                    {/* FIXME label only accepts strings */}
                                    <RadioButtonGroup name="type" valueSelected={type.value} onChange={type.onChange}>
                                        <RadioButton
                                            value="student"
                                            style={radioStyle}
                                            label="Soy un estudiante" />
                                        <RadioButton
                                            value="teacher"
                                            style={radioStyle}
                                            label="Soy un profesor" />
                                    </RadioButtonGroup>
                                </CardText>
                                <CardActions>
                                    <RaisedButton
                                        type="submit"
                                        label={<FormattedMessage id="signup.title" defaultMessage="Signup"/>}
                                        primary={true}
                                        disabled={this.props.signup.signingUp} />
                                    <Link to="/login">
                                        <FlatButton
                                            secondary={true}
                                            label={<FormattedMessage id="signup.go-to-login" defaultMessage="I already have an account"/>}/>
                                    </Link>
                                </CardActions>
                            </form>
                        </Card>
                    </div>
                </div>
                <Snackbar
                    open={this.props.signup.signedUp}
                    message={<FormattedMessage id="signup.success" defaultMessage="Successfully signed up"/>}
                    action={<FormattedMessage id="login.main.button" defaultMessage="login"/>}
                    onActionTouchTap={() => this.context.router.push('/login')}
                    autoHideDuration={5000}
                    onRequestClose={this.props.clearSignup}/>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        signup: state.signup,
        initialValues: {type: 'student'}
    }
}

export const SignupForm = reduxForm({
    form: formName,
    fields: ['email', 'name', 'password', 'type'],
    validate: validateSignup
}, mapStateToProps, {createUser, clearSignup})(SignupFormComponent);

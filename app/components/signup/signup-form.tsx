import * as React from 'react';
const {Component} = React;
import {
    Card,
    CardHeader,
    CardActions,
    CardText,
    RaisedButton,
    FlatButton
} from "material-ui";
import CreateIcon from 'material-ui/svg-icons/content/create';
import {Link} from 'react-router';
import {reduxForm} from "redux-form";
import {MainTextField} from "../main-text-field";
import {createUser, clearSignup} from "../../actions/signup";
import {ApplicationState} from "../../reducers/index";
import {Snackbar} from "material-ui";
import PropTypes = React.PropTypes;


export interface SignupFormFields {
    email: string,
    name: string,
    password: string
}

export class SignupFormComponent extends Component<any, any> {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        const {fields: {email, name, password}, handleSubmit} = this.props;
        const signupErrors = this.props.signup.errors;
        if (signupErrors) {
            email.error = signupErrors.email;
            name.error = signupErrors.name;
            password.error = signupErrors.password;
        }
        return (
            <div>
                <div className="row center-xs">
                    <div className="col-md-4">
                        <Card className="start-xs">
                            <form onSubmit={handleSubmit(this.props.createUser)}>
                                <CardHeader title={<span><CreateIcon/> Signup</span>}/>
                                <CardText>
                                    <MainTextField
                                        field={email}
                                        hint="Enter your email"
                                        label="Email"
                                        type="text"/>
                                    <MainTextField
                                        field={name}
                                        hint="Enter your name"
                                        label="Name"
                                        type="text"/>
                                    <MainTextField
                                        field={password}
                                        hint="Enter your password"
                                        label="Password"
                                        type="password"/>
                                </CardText>
                                <CardActions>
                                    <RaisedButton type="submit" label="Signup" primary={true} disabled={this.props.signup.signingUp} />
                                    <Link to="/login"><FlatButton label="I already have an account"/></Link>
                                </CardActions>
                            </form>
                        </Card>
                    </div>
                </div>
                <Snackbar
                    open={this.props.signup.signedUp}
                    message="Successfully signed up"
                    action="login"
                    onActionTouchTap={() => this.context.router.push('/login')}
                    autoHideDuration={5000}
                    onRequestClose={this.props.clearSignup}/>
            </div>
        );
    }
}

function validate(values: SignupFormFields) {
    const errors: any = {};

    if (!values.email) errors.email = "Please enter an email";
    if (!values.name) errors.name = "Please enter a username";
    if (!values.password) errors.password = "Please enter a password";

    return errors;
}

function mapStateToProps(state: ApplicationState) {
    return {signup: state.signup}
}

export const SignupForm = reduxForm({
    form: 'SignupForm',
    fields: ['email', 'name', 'password'],
    validate
}, mapStateToProps, {createUser, clearSignup})(SignupFormComponent);

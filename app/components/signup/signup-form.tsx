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
import {ReduxFormProps, reduxForm} from "redux-form";
import {MainTextField} from "../main-text-field";
import {createUser} from "../../actions/auth";
import IntrinsicAttributes = JSX.IntrinsicAttributes;


export interface SignupFormFields {
    email: string,
    name: string,
    password: string
}

interface SignupFormProps extends ReduxFormProps<any> {
    createUser(user: SignupFormFields): any;
}

export class SignupFormComponent extends Component<SignupFormProps, any> {

    render() {
        const {fields: {email, name, password}, handleSubmit} = this.props;
        return (
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
                                <RaisedButton type="submit" label="Signup" primary={true} />
                                <Link to="/login"><FlatButton label="I already have an account"/></Link>
                            </CardActions>
                        </form>
                    </Card>
                </div>
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

export const SignupForm = reduxForm({
    form: 'SignupForm',
    fields: ['email', 'name', 'password'],
    validate
}, null, {createUser})(SignupFormComponent);

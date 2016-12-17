import * as React from 'react';
import {omit} from 'lodash';
const {Component} = React;
import {FieldProp} from "redux-form";
import {TextField} from 'material-ui'

const fieldsToOmit = ['initialValue', 'autofill', 'onUpdate', 'valid',
    'invalid', 'dirty', 'pristine', 'error',
    'active', 'touched', 'visited', 'autofilled'];

interface MainTextFieldProps {
    field: FieldProp<any>,
    hint: string,
    label: string,
    type: string
}

export class MainTextField extends Component<MainTextFieldProps, any> {
    render() {
        const {field, hint, label, type} = this.props;

        const inputFields = omit(field, fieldsToOmit);

        return (
            <TextField
                hintText={hint}
                floatingLabelText={label}
                fullWidth={true}
                {...inputFields}
                errorText={field.touched ? field.error : ''}
                type={type}/>
        );
    }
}

import * as React from 'react';
import {omit} from 'lodash';
const {Component} = React;
import {FieldProp} from "redux-form";
import {TextField} from 'material-ui';
import {FormattedMessage} from 'react-intl';

const fieldsToOmit = ['initialValue', 'autofill', 'onUpdate', 'valid',
    'invalid', 'dirty', 'pristine', 'error',
    'active', 'touched', 'visited', 'autofilled'];

interface MainTextFieldProps {
    field: FieldProp<any>,
    hint: string,
    defaultHint: string,
    label: string,
    defaultLabel: string,
    type: string
}

export class MainTextField extends Component<MainTextFieldProps, any> {
    render() {
        const {field, hint, defaultHint, label, defaultLabel, type} = this.props;
        const inputFields = omit(field, fieldsToOmit);

        return (
            <TextField
                hintText={<FormattedMessage id={hint} defaultMessage={defaultHint}/>}
                floatingLabelText={<FormattedMessage id={label} defaultMessage={defaultLabel}/>}
                fullWidth={true}
                {...inputFields}
                errorText={field.touched && field.error ? <FormattedMessage id={field.error} defaultMessage={field.error}/> : ''}
                type={type}/>
        );
    }
}

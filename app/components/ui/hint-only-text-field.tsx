import * as React from 'react';
import {omit} from 'lodash';
const {Component} = React;
import {FieldProp} from "redux-form";
import {TextField} from 'material-ui';
import {FormattedMessage} from 'react-intl';
import {fieldsToOmitFromInput} from "./main-text-field";

interface HintOnlyTextFieldProps {
    field: FieldProp<any>,
    hint: string,
    defaultHint: string,
    disabled?: boolean,
    type: string
}

export class HintOnlyTextField extends Component<HintOnlyTextFieldProps, any> {
    render() {
        const {field, hint, defaultHint, type, disabled} = this.props;
        const inputFields = omit(field, fieldsToOmitFromInput);

        return (
            <TextField
                hintText={<FormattedMessage id={hint} defaultMessage={defaultHint}/>}
                fullWidth={true}
                errorText={field.touched && field.error ? <FormattedMessage id={field.error} defaultMessage={field.error}/> : ''}
                disabled={disabled}
                type={type}
                {...inputFields}/>
        );
    }
}

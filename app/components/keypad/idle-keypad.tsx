import * as React from 'react';
import {FormattedMessage} from 'react-intl';

export const IdleKeypad = (props: any) => {
    return (
        <div>
            <FormattedMessage id="keypad.idle.message" defaultMessage="Awaiting for teacher..."/>
        </div>
    );
};
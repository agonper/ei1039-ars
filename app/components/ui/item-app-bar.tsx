import * as React from 'react';
import {AppBar} from 'material-ui';
import {lightGreen400} from 'material-ui/styles/colors';

interface ItemAppBarProps {
    title: string
}

export const ItemAppBar = (props: ItemAppBarProps) => {
    return (
        <AppBar
            iconElementLeft={<span></span>}
            style={{backgroundColor: lightGreen400}}
            title={props.title}/>
    );
};
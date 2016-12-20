import * as React from 'react';
import Component = React.Component;

import {AuthBox} from "../components/main/auth-box";


export const mainViewStyle = {
    margin: '10px',
    marginTop: '45px'
};

export const MainView = () =>{
    return (
        <div style={mainViewStyle}>
            <AuthBox />
        </div>
    );
};
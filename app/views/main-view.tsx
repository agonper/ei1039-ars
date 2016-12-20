import * as React from 'react';
import Component = React.Component;

import {AuthBox} from "../components/main/auth-box";
import {CustomAppBar} from "../components/ui/custom-app-bar";
import {QuestionCreationForm} from "../components/questions/creation/questionCreationForm";


export const mainViewStyle = {
    margin: '10px',
    marginTop: '45px'
};

export const MainView = () =>{
    return (
        <div>
            <CustomAppBar/>
            <div style={mainViewStyle}>
                <AuthBox />
            </div>
        </div>

    );
};
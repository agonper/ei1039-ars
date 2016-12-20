import * as React from 'react';
import {mainViewStyle} from "./main-view";
import {LoginForm} from "../components/login/login-form";

export const Login = () => {
    return (
        <div style={mainViewStyle}>
            <LoginForm/>
        </div>
    );
};
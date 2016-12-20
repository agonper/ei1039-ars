import * as React from 'react';
import {mainViewStyle} from './main-view';
import {LoginForm} from '../components/login/login-form';
import {CustomAppBar} from '../components/ui/custom-app-bar';

export const Login = () => {
    return (
        <div>
            <CustomAppBar/>
            <div style={mainViewStyle}>
                <LoginForm/>
            </div>
        </div>
    );
};
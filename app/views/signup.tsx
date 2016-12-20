import * as React from 'react';
import {mainViewStyle} from "./main-view";
import {SignupForm} from "../components/signup/signup-form";
import {CustomAppBar} from "../components/ui/custom-app-bar";

export const Signup = () => {
    return (
        <div>
            <CustomAppBar/>
            <div style={mainViewStyle}>
                <SignupForm/>
            </div>
        </div>
    );
};
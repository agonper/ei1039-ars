import * as React from 'react';
import {mainViewStyle} from "./main-view";
import {SignupForm} from "../components/signup/signup-form";

export const Signup = () => {
    return (
        <div style={mainViewStyle}>
            <SignupForm/>
        </div>
    );
};
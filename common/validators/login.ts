import {LoginData} from "../../app/components/login/login-form";
import {validateEmail} from "./signup";
import {isEmpty, isAscii} from 'validator';

export const validateLogin = (loginData: LoginData) => {
    const errors: any = {};

    errors.email = validateEmail(loginData.email);
    errors.password = validatePassword(loginData.password);

    return errors;
};

export const validatePassword = (password: string): string => {
    if (!password || isEmpty(password)) return 'signup.errors.empty-password';
    if (!isAscii(password)) return 'signup.errors.invalid-password';
    return undefined;
};


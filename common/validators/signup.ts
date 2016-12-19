import {SignupFormFields} from "../../app/components/signup/signup-form";
import {User} from "../../server/models/user";
import {isEmail, isEmpty, isAscii, isLength} from 'validator';

export const validateSignup = (userData: SignupFormFields | User) => {
    const errors: any = {};

    errors.email = validateEmail(userData.email);
    errors.name = validateName(userData.name);
    errors.password = validatePassword(userData.password);

    return errors;
};

function validateEmail(email: string): string {
    if (!email || isEmpty(email)) return 'signup.errors.empty-email';
    if (!isEmail(email)) return 'signup.errors.invalid-email';
    return undefined;
}

function validateName(name: string): string {
    if (!name || isEmpty(name)) return 'signup.errors.empty-name';
    if (!isAscii(name)) return 'signup.errors.invalid-name';
    return undefined;
}

function validatePassword(password: string): string {
    if (!password || isEmpty(password)) return 'signup.errors.empty-password';
    if (!isAscii(password)) return 'signup.errors.invalid-password';
    if (isLength(password, 0, 5)) return 'signup.errors.too-short-password';
    return undefined;
}

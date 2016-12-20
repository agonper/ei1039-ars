import {SignupData} from '../../app/components/signup/signup-form';
import {isEmail, isEmpty, isAscii, isLength} from 'validator';

export const validateSignup = (userData: SignupData) => {
    const errors: any = {};

    errors.email = validateEmail(userData.email);
    errors.name = validateName(userData.name);
    errors.password = validatePassword(userData.password);

    return errors;
};

export const validateEmail = (email: string): string => {
    if (!email || isEmpty(email)) return 'signup.errors.empty-email';
    if (!isEmail(email)) return 'signup.errors.invalid-email';
    return undefined;
};

export const validateName = (name: string): string => {
    if (!name || isEmpty(name)) return 'signup.errors.empty-name';
    if (!isAscii(name)) return 'signup.errors.invalid-name';
    return undefined;
};

export const validatePassword = (password: string): string => {
    if (!password || isEmpty(password)) return 'signup.errors.empty-password';
    if (!isAscii(password)) return 'signup.errors.invalid-password';
    if (isLength(password, 0, 5)) return 'signup.errors.too-short-password';
    return undefined;
};

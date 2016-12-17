import {IAction} from "~redux-thunk~redux";
export const FORM_RESET = 'FORM_RESET';

export interface FormResetAction extends IAction {
    form: string
}

export function resetForm(form: string): FormResetAction {
    return {
        type: FORM_RESET,
        form: form
    }
}
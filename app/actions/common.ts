import {Action} from "redux";
export const FORM_RESET = 'FORM_RESET';

export interface ActionSuccess extends Action {
    payload: any
}

export interface ActionFailure extends Action {
    error: Error
}

export interface FormResetAction extends Action {
    form: string
}

export function resetForm(form: string): FormResetAction {
    return {
        type: FORM_RESET,
        form: form
    }
}
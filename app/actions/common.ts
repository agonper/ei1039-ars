import {Action} from "redux";

export interface GenericAction extends Action {
    payload?: any,
    error?: any
}
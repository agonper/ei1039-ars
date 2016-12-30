import {Action, Dispatch} from "redux";
import {DeprecatedWatchQueryOptions} from "apollo-client/core/watchQueryOptions";
import {ThunkAction} from "redux-thunk";
import {ApplicationState} from "../reducers/index";
import {apolloClient} from "../adapters/graphql";
import {MutationOptions} from "apollo-client";
import {RestAdapter} from "../adapters/rest";

export interface GenericAction extends Action {
    payload?: any,
    error?: any
}

export interface AsyncActionTypes {
    pending: string,
    success: string,
    failure: string
}

export function performGraphQLQuery(queryOptions: DeprecatedWatchQueryOptions, asyncActionTypes: AsyncActionTypes): ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.query(queryOptions);
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(generatePendingAction(asyncActionTypes.pending));
        request
            .then((data) => dispatch(generateSuccessAction(asyncActionTypes.success, data)))
            .catch((err) => dispatch(generateFailureAction(asyncActionTypes.failure, err)));
        return request;
    }
}

export function performGraphQLMutation(mutationOptions: MutationOptions, asyncActionTypes: AsyncActionTypes): ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.mutate(mutationOptions);
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(generatePendingAction(asyncActionTypes.pending));
        request
            .then((data) => dispatch(generateSuccessAction(asyncActionTypes.success, data)))
            .catch((err) => dispatch(generateFailureAction(asyncActionTypes.failure, err)));
        return request;
    }
}

export interface PostOptions {
    path: string,
    params: any
}

export function performRESTPost(postOptions: PostOptions, asyncActionTypes: AsyncActionTypes): ThunkAction<void, ApplicationState, void> {
    const request = RestAdapter.post(postOptions.path, postOptions.params);
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(generatePendingAction(asyncActionTypes.pending));
        request
            .then((data) => dispatch(generateSuccessAction(asyncActionTypes.success, data)))
            .catch((err) => dispatch(generateFailureAction(asyncActionTypes.failure, err)));
        return request;
    }
}

function generatePendingAction(type: string): Action {
    return {type};
}

function generateSuccessAction(type: string, payload: any): GenericAction {
    return {type, payload}
}

function generateFailureAction(type: string, error: any): GenericAction {
    return {type, error}
}
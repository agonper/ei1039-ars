import {post, get} from 'axios';
import {appConfigLoader} from "../config/environment";
let appConfig = appConfigLoader();

const ROOT_URL = appConfig.rootUrl;

export class RestAdapter {
    public static post(uri: string, payload: any): Promise<any> {
        return post(`${ROOT_URL}${uri}`, payload);
    }

    public static get(uri: string, payload: any): Promise<any> {
        return get(`${ROOT_URL}${uri}`, {params: payload});
    }
}

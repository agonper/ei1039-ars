import {post, get} from 'axios';

export class RestAdapter {
    public static post(uri: string, payload: any): Promise<any> {
        return post(`${uri}`, payload);
    }

    public static get(uri: string, payload: any): Promise<any> {
        return get(`${uri}`, {params: payload});
    }
}

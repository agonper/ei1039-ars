export interface ServerMessageFormat {
    topic: string,
    data: any
}

export interface ClientMessageFormat {
    cmd: string,
    args: {[key: string]: any}
}

export const SUBSCRIBE_TOPIC = 'SUBSCRIBE_TOPIC';
export const UNSUBSCRIBE_TOPIC = 'UNSUBSCRIBE_TOPIC';
export const PUBLISH_TOPIC = 'PUBLISH_TOPIC';

export const COURSES_TOPIC = 'courses';
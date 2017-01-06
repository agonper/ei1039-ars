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

export const DISPLAYED_QUESTION_CHANGED = 'DISPLAYED_QUESTION_CHANGED';
export const DISPLAYED_QUESTION_CLEARED = 'DISPLAYED_QUESTION_CLEARED';
export const COURSE_SHOW_STATS_CHANGED = 'COURSE_SHOW_STATS_CHANGED';
export const QUESTION_ASKING_STARTED = 'QUESTION_ASKING_STARTED';
export const QUESTION_ASKING_STOPPED = 'QUESTION_ASKING_STOPPED';
export const QUESTION_ASKING_ENDED = 'QUESTION_ASKING_FINISHED';
export const STUDENT_ANSWERED = 'STUDENT_ANSWERED';

export const COURSES_TOPIC = 'courses';
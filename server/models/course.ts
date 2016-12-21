import * as log from 'winston';
import {MongooseDocument, Types} from "mongoose";
import {User} from "./user";
import {CourseModel} from './mongodb/course';


export interface Course {
    _id: Types.ObjectId,
    name: string,
    teacher: User,
    students: [User]
}

class CourseRepository {

    public createCourse(user: any & MongooseDocument, name: string): Promise<MongooseDocument & Course> {
        if (user.type !== 'teacher') throw new Error('user-not-a-teacher');
        const course = new CourseModel({name: name, teacher: user._id});
        return course.save().then((course) => {
            user.courses.push(course);
            return user.save().then(() => course);
        });
    }

    public addStudent(user: User & MongooseDocument, course: any): Promise<MongooseDocument & Course> {
        if (user.type !== 'student') throw new Error('user-not-a-student');
        course.students.push(user);
        return course.save();
    }

    public findById(id: string): Promise<MongooseDocument & Course> {
        return <any>CourseModel.findOne({_id: id}).exec().catch((err) => {
            log.error(`Error fetching course by id: ${id}`, err);
            return Promise.reject(new Error("course-not-found"));
        });
    }
}

export const courseRepository = new CourseRepository();
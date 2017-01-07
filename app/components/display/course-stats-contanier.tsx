import * as React from 'react';
const {Component} = React;
import {DisplayedCourse} from "../../reducers/display-course";
import {FormattedMessage} from "react-intl";
import {StudentStatsDisplay} from "../course/student-stats-display";
import {StudentStats, calculateQuestionSetStats, linkStudentStats} from "../../utils/student-stats";

interface CourseStatsContainerProps {
    course: DisplayedCourse
}

export class CourseStatsContainer extends Component<CourseStatsContainerProps, any> {

    calculateDisplayedCourseStats() {
        const course = this.props.course;
        const stats: StudentStats = {};
        const {questionSets} = course;

        if (questionSets.length > 0) {
            questionSets.forEach((questionSet) => calculateQuestionSetStats(questionSet, stats));
        }

        return linkStudentStats(stats, course.students);
    }

    render() {
        const linkedStudentStats = this.calculateDisplayedCourseStats();
        return (
            <div>
                <h1><FormattedMessage id="display.course.ranking.title" defaultMessage="Course ranking"/></h1>
                <StudentStatsDisplay linkedStudentStats={linkedStudentStats}/>
            </div>
        )
    }
}
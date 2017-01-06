import * as React from 'react';
const {Component} = React;
import {
    List,
    ListItem,
    Paper,
    Avatar,
    Badge
} from "material-ui";
import {DisplayedCourse, LimitedQuestion, LimitedQuestionSet, LimitedStudent} from "../../reducers/display-course";
import {FormattedMessage} from "react-intl";
import {sortBy, reverse} from "lodash";

interface CourseStatsContainerProps {
    course: DisplayedCourse
}

export interface StudentStats {
    [studentId: string]: number
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
        const studentLinkedStats = this.calculateDisplayedCourseStats();
        return (
            <div>
                <h1><FormattedMessage id="display.course.ranking" defaultMessage="Course ranking"/></h1>
                <Paper>
                    <List>
                        {studentLinkedStats.map((student) => {
                            return (
                                <ListItem
                                    leftAvatar={renderStudentAvatar(student.name)}
                                    rightIcon={<Badge badgeContent={student.hits}/>}>
                                    {student.name}
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
            </div>
        )
    }
}

export const renderStudentAvatar = (studentName: string) => {
    const nameParts = studentName.split(' ');
    const studentAvatar = [''].concat(nameParts).reduce((prev, curr) => prev + curr.charAt(0).toUpperCase());
    return <Avatar>{studentAvatar}</Avatar>
};

export function calculateQuestionStats(question: LimitedQuestion, stats: StudentStats) {
    const {responses} = question;
    if (responses.length > 0) {
        const correctAnswer = question.answers.reduce((prev, curr) => (curr.isCorrect) ? curr : prev);
        responses.forEach((response) => {
            if (response.option === correctAnswer.option) {
                const studentId = response.student.id;
                stats[studentId] = (stats[studentId]) ? stats[studentId] + 1 : 1
            }
        });
    }
}

export function calculateQuestionSetStats(questionSet: LimitedQuestionSet, stats: StudentStats) {
    const {questions} = questionSet;
    if (questions.length > 0) {
        questions.forEach((question) => calculateQuestionStats(question, stats));
    }
}

export function linkStudentStats(studentStats: StudentStats, students: LimitedStudent[]) {
    const linkedStudentStats = Object.keys(studentStats).map((studentId) => {
        const student = students.reduce((prev, curr) => (curr.id === studentId) ? curr : prev);
        return {id: studentId, name: student.name, hits: studentStats[studentId]}
    });
    return reverse(sortBy(linkedStudentStats, (studentStat) => studentStat.hits));
}
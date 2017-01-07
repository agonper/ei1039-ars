import {LimitedQuestion, LimitedQuestionSet, LimitedStudent} from "../reducers/display-course";
import {reverse, sortBy} from "lodash";

export interface StudentStats {
    [studentId: string]: number
}

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
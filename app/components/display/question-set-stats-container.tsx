import * as React from 'react';
const {Component} = React;
import {DisplayedCourse} from "../../reducers/display-course";
import {FormattedMessage, FormattedDate} from "react-intl";
import {StudentStatsDisplay} from "../course/student-stats-display";
import {StudentStats, calculateQuestionSetStats, linkStudentStats} from "../../utils/student-stats";

interface QuestionSetStatsContainerProps {
    course: DisplayedCourse
}

export class QuestionSetStatsContainer extends Component<QuestionSetStatsContainerProps, any> {

    calculateDisplayedQuestionSetStats() {
        const {course} = this.props;
        const stats: StudentStats = {};
        const {displayedQuestionSet} = course;
        const {questions} = displayedQuestionSet;

        if (questions.length > 0) {
            calculateQuestionSetStats(displayedQuestionSet, stats);
        }

        return linkStudentStats(stats, course.students);
    }

    render() {
        const {name, createdAt} = this.props.course.displayedQuestionSet;
        const linkedStudentStats = this.calculateDisplayedQuestionSetStats();
        const formattedDate = <FormattedDate
                                value={new Date(createdAt)}
                                year='numeric'
                                month='short'
                                day='2-digit'/>;
        return (
            <div>
                <h1>
                    <FormattedMessage
                        id="display.question-set.ranking.title"
                        defaultMessage="Ranking for {name}"
                        values={{name: (name) ? name : formattedDate}}/>
                </h1>
                <StudentStatsDisplay linkedStudentStats={linkedStudentStats}/>
            </div>
        )
    }
}
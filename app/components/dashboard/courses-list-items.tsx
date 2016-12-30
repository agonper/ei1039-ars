import * as React from 'react';
const {Component} = React;
import {
    ListItem
} from 'material-ui';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {FormattedMessage, FormattedDate} from 'react-intl';
import {connect} from 'react-redux';
import {ApplicationState} from "../../reducers/index";
import {fetchUserCourses} from "../../actions/course";
import {UserCoursesState, LimitedCourse, LimitedQuestionSet, LimitedQuestion} from "../../reducers/user-courses";
import {selectCourse, selectQuestionSet, selectQuestion} from "../../actions/dashboard";

interface CoursesListItemsProps {
    userCourses: UserCoursesState,
    fetchUserCourses(): any,
    selectCourse(courseId: string): any,
    selectQuestionSet(questionSetId: string): any,
    selectQuestion(questionId: string): any
}

class CoursesListItemsComponent extends Component<CoursesListItemsProps, any> {

    componentWillMount() {
        this.props.fetchUserCourses();
    }

    handleQuestionClick(question: LimitedQuestion) {
        this.props.selectQuestion(question.id);
    }

    renderQuestions(questions: LimitedQuestion[]) {

        return questions.map((question, i) => {
            const number = i+1;
            const formattedName = <FormattedMessage
                                        id="dashboard.question.label"
                                        defaultMessage="Question {number}"
                                        values={{number: number}}/>;

            return (
                <ListItem
                    key={question.id}
                    value={question.id}
                    onTouchTap={() => this.handleQuestionClick(question)}
                    primaryText={(question.title !== '') ? question.title : formattedName}/>
            )
        });
    }

    handleQuestionSetClick(questionSet: LimitedQuestionSet) {
        this.props.selectQuestionSet(questionSet.id);
    }

    renderQuestionSets(questionSets: LimitedQuestionSet[]) {

        return questionSets.map((questionSet) => {
            const formattedDate = <FormattedDate
                                    value={new Date(questionSet.createdAt)}
                                    year='numeric'
                                    month='short'
                                    day='2-digit'/>;
            return (
                <ListItem
                    key={questionSet.id}
                    value={questionSet.id}
                    onTouchTap={() => this.handleQuestionSetClick(questionSet)}
                    primaryText={(questionSet.name !== "") ? questionSet.name : formattedDate}
                    title={(questionSet.name !== "") ? questionSet.name : questionSet.createdAt}
                    nestedItems={(questionSet.questions.length > 0) ? this.renderQuestions(questionSet.questions) : []}/>
            );
        })
    }

    handleCourseClick(course: LimitedCourse) {
        this.props.selectCourse(course.id);
    }

    renderUserCourses() {
        const {courses, fetching} = this.props.userCourses;

        if (fetching) return <div className="center-xs"><MoreHorizIcon/></div>;

        if (!courses || courses.length == 0) return (
            <div className="center-xs">
                <FormattedMessage id="dashboard.courses.empty" defaultMessage="You have no courses"/>
            </div>
        );

        return courses.map((course) => {
            return (
                <ListItem
                    key={course.id}
                    value={course.id}
                    onTouchTap={() => this.handleCourseClick(course)}
                    primaryText={course.name}
                    title={course.name}
                    nestedItems={(course.questionSets.length > 0) ? this.renderQuestionSets(course.questionSets) : []}/>
            );
        })
    }

    render() {
        return <div>{this.renderUserCourses()}</div>;
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        userCourses: state.userCourses
    }
}

export const CoursesListItems = connect(mapStateToProps, {fetchUserCourses, selectCourse, selectQuestionSet, selectQuestion})(CoursesListItemsComponent);
import * as React from 'react';
const {Component} = React;
import {
    ListItem
} from 'material-ui';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {ApplicationState} from "../../reducers/index";
import {fetchUserCourses} from "../../actions/courses";
import {UserCoursesState} from "../../reducers/user-courses";

interface CoursesListItemsProps {
    userCourses: UserCoursesState,
    fetchUserCourses(): any
}

class CoursesListItemsComponent extends Component<CoursesListItemsProps, any> {

    componentWillMount() {
        this.props.fetchUserCourses();
    }

    renderQuestionSets() {
        const questionSets = [
            {id: 0, name: "23 Dic 16"},
            {id: 1, name: "19 Dic 16"},
            {id: 2, name: "15 Dic 16"},
            {id: 3, name: "12 Dic 16"},
            {id: 4, name: "10 Dic 16"}
        ];

        return questionSets.map((questionSet) => {
            return (
                <ListItem
                    key={questionSet.id}
                    title={questionSet.name}
                    primaryText={questionSet.name}/>
            );
        })
    }

    renderUserCourses() {
        const {courses, fetching} = this.props.userCourses;

        if (fetching) return <div className="center-xs"><MoreHorizIcon/></div>;

        if (courses.length == 0) return (
            <div className="center-xs">
                <FormattedMessage id="dashboard.courses.empty" defaultMessage="You have no courses"/>
            </div>
        );

        return courses.map((course) => {
            return (
                <ListItem
                    key={course.id}
                    primaryText={course.name}
                    title={course.name}
                    nestedItems={this.renderQuestionSets()}/>
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

export const CoursesListItems = connect(mapStateToProps, {fetchUserCourses})(CoursesListItemsComponent);
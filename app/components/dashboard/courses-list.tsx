import * as React from 'react';
const {Component} = React;
import {
    Drawer,
    AppBar,
    IconButton,
    List,
    Subheader,
    ListItem
} from 'material-ui';
import RecordVoiceOverIcon from 'material-ui/svg-icons/action/record-voice-over';
import {white} from 'material-ui/styles/colors';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {ApplicationState} from "../../reducers/index";
import {fetchUserCourses} from "../../actions/courses";
import {UserCoursesState} from "../../reducers/user-courses";

interface CoursesListProps {
    userCourses: UserCoursesState,
    fetchUserCourses(): any
}

class CoursesListComponent extends Component<CoursesListProps, any> {

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
        const userCourses = this.props.userCourses.courses;

        return userCourses.map((course) => {
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

        // TODO https://github.com/callemall/material-ui/issues/4752
        // TODO https://github.com/balloob/react-sidebar/blob/master/example/src/responsive_example.js#L32-L44

        return (
            <div>
                <Drawer
                    docked={true}
                    open={true}>
                    <AppBar
                        iconElementLeft={<Link to="/"><IconButton><RecordVoiceOverIcon color={white}/></IconButton></Link>}
                        title={<FormattedMessage id="dashboard.courses.title" defaultMessage="Courses"/>}/>
                    <List>
                        <Subheader>
                            <FormattedMessage id="dashboard.courses.subtitle" defaultMessage="Your courses"/>
                        </Subheader>
                        {this.renderUserCourses()}
                    </List>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        userCourses: state.userCourses
    }
}

export const CoursesList = connect(mapStateToProps, {fetchUserCourses})(CoursesListComponent);
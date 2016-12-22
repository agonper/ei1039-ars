import * as React from 'react';
const {Component} = React;
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {connect} from 'react-redux';
import {DashboardState} from "../../reducers/dashboard";
import {ApplicationState} from "../../reducers/index";
import {SelectedCourseState} from "../../reducers/selected-course";
import {ItemAppBar} from "../ui/item-app-bar";

interface CourseContainerProps {
    dashboard: DashboardState,
    selectedCourse: SelectedCourseState,
    fetchCourse(id: string): any
}

class CourseContainerComponent extends Component<CourseContainerProps, any> {

    render() {
        if (this.props.selectedCourse.fetching){
            return (
                <div style={{height: '100%'}} className="row middle-xs center-xs">
                    <div><MoreHorizIcon/></div>
                </div>
            );
        }

        return (
            <div style={{height: '100%'}}>
                <ItemAppBar
                    title={this.props.selectedCourse.course.name}/>

                <div style={{height: '80%'}} className="row middle-xs center-xs">
                    Course content
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        dashboard: state.dashboard,
        selectedCourse: state.selectedCourse
    }
}

export const CourseContainer = connect(mapStateToProps)(CourseContainerComponent);
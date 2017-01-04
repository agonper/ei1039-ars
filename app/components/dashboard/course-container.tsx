import * as React from 'react';
const {Component} = React;
import {
    AppBar,
    RaisedButton
} from 'material-ui';
import {lightGreen400} from 'material-ui/styles/colors';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {connect} from 'react-redux';
import {DashboardState} from "../../reducers/dashboard";
import {ApplicationState} from "../../reducers/index";
import {SelectedCourseState} from "../../reducers/selected-course";
import {FormattedMessage} from 'react-intl';
import {toggleAddQuestionSetModal, toggleAddQuestionModal} from "../../actions/dashboard";

interface CourseContainerProps {
    dashboard: DashboardState,
    selectedCourse: SelectedCourseState,
    toggleAddQuestionSetModal(): void,
    toggleAddQuestionModal(): void
}

const buttonStyle = {
    margin: '5px 0 5px 0'
};

class CourseContainerComponent extends Component<CourseContainerProps, any> {

    render() {
        const {fetching, course} = this.props.selectedCourse;
        if (fetching && !course){
            return (
                <div style={{height: '100%'}} className="row middle-xs center-xs">
                    <div><MoreHorizIcon/></div>
                </div>
            );
        }

        return (
            <div style={{height: '100%'}}>
                <AppBar
                    iconElementLeft={<span></span>}
                    style={{backgroundColor: lightGreen400}}
                    title={this.props.selectedCourse.course.name}/>

                <div style={{height: '100%'}} className="row middle-xs center-xs col-xs-offset-2 col-xs-8">
                    <div style={{height: '200px', width: '500px'}}>
                        <h3><FormattedMessage id="dashboard.course.content.title" defaultMessage="What do you want to add?"/></h3>
                        <div className="row">
                            <div className="col-md-6 col-xs-12">
                                <RaisedButton
                                    primary={true}
                                    fullWidth={true}
                                    style={buttonStyle}
                                    onTouchTap={this.props.toggleAddQuestionModal}
                                    label={<FormattedMessage id="dashboard.course.content.create-question" defaultMessage="A question"/>}/>
                            </div>
                            <div className="col-md-6 col-xs-12">
                                <RaisedButton
                                    secondary={true}
                                    fullWidth={true}
                                    style={buttonStyle}
                                    onTouchTap={this.props.toggleAddQuestionSetModal}
                                    label={<FormattedMessage id="dashboard.course.content.create-question-set" defaultMessage="A question set"/>}/>
                            </div>
                        </div>
                    </div>
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

export const CourseContainer = connect(mapStateToProps, {toggleAddQuestionSetModal, toggleAddQuestionModal})(CourseContainerComponent);
import * as React from 'react';
const {Component} = React;
import {Paper} from 'material-ui';
import {connect} from 'react-redux';
import {toggleAddCourseModal} from "../../actions/dashboard";
import {NoSelection} from "./no-selection";
import {ApplicationState} from "../../reducers/index";
import {DashboardState} from "../../reducers/dashboard";
import {CourseContainer} from "./course-container";

const containerStyle = {
    position: 'fixed',
    left: '280px',
    top: '85px',
    bottom: '20px',
    right: '20px'
};

interface DashboardContainerProps {
    dashboard: DashboardState
}

class DashboardContainerComponent extends Component<DashboardContainerProps, any> {

    renderInnerContainer() {
        const {isItemSelected, selectedItemType} = this.props.dashboard;
        if (!isItemSelected) return <NoSelection/>;

        switch (selectedItemType) {
            case 'course':
                return <CourseContainer/>;
            default:
                return <NoSelection/>;
        }
    }

    render() {
        return (
            <div style={containerStyle}>
                <Paper style={{height: '100%'}}>
                    {this.renderInnerContainer()}
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        dashboard: state.dashboard
    }
}

export const DashboardContainer = connect(mapStateToProps, {toggleAddCourseModal})(DashboardContainerComponent);

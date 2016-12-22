import * as React from 'react';
const {Component} = React;
import {
    Paper,
    RaisedButton
} from 'material-ui';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {toggleAddCourseModal} from "../../actions/dashboard";

const containerStyle = {
    position: 'fixed',
    left: '280px',
    top: '85px',
    bottom: '20px',
    right: '20px'
};

interface DashboardContainerProps {
    toggleAddCourseModal(): any
}

class DashboardContainerComponent extends Component<DashboardContainerProps, any> {
    render() {
        return (
            <div style={containerStyle}>
                <Paper style={{height: '100%'}} className="row middle-xs center-xs">
                    <FormattedMessage
                        id="dashboard.main.select-a-course"
                        defaultMessage="To start, select a course from the side panel or "/>
                    <RaisedButton
                        secondary={true}
                        style={{marginLeft: '5px'}}
                        onTouchTap={this.props.toggleAddCourseModal}
                        label={<FormattedMessage id="dashboard.main.create-a-course" defaultMessage="Create one"/>}/>
                </Paper>
            </div>
        );
    }
}
export const DashboardContainer = connect(null, {toggleAddCourseModal})(DashboardContainerComponent);

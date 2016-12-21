import * as React from 'react';
const {Component} = React;
import {FormattedMessage} from 'react-intl';
import {
    Dialog,
    FlatButton,
    RaisedButton
} from 'material-ui';
import {connect} from 'react-redux';
import {ApplicationState} from "../../reducers/index";
import {DashboardState} from "../../reducers/dashboard";
import {toggleAddCourseModal} from "../../actions/dashboard";

interface AddCourseModalProps {
    dashboard: DashboardState,
    toggleAddCourseModal(): any
}

class AddCourseModalComponent extends Component<AddCourseModalProps, any> {

    render() {
        const actions = [
            <RaisedButton
                primary={true}
                label={<FormattedMessage id="dashboard.course.create.submit" defaultMessage="Create course"/>}/>,
            <FlatButton
                secondary={true}
                onTouchTap={this.props.toggleAddCourseModal}
                style={{marginLeft: '5px'}}
                label={<FormattedMessage id="app.general.cancel" defaultMessage="Cancel"/>}/>
        ];

        return (
            <div>
                <Dialog
                    title={<h2><FormattedMessage id="dashboard.course.create.title" defaultMessage="Create a course"/></h2>}
                    modal={true}
                    open={this.props.dashboard.showAddCourseModal}
                    actions={
                       actions
                    }>

                    <div>Diaglog content</div>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        dashboard: state.dashboard
    }
}

export const AddCourseModal = connect(mapStateToProps, {toggleAddCourseModal})(AddCourseModalComponent);


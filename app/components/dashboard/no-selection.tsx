import * as React from 'react';
const {Component} = React;
import {RaisedButton} from 'material-ui';
import {FormattedMessage} from 'react-intl';
import {toggleAddCourseModal} from "../../actions/dashboard";
import {connect} from 'react-redux';


interface NoSelectionProps {
    toggleAddCourseModal(): any,
}

class NoSelectionComponent extends Component<NoSelectionProps, any> {
    render() {
        return (
            <div style={{height: '100%'}} className="row middle-xs center-xs">
                <div>
                    <FormattedMessage
                        id="dashboard.main.select-a-course"
                        defaultMessage="To start, select a course from the side panel or "/>
                    <RaisedButton
                        secondary={true}
                        style={{marginLeft: '5px'}}
                        onTouchTap={this.props.toggleAddCourseModal}
                        label={<FormattedMessage id="dashboard.main.create-a-course" defaultMessage="Create one"/>}/>
                </div>
            </div>
        );
    }
}
export const NoSelection = connect(null, {toggleAddCourseModal})(NoSelectionComponent);

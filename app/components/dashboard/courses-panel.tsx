import * as React from 'react';
const {Component} = React;
import {
    Drawer,
    AppBar,
    IconButton,
    List,
    Subheader
} from 'material-ui';
import RecordVoiceOverIcon from 'material-ui/svg-icons/action/record-voice-over';
import AddCircleOutlineIcon from 'material-ui/svg-icons/content/add-circle-outline';
import {white} from 'material-ui/styles/colors';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl';
import {CoursesListItems} from "./courses-list-items";
import {connect} from 'react-redux';
import {toggleAddCourseModal} from "../../actions/dashboard";

interface CoursesPanelProps {
    toggleAddCourseModal(): any
}

class CoursesPanelComponent extends Component<CoursesPanelProps, any> {
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
                            <div className="row">
                                <div className="col-xs-8">
                                    <FormattedMessage id="dashboard.courses.subtitle" defaultMessage="Your courses"/>
                                </div>
                                <div className="col-xs-4 end-xs">
                                    <IconButton
                                        onTouchTap={this.props.toggleAddCourseModal}
                                        className="end-xs"
                                        title="Añadir curso nuevo"
                                        style={{marginRight: '4px'}}>
                                        <AddCircleOutlineIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        </Subheader>
                        <CoursesListItems/>
                    </List>
                </Drawer>
            </div>
        );
    }
}

export const CoursesPanel = connect(null, {toggleAddCourseModal})(CoursesPanelComponent);

import * as React from 'react';
const {Component} = React;
import {FormattedMessage} from 'react-intl';
import {
    Dialog,
    FlatButton,
    RaisedButton
} from 'material-ui';
import {reduxForm, ReduxFormProps} from 'redux-form';
import {ApplicationState} from "../../reducers/index";
import {DashboardState} from "../../reducers/dashboard";
import {toggleAddCourseModal} from "../../actions/dashboard";
import {HintOnlyTextField} from "../ui/hint-only-text-field";
import {CreateCourseState} from "../../reducers/create-course";
import {createCourse} from "../../actions/courses";

export interface NewCourseData {
    name: string
}

interface AddCourseModalProps extends ReduxFormProps<any> {
    dashboard: DashboardState,
    create: CreateCourseState,
    toggleAddCourseModal(): any,
    createCourse(course: NewCourseData): Promise<any>,
    resetForm(): any
}

class AddCourseModalComponent extends Component<any & AddCourseModalProps, any> {

    onCreateCourse(course: NewCourseData) {
        return this.props.createCourse(course)
            .then(() => {
                this.props.toggleAddCourseModal();
                this.props.resetForm();
            })
    }

    render() {
        const {fields: {name}, handleSubmit} = this.props;

        const actions = [
            <RaisedButton
                primary={true}
                disabled={this.props.create.creating}
                onTouchTap={handleSubmit(this.onCreateCourse.bind(this))}
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
                        actions={actions}>
                        <form onSubmit={handleSubmit(this.onCreateCourse.bind(this))}>
                            <HintOnlyTextField
                                field={name}
                                hint="dashboard.course.create.name"
                                defaultHint="Course name"
                                type="text"/>
                            <input style={{visibility: 'hidden', display: 'none'}} type="submit"/>
                        </form>
                    </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        dashboard: state.dashboard,
        create: state.createCourse
    }
}

function validate(course: NewCourseData) {
    const errors: any = {};

    if (!course.name) {
        errors.name = "dashboard.course.create.empty-name";
    }

    return errors;
}

export const AddCourseModal = reduxForm({
    form: 'addCourse',
    fields: ['name'],
    validate
}, mapStateToProps, {toggleAddCourseModal, createCourse})(AddCourseModalComponent);


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
import {HintOnlyTextField} from "../ui/hint-only-text-field";
import {toggleAddQuestionSetModal} from "../../actions/dashboard";
import {CreateQuestionSetState} from "../../reducers/create-question-set";
import {createQuestionSet} from "../../actions/question-set";

export interface NewQuestionSetData {
    name: string
}

interface AddQuestionSetModalProps extends ReduxFormProps<any> {
    dashboard: DashboardState,
    create: CreateQuestionSetState,
    toggleAddQuestionSetModal(): any,
    createQuestionSet(courseId: string, questionSet: NewQuestionSetData): Promise<any>,
    resetForm(): any
}

class AddQuestionSetModalComponent extends Component<any & AddQuestionSetModalProps, any> {

    onCreateQuestionSet(questionSet: NewQuestionSetData) {
        return this.props.createQuestionSet(this.props.dashboard.selectedItemId, questionSet)
            .then(() => {
                this.props.toggleAddQuestionSetModal();
                this.props.resetForm();
            });
    }

    render() {
        const {fields: {name}, handleSubmit} = this.props;

        const actions = [
            <RaisedButton
                primary={true}
                disabled={this.props.create.creating}
                onTouchTap={handleSubmit(this.onCreateQuestionSet.bind(this))}
                label={<FormattedMessage id="dashboard.question-set.create.submit" defaultMessage="Create question set"/>}/>,
            <FlatButton
                secondary={true}
                onTouchTap={this.props.toggleAddQuestionSetModal}
                style={{marginLeft: '5px'}}
                label={<FormattedMessage id="app.general.cancel" defaultMessage="Cancel"/>}/>
        ];

        return (
            <div>

                <Dialog
                    title={<h2><FormattedMessage id="dashboard.question-set.create.title" defaultMessage="Create a question set"/></h2>}
                    modal={true}
                    open={this.props.dashboard.showAddQuestionSetModal}
                    actions={actions}>
                    <form onSubmit={handleSubmit(this.onCreateQuestionSet.bind(this))}>
                        <HintOnlyTextField
                            focus={true}
                            field={name}
                            hint="dashboard.question-set.create.name"
                            defaultHint="Question set name"
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
        create: state.createQuestionSet
    }
}

function validate(questionSetData: NewQuestionSetData) {
    const errors: any = {};

    if (!questionSetData.name) {
        errors.name = "dashboard.question-set.create.empty-name";
    }

    return errors;
}

export const AddQuestionSetModal = reduxForm({
    form: 'addQuestionSet',
    fields: ['name'],
    validate
}, mapStateToProps, {toggleAddQuestionSetModal, createQuestionSet})(AddQuestionSetModalComponent);


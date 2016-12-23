import * as React from 'react';
const {Component} = React;
import {FormattedMessage} from 'react-intl';
import {
    Dialog,
    FlatButton,
    RaisedButton,
    Toggle,
    Paper,
    Checkbox
} from 'material-ui';
import {grey500, lightGreen400} from 'material-ui/styles/colors';
import {reduxForm, ReduxFormProps} from 'redux-form';
import {ApplicationState} from "../../reducers/index";
import {DashboardState} from "../../reducers/dashboard";
import {HintOnlyTextField} from "../ui/hint-only-text-field";
import {toggleAddQuestionModal} from "../../actions/dashboard";
import {SelectedCourseState} from "../../reducers/selected-course";
import {SelectedQuestionSetState} from "../../reducers/selected-question-set";
import {InputQuestion, createLinkedQuestion, createIndependentQuestion} from "../../actions/question";

export interface NewQuestionData {
    title: string,
    withAnswers: boolean,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string,
    correctAnswer: string
}

interface AddQuestionModalProps extends ReduxFormProps<any> {
    dashboard: DashboardState,
    selectedCourse: SelectedCourseState,
    selectedQuestionSet: SelectedQuestionSetState,
    /*create: CreateQuestionSetState,*/
    toggleAddQuestionModal(): any,
    createLinkedQuestion(courseId: string, questionSetId: string, question: InputQuestion): any,
    createIndependentQuestion(courseId: string, question: InputQuestion): any,
    /*createQuestionSet(courseId: string, questionSet: NewQuestionSetData): Promise<any>,*/
    resetForm(): any
}

class AddQuestionModalComponent extends Component<any & AddQuestionModalProps, any> {

    onCreateQuestion(question: NewQuestionData) {
        const inputOptions = ['A', 'B', 'C', 'D'];
        const inputAnswers = [question.answerA, question.answerB, question.answerC, question.answerD];

        const answers = inputAnswers.map((answer, i) => {
            return {option: inputOptions[i], text: answer, isCorrect: question.correctAnswer === inputOptions[i]}
        });

        const inputQuestion: InputQuestion = {
            title: question.title,
            answers
        };


        if (this.props.dashboard.selectedItemType === 'course') {
            const courseId = this.props.selectedCourse.course.id;
            this.props.createIndependentQuestion(courseId, inputQuestion)
                .then(() => {
                    this.props.toggleAddQuestionModal();
                    this.props.resetForm();
                });
        }

        if (this.props.dashboard.selectedItemType === 'question-set') {


            const courseId = this.props.selectedQuestionSet.questionSet.course.id;
            const questionSetId = this.props.selectedQuestionSet.questionSet.id;
            this.props.createLinkedQuestion(courseId, questionSetId, inputQuestion)
                .then(() => {
                    this.props.toggleAddQuestionModal();
                    this.props.resetForm();
                });

        }
    }

    clearAnswers() {
        const {fields: {withAnswers, answerA, answerB, answerC, answerD}} = this.props;

        withAnswers.onChange(!withAnswers.value);
        const answers = [answerA, answerB, answerC, answerD];
        answers.forEach((answer) => answer.onChange(''));
    }

    render() {
        const {fields: {title, withAnswers, answerA, answerB, answerC, answerD, correctAnswer}, handleSubmit} = this.props;

        const actions = [
            <RaisedButton
                primary={true}
                disabled={/*this.props.create.creating*/false}
                onTouchTap={handleSubmit(this.onCreateQuestion.bind(this))}
                label={<FormattedMessage id="dashboard.question.create.submit" defaultMessage="Create question"/>}/>,
            <FlatButton
                secondary={true}
                onTouchTap={this.props.toggleAddQuestionModal}
                style={{marginLeft: '5px'}}
                label={<FormattedMessage id="app.general.cancel" defaultMessage="Cancel"/>}/>
        ];

        return (
            <div>

                <Dialog
                    title={<h2><FormattedMessage id="dashboard.question.create.title" defaultMessage="Create a question"/></h2>}
                    modal={true}
                    open={this.props.dashboard.showAddQuestionModal}
                    actions={actions}>
                    <form onSubmit={handleSubmit(this.onCreateQuestion.bind(this))}>
                        <div className="row middle-xs">
                            <div className="col-md-9 col-xs-12">
                                <HintOnlyTextField
                                    field={title}
                                    hint="dashboard.question.create.title"
                                    defaultHint="Question title"
                                    type="text"/>
                            </div>
                            <div className="col-md-3 col-xs-12">
                                <Toggle
                                    thumbStyle={{backgroundColor: grey500}}
                                    thumbSwitchedStyle={{backgroundColor: lightGreen400}}
                                    trackSwitchedStyle={{backgroundColor: lightGreen400}}
                                    toggled={withAnswers.value}
                                    onToggle={this.clearAnswers.bind(this)}
                                    label="Con respuestas"/>
                            </div>
                        </div>
                        <div className="row">
                            <Paper
                                style={{width: '100%', padding: '10px 0 10px 10px'}}
                                zDepth={1}>

                                <div className="row middle-xs">
                                    <div className="col-xs-11">
                                        <HintOnlyTextField
                                            field={answerA}
                                            hint="dashboard.question.create.answerA"
                                            defaultHint="A"
                                            disabled={!withAnswers.value}
                                            type="text"/>
                                    </div>
                                    <div className="col-xs-1">
                                        <Checkbox
                                            onCheck={() => correctAnswer.onChange('A')}
                                            checked={correctAnswer.value === 'A'}/>
                                    </div>
                                </div>

                                <div className="row middle-xs">
                                    <div className="col-xs-11">
                                        <HintOnlyTextField
                                            field={answerB}
                                            hint="dashboard.question.create.answerB"
                                            defaultHint="B"
                                            disabled={!withAnswers.value}
                                            type="text"/>
                                    </div>
                                    <div className="col-xs-1">
                                        <Checkbox
                                            onCheck={() => correctAnswer.onChange('B')}
                                            checked={correctAnswer.value === 'B'}/>
                                    </div>
                                </div>


                                <div className="row middle-xs">
                                    <div className="col-xs-11">
                                        <HintOnlyTextField
                                            field={answerC}
                                            hint="dashboard.question.create.answerC"
                                            defaultHint="C"
                                            disabled={!withAnswers.value}
                                            type="text"/>
                                    </div>
                                    <div className="col-xs-1">
                                        <Checkbox
                                            onCheck={() => correctAnswer.onChange('C')}
                                            checked={correctAnswer.value === 'C'}/>
                                    </div>
                                </div>

                                <div className="row middle-xs">
                                    <div className="col-xs-11">
                                        <HintOnlyTextField
                                            field={answerD}
                                            hint="dashboard.question.create.answerD"
                                            defaultHint="D"
                                            disabled={!withAnswers.value}
                                            type="text"/>
                                    </div>
                                    <div className="col-xs-1">
                                        <Checkbox
                                            onCheck={() => correctAnswer.onChange('D')}
                                            checked={correctAnswer.value === 'D'}/>
                                    </div>
                                </div>
                            </Paper>
                        </div>

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
        selectedCourse: state.selectedCourse,
        selectedQuestionSet: state.selectedQuestionSet,
        initialValues: {withAnswers: false, correctAnswer: 'A'}/*,
        create: state.createQuestionSet*/
    }
}

function validate(questionSetData: NewQuestionData) {
    const errors: any = {};

    if (questionSetData.withAnswers) {
        if (!questionSetData.answerA) errors.answerA = "dashboard.question.create.empty-answer";
        if (!questionSetData.answerB) errors.answerB = "dashboard.question.create.empty-answer";
        if (!questionSetData.answerC) errors.answerC = "dashboard.question.create.empty-answer";
        if (!questionSetData.answerD) errors.answerD = "dashboard.question.create.empty-answer";
    }

    return errors;
}

export const AddQuestionModal = reduxForm({
    form: 'addQuestion',
    fields: ['title', 'withAnswers', 'answerA', 'answerB', 'answerC', 'answerD', 'correctAnswer'],
    validate
}, mapStateToProps, {toggleAddQuestionModal, createLinkedQuestion, createIndependentQuestion})(AddQuestionModalComponent);


import * as React from 'react';
import {TextField} from "material-ui";
import {RaisedButton} from "material-ui";
import Component = React.Component;
import FormEvent = React.FormEvent;
import {reduxForm} from "redux-form";
import {questionCreation_clear, questionCreation_createQuestion} from "../../../actions/create-question";
import PropTypes = React.PropTypes;
import {ApplicationState} from "../../../reducers/index";
import {CardText} from "material-ui";
import {CardActions} from "material-ui";
import {Link} from 'react-router';
import {RadioButtonGroup} from "material-ui";
import {RadioButton} from "material-ui";
import {Card} from "material-ui";
import {Toggle} from "material-ui";
import {CardHeader} from "material-ui";

const styles = {
    paper : {
        "padding-top": '20px',
        "padding-bottom": '90px',
        "padding-left": '20px',
        "padding-right": '20px',
    },

    questionTextField : {
        "text-align" : 'left',
        "width" : '90%'
    },

    answersCheckBox : {
        "padding-top": '20px',
        "padding-bottom": '40px',
        "text-align" : 'left'
    },

    answerTextField : {
        standard : {
            "padding-top": '10px',
            "padding-bottom": '10px',
            "text-align" : 'left'
        },
        error : {
            "padding-top": '10px',
            "padding-bottom": '10px',
            "text-align" : 'left'
        }
    },

    finishButton : {
        "float" : 'right'
    }
};

export interface QuestionFormFields {
    question : string;
    existsAnswers : boolean;
    answerA : string;
    answerB : string;
    answerC : string;
    answerD : string;
    correctAnswer : string;
};


export default class QuestionBoxComponent extends Component<any, any> {

    static contextTypes = {
        router: PropTypes.object,
    };

    onSubmitHandle(questionData : QuestionFormFields) {
        this.props.questionCreation(questionData);
    }

    render () {
        const {fields, handleSubmit} = this.props;
        const {question, existsAnswers, answerA, answerB, answerC, answerD, correctAnswer} = fields;

        existsAnswers.value = true;
        existsAnswers.onChange = (newValue : boolean) => {
            existsAnswers.value = newValue};

        correctAnswer.value = undefined;
        correctAnswer.onChange = (newValue : string) => {correctAnswer.value = newValue};

        const questionCreationErrors = this.props.questionCreation.error;
        if (questionCreationErrors) {
            Object.keys(questionCreationErrors).forEach((field) => {
                fields[field].error = (questionCreationErrors[field]) ? 'empty-field' + questionCreationErrors[field] : '';
            });
        }

        return (
            <div className="row center-md">
                 <div className="row">
                    <form onSubmit={handleSubmit(this.onSubmitHandle.bind(this))}>
                        <Card style={{paddingBottom: '30px'}}>
                            <TextField
                                floatingLabelText={"Pregunta a insertar"}
                                multiLine={true}
                                errorText={questionCreationErrors ? questionCreationErrors.question : ''}
                                style={styles.questionTextField}
                            />
                            <div className="row">
                                    <div className="col-md-2">
                                        <CardHeader title="Respuesta correcta" style={{margin: '20px 0px 0px 50px'}}>
                                            <RadioButtonGroup name="correctAnswer" valueSelected={correctAnswer.value} onChange={correctAnswer.onChange(correctAnswer.value)} labelPosition="left">
                                                <RadioButton value="A" label="A" disabled={!existsAnswers.value} style={{margin: '70px 0px 0px 0px'}}/>
                                                <RadioButton value="B" label="B" disabled={!existsAnswers.value} style={{margin: '70px 0px 0px 0px'}}/>
                                                <RadioButton value="C" label="C" disabled={!existsAnswers.value} style={{margin: '70px 0px 0px 0px'}}/>
                                                <RadioButton value="D" label="D" disabled={!existsAnswers.value} style={{margin: '70px 0px 0px 0px'}}/>
                                            </RadioButtonGroup>
                                        </CardHeader>
                                    </div>

                                    <div className="col-md-8">
                                        <CardText>
                                            <Toggle
                                                label="¿La pregunta tiene respuestas?"
                                                labelPosition="left"
                                                selected={existsAnswers.value}
                                                onChange={existsAnswers.onChange(!existsAnswers.value)}
                                                style={styles.answersCheckBox}
                                            />


                                            <TextField
                                                floatingLabelText={"Respuesta A"}
                                                floatingLabelFixed={true}
                                                disabled={!existsAnswers.value}
                                                fullWidth={true}
                                                errorText={questionCreationErrors ? questionCreationErrors.answerA : ''}
                                                style={styles.answerTextField.standard}
                                            />

                                            <TextField
                                                floatingLabelText={"Respuesta B"}
                                                floatingLabelFixed={true}
                                                disabled={!existsAnswers.value}
                                                fullWidth={true}
                                                errorText={questionCreationErrors ? questionCreationErrors.answerB : ''}
                                                style={styles.answerTextField.standard}
                                            />

                                            <TextField
                                                floatingLabelText={"Respuesta C"}
                                                floatingLabelFixed={true}
                                                disabled={!existsAnswers.value}
                                                fullWidth={true}
                                                errorText={questionCreationErrors ? questionCreationErrors.answerC : ''}
                                                style={styles.answerTextField.standard}

                                            />

                                            <TextField
                                                floatingLabelText={"Respuesta D"}
                                                floatingLabelFixed={true}
                                                disabled={!existsAnswers.value}
                                                fullWidth={true}
                                                errorText={questionCreationErrors ? questionCreationErrors.answerD : ''}
                                                style={styles.answerTextField.standard}

                                            />
                                        </CardText>
                                    </div>
                                </div>
                            <CardActions>
                                <RaisedButton type="submit" label="Crear pregunta" backgroundColor={"#9CCC65"} labelColor={"White"} style={styles.finishButton}/>
                                <Link to="WOLOLOWOLOLOWOLOLO"></Link>
                            </CardActions>
                        </Card>
                    </form>
                </div>
            </div>
        );
    };
};

function validate(values: QuestionFormFields) {
    const errors: any = {};

    if (!values.question)
        errors.question = "Hay que introducir una pregunta";

    if (values.existsAnswers) {
        let errorAnswer = "Hay que introducir una respuesta";

        if (!values.answerA) errors.answerA = errorAnswer;

        if (!values.answerB) errors.answerB = errorAnswer;

        if (!values.answerC) errors.answerC = errorAnswer;

        if (!values.answerD) errors.answerD = errorAnswer;
    }

    if (values.existsAnswers && !values.correctAnswer)
        errors.correctAnswer = "Hay que marcar una respuesta como correcta";

    return errors;
}

function mapStateToProps(state : ApplicationState) {
    return {questionCreation : state.questionCreation};
}

export const QuestionCreationForm = reduxForm({
    form : 'QuestionForm',
    fields : ['question', 'existsAnswers', 'answerA', 'answerB', 'answerC', 'answerD', 'correctAnswer'],
    initialValues : {existsAnswers : true},
    validate
}, mapStateToProps, {questionCreation_createQuestion, questionCreation_clear})(QuestionBoxComponent);
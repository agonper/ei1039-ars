import * as React from 'react';
import {TextField} from "material-ui";
import {Checkbox} from "material-ui";
import {RaisedButton} from "material-ui";
import Component = React.Component;
import FormEvent = React.FormEvent;
import {reduxForm} from "redux-form";
import {questionCreation_clear, questionCreation_createQuestion} from "../../../actions/createQuestion";
import {Table} from "material-ui";
import {TableRow} from "material-ui";
import {TableHeader} from "material-ui";
import {TableHeaderColumn} from "material-ui";
import {TableBody} from "material-ui";
import {TableRowColumn} from "material-ui";
import PropTypes = React.PropTypes;
import {ApplicationState} from "../../../reducers/index";
import {CardHeader} from "material-ui";
import {CardText} from "material-ui";
import {CardActions} from "material-ui";
import {Link} from 'react-router';

const styles = {
    paper : {
        "padding-top": '20px',
        "padding-bottom": '90px',
        "padding-left": '20px',
        "padding-right": '20px',
    },

    questionTextField : {
        "text-align" : 'left'
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
        "margin-top": '30px',
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

    render () {
        const {fields: {question, existsAnswers, answerA, answerB, answerC, answerD, correctAnswer}, handleSubmit } = this.props;
        const questionCreationErrors = this.props.questionCreation_createQuestion.error;

        if (questionCreationErrors) {
            question.error = questionCreationErrors.question;
            answerA.error = questionCreationErrors.answerA;
            answerB.error = questionCreationErrors.answerB;
            answerC.error = questionCreationErrors.answerC;
            answerD.error = questionCreationErrors.answerD;
            correctAnswer.error = questionCreationErrors.correctAnswer;
        }

        return (
            <div className="row center-md">
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit(this.props.questionCreation)}>
                            <CardHeader title={"Creación de una nueva pregunta"}/>
                            <CardText>
                                <TextField
                                    floatingLabelText={"Pregunta a insertar"}
                                    multiLine={true}
                                    fullWidth={true}
                                    style={styles.questionTextField}
                                />
                                <Checkbox
                                    label="¿La pregunta tiene respuestas?"
                                    labelPosition="left"
                                    defaultChecked={this.props.existsAnswers}
                                    style={styles.answersCheckBox}
                                />
                                <Table
                                    selectable={true}
                                    multiSelectable={false}
                                >
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn>
                                                Respuesta correcta
                                            </TableHeaderColumn>
                                            <TableHeaderColumn>
                                                Respuestas
                                            </TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableRowColumn>A</TableRowColumn>
                                            <TableRowColumn>
                                                <TextField
                                                    floatingLabelText={"Respuesta A"}
                                                    floatingLabelFixed={true}
                                                    disabled={!this.props.existsAnswers}
                                                    multiLine={true}
                                                    fullWidth={true}
                                                    style={styles.answerTextField.standard}
                                                />
                                            </TableRowColumn>
                                        </TableRow>

                                        <TableRow>
                                            <TableRowColumn>B</TableRowColumn>
                                            <TableRowColumn>
                                                <TextField
                                                    floatingLabelText={"Respuesta B"}
                                                    floatingLabelFixed={true}
                                                    disabled={!this.props.existsAnswers}
                                                    multiLine={true}
                                                    fullWidth={true}
                                                    style={styles.answerTextField.standard}
                                                />
                                            </TableRowColumn>
                                        </TableRow>

                                        <TableRow>
                                            <TableRowColumn>C</TableRowColumn>
                                            <TableRowColumn>
                                                <TextField
                                                    floatingLabelText={"Respuesta C"}
                                                    floatingLabelFixed={true}
                                                    disabled={!this.props.existsAnswers}
                                                    multiLine={true} fullWidth={true}
                                                    style={styles.answerTextField.standard}

                                                />
                                            </TableRowColumn>
                                        </TableRow>

                                        <TableRow>
                                            <TableRowColumn>D</TableRowColumn>
                                            <TableRowColumn>
                                                <TextField
                                                    floatingLabelText={"Respuesta D"}
                                                    floatingLabelFixed={true}
                                                    disabled={!this.props.existsAnswers}
                                                    multiLine={true}
                                                    fullWidth={true}
                                                    style={styles.answerTextField.standard}

                                                />
                                            </TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardText>
                            <CardActions>
                                <RaisedButton type="submit" label="Crear pregunta" backgroundColor={"#9CCC65"} labelColor={"White"} style={styles.finishButton}/>
                                <Link to="WOLOLOWOLOLOWOLOLO"></Link>
                            </CardActions>
                        </form>
                    </div>
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
    fields : ['question', 'activeAnswers', 'answerA', 'answerB', 'answerC', 'answerD', 'correctAnswer'],
    validate
}, mapStateToProps, {questionCreation_createQuestion, questionCreation_clear})(QuestionBoxComponent);
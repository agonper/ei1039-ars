import * as React from 'react';
import Paper from 'material-ui/Paper';
import {TextField} from "material-ui";
import {Checkbox} from "material-ui";
import {RaisedButton} from "material-ui";
import Component = React.Component;
import FormEvent = React.FormEvent;
import {reduxForm} from "redux-form";
import {createQuestion} from "../../actions/createQuestion";

interface Properties {};

export interface QuestionFormFields {
    question : String;
    checkBoxState : boolean;
    answerA : String;
    answerB : String;
    answerC : String;
    answerD : String;
};

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

export default class QuestionBoxComponent extends React.Component<Properties, any> {
    constructor(properties : Properties) {
        super(properties);
        this.state = {checkBoxState : true, question : "", answerA : "", answerB : "", answerC : "", answerD : ""};
    }

    public changeCheckboxState(event : any, checkboxState : boolean) {
        let newState = !this.state.checkBoxState;

        if (newState == false) {
            this.setState({
                checkBoxState: newState,
                question: this.state.question,
                answerA : "",
                answerB : "",
                answerC : "",
                answerD : ""
            });
        }
        else {
            this.setState({
                checkBoxState: newState,
                question: this.state.question,
                answerA : this.state.answerA,
                answerB : this.state.answerB,
                answerC : this.state.answerC,
                answerD : this.state.answerD
            });
        }
    }

    public render () {
        return (
            <div className="row center-md">
                <div className="col-md-8">
                    <Paper style={styles.paper} zDepth={2}>
                        <TextField ref="question" floatingLabelText={"Pregunta a insertar"} multiLine={true} fullWidth={true} style={styles.questionTextField}/>
                        <Checkbox ref="answersCheckbox" label="¿La pregunta tiene respuestas?" labelPosition="left" defaultChecked={this.state.checkBoxState} style={styles.answersCheckBox} onCheck={(event, checkboxNewState) => this.changeCheckboxState(event, checkboxNewState)}/>
                        <TextField ref="answerA" value={this.state.answerA} floatingLabelText={"Respuesta A"} floatingLabelFixed={true} disabled={!this.state.checkBoxState} multiLine={true} fullWidth={true} style={styles.answerTextField.standard} onChange={(e : any) => this.setState({answerA : e.target.value})}/>
                        <TextField ref="answerB" value={this.state.answerB} floatingLabelText={"Respuesta B"} floatingLabelFixed={true} disabled={!this.state.checkBoxState} multiLine={true} fullWidth={true} style={styles.answerTextField.standard} onChange={(e : any) => this.setState({answerB : e.target.value})}/>
                        <TextField ref="answerC" value={this.state.answerC} floatingLabelText={"Respuesta C"} floatingLabelFixed={true} disabled={!this.state.checkBoxState} multiLine={true} fullWidth={true} style={styles.answerTextField.standard} onChange={(e : any) => this.setState({answerC : e.target.value})}/>
                        <TextField ref="answerD" value={this.state.answerD} floatingLabelText={"Respuesta D"} floatingLabelFixed={true} disabled={!this.state.checkBoxState} multiLine={true} fullWidth={true} style={styles.answerTextField.standard} onChange={(e : any) => this.setState({answerD : e.target.value})}/>
                        <RaisedButton label="Crear pregunta" backgroundColor={"#9CCC65"} labelColor={"White"} style={styles.finishButton}/>
                    </Paper>
                </div>
            </div>
        );
    };
};

function validate(values: QuestionFormFields) {
    const errors: any = {};

    if (!values.question)
        errors.question = "Hay que introducir una pregunta";

    if (values.checkBoxState) {
        let errorAnswer = "Hay que introducir una respuesta";

        if (!values.answerA) errors.answerA = errorAnswer;

        if (!values.answerB) errors.answerB = errorAnswer;

        if (!values.answerC) errors.answerC = errorAnswer;

        if (!values.answerD) errors.answerD = errorAnswer;
    }

    return errors;
}

export const QuestionForm = reduxForm({
    form : 'QuestionForm',
    fields : ['question', 'activeAnswers', 'answerA', 'answerB', 'answerC', 'answerD'],
    validate
}, null, {createQuestion})(QuestionBoxComponent);
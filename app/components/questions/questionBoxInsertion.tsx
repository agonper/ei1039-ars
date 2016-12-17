import * as React from 'react';
import Paper from 'material-ui/Paper';
import {TextField} from "material-ui";
import {Checkbox} from "material-ui";
import {RaisedButton} from "material-ui";
//import {Field, reduxForm} from 'redux-form';
import Component = React.Component;
import FormEvent = React.FormEvent;

interface Properties {};

interface State {
    checkBoxState : boolean;
    question : String;
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

export default class QuestionBoxInsertion extends React.Component<Properties, any> {
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
                        <TextField floatingLabelText={"Pregunta a insertar"} multiLine={true} fullWidth={true} style={styles.questionTextField}/>
                        <Checkbox label="¿La pregunta tiene respuestas?" labelPosition="left" defaultChecked={this.state.checkBoxState} style={styles.answersCheckBox} onCheck={(event, checkboxNewState) => this.changeCheckboxState(event, checkboxNewState)}/>
                        <TextField value={this.state.answerA} floatingLabelText={"Respuesta A"} floatingLabelFixed={true} disabled={!this.state.checkBoxState} multiLine={true} fullWidth={true} style={styles.answerTextField.standard} onChange={(e : any) => this.setState({answerA : e.target.value})}/>
                        <TextField value={this.state.answerB} floatingLabelText={"Respuesta B"} floatingLabelFixed={true} disabled={!this.state.checkBoxState} multiLine={true} fullWidth={true} style={styles.answerTextField.standard} onChange={(e : any) => this.setState({answerB : e.target.value})}/>
                        <TextField value={this.state.answerC} floatingLabelText={"Respuesta C"} floatingLabelFixed={true} disabled={!this.state.checkBoxState} multiLine={true} fullWidth={true} style={styles.answerTextField.standard} onChange={(e : any) => this.setState({answerC : e.target.value})}/>
                        <TextField value={this.state.answerD} floatingLabelText={"Respuesta D"} floatingLabelFixed={true} disabled={!this.state.checkBoxState} multiLine={true} fullWidth={true} style={styles.answerTextField.standard} onChange={(e : any) => this.setState({answerD : e.target.value})}/>
                        <RaisedButton label="Crear pregunta" backgroundColor={"#9CCC65"} labelColor={"White"} style={styles.finishButton}/>
                    </Paper>
                </div>
            </div>
        );
    };
};
import * as React from 'react';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const paperStyle = {
    margin: '20px',
    padding: '40px 20px'
};

const buttonStyle = {
    width: '220px',
    height: '50px'
};

export const AuthBox = (props: void) => {
    return (
        <div className="row center-xs">
            <div className="col-xs-4">
                <Paper style={paperStyle} zDepth={2}>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/login">
                                <RaisedButton label="Login" buttonStyle={buttonStyle} primary={true}/>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <Link to="/signup">
                                <RaisedButton label="Signup" buttonStyle={buttonStyle} secondary={true}/>
                            </Link>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    );
};
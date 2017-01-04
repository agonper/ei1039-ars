import * as React from 'react';
import {
    Paper
} from 'material-ui';
import {CustomAppBar} from "../components/ui/custom-app-bar";

const fullSizeContainerStyle = {
    position: 'fixed',
    top: '70px',
    bottom: 0,
    left: 0,
    right: 0,
    margin: '30px'
};

export const Unavailable = (props: any) => {

    return (
        <div>
            <CustomAppBar/>
            <div style={fullSizeContainerStyle}>
                <div style={{height: '100%'}} className="row col-lg-offset-2 col-lg-8 center-xs">
                    <Paper style={{height: '100%', width: '100%'}} zDepth={2} className="row middle-xs center-xs">
                        Resource temporally unavailable
                    </Paper>
                </div>
            </div>
        </div>
    );
};
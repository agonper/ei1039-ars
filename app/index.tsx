import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import {applicationStore} from "./store";
import routes from './routes';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={applicationStore}>
        <MuiThemeProvider>
            <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('example')
);
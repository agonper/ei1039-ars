import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import {applicationStore} from "./store";
import routes from './routes';

ReactDOM.render(
    <Provider store={applicationStore}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('example')
);
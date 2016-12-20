import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo500, indigo700, lightGreen500, lightGreen400, grey900} from 'material-ui/styles/colors';

import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import { IntlProvider } from 'react-intl-redux';
import { Router, browserHistory } from 'react-router';

import * as es from 'react-intl/locale-data/es';
import * as en from 'react-intl/locale-data/en';
addLocaleData([...es, ...en]);

import {applicationStore} from "./store";
import routes from './routes/routes';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
   palette: {
       primary1Color: indigo500,
       primary2Color: indigo700,
       accent1Color: lightGreen400,
       accent2Color: lightGreen500,
       textColor: grey900
   }
});

ReactDOM.render(
    <Provider store={applicationStore}>
        <IntlProvider>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={browserHistory} routes={routes} />
            </MuiThemeProvider>
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
);
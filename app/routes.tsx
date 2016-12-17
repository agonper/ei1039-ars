import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from "./views/app";
import { MainView } from "./views/main-view";
import { Login } from "./views/login";

export default (
    <Route path="/" component={App} >
        <IndexRoute component={MainView}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Login}/>
    </Route>
);
import * as React from 'react';
import {Hello} from "../components/hello";
import {Link} from "react-router";

export default () => {
    return (
        <div>
            <Hello framework="Main" compiler="TypeScript"/>
            <Link to="/login">Login</Link>
        </div>
    );
}
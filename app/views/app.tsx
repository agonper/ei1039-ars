import * as React from 'react';

export const App =  (props: any) => {
    const PROD = process.env.NODE_ENV === 'production';
    return (
        <div>
            Server: {PROD ? 'https://uji-ars.herokuapp.com' : 'http://localhost:8080'}
            {props.children}
        </div>
    );
};
import React from "react";
import { render } from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';
import LoginForm from './loginForm.jsx';
import {AdminComponent} from './admin.jsx';

import { auth } from './auth.jsx';


function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({ 
            pathname:'/login/',
            state: {nextPathname: '/'}
        })
    }
}



render(
    <Router.Router history={browserHistory}>
        <Route path='/login' component={LoginForm} />
        <Route path='/admin' component={AdminComponent}/>
    </Router.Router>,
    document.getElementById('admin_app')
);
import React from "react";
import { render } from 'react-dom';
import { Router, Route, browserHistory, hashHistory} from 'react-router';


import Player from './player.jsx'
import LoginForm from './loginForm.jsx'
import Name from './Name.jsx'
import AdminComponent from './admin.jsx';
import { loggedIn } from './auth.jsx';

function requireAuth(nextState, replace) {
    if (!loggedIn()) {
        replace({
            pathname:'/login/',
            state: {nextPathname: '/'}
        })
    }
}



render((
    <Router history={browserHistory}>
        <Route path="/" component={ Player }/>
        <Route path="/login" url="/login" component={ LoginForm }/>
        <Route path="/name" component={ Name }/>
        <Route path='/admin' component={ AdminComponent } onEnter={requireAuth}/>
    </Router>)
, document.getElementById('app'));


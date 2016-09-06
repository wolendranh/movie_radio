// import libs
import React from "react";
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, hashHistory} from 'react-router';

// import components
import Player from './components/PlayerComponent.js';
import LoginForm from './components/LoginForm.js';
import AdminComponent from './components/AdminComponent.js';
import FooterComponent from './components/FooterComponent.js';

// import helpers
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
        <Route path="/" component={Player}>
            <IndexRoute component={FooterComponent} />
        </Route>
        <Route path="/login" url="/login" component={ LoginForm }/>
        <Route path="/admin" component={ AdminComponent } onEnter={requireAuth}/>
    </Router>)
, document.getElementById('app'));


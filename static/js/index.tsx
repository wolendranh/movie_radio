// import libs
import * as React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, hashHistory} from 'react-router';

// import components
import LandingComponent from './components/Landing';
import LoginForm from './components/LoginForm.js';
import AdminComponent from './components/AdminComponent.js';

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
        <Route path="/" component={LandingComponent}>
        </Route>
        <Route path="/login" url="/login" component={ LoginForm }/>
        <Route path="/admin" component={ AdminComponent } onEnter={requireAuth}/>
    </Router>)
, document.getElementById('app'));

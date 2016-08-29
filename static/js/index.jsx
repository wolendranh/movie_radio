// import libs
import React from "react";
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, hashHistory} from 'react-router';

// import components
import Player from './player.jsx';
import LoginForm from './loginForm.jsx';
import Name from './Name.jsx';
import AdminComponent from './admin.jsx';
import FooterComponent from './footer.jsx';

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
        <Route path="/name" component={ Name }/>
        <Route path="/admin" component={ AdminComponent } onEnter={requireAuth}/>
    </Router>)
, document.getElementById('app'));


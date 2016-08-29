import React from "react";
import { render } from 'react-dom';
import { Router, Route, browserHistory, hashHistory} from 'react-router';


import Player from './player.jsx'
import LoginForm from './loginForm.jsx'
import Name from './Name.jsx'


render((
    <Router history={browserHistory}>
        <Route path="/" component={ Player }/>
        <Route path="/login" component={ LoginForm }/>
        <Route path="/name" component={ Name }/>
    </Router>)
, document.getElementById('app'));


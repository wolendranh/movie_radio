import React from "react";
import { Router,Route,browserHistory} from 'react-router';
import {render} from 'react-dom';

import {LoginForm} from "./login.jsx";
import {AdminComponent} from "./admin.jsx";
import {Player} from "./barmaglot_player.jsx";


render((
    <Router history={browserHistory}>
        <Route  path="/" component={ Player }>
         </Route>
    </Router>
), document.getElementById('app'));


// ReactDOM.render(<App />, document.getElementById('app'));

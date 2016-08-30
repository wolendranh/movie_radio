import React from "react";
import { browserHistory} from 'react-router';
import { logout } from "./auth.jsx";


var LogoutButton = React.createClass({
    logoutHandler: function() {
        logout();
    },


   render: function () {
       return (<a className="btn btn-warning" role="button" onClick={ this.logoutHandler }>Вилогінитись</a>)
   }
});

export default LogoutButton;
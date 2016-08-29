import React from "react";
import { browserHistory} from 'react-router';
import $ from 'jquery';
import {render} from "react-dom"

import QuoteBox from "./quote.jsx";
import {logout} from "./auth.jsx"

var AdminComponent = React.createClass({
   getInitialState: function() {
        return {'user':[]}
    },

    componentDidMount: function() {
        this.loadUserData()
    },

    // contextTypes: {
    //     router: React.PropTypes.object.isRequired
    // },

    logoutHandler: function() {
        logout();
        browserHistory.push('/admin');
    },

    loadUserData: function() {
        $.ajax({
            method: 'GET',
            url: '/login',
            datatype: 'json',
            headers: {
                'Authorization': 'Token ' + localStorage.token
            },
            success: function(res) {
                this.setState({user: res})
            }.bind(this)
        })
    },


   render: function(){
       return (<div><QuoteBox url="/api/quotes" pollInterval={2000} />
               </div>)
   }
});

// render(
//   <AdminComponent />,
//   document.getElementById('quota-admin')
// );

export default AdminComponent;
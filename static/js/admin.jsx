import React from "react";
import { browserHistory} from 'react-router';
import $ from 'jquery';
import {render} from "react-dom"

import QuoteBox from "./quote.jsx";
import LogoutButton from "./logout.jsx"
import StreamAddressForm from "./streaming.jsx"

var AdminComponent = React.createClass({
   getInitialState: function() {
        return {'user':[]}
    },

    componentDidMount: function() {
        this.loadUserData()
    },

    componentWillMount: function(){
        document.body.style.backgroundColor = "white";
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
       return (<div>
                    <LogoutButton />
                    <StreamAddressForm />
                    <QuoteBox url="/api/quotes" pollInterval={2000} />
               </div>)
   }
});


export default AdminComponent;
import React from "react";
import { browserHistory} from 'react-router';
import $ from 'jquery';
import {render} from "react-dom"

import QuoteBox from "./QuoteBoxComponent.js";
import LogoutButton from "../logout.jsx"
import StreamAddressForm from "../components/StreamingForm.js"

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

    // render also rendered a Quote Component, so far we do not need it
   render: function(){
       return (<div>
                    <LogoutButton />
                    <StreamAddressForm />
               </div>)
   }
});


export default AdminComponent;
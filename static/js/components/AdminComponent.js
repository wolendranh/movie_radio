import React from "react";
import $ from 'jquery';
import {render} from "react-dom"

import QuoteBox from "./QuoteBoxComponent.js";
import LogoutButton from "../logout.jsx"
import StreamAddressForm from "../components/StreamingForm.js"

class AdminComponent extends React.Component {
   getInitialState() {
        return {'user':[]}
    }

    componentDidMount() {
        this.loadUserData()
    }

    componentWillMount(){
        document.body.style.backgroundColor = "white";
    }

    loadUserData() {
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
    }

    // render also rendered a Quote Component, so far we do not need it
   render(){
       return (<div>
                    <LogoutButton />
                    <StreamAddressForm />
               </div>)
   }
};


export default AdminComponent;
import $ from 'jquery';
import React from "react";
import { browserHistory} from 'react-router';
import {render} from "react-dom"

var self = module.exports = {
    login: function(username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true);
                return
        }
    },        
    
    logout: function() {
        delete localStorage.token;
        browserHistory.push('/login');

    },

    loggedIn: function() {
        return !!localStorage.token
    },
};

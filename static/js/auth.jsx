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
        self.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    },        
    
    logout: function() {
        delete localStorage.token;
        browserHistory.push('/login');

    },

    loggedIn: function() {
        return !!localStorage.token
    },

    getToken: function(username, pass, cb) {
        $.ajax({
            type: 'POST',
            url: '/api/get-auth-token',
            data: {
                username: username,
                password: pass
            },
            success: function(res){
                cb({
                    authenticated: true,
                    token: res.token
                })
            }
        })
    } 
};

import React from "react";
import {render} from "react-dom"

import Player from './PlayerComponent.js';
import FooterComponent from "./FooterComponent.js"

var LandingComponent = React.createClass({
    render: function(){
        return(
            <div id="landing">
                <div className="row logo-container">
                        <div className="col-xs-4">
                            <img src="https://cdn.rawgit.com/wolendranh/movie_radio/master/static/img/logo_text.png" className="logo-img img-responsive"/>
                        </div>
                </div>
                <Player/>
                <FooterComponent/>
            </div>

        )
    }
});

module.exports =  LandingComponent;
import React from "react";
import {render} from "react-dom"
import $ from "jquery";

import Player from './PlayerComponent.js';
import FooterComponent from "./FooterComponent.js"

class LandingComponent extends React.Component {

    // Remove volume bar if touch device
    componentDidMount(){
        if ((/mobile/i.test(navigator.userAgent))){
            var volumeWrapper = document.getElementsByClassName('volume-bars-wrapper')[0];
            volumeWrapper.remove();
        }

        // elems to center
        var player = $(".col-sm-4.col-sm-offset-4.shake");
        var trackInfo = $(".track-and-volume-wrapper");
        var footer = $(".footer.row-fluid");
        var pageHeight;
        var pageWidth;

        $(window).resize(function() {
            pageHeight = window.innerHeight / 2;
            pageWidth = window.innerWidth / 2;

            player.css("margin-left", pageWidth - player.innerWidth() / 2 + 20);
            player.css("top", pageHeight - (player.innerHeight() + 50));
            trackInfo.css("margin-left", pageWidth - (trackInfo.innerWidth() / 2) + 15 );
            footer.css("margin-left", pageWidth - footer.innerWidth() / 2);

        });

        $(window).trigger('resize');
    }

    render(){
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
};

module.exports =  LandingComponent;

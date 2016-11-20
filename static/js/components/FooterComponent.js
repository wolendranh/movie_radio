import React from "react";
import {render} from "react-dom"


var FooterComponent = React.createClass({
    render: function(){
        return(<footer className="footer row-fluid">
                    <div className="col-sm-4 col-sm-offset-4">
                        <div className="row">
                            <a className="social-button col-xs-4 col-sm-4 shake" href="https://www.facebook.com/barmaglot.radio" target="_blank">
                                <img src="https://rawgit.com/wolendranh/movie_radio/master/static/img/social/fb.png" className="img-responsive"></img>
                            </a>
                            <a className="social-button col-xs-4 col-sm-4 shake">
                                <img src="https://rawgit.com/wolendranh/movie_radio/master/static/img/social/mail.png" className="img-responsive center-block"></img>
                            </a>
                            <a className="social-button col-xs-4 col-sm-4 shake" href="https://vk.com/barmaglot.radio" target="_blank">
                                <img src="https://rawgit.com/wolendranh/movie_radio/master/static/img/social/vk.png" className="img-responsive pull-right"></img>
                            </a>
                        </div>
                    </div>
                </footer>)
    }
});

module.exports =  FooterComponent;
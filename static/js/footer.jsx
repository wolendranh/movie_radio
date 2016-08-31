import React from "react";
import {render} from "react-dom"


var FooterComponent = React.createClass({
    render: function(){
        return(<footer className="footer row-fluid">
                    <div className="col-sm-4 col-sm-offset-4">
                        <div className="row">
                            <div className="social-button col-xs-4 col-sm-4 shake">
                                <img src="https://rawgit.com/wolendranh/movie_radio/master/static/img/social/fb.png" className="img-responsive"></img>
                            </div>
                            <div className="social-button col-xs-4 col-sm-4 shake">
                                <img src="https://rawgit.com/wolendranh/movie_radio/master/static/img/social/mail.png" className="img-responsive center-block"></img>
                            </div>
                            <div className="social-button col-xs-4 col-sm-4 shake">
                                <img src="https://rawgit.com/wolendranh/movie_radio/master/static/img/social/vk.png" className="img-responsive pull-right"></img>
                            </div>
                        </div>
                    </div>
                </footer>)
    }
});

export default FooterComponent;
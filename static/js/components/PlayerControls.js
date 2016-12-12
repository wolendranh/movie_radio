import {render} from 'react-dom';
import React from 'react';
import $ from 'jquery';


var Controls = React.createClass({

  componentDidMount: function () {

        $('.shake').hover(
          function(){
            $(this).removeClass('finish-animation');
          }
        );

        $('.shake').mouseleave("mouseleave", function () {
            $(this).addClass('finish-animation');
        });
  },


  getInitialState: function() {
      return { showPause: false, showPlay: true , src: ''};
  },
  displayPause: function(e){
    this.setState({ showPause: true , showPlay: false });
    var player = this.props.getPlayerRef();
    if(this.state.src != ''){
        player.src = this.state.src;
    }
    player.play();
  },
  displayPlay: function(e){
    var player = this.props.getPlayerRef();
    // save current source to imitate Stop as browser API will literally 'pause' stream
    this.setState({ showPause: false , showPlay: true, src: player.src});
    player.src = '';
    player.pause();
  },
  render: function() {
    return (
      <div className="row player-controlls">
              <div className="col-sm-4 col-sm-offset-4 shake">
                  { this.state.showPlay ?
                      <div className="clickable-player-area play" onClick={this.displayPause }>
                        <div className="playback-play center-block"></div>
                      </div>
                  : null }


                  { this.state.showPause ?
                      <div className="clickable-player-area pause" onClick={ this.displayPlay }>
                        <div className="playback-pause center-block"></div>
                      </div>
                  : null }
              </div>
      </div>
    )
  }
});


export default Controls;
import {render} from 'react-dom';
import React from 'react';

var Controls = React.createClass({
  getInitialState: function() {
      return { showPause: false, showPlay: true };
  },
  displayPause: function(e){
    this.setState({ showPause: true , showPlay: false });
    var player = this.props.getPlayerRef();
    player.play();
  },
  displayPlay: function(e){
    this.setState({ showPause: false , showPlay: true });
    var player = this.props.getPlayerRef();
    player.pause();
  },
  render: function() {
    return (
      <div className="row player-controlls">
              <div className="col-sm-4 col-sm-offset-4 shake">
                  { this.state.showPause ? <div onClick={this.displayPlay } className="playback-pause center-block"></div> : null }

                  { this.state.showPlay ? <div onClick={ this.displayPause } className="playback-play center-block"></div> : null }
              </div>
      </div>
    )
  }
});


export default Controls;
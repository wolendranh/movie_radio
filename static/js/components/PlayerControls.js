import {render} from 'react-dom';
import React from 'react';

var Controls = React.createClass({
  getInitialState: function() {
      return { showPause: false, showPlay: true };
  },
  displayPause: function(e){
      console.log('pause');
    this.setState({ showPause: true , showPlay: false });
    var player = this.props.getPlayerRef();
    player.play();
  },
  displayPlay: function(e){
      console.log('play');
    this.setState({ showPause: false , showPlay: true });
    var player = this.props.getPlayerRef();
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
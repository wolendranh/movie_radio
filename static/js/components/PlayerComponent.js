import {render} from 'react-dom';
import React from 'react';

import PlayerStore from "../stores/PlayerStore.js"
import PlayerActions from "../actions/PlayerActions.js"
import Controls from "./PlayerControls.js"
import Volume from "./PlayerVolume.js"
import FooterComponent from "./FooterComponent.js"

// TODO: fix filters
import {scheduleFilters} from "../filters.js"

function getActiveStream() {
  return PlayerStore.getActive()
}

function getCurrentTrack(){
    "use strict";
    return PlayerStore.getTrack()
}


var Player = React.createClass({

    componentDidMount: function() {
        PlayerStore.addChangeListener(this._onChange);
        PlayerStore.addTrackListener(this._onTrackUpdate);
        this.refs.audio.volume = 0.4;
        PlayerActions.get();
        scheduleFilters();
        setInterval(PlayerActions.getTrack, 3000);
    },

    componentWillUnmount: function() {
        PlayerStore.removeChangeListener(this._onChange);
        PlayerStore.removeTrackListener(this._onTrackUpdate);
    },

    getInitialState: function() {
        return {
          currentSong: 'Barmaglot ...',
          stream: getActiveStream()
        }
    },

    _onTrackUpdate: function (){
        "use strict";
        var track = getCurrentTrack();
        if (track != null){
            this.setState({currentSong: track});
        }else{
            this.setState({currentSong: 'Barmaglot ...'})
        }

    },
    
    _onChange: function() {
        this.setState({
            stream: getActiveStream()
        });
        this.loadPlayer();
    },

  getDefaultProps: function() {
    // sets default array of props
    return {
      volume: 0.4,
      currentSong: '...'
    };
  },

  setVolume: function(volume){
    // get reference of player to bypass it to child components if needed
    this.refs.audio.volume = volume;
  },

  getVolume: function() {
    if (typeof this.refs.audio != "undefined"){
      return this.refs.audio.volume;
    } else {
      return this.props.volume;
    }
  },

  loadPlayer: function () {
    var audio = this.getPlayer();
    audio.load();
  },

  getPlayer: function(){
    return this.refs.audio;
  },

  render: function() {
    return (
          <div>
              <Controls getPlayerRef={ this.getPlayer }/>
              <div className="row player-container">
                  <div className="col-sm-4 col-sm-offset-4 player">
                      <audio id="barmaglot-player" preload="none" ref="audio">
                          <source src={ this.state.stream.stream_ip } type="audio/mpeg"/>
                      </audio>
                  </div>
                  <Volume setVolumeHandle={ this.setVolume } song={ this.state.currentSong } getVolumeHandle={ this.getVolume }/>
              </div>
              <span>{this.props.children || <FooterComponent/>}</span>
          </div>

    )
  }
});

export default Player;
import {render} from 'react-dom';
import React from 'react';

import PlayerStore from "../stores/PlayerStore.js"
import PlayerActions from "../actions/PlayerActions.js"
import Controls from "./PlayerControls.js"
import Volume from "./PlayerVolume.js"
import FooterComponent from "./FooterComponent.js"

// TODO: fix filters
import {triggerChange} from "../filters.js"


// define variable that will indicate if this is 'reload' of page or AJAX call
var FIRST_LOAD = false;


function getActiveStream() {
  return PlayerStore.getActive()
}

function getCurrentTrack(){
    "use strict";
    return PlayerStore.getTrack()
}

function getCurrentDatetime(){
    "use strict";
    return PlayerStore.getDaytime()
}


var Player = React.createClass({

    componentDidMount: function() {
        PlayerStore.addChangeListener(this._onChange);
        PlayerStore.addTrackListener(this._onTrackUpdate);
        this.refs.audio.volume = 0.4;

        // component if mounted only one time so we can assume that it is 'initial'
        // load of page
        FIRST_LOAD = true;

        PlayerActions.get();

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
        var dayTime = getCurrentDatetime();

        // triggering change of filters(filter module will decide himself weather it is needed or not)
        triggerChange(dayTime, FIRST_LOAD);
        FIRST_LOAD = false;

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
                      <audio id="barmaglot-player" preload="none" ref="audio" src={ this.state.stream.stream_ip }>
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
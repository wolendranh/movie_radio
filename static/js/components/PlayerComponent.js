import {render} from 'react-dom';
import React from 'react';

import PlayerStore from "../stores/PlayerStore.js"
import PlayerActions from "../actions/PlayerActions.js"
import Controls from "./PlayerControls.js"
import Volume from "./PlayerVolume.js"
import FooterComponent from "./FooterComponent.js"


import { schedule } from '../time.js';

function getActiveStream() {
  return PlayerStore.getActive()
}


var Player = React.createClass({

  componentDidMount: function() {
    PlayerStore.addChangeListener(this._onChange);
    this.refs.audio.volume = 0.4;
    PlayerActions.get();
    this.mountEventStream();
    schedule();
  },
    componentWillUnmount: function() {
        PlayerStore.removeChangeListener(this._onChange);
    },

  getInitialState: function() {
      return {
          currentSong: 'Barmaglot ...',
          stream: getActiveStream()
      }
  },

  _onChange: function() {
    this.setState({
        stream: getActiveStream()
    });
    this.loadPlayer();
   },

  updateSong: function(f, e){
      this.setState({currentSong: f.data})

  },

  getDefaultProps: function() {
    // sets default array of props
    return {
      volume: 0.4,
      currentSong: '...'
    };
  },

  // TODO: remove ugly "bind this" workarounds and move to arrow functions
  mountEventStream: function(){
    var eventSource = new EventSource("/api/track_stream");
    var that = this;

    var makeListener = function(f) {
        return {
            handleEvent: f
          };
        };

    eventSource.addEventListener("track_update", makeListener(this.updateSong));

    eventSource.onerror = function(event){
        console.log(event);
    }
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
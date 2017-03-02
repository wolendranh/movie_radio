import {render} from 'react-dom';
import React from 'react';
import $ from 'jquery';
import Spinner from 'spin';

import PlayerStore from "../stores/PlayerStore.js"
import PlayerActions from "../actions/PlayerActions.js"
import Controls from "./PlayerControls.js"
import Volume from "./PlayerVolume.js"


// TODO: fix filters
// import {triggerChange} from "../filters.js"


// define variable that will indicate if this is 'reload' of page or AJAX call
var FIRST_LOAD;


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

function emitPlayerCanPlay(){
    "use strict";
    PlayerActions.canPlay();
}

function emitPlayerPlay(){
    "use strict";
    PlayerActions.play();
}


var Player = React.createClass({
    getInitialState: function() {
        return {
            currentSong: 'Barmaglot ...',
            stream: getActiveStream(),
            spinnerActive: false
        }
    },
    
    
    componentDidMount: function() {
        PlayerStore.addChangeListener(this._onChange);
        PlayerStore.addTrackListener(this._onTrackUpdate);
        // start volume is set to max on start
        this.refs.audio.volume = 1;

        // component if mounted only one time so we can assume that it is 'initial'
        // load of page
        var dayTime = $('body').attr('class');

        // triggerChange(dayTime, true);
        FIRST_LOAD = false;
        PlayerActions.get();

        setInterval(PlayerActions.getTrack, 3000);

        // invoke spinner
        this.controlSpinner();

    },

    handlePlayEvent: function(evt){
        emitPlayerPlay();
        if ((/mobile/i.test(navigator.userAgent))){
            return true
        }else{
            this.spinner.spin(document.getElementById('spin-player'));
        }

    },
    handleCanPlayEvent: function(evt){
        emitPlayerCanPlay();
        if ((/mobile/i.test(navigator.userAgent))){
            return true
        }else {
            this.spinner.stop(document.getElementById('spin-player'));
        }

    },
    controlSpinner: function(){
        var player = this.getPlayer();
        var opts = {
            shadow: true,
            radius: 25,
            width: 11,
            trail: 100,
            length: 28,
            lines: 13,
            color: '#FFFFFF',
            opacity: 0.5,
            scale: 1
        };
        this.spinner = new Spinner(opts);

        player.addEventListener('play', evt => this.handlePlayEvent(evt));
        player.addEventListener('canplay', evt => this.handleCanPlayEvent(evt));
    },

    componentWillUnmount: function() {
        PlayerStore.removeChangeListener(this._onChange);
        PlayerStore.removeTrackListener(this._onTrackUpdate);
    },
    

    _onTrackUpdate: function (){
        "use strict";
        var track = getCurrentTrack();
        var dayTime = getCurrentDatetime();

        // triggering change of filters(filter module will decide himself weather it is needed or not)
        // triggerChange(dayTime, FIRST_LOAD);
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
        if ((/mobile/i.test(navigator.userAgent))) {
            this.loadPlayer();
        }
    },

  getDefaultProps: function() {
    // sets default array of props
    return {
      volume: 1,
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
              
          </div>

    )
  }
});

module.exports =  Player;
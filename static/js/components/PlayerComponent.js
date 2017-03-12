import {render, findDOMNode} from 'react-dom';
import React from 'react';
import $ from 'jquery';
import Spinner from 'spin';

import PlayerStore from "../stores/PlayerStore.js"
import PlayerActions from "../actions/PlayerActions.js"
import Controls from "./PlayerControls.js"
import Volume from "./PlayerVolume.js"


// TODO: fix filters
import {triggerChange} from "../filters.js"


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

class Audio extends React.Component {
  render(){
    return (
      <audio
        id="barmaglot-player"
        preload="none"
        src={ this.props.stream.stream_ip }>
         </audio>
    )
  }
}


class Player extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        currentSong: 'Barmaglot ...',
        stream: getActiveStream(),
        spinnerActive: false
      };
      this.setVolume = this.setVolume.bind(this);
      this._onTrackUpdate = this._onTrackUpdate.bind(this);
      this._onChange = this._onChange.bind(this);

    }


    componentDidMount() {
        PlayerStore.addChangeListener(this._onChange);
        PlayerStore.addTrackListener(this._onTrackUpdate);
        // start volume is set to max on start
        this.player = this.getPlayer()
        this.player.volume = 1;

        // component if mounted only one time so we can assume that it is 'initial'
        // load of page
        var dayTime = $('body').attr('class');

        triggerChange(dayTime, true);
        FIRST_LOAD = false;
        PlayerActions.get();

        setInterval(PlayerActions.getTrack, 3000);

        // invoke spinner
        this.controlSpinner();

    }

    handlePlayEvent(evt){
        emitPlayerPlay();
        if ((/mobile/i.test(navigator.userAgent))){
            return true
        }else{
            this.spinner.spin(document.getElementById('spin-player'));
        }

    }
    handleCanPlayEvent(evt){
        emitPlayerCanPlay();
        if ((/mobile/i.test(navigator.userAgent))){
            return true
        }else {
            this.spinner.stop(document.getElementById('spin-player'));
        }

    }
    controlSpinner(){
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
    }

    componentWillUnmount() {
        PlayerStore.removeChangeListener(this._onChange);
        PlayerStore.removeTrackListener(this._onTrackUpdate);
    }


    _onTrackUpdate(){
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

    }

    _onChange() {
        this.setState({
            stream: getActiveStream()
        });
        if ((/mobile/i.test(navigator.userAgent))) {
            this.loadPlayer();
        }
    }

  setVolume(volume){
    // get reference of player to bypass it to child components if needed
    this.player.volume = volume;
  }

  getVolume() {
    if (typeof this.player != "undefined"){
      return this.player.volume;
    } else {
      return this.props.volume;
    }
  }

  loadPlayer() {
    var audio = this.getPlayer();
    audio.load();
  }

  getPlayer = () => {
    return findDOMNode(this.audio);
  }

  render() {
    return (
          <div>
              <Controls getPlayerRef={ this.getPlayer }/>
              <div className="row player-container">
                  <div className="col-sm-4 col-sm-offset-4 player">
                      <Audio stream={ this.state.stream } ref={(audio) => this.audio = audio }/>
                  </div>
                  <Volume setVolumeHandle={ this.setVolume } song={ this.state.currentSong } getVolumeHandle={ this.getVolume }/>
              </div>

          </div>

    )
  }
};

Player.defaultProps = {
  volume: 1,
  currentSong: '...'
};

module.exports =  Player;

import {render} from 'react-dom';
import React from 'react';
import PlayerStore from "./stores/PlayerStore.js"
import PlayerActions from "./actions/PlayerActions.js"

function getActiveStream() {
  return PlayerStore.getActive()
}



var Player = React.createClass({

  componentDidMount: function() {
    PlayerStore.addChangeListener(this._onChange);
    this.refs.audio.volume = 0.4;
    PlayerActions.get();
    this.mountEventStream();
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

  testMe: function(f, e){
      console.log(e);
      this.setState({currentSong: f.data})

  },

  getDefaultProps: function() {
    // sets default array of props
    return {
      volume: 0.4,
      currentSong: '...'
    };
  },

  mountEventStream: function(){
    var eventSource = new EventSource("/api/track_stream");
    var that = this;

    eventSource.onmessage = function (event, shit) {
      console.log(event, shit)
    };

    var makeListener = function(f) {
        return {
            handleEvent: f
          };
        };

    eventSource.addEventListener("track_update", makeListener(this.testMe));

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

var Volume = React.createClass({

  propTypes: {
      classes: React.PropTypes.array,
      volumes: React.PropTypes.object
  },

  getDefaultProps: function() {
    // sets default array of props
    return {
      classes: ['one', 'two', 'three', 'four', 'five'],
      volumes: {'one': 0.2, 'two': 0.4, 'three': 0.6, 'four': 0.8, 'five': 1}
    };
  },

  soundHandler: function(bar, event) {
    var soundValue = this.props.volumes[bar];
    // call method of parent component (Player)
    this.props.setVolumeHandle(soundValue);
    this.forceUpdate();
  },

  getClass: function(i){
      var volume = this.props.getVolumeHandle();
      var barVolume = this.props.volumes[i];
      if (barVolume <= volume){
        return 'volume-bar red ' + i;
      }
      return 'volume-bar ' + i;

  },

  render: function () {

    var _this = this, bars = this.props.classes.map(function(i) {
      return <div onClick={ _this.soundHandler.bind(event, i) } className={ _this.getClass(i)}></div>;
    });

    return (
    <div className="track-and-volume-wrapper">

        <div className="trackInfoWrapper">
            <div className="trackInfo marquee">
                   <p className="current-song">{this.props.song }</p>
            </div>
        </div>

        <div className="volume-bars-wrapper">
            <div className="volume-bars">
              {bars}
            </div>
        </div>

    </div>
    )
  }
});

export default Player;
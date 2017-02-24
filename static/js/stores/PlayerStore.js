import $ from 'jquery';
import EventEmitter from 'events';

import AppDispatcher from "../dispatcher/AppDispatcher.js";
import constants from "../constants/PlayerConstants.js";

var CHANGE_EVENT = 'player_change';
var TRACK_UPDATE_EVENT = 'track_update';
var PLAYER_CAN_PLAY = 'player_can_play';
var PLAYER_PLAY = 'player_play';

// variable that will hold active stream
var _stream = '';
var _track = '';
var _datetime = null;

/**
 * Fetches one stream from database which is currently active
 * 
 */
function fetchOneStream(){
    "use strict";
    $.ajax({
      url: '/api/stream',
      type: 'GET',
      success: function(data) {
        _stream = data.stream
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.route.url, status, err.toString());
      },
      // hack to emit only after ajax was completer TODO: think about promises
      complete: function(){
          // fire change event
          PlayerStore.emitChange();
      }
    });
    
}


function fetchTrack(){
    "use strict";
    $.ajax({
      url: '/api/track_info',
      type: 'GET',
      success: function(data) {
        _track = data.track;
        _datetime = data.datetime;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.route.url, status, err.toString());
      },
      complete: function(){
          // fire change event
          PlayerStore.emitTrackUpdate();
      }
    });
    
}


function storeEmitCanPlay(){
    "use strict";
    PlayerStore.emitCanPlay()
}

function storeEmitPlay(){
    "use strict";
    PlayerStore.emitPlay()
}


/**
 * Stream store class that is inherited from node JS EventEmitter
 * to be able to emit events
*/
class PlayerStoreBaseClass extends EventEmitter {
  /**
   * Get the active stream of streams.
   * @return {object}
   */
  getActive() {
    return _stream;
  }
    
  getTrack() {
    return _track;
  }
  
  getDaytime() {
    return _datetime;   
  }  

  /**
   * Emit change to give ability to do some actions after subscribing for it
   * @return {object}
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
    
  emitTrackUpdate(){
      this.emit(TRACK_UPDATE_EVENT);
  }

  emitCanPlay(){
      this.emit(PLAYER_CAN_PLAY);
  }

  emitPlay(){
      this.emit(PLAYER_PLAY);
  }

  /**
   * Subscribe for 'change-event'
   * @param {function} callback
   */
  addTrackListener(callback) {
    this.on(TRACK_UPDATE_EVENT, callback);
  }

  /**
   * * Un subscribe from 'change-event'
   * @param {function} callback
   */
  removeTrackListener(callback) {
    this.removeListener(TRACK_UPDATE_EVENT, callback);
  }
    
    
  /**
   * Subscribe for 'change-event'
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * * Un subscribe from 'change-event'
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
    
  /**
   * Subscribe for 'can-play' event
   * @param {function} callback
   */
  addCanPlayListener(callback) {
    this.on(PLAYER_CAN_PLAY, callback);
  }
  /**
   * * Un subscribe from 'can-play'
   * @param {function} callback
   */    
  removeCanPlayListener(callback) {
    this.removeListener(PLAYER_CAN_PLAY, callback);
  }    

  /**
   * * Un subscribe from 'play' event
   * @param {function} callback
   */
  addPlayListener(callback) {
    this.on(PLAYER_PLAY, callback);
  }    
  /**
   * * Un subscribe from 'play'
   * @param {function} callback
   */
  removePlayListener(callback) {
    this.removeListener(PLAYER_CAN_PLAY, callback);
  }        
    
}

// create new instance of store
const PlayerStore = new PlayerStoreBaseClass();

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case constants.PLAYER_GET_STREAM:
            fetchOneStream();
            break;
        case constants.PLAYER_GET_TRACK:
            fetchTrack();
            break;
        case constants.PLAYER_CAN_PLAY:
            storeEmitCanPlay();
            break;
        case constants.PLAYER_PLAY:
            storeEmitPlay();
            break;
            
    }
});

export default PlayerStore;
import $ from 'jquery';
import EventEmitter from 'events';

import AppDispatcher from "../dispatcher/AppDispatcher.js";
import constants from "../constants/PlayerConstants.js";

var CHANGE_EVENT = 'player_change';
var TRACK_UPDATE_EVENT = 'track_update';

// variable that will hold active stream
var _stream = '';
var _track = '';

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
        _track = data.track
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
            
    }
});

export default PlayerStore;
import $ from 'jquery';
import EventEmitter from 'events';

import AppDispatcher from "../dispatcher/AppDispatcher.js";
import constants from "../constants/PlayerConstants.js";

var CHANGE_EVENT = 'player_change';

// variable that will hold active stream
var _stream = '';

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

  /**
   * Emit change to give ability to do some actions after subscribing for it
   * @return {object}
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
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
    }
});

export default PlayerStore;
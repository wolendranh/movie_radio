import $ from 'jquery';
import EventEmitter from 'events';

import AppDispatcher from "../dispatcher/AppDispatcher.js";
import constants from "../constants/StreamConstants.js";

var CHANGE_EVENT = 'change';

var _actions = {};

/**
 * Create a Stream item.
 * @param  {string} host_address address of host from where stream will come
 * @param  {string} active indicate if stream is active
 * @param  {string} description small notes about tye of stream
 */

function create(host_address, active, description) {
    $.ajax({
      url: '/api/streams',
      type: 'POST',
      data: {
            stream_ip: host_address,
            active: active,
            description: description

      },
      success: function(data) {
          _actions[data.stream._id.$oid] = {
              id: data.stream._id.$oid,
              stream_ip: data.stream.stream_ip,
              active: data.stream.active,
              description: data.stream.description
          };
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.route.url, status, err.toString());
      },
      // hack to emit only after ajax was completer TODO: think about promises
      complete: function(){
          StreamStore.emitChange();
      }
    });
}


function remove(stream_id){
    "use strict";
    $.ajax({
      url: '/api/streams',
      type: 'DELETE',
      data: {
          stream_id: stream_id
      },
      success: function(data) {
         delete _actions[stream_id];
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.route.url, status, err.toString());
      },
      // hack to emit only after ajax was completer TODO: think about promises
      complete: function(){
          StreamStore.emitChange();
      }
    });
}

function fetch(){
    "use strict";
    $.ajax({
      url: '/api/streams',
      type: 'GET',
      success: function(data) {
          data.streams.map(function(stream){
              _actions[stream._id.$oid] = {
                  id: stream._id.$oid,
                  stream_ip: stream.stream_ip,
                  active: stream.active,
                  description: stream.description
              }
          })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.route.url, status, err.toString());
      },
      // hack to emit only after ajax was completer TODO: think about promises
      complete: function(){
          StreamStore.emitChange();
      }
    });
}

/**
 * Stream store class that is ingerited from node JS EventEmitter
 * to be able to emit events
*/
class StreamStoreBaseClass extends EventEmitter {
  /**
   * Get the entire collection of streams.
   * @return {object}
   */
  getAll() {
    return _actions;
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
const StreamStore = new StreamStoreBaseClass();

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var host_address,
        active,
        description;

    switch (action.actionType) {
        case constants.STREAM_CREATE:
            host_address = action.host_address.trim();
            active = action.active;
            description = action.description.trim();
            if (host_address !== '') {
                create(host_address, active, description);
            }
            break;
        case constants.STREAM_FETCH:
            fetch();
            break;
        case constants.STREAM_DELETE:
            remove(action._id);
            break;
    }
});

export default StreamStore;
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
 */

function create(host_address, active) {
    $.ajax({
      url: '/api/streams',
      type: 'POST',
      data: {
            stream_ip: host_address,
            active: active

      },
      success: function(data) {
          _actions[data.stream._id.$oid] = {
              id: data.stream._id.$oid,
              stream_ip: data.stream.stream_ip,
              active: data.stream.active
          }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.route.url, status, err.toString());
      }
    });
}

class StreamStoreBaseClass extends EventEmitter {
  /**
   * Get the entire collection of streams.
   * @return {object}
   */
  getAll() {
    return _actions;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const StreamStore = new StreamStoreBaseClass();

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var host_address,
        active;

    switch (action.actionType) {
        case constants.STREAM_CREATE:
            host_address = action.host_address.trim();
            active = action.active.trim();
            if (host_address !== '') {
                create(host_address, active);
                StreamStore.emitChange();
            }
            break;
    }
});

export default StreamStore;
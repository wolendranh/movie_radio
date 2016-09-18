import $ from 'jquery';
import EventEmitter from 'events';

import AppDispatcher from "../dispatcher/AppDispatcher.js";
import constants from "../constants/FilterConstants.js";

var CHANGE_EVENT = 'change';


/**
 * Stream store class that is inherited from node JS EventEmitter
 * to be able to emit events
*/
class FilterStoreBaseClass extends EventEmitter {

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
const FilterStore = new FilterStoreBaseClass();

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch (action.actionType) {
        case constants.FILTER_UPDATE:

    }
});

export default FilterStore;
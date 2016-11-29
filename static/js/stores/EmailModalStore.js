import $ from 'jquery';
import EventEmitter from 'events';

import AppDispatcher from "../dispatcher/AppDispatcher.js";
import constants from "../constants/EmailModalConstants.js";

var CHANGE_EVENT = 'change';

/**
 * 
 * @param {string} senderEmail email address
 * @param {string} body email body
 */
function sendMessage(senderEmail, body) {
    $.ajax({
      url: '/api/feedback',
      type: 'POST',
      data: {
            sender_email: senderEmail,
            body: body
      },
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.route.url, status, err.toString());
      },
      complete: function(){
      }
    });
}



/**
 * Email Modal Store class that is inherited from node JS EventEmitter
 * to be able to emit events
*/
class EmailModalStoreBaseClass extends EventEmitter {

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
   * Un subscribe from 'change-event'
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

// create new instance of store
const EmailStore = new EmailModalStoreBaseClass();

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var senderEmail,
        body;
    switch (action.actionType) {

        case constants.SUBMIT_MAIL:
            if(action.senderEmail){
                senderEmail = action.senderEmail.trim();
            }
            else{
                // it is possible that sender will not set his name
                senderEmail = null;
            }
            body = action.body.trim();
            sendMessage(senderEmail, body);
            break;
    }
});


module.exports = EmailStore;
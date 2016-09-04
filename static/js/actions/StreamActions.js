import AppDispatcher from "../dispatcher/AppDispatcher.js"
import StreamConstants from "../constants/StreamConstants.js"

var StreamActions = {

  /**
   * Dispatch an create type event using Dispatcher
   * @param  {string} host_address
   * @param  {string} active
   */
  create: function(host_address, active) {
    AppDispatcher.dispatch({
      actionType: StreamConstants.STREAM_CREATE,
      host_address: host_address,
      active: active
    });
  },

  delete: function (_id) {
    AppDispatcher.dispatch({
        actionType: StreamConstants.STREAM_DELETE,
        _id: _id
    })
  },
  
  fetch: function () {
    AppDispatcher.dispatch({
      actionType: StreamConstants.STREAM_FETCH
    })
    
  }

};


export default StreamActions;
import AppDispatcher from "../dispatcher/AppDispatcher.js"
import PlayerConstants from "../constants/PlayerConstants.js"

var PlayerActions = {

  /**
   * Dispatch get action that should invoke call to DB for an active stream
   */
  get: function() {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_GET_STREAM
    });
  },
  
  getTrack: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_GET_TRACK
    });    
  }
};


export default PlayerActions;
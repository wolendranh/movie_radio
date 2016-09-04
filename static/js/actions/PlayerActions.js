import AppDispatcher from "../dispatcher/AppDispatcher.js"
import PlayerConstants from "../constants/PlayerConstants.js"

var PlayerActions = {

  /**
   *
   */
  get: function() {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_GET_STREAM
    });
  }
};


export default PlayerActions;
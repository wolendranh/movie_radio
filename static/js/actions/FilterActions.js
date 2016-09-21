import AppDispatcher from "../dispatcher/AppDispatcher.js"
import FilterConstants from "../constants/FilterConstants.js"

var FilterActions = {

  /**
   * 
   */
  update: function() {
    AppDispatcher.dispatch({
      actionType: FilterConstants.FILTER_UPDATE
    });
  }
};


export default FilterActions;
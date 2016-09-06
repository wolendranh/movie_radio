import React from "react";
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var StreamTextInput = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || '',
      active: this.props.active || ''
    };
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
        <div>
        <input
            className={this.props.className}
            id={this.props.id}
            placeholder={this.props.placeholder}
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            value={this.state.value}
            autoFocus={true}
        />
        <input type="checkbox"
            className={this.props.className}
            onChange={this._onChangeActive}
            autoFocus={true}
            checked={this.state.active}
        />
        <input type="textarea"
            className={this.props.className}
            onChange={this._onChangeDescription}
            autoFocus={true}
            checked={this.state.description}
        />
        </div>
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    this.props.onSave(this.state.value, this.state.active, this.state.description);
    this.setState({
      value: '',
      active: '',
      description: ''
    });
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  },

  _onChangeActive: function (event) {
    this.setState({
      active: event.target.checked
    })
  },

  _onChangeDescription: function (event) {
    this.setState({
      description: event.target.value
    })
  },


  /**
   * @param  {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

export default StreamTextInput;

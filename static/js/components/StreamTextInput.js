import React from "react";
import {
    Button,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Checkbox
} from 'react-bootstrap';

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
      active: this.props.active || false
    };
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
        <div>
          <form>
            <FormGroup controlId="formInlineEmail">
                <FormControl
                    className={this.props.className}
                    id={this.props.id}
                    onChange={this._onChange}
                    type="text"
                    placeholder="stream"
                    onKeyDown={this._onKeyDown}
                    value={this.state.value}
                />
                <HelpBlock>enter stream</HelpBlock>
                <Checkbox
                    checked={this.state.active}
                    onChange={this._onChangeActive}>
                    Active?
                </Checkbox>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                  componentClass="textarea"
                  onChange={this._onChangeDescription}
                  checked={this.state.description}
                  placeholder="stream description" />
            </FormGroup>
          </form>
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

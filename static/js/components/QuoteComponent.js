import React from "react";
import Remarkable from "remarkable";


var Quote = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  updateSwitch: function(event) {
    event.target.checked = true;
  },
  render: function() {
    return (
      <div className="quote">
        <h2 className="quote">
          {this.props.text}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
            <div id="toggles">
              <input type="checkbox" name="checkbox1" id="checkbox1" onChange={this.updateSwitch} className="ios-toggle"/>
              <label for="checkbox1" className="checkbox-label" data-off="off" data-on="on">

              </label>

              <input type="checkbox" name="checkbox1" id="checkbox2" className="ios-toggle" defaultChecked="false"/>
              <label for="checkbox2" className="checkbox-label" data-off="no" data-on="yes">

              </label>

              <input type="checkbox" name="checkbox1" id="checkbox3" className="ios-toggle" defaultChecked="false"/>
              <label for="checkbox3" className="checkbox-label" data-off="longer label off" data-on="longer label on">

              </label>
            </div>
      </div>
    );
  }
});

export default Quote;
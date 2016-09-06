import React from "react";

var QuoteForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onQuoteSubmit({text: text});
    this.setState({text: ''});
  },
  render: function() {
    return (
        <div className="col-md-4">
          <form className="form-horizontal" method="post" role="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                      <label for="text" className="col-md-2 control-label">Text</label>

                      <div className="col-md col-md-10">
                        <textarea className="form-control"
                                  value={this.state.text}
                                  onChange={this.handleTextChange}
                                  id="text"
                                  name="text"></textarea>
                      </div>

                      <div className="form-group">
                          <div className="col-md-offset-2 col-md-10 submit-row">
                                  <input type="submit" className="btn btn-primary" value="Save"/>
                                  <a href="/admin/quote" className="btn btn-danger" role="button">Cancel</a>
                           </div>
                      </div>
              </div>
          </form>
        </div>
    );
  }
});


export default QuoteForm;
import React from "react";

import Quote from "./QuoteComponent.js"

var QuoteList = React.createClass({
  render: function() {
    var quoteNodes = this.props.data.map(function(quote) {
      return (
        <Quote key={quote.id}>
          {quote.text}
        </Quote>
      );
    });
    return (
      <div className="quoteList col-md-8">
        {quoteNodes}
      </div>
    );
  }
});

export default QuoteList;
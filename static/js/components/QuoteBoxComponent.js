import React from 'react';
import $ from 'jquery';

import QuoteList from "./QuoteListComponent.js"
import QuoteForm from "./QuoteFormComponent.js"

var QuoteBox = React.createClass({
  loadQuotesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.quotes});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleQuoteSubmit: function(quote) {
    var quotes = this.state.data;

    // set generated date. later on replace this shit

    quote.id = Date.now();
    var newQuote = quotes.concat([quote]);
    this.setState({data: newQuote});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: quote,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: quotes});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    // this.loadQuotesFromServer();
    // setInterval(this.loadQuotesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="quoteBox">
        <h1>Quotes</h1>
        <QuoteList data={this.state.data} />
        <QuoteForm onQuoteSubmit={this.handleQuoteSubmit} />
      </div>
    );
  }
});

export default QuoteBox;
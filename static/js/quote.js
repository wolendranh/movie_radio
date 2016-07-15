var Quote = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="quote">
        <h2 className="quote">
          {this.props.text}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});


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
    this.loadQuotesFromServer();
    setInterval(this.loadQuotesFromServer, this.props.pollInterval);
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

ReactDOM.render(
  <QuoteBox url="/api/quotes" pollInterval={2000} />,
  document.getElementById('quote-wrap')
);
import React from "react";
import { browserHistory} from 'react-router';
import $ from 'jquery';


var StreamAddressForm = React.createClass({
    getInitialState: function() {
        return {stream_ip: '',
                active: false,
                streams: []};
    },

    handleTextChange: function(e) {
        this.setState({stream_ip: e.target.value});
    },

    handleActiveChange: function(e) {
        this.setState({ active: e.target.checked});
    },


    handleSubmit: function(e){
        e.preventDefault();
        var self = this;
        $.ajax({
          url: '/api/streams',
          type: 'POST',
          data: {
                stream_ip: this.state.stream_ip.trim(),
                active: this.state.active

          },
          success: function(data) {
              this.refs.child.loadStreams();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.route.url, status, err.toString());
          }
        });
    },


    render: function () {
       return (
           <div>
            <form method="post" role="form" onSubmit={this.handleSubmit}>
                <input type="text" name="stream_ip"
                    required
                    // pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                    // title='Будь ласка, введіть валідну IP адресу!'
                    value={ this.state.stream_ip }
                    onChange={this.handleTextChange}

                >
                </input>
                <input type="checkbox" name="active"
                    value={ this.state.active }
                    onChange={this.handleActiveChange}>
                </input>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
           <StreamList/>
           </div>
       )
    }
});


export default StreamAddressForm;


var StreamList = React.createClass({
    getInitialState: function() {
        return {streams: []};
    },

    componentDidMount: function() {
        this.loadStreams();
    },
    loadStreams: function(){
        "use strict";
        $.ajax({
          url: '/api/streams',
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({streams: data.streams});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(status, err.toString());
          }.bind(this)
        });
    },

    render: function() {
        var streamsNodes = this.state.streams.map(function (stream) {
            return (
                <Stream stream_ip={ stream.stream_ip } >
                </Stream>
            );
        });
        return (
            <div className="quoteList col-md-8">
                {streamsNodes}
            </div>
        );
    }
});

var Stream = React.createClass({
   render: function() {
       return (
           <div>
               <span>{ this.props.stream_ip }</span>
           </div>
       )
   }
});
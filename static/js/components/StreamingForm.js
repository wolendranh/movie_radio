import React from "react";
import { browserHistory} from 'react-router';

import StreamStore from "../stores/StreamStore.js";
import StreamTextInput from "./StreamTextInput.js"
import StreamActions from "../actions/StreamActions.js"


var StreamAddressForm = React.createClass({
    render: function () {
       return (
           <div>
            <StreamTextInput
                id="new-todo"
                placeholder="What needs to be done?"
                onSave={this._onSave}
                />
           <StreamList/>
           </div>
       )
    },
    _onSave: function(stream_host, active, description) {
    if (stream_host.trim()){
      StreamActions.create(stream_host, active, description);
    }

    }

});


export default StreamAddressForm;


function getStreamState() {
  return {
      allStreams: StreamStore.getAll()
  };
}


var StreamList = React.createClass({
    getInitialState: function() {
        return getStreamState()
    },

    componentDidMount: function() {
        StreamStore.addChangeListener(this._onChange);
        StreamActions.fetch();
    },

    componentWillUnmount: function() {
        StreamStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var allStreams = this.state.allStreams;
        var streams = [];

        for (var key in allStreams) {
          streams.push( <Stream key={key} stream_host={allStreams[key]} />);
        }
        return (
            <div className="quoteList col-md-8">
                {streams}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStreamState());
    }

});

var Stream = React.createClass({

   render: function() {
       var stream_host = this.props.stream_host;
       return (
           <div key={stream_host.id}>
               <span>{ stream_host.stream_ip }</span>
               { stream_host.active ? <label>Активний</label> :null }
               <button onClick={() => this._delete(stream_host.id)} value={ stream_host.id } >delete</button>
           </div>
       )
   },

   _delete: function (e) {
       StreamActions.delete(e);
   }
});
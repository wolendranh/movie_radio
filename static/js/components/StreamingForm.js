import React from "react";
import { browserHistory} from 'react-router';

import StreamStore from "../stores/StreamStore.js";
import StreamTextInput from "./StreamTextInput.js"
import StreamActions from "../actions/StreamActions.js"


class StreamAddressForm extends React.Component {
    render() {
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
    }

    _onSave(stream_host, active, description) {
      if (stream_host.trim()){
        StreamActions.create(stream_host, active, description);
      }
    }

};


function getStreamState() {
  return {
      allStreams: StreamStore.getAll()
  };
}


class StreamList extends React.Component {
    getInitialState() {
        return getStreamState()
    }

    componentDidMount() {
        StreamStore.addChangeListener(this._onChange);
        StreamActions.fetch();
    }

    componentWillUnmount() {
        StreamStore.removeChangeListener(this._onChange);
    }

    render() {
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
    }

    _onChange() {
        this.setState(getStreamState());
    }

};

class Stream extends React.Component {

   render() {
       var stream_host = this.props.stream_host;
       return (
           <div key={stream_host.id}>
               <span>{ stream_host.stream_ip }</span>
               { stream_host.active ? <label>Активний</label> :null }
               <button onClick={() => this._delete(stream_host.id)} value={ stream_host.id } >delete</button>
           </div>
       )
   }

   _delete(e) {
       StreamActions.delete(e);
   }
};

export default StreamAddressForm;
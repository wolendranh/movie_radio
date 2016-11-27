import React from "react";
import { browserHistory} from 'react-router';

import {
    Table,
    ListGroup,
    ListGroupItem,
    Grid,
    Row
} from 'react-bootstrap';

import StreamStore from "../stores/StreamStore.js";
import StreamTextInput from "./StreamTextInput.js"
import StreamActions from "../actions/StreamActions.js"


var StreamAddressForm = React.createClass({
    render: function () {
       return (
           <Grid>
                 <Row className="show-grid">
                    <StreamTextInput
                        id="new-todo"
                        placeholder="Stream URL"
                        onSave={this._onSave}
                        />
                 </Row>
                 <Row className="show-grid">
                     <StreamList/>
                 </Row>
           </Grid>
       )
    },
    _onSave: function(stream_host, active, description) {
    if (stream_host.trim()){
      StreamActions.create(stream_host, active, description);
    }

    }

});


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
            <Table responsive>
               <thead>
                    <tr>
                        <th>#</th>
                        <th>Stream IP</th>
                        <th>Is active</th>
                        <th>Actions</th>
                    </tr>
               </thead>
               <tbody>
                {streams}
               </tbody>
            </Table>
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
               <tr>
                   <td key={stream_host.id}>{stream_host.id}</td>
                   <td>{ stream_host.stream_ip }</td>
                   <td>{ stream_host.active ? 'Active' :'Disabled' }</td>
                   <td><button onClick={() => this._delete(stream_host.id)} value={ stream_host.id } >delete</button></td>
                </tr>
       )
   },

   _delete: function (e) {
       StreamActions.delete(e);
   }
});

export default StreamAddressForm;
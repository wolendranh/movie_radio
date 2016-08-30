import React from "react";
import { browserHistory} from 'react-router';


var StreamAddressForm = React.createClass({
    handleSubmit: function(){
       e.preventDefault();

        if (this.state.passwordError || this.state.usernameError){ return true }

        $.ajax({
          url: this.props.route.url,
          dataType: 'json',
          type: 'POST',
          data: {

          },
          success: function(data) {
              browserHistory.push('/admin');
          }.bind(this),
          error: function(xhr, status, err) {
            // TODO: handle setting correct server side error into UI
            this.setState({loginError: err.toString()});
            console.error(this.props.route.url, status, err.toString());
          }.bind(this)
        });
    },


    render: function () {
       return (
            <form method="post" role="form" onSubmit={this.handleSubmit}>
                <input type="text" name="stream_ip"
                required
                pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                title='Будь ласка, введіть валідну IP адресу!'
                >
                </input>
                <button type="submit" className="btn btn-lg btn-primary btn-block">Додати IP адресу</button>
            </form>
       )
    }
});


export default StreamAddressForm;
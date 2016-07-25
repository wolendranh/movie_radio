var LoginForm = React.createClass({
    getInitialState: function() {
    return {password: 'Веедіть пароль',
            username: 'Введіть Логін'};
    },

    handlePasswordChange: function(e) {
        console.log(e.target.value);
        this.setState({password: e.target.value});
    },
    handleUsernameChange: function(e) {
        console.log(e.target.value);
        this.setState({username: e.target.value});
        console.log('Is Email', this.validateField(this.state.username, validator.isEmail));
    },

    validateField: function(data, validatorClass){
        return validatorClass(data);
    },

    handleSubmit: function(e){
        e.preventDefault();
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: {'username': this.state.username,
                 'password': this.state.password},
          success: function(data) {
            //this.setState({data: data});
              console.log(data);
          }.bind(this),
          error: function(xhr, status, err) {
            //this.setState({data: quotes});
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },


   render: function(){
       return (
        <div className="wrapper">
        <form className="form-signin" method="post" role="form" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading text-center">Please login</h2>
          <input type="text" className="form-control" onChange={this.handleUsernameChange} name="username" id="login" value={this.state.username} required=""/>
          <input type="password" className="form-control" onChange={this.handlePasswordChange} id="password" name="password" value={this.state.password} required=""/>
          <label className="checkbox">

          </label>
          <button className="btn btn-lg btn-primary btn-block" id="submit" type="submit">Login</button>
          <button className="btn btn-lg btn-primary btn-block" id="signin" type="button">Sign In</button>
        </form>
        </div>
       )
   }
});


ReactDOM.render(
  <LoginForm url='login'/>,
  document.getElementById('login-wrapper')
);



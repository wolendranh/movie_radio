var LoginForm = React.createClass({
    getInitialState: function() {
        return {username: 'Ваша Бармаглот пошта',
                password: 'Ваш Бармаглот пароль',
                passwordError: false,
                usernameError: false};
    },

    handlePasswordChange: function(e) {
        this.setState({ passwordError: this.validateField(this.state.password, validator.isLength, 4) ? false: true});

        this.setState({password: e.target.value});
    },
    handleUsernameChange: function(e) {
        this.setState({username: e.target.value});
        this.setState({usernameError: this.validateField(this.state.username, validator.isEmail) ? false: true});
    },

    validateField: function(data, validatorClass, args){
        if (typeof(args) !== 'undefined'){
            return validatorClass(data, args);
        }else{
            return validatorClass(data);
        }

    },

    loginHasErrors: function(){
            return 'form-group'+((this.state.usernameError) ? ' has-error': '');
    },

    passwordHasErrors: function(){
        return 'form-group'+((this.state.passwordError) ? ' has-error': '');
    },

    handleSubmit: function(e){
        e.preventDefault();

        if (this.state.passwordError || this.state.usernameError){ return true }

        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: {'username': this.state.username,
                 'password': this.state.password},
          success: function(data) {
              // TODO: handle success redirect
              console.log(data);
          }.bind(this),
          error: function(xhr, status, err) {
            // TODO: handle setting correct server side error into UI
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    render: function(){
       return (
        <div className="wrapper">
        <form className="form-signin" method="post" role="form" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading text-center">Бармаглот Адмін</h2>

          <div className={ this.loginHasErrors() }>
              <input type="text" className="form-control" onChange={this.handleUsernameChange} placeholder={ this.state.username } name="username" id="login" required=""/>
              { this.state.usernameError ? <label className="control-label" for="login">Логін повинен бути адресою електронної пошти</label> :null}
          </div>

          <div className={ this.passwordHasErrors() }>
              <input type="password" className="form-control" onChange={this.handlePasswordChange} placeholder={ this.state.password } id="password" name="password" required=""/>
              { this.state.passwordError ? <label className="control-label" for="password">Занадто короткий</label> :null }
          </div>

          <button className="btn btn-lg btn-primary btn-block" id="submit" type="submit">Login</button>
        </form>
        </div>
       )
    }
});


ReactDOM.render(
  <LoginForm url='login'/>,
  document.getElementById('login-wrapper')
);



import { Router, Link, browserHistory} from 'react-router';
import {render} from 'react-dom';
import React from 'react';
import $ from 'jquery';
import {login} from '../auth.jsx'
// import validator from 'validator';
// TODO: replace validator or make it accessible from import statement


var LoginForm = React.createClass({
    // TODO: divide into smaller reusable components(form, field etc.)
    getInitialState: function() {
        return {username: 'Ваша Бармаглот пошта',
                password: 'Ваш Бармаглот пароль',
                passwordError: false,
                usernameError: false,
                loginError: undefined};
    },

    componentWillMount: function(){
        document.body.style.backgroundColor = "white";
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
          url: this.props.route.url,
          dataType: 'json',
          type: 'POST',
          data: {'username': this.state.username,
                 'password': this.state.password},
          success: function(data) {
              login(this.state.username, this.state.password);
              browserHistory.push('/admin');
          }.bind(this),
          error: function(xhr, status, err) {
            // TODO: handle setting correct server side error into UI
            this.setState({loginError: err.toString()});
            console.error(this.props.route.url, status, err.toString());
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

          { this.state.loginError ? <div className="form-group has-error'">
              <label className="control-label" for="password">{this.state.loginError}</label>
          </div> :null }

          <button type="submit" className="btn btn-lg btn-primary btn-block">Увійти</button>
        </form>
        </div>
       )
    }
});

export default LoginForm;
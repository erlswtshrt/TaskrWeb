var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var LoginContainer = React.createClass({displayName: "LoginContainer",
  updateAppState: function() {
    this.props.updateAppState('register');
  },
  login: function() {
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim()
    var self = this;

    var ref = new Firebase("https://shophopanalytics.firebaseio.com");
    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else self.props.setUser(authData.uid);
    });
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("form", null, 
          React.createElement("input", {type: "text", name: "email", placeholder: "Email", ref: "email"}), 
          React.createElement("input", {type: "text", name: "password", placeholder: "Password", ref: "password"})
        ), 
        React.createElement("div", {onClick: this.login}, "Log in"), 
        React.createElement("div", {onClick: this.updateAppState}, "Register")
      )
    );
  }
});

module.exports = LoginContainer;
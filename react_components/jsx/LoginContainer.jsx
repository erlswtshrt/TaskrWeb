var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var LoginContainer = React.createClass({
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
      <div>
        <form>
          <input type="text" name="email" placeholder="Email" ref="email" />
          <input type="text" name="password" placeholder="Password" ref="password" />
        </form>
        <div onClick={this.login}>Log in</div>
        <div onClick={this.updateAppState}>Register</div>
      </div>
    );
  }
});

module.exports = LoginContainer;
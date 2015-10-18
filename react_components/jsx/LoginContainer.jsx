var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var LoginContainer = React.createClass({
  getInitialState: function() {
    return {loading: false};
  },
  updateAppState: function() {
    this.props.updateAppState('register');
  },
  login: function() {
    this.setState({loading: true});
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim()
    var self = this;

    var ref = new Firebase("https://taskrweb.firebaseio.com");
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
    return this.state.loading ? <div className="flex-col login-bg c">
      <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
    </div> :
      <div className="flex-col login-bg c">
        <div className="textWhite text2">taskr.</div>
        <form className="flex-col mt1 c">
          <input className="textInputLarge" type="text" name="email" placeholder="Email" ref="email" />
          <input className="textInputLarge" type="password" name="password" placeholder="Password" ref="password" />
        </form>
        <div className="buttonLarge bgGreen textWhite" onClick={this.login}>Log in</div>
        <div className="buttonLarge bgPurple textWhite" onClick={this.updateAppState}>Register</div>
      </div>
  }
});

module.exports = LoginContainer;
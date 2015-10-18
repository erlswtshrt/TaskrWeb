var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var ref = new Firebase("https://taskrweb.firebaseio.com/");
var authData = null;

var uid = null;

var RegisterContainer = React.createClass({displayName: "RegisterContainer",
  updateAppState: function(__newState) {
    this.props.updateAppState(__newState);
  },
  componentDidMount: function() {
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;
  },
  getInitialState: function() {
    return { productId: null }
  },
  register: function() {
    var ref = this.ref;
    var ref = new Firebase('https://taskrweb.firebaseio.com/');
    var firstName = React.findDOMNode(this.refs.firstName).value.trim();
    var lastName = React.findDOMNode(this.refs.lastName).value.trim();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var self = this;

    ref.createUser({
      email    : email,
      password : React.findDOMNode(this.refs.password).value.trim()
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        var usersRef = ref.child("users");
        usersRef.child(userData.uid).set({ 
          firstName: firstName,
          lastName: lastName,
          email: email
        });
        this.updateAppState.bind(null, "login");
      }
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "flex-col c login-bg h-full mb3"}, 
        React.createElement("div", {className: "textWhite text1-2"}, "Get onboard!"), 
        React.createElement("form", {className: "flex-col mt2 c"}, 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "firstName", placeholder: "First Name", ref: "firstName"}), 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "lastName", placeholder: "Last Name", ref: "lastName"}), 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "email", placeholder: "Email", ref: "email"}), 
          React.createElement("input", {className: "textInputLarge", type: "password", name: "password", placeholder: "Password", ref: "password"})
        ), 
        React.createElement("div", {className: "buttonLarge bgGreen textWhite", onClick: this.register}, "Submit"), 
        React.createElement("div", {className: "buttonLarge bgRed textWhite mb3", onClick: this.updateAppState.bind(null, "login")}, "Cancel")
      )
    );
  }
});

module.exports = RegisterContainer;
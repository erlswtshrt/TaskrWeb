var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var RegisterContainer = React.createClass({displayName: "RegisterContainer",
  getInitialState: function() {
    return { productId: null }
  },
  register: function() {
    var ref = this.ref;
    var ref = new Firebase('https://shophopanalytics.firebaseio.com/');
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
      }
    });
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("form", null, 
          React.createElement("input", {type: "text", name: "firstName", placeholder: "First Name", ref: "firstName"}), 
          React.createElement("input", {type: "text", name: "lastName", placeholder: "Last Name", ref: "lastName"}), 
          React.createElement("input", {type: "text", name: "email", placeholder: "Email", ref: "email"}), 
          React.createElement("input", {type: "text", name: "password", placeholder: "Password", ref: "password"})
        ), 
        React.createElement("div", {onClick: this.register}, "Register")
      )
    );
  }
});

module.exports = RegisterContainer;
var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var RegisterContainer = React.createClass({
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
      }
    });
  },
  render: function() {
    return (
      <div className="flex-col c bgDarkBlue h-full">
        <form className="flex-col">
          <input className="textInputLarge" type="text" name="firstName" placeholder="First Name" ref="firstName" />
          <input className="textInputLarge" type="text" name="lastName" placeholder="Last Name" ref="lastName" />
          <input className="textInputLarge" type="text" name="email" placeholder="Email" ref="email" />
          <input className="textInputLarge" type="password" name="password" placeholder="Password" ref="password" />
        </form>
        <div className="buttonLarge bgYellow" onClick={this.register}>Register</div>
      </div>
    );
  }
});

module.exports = RegisterContainer;
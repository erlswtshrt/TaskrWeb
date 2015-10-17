var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var QRCode = require('qrcode.react');

var NewStudentContainer = React.createClass({
  createStudentId: function(__student) {
    __student = __student.replace(/\s+/g, '');
    return __student;
  },
  addQuest: function() {
    var id = "0";
    var id = this.createStudentId(React.findDOMNode(this.refs.firstName).value.trim() + React.findDOMNode(this.refs.lastName).value.trim());

    var ref = new Firebase("https://taskrweb.firebaseio.com");

    var firstName = React.findDOMNode(this.refs.firstName).value.trim();
    var lastName = React.findDOMNode(this.refs.lastName).value.trim();
    var age = React.findDOMNode(this.refs.age).value.trim();

    var usersRef = ref.child("users");
    var userRef = usersRef.child(this.props.uid);
    var studentsRef = userRef.child("students");
    studentsRef.child(id).set({ 
      firstName: firstName,
      lastName: lastName,
      age: age
    });
  },
  render: function() {
    return (
      <div className="flex-col c bgRed h-full">
        <form className="flex-col">
          <input className="textInputLarge" type="text" placeholder="First name" ref="firstName" />
          <input className="textInputLarge" type="text" placeholder="Last name" ref="lastName" />
          <input className="textInputLarge" type="text" placeholder="Age" ref="age" />
        </form>
        <div className="buttonLarge bgGreen textWhite mb3" onClick={this.addQuest}>Register Student</div>
      </div>
    );
  }
});

module.exports = NewStudentContainer;
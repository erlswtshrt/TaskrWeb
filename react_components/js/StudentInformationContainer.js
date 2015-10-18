var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var QRCode = require('qrcode.react');

var ref = new Firebase("https://taskrweb.firebaseio.com/");
var authData = null;

var uid = null;

var StudentInformationContainer = React.createClass({displayName: "StudentInformationContainer",
  componentDidMount: function() {
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;
  },
  updateAppState: function(__newState) {
    this.props.updateAppState(__newState);
  },
  render: function() {
    var qrCode = React.createElement(QRCode, {value: this.props.studentId})
    return (
      React.createElement("div", null, 
      React.createElement("div", {className: "student-header"}, 
        React.createElement("div", {className: "ml3 pt3 textWhite text2"}, "taskr."), 
        React.createElement("div", {className: "c textWhite mt2 text1-2"}, this.props.studentId), 
        React.createElement("div", {className: "c mt1"}, 
          qrCode
        )
      ), 
      React.createElement("div", {className: "ml3 mt2 textBlue text-l"}, React.createElement("span", {className: "p navLink", onClick: this.updateAppState.bind(null, "home")}, "Home"), "   >   ", React.createElement("span", {className: "p navLink", onClick: this.updateAppState.bind(null, "students")}, "Students"), "   >   Student Information"), 
      React.createElement("hr", {className: "mt1 ml3 mr3"}), 
      React.createElement("div", {className: "flex-row ml3"}, 
        React.createElement("div", {className: "bgPurple p-0-25 sizeIcon mt0-5 br-0-25"}, 
          React.createElement("img", {className: "sizeIcon", src: "www/assets/student.svg"})
        ), 
        React.createElement("div", {className: "ml1 mt1 textPurple text-l"}, this.props.studentId)
      ), 
      React.createElement("hr", {className: "mt1 ml3 mr3"})
      )
    );
  }
});

module.exports = StudentInformationContainer;
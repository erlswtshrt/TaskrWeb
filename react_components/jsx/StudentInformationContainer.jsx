var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var QRCode = require('qrcode.react');

var ref = new Firebase("https://taskrweb.firebaseio.com/");
var authData = null;

var uid = null;

var StudentInformationContainer = React.createClass({
  componentDidMount: function() {
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;
  },
  updateAppState: function(__newState) {
    this.props.updateAppState(__newState);
  },
  render: function() {
    var qrCode = <QRCode value={this.props.studentId} />
    return (
      <div>
      <div className="student-header">
        <div className="ml3 pt3 textWhite text2">taskr.</div>
        <div className="c textWhite mt2 text1-2">{this.props.studentId}</div>
        <div className="c mt1">
          {qrCode}
        </div>
      </div>
      <div className="ml3 mt2 textBlue text-l"><span className="p navLink" onClick={this.updateAppState.bind(null, "home")}>Home</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp; <span className="p navLink" onClick={this.updateAppState.bind(null, "students")}>Students</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp; Student Information</div>
      <hr className="mt1 ml3 mr3" />
      <div className="flex-row ml3">
        <div className="bgPurple p-0-25 sizeIcon mt0-5 br-0-25">
          <img className="sizeIcon" src="www/assets/student.svg" />
        </div>
        <div className="ml1 mt1 textPurple text-l">{this.props.studentId}</div>
      </div>
      <hr className="mt1 ml3 mr3" />  
      </div>
    );
  }
});

module.exports = StudentInformationContainer;
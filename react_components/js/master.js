var React = require('react/addons');
var LoginContainer = require('./LoginContainer');
var RegisterContainer = require('./RegisterContainer');
var DashboardContainer = require('./DashboardContainer');

var MasterContainer = React.createClass({displayName: "MasterContainer",
	updateAppState: function(__state) {
		this.setState({ appState: __state });
	},
	getInitialState: function() {
		return {	user: null,
					appState: 'home'	};
	},
	setUser: function(__uid) {
		var self = this;
	    var ref = this.ref;
	    ref = new Firebase('https://shophopanalytics.firebaseio.com/');

	    var usersRef = ref.child("users");
	    var userRef = usersRef.child(__uid);

	    userRef.on("value", function(snapshot) {
	      	self.setState({ user: snapshot.val(),
	      					uid: __uid });
	      	self.updateAppState('home');
	    });
	},
	render: function() {
		switch(this.state.appState) {
		    case 'home':
		        return React.createElement(DashboardContainer, {user: this.state.user, updateAppState: this.updateAppState, uid: this.state.uid})
		        break;
		    case 'login':
		        return React.createElement(LoginContainer, {setUser: this.setUser, updateAppState: this.updateAppState})
		        break;
		    case 'register':
		        return React.createElement(RegisterContainer, null)
		        break;
		    default:
		        return React.createElement("div", null, "rendering error")
		}
	}
});

React.render(React.createElement(MasterContainer, null), document.body);
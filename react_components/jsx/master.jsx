var React = require('react/addons');
var LoginContainer = require('./LoginContainer');
var RegisterContainer = require('./RegisterContainer');
var DashboardContainer = require('./DashboardContainer');

var MasterContainer = React.createClass({
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
	    ref = new Firebase('https://taskrweb.firebaseio.com/');

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
		        return <DashboardContainer user={this.state.user} updateAppState={this.updateAppState} uid={this.state.uid} />
		        break;
		    case 'login':
		        return <LoginContainer setUser={this.setUser} updateAppState={this.updateAppState} />
		        break;
		    case 'register':
		        return <RegisterContainer />
		        break;
		    default:
		        return <div>rendering error</div>
		}
	}
});

React.render(<MasterContainer />, document.body);
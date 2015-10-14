var React = require('react/addons');
var LoginContainer = require('./LoginContainer');
var RegisterContainer = require('./RegisterContainer');
var DashboardContainer = require('./DashboardContainer');
var NewQuestContainer = require('./NewQuestContainer');
var NewTaskContainer = require('./NewTaskContainer');
var QuestsContainer = require('./QuestsContainer');

var MasterContainer = React.createClass({
	updateAppState: function(__state) {
		this.setState({ appState: __state });
	},
	updateQuest: function(__id) {
		this.setState({ appState: 'edit_quest',
						questId: __id });
	},
	getInitialState: function() {
		return {	user: null,
					appState: 'home',
					questId: null	};
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
		        return <DashboardContainer user={this.state.user} updateAppState={this.updateAppState} updateQuest={this.updateQuest} uid={this.state.uid} />
		        break;
		    case 'login':
		        return <LoginContainer setUser={this.setUser} updateAppState={this.updateAppState} />
		        break;
		    case 'register':
		        return <RegisterContainer />
		        break;
		    case 'new_quest':
		        return <NewQuestContainer uid={this.state.uid} updateQuest={this.updateQuest}/>
		        break;
		    case 'edit_quest':
		        return <NewTaskContainer uid={this.state.uid} questId={this.state.questId}/>
		        break;
		   	case 'quests':
		        return <QuestsContainer uid={this.state.uid} questId={this.state.questId}/>
		        break;
		    default:
		        return <div>rendering error</div>
		}
	}
});

React.render(<MasterContainer />, document.body);
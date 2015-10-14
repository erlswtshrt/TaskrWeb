var React = require('react/addons');
var NewTaskContainer = require('./NewTaskContainer');

var DashboardContainer = React.createClass({
	getInitialState: function() {
		return {	quests: {}	};
	},
	componentDidMount: function() {
		if(this.props.user === null) this.props.updateAppState('login');
		else {
			var ref = new Firebase("https://taskrweb.firebaseio.com");

			var usersRef = ref.child("users");
		    var userRef = usersRef.child(this.props.uid);
		    var questsRef = userRef.child('quests');

		    var self = this;

			questsRef.on("value", function(snapshot) {
		      	self.setState({quests: snapshot.val()})
		    });
		}
	},
	manageQuests: function() {
		this.props.updateAppState('quests');
	},
	manageStudents: function() {
		this.props.updateAppState('students');
	},
	updateQuest: function(quest) {
		console.log(quest);
		this.props.updateQuest(quest);
	},
	render: function() {

		var questList = [];

		console.log(this.state.quests);

		for (var quest in this.state.quests) {
		   if (this.state.quests.hasOwnProperty(quest)) {
		       questList.push(<div className="buttonLarge bgOrange" onClick={this.updateQuest.bind(null, quest)}>{this.state.quests[quest].name}</div>);
		    }
		}

		return this.props.user === null ? null : 
		<div>
			<div className="header">
				<div className="ml3 pt3 textWhite text2">taskr.</div>
			</div>
			<div className="ml3 mt3 textBlue text1-2">Welcome, {this.props.user.firstName}</div>
			<hr className="mt1 ml3 mr3" />
			<div className="mt3 flex-col c">
	    		<div className="buttonLarge bgBlue textWhite" onClick={this.manageQuests}>Manage Quests</div>
	    		<div className="buttonLarge bgGreen textWhite mt2" onClick={this.manageStudents}>Manage Students</div>
	  		</div>
	  	</div>
	}
});

module.exports = DashboardContainer;
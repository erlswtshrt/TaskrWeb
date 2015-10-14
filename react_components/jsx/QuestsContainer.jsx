var React = require('react/addons');
var NewTaskContainer = require('./NewTaskContainer');

var QuestsContainer = React.createClass({
	getInitialState: function() {
		return {	quests: {}	};
	},
	componentDidMount: function() {
		var ref = new Firebase("https://taskrweb.firebaseio.com");

		var usersRef = ref.child("users");
	    var userRef = usersRef.child(this.props.uid);
	    var questsRef = userRef.child('quests');

	    var self = this;

		questsRef.on("value", function(snapshot) {
	      	self.setState({quests: snapshot.val()})
	    });
	},
	updateAppState: function() {
		this.props.updateAppState('new_quest');
	},
	updateQuest: function(quest) {
		this.props.updateQuest(quest);
	},
	render: function() {

		var questList = [];

		console.log(this.state.quests);

		for (var quest in this.state.quests) {
		   if (this.state.quests.hasOwnProperty(quest)) {
		       questList.push(<div className="buttonLarge bgMagenta textWhite" onClick={this.updateQuest.bind(null, quest)}>{this.state.quests[quest].name}</div>);
		    }
		}

		return this.props.user === null ? null : 
		<div>
			<div className="header">
				<div className="ml3 pt3 textWhite text2">taskr.</div>
			</div>
			<div className="ml3 mt3 textBlue text1-2">My Quests</div>
			<hr className="mt1 ml3 mr3" />
			<div className="mt3 flex-col c">
	    		{questList}
	  		</div>
	  	</div>
	}
});

module.exports = QuestsContainer;
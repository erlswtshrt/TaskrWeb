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
	updateAppState: function(__newState) {
		this.props.updateAppState(__newState);
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
			<div className="ml3 mt2 textBlue text-l"><span className="p" onClick={this.updateAppState.bind(null, "home")}>Home</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp; Quests</div>
			<hr className="mt1 ml3 mr3" />
			<div className="flex-row ml3">
				<div className="bgMagenta p-0-25 sizeIcon mt0-5 br-0-25">
					<img className="sizeIcon" src="www/assets/new_custom88.svg" />
				</div>
				<div className="ml1 mt1 textMagenta text-l">My Quests</div>
			</div>
			<div className="mt3 flex-col c mb3">
	    		{questList}
	    		<div className="buttonLarge bgGreen textWhite mt1" onClick={this.updateAppState.bind(null, "new_quest")}>New Quest</div>
	  		</div>
	  	</div>
	}
});

module.exports = QuestsContainer;
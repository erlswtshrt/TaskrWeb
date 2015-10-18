var React = require('react/addons');
var NewTaskContainer = require('./NewTaskContainer');

var ref = new Firebase("https://taskrweb.firebaseio.com/");
var authData = null;

var uid = null;

var QuestsContainer = React.createClass({
	getInitialState: function() {
		return {	quests: {}	};
	},
	componentDidMount: function() {
		authData = ref.getAuth();
    	if(authData !== null) uid = authData.uid;

		var usersRef = ref.child("users");
	    var userRef = usersRef.child(uid);
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
		       questList.push(<div className="buttonLarge bgBlue textWhite" onClick={this.updateQuest.bind(null, quest)}>{this.state.quests[quest].name}</div>);
		    }
		}

		return this.props.user === null ? null : 
		<div>
			<div className="header">
				<div className="ml3 pt3 textWhite text2">taskr.</div>
			</div>
			<div className="ml3 mt2 textBlue text-l"><span className="p navLink" onClick={this.updateAppState.bind(null, "home")}>Home</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp; Quests</div>
			<hr className="mt1 ml3 mr3" />
			<div className="flex-row ml3">
				<div className="bgBlue p-0-25 sizeIcon mt0-5 br-0-25">
					<img className="sizeIcon" src="www/assets/quest.svg" />
				</div>
				<div className="ml1 mt1 textBlue text-l">My Quests</div>
			</div>
			<hr className="mt1 ml3 mr3" />
			<div className="mt2 flex-col c mb3">
	    		{questList}
	    		<div className="buttonLarge bgGreen textWhite mt1" onClick={this.updateAppState.bind(null, "new_quest")}>New Quest</div>
	  		</div>
	  	</div>
	}
});

module.exports = QuestsContainer;
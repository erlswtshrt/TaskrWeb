var React = require('react/addons');
var NewTaskContainer = require('./NewTaskContainer');

var QuestsContainer = React.createClass({displayName: "QuestsContainer",
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
		       questList.push(React.createElement("div", {className: "buttonLarge bgMagenta textWhite", onClick: this.updateQuest.bind(null, quest)}, this.state.quests[quest].name));
		    }
		}

		return this.props.user === null ? null : 
		React.createElement("div", null, 
			React.createElement("div", {className: "header"}, 
				React.createElement("div", {className: "ml3 pt3 textWhite text2"}, "taskr")
			), 
			React.createElement("div", {className: "ml3 mt3 textBlue text1-2"}, "My Quests"), 
			React.createElement("hr", {className: "mt1 ml3 mr3"}), 
			React.createElement("div", {className: "mt3 flex-col c"}, 
	    		questList
	  		)
	  	)
	}
});

module.exports = QuestsContainer;
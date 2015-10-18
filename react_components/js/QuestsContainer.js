var React = require('react/addons');
var NewTaskContainer = require('./NewTaskContainer');

var ref = new Firebase("https://taskrweb.firebaseio.com/");
var authData = null;

var uid = null;

var QuestsContainer = React.createClass({displayName: "QuestsContainer",
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
		       questList.push(React.createElement("div", {className: "buttonLarge bgBlue textWhite", onClick: this.updateQuest.bind(null, quest)}, this.state.quests[quest].name));
		    }
		}

		return this.props.user === null ? null : 
		React.createElement("div", null, 
			React.createElement("div", {className: "header"}, 
				React.createElement("div", {className: "ml3 pt3 textWhite text2"}, "taskr.")
			), 
			React.createElement("div", {className: "ml3 mt2 textBlue text-l"}, React.createElement("span", {className: "p navLink", onClick: this.updateAppState.bind(null, "home")}, "Home"), "   >   Quests"), 
			React.createElement("hr", {className: "mt1 ml3 mr3"}), 
			React.createElement("div", {className: "flex-row ml3"}, 
				React.createElement("div", {className: "bgBlue p-0-25 sizeIcon mt0-5 br-0-25"}, 
					React.createElement("img", {className: "sizeIcon", src: "www/assets/quest.svg"})
				), 
				React.createElement("div", {className: "ml1 mt1 textBlue text-l"}, "My Quests")
			), 
			React.createElement("hr", {className: "mt1 ml3 mr3"}), 
			React.createElement("div", {className: "mt2 flex-col c mb3"}, 
	    		questList, 
	    		React.createElement("div", {className: "buttonLarge bgGreen textWhite mt1", onClick: this.updateAppState.bind(null, "new_quest")}, "New Quest")
	  		)
	  	)
	}
});

module.exports = QuestsContainer;
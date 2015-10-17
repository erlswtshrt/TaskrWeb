var React = require('react/addons');
var TaskCard = require('./TaskCard');

var QuestsContainer = React.createClass({displayName: "QuestsContainer",
	getInitialState: function() {
		return {	tasks: {},
					questName: ""	};
	},
	componentDidMount: function() {
		var ref = new Firebase("https://taskrweb.firebaseio.com");

		var usersRef = ref.child("users");
	    var userRef = usersRef.child(this.props.uid);
	    var questsRef = userRef.child('quests');
	    var questRef = questsRef.child(this.props.questId);
	    var tasksRef = questRef.child('tasks')

	    var self = this;

	    questRef.on("value", function(snapshot) {
	    	self.setState({
	    		questName: snapshot.val().name
	    	})
	    });

		tasksRef.on("value", function(snapshot) {
	      	self.setState({
	      		tasks: snapshot.val()})
	    });
	},
	updateAppState: function(__newState) {
		this.props.updateAppState(__newState);
	},
	addTaskToQuest: function(quest) {
		this.props.addTaskToQuest(quest);
	},
	removeTask: function(__task) {
		var ref = new Firebase("https://taskrweb.firebaseio.com");

		var taskToRemove = ref.child("users").child(this.props.uid).child('quests').child(this.props.questId).child('tasks').child(__task);
		taskToRemove.remove();
	},
	render: function() {

		var taskList = [];

		for (var task in this.state.tasks) {
		   if (this.state.tasks.hasOwnProperty(task)) {
		       taskList.push(React.createElement(TaskCard, {task: this.state.tasks[task], removeTask: this.removeTask.bind(null, task)}));
		    }
		}

		return this.props.user === null ? null : 
		React.createElement("div", null, 
			React.createElement("div", {className: "header"}, 
				React.createElement("div", {className: "ml3 pt3 textWhite text2"}, "taskr.")
			), 
			React.createElement("div", {className: "ml3 mt2 textBlue text-l"}, React.createElement("span", {className: "p", onClick: this.updateAppState.bind(null, "home")}, "Home    >   "), React.createElement("span", {className: "p", onClick: this.updateAppState.bind(null, "quests")}, "Quests    >   "), "Tasks"), 
			React.createElement("hr", {className: "mt1 ml3 mr3"}), 
			React.createElement("div", {className: "flex-row ml3"}, 
				React.createElement("div", {className: "bgGreen p-0-25 sizeIcon mt0-5 br-0-25"}, 
					React.createElement("img", {className: "sizeIcon", src: "www/assets/new_custom88.svg"})
				), 
				React.createElement("div", {className: "ml1 mt1 textGreen text-l"}, this.state.questName, " Tasks")
			), 
			React.createElement("div", {className: "mt1 flex-col c-v mb3"}, 
	    		taskList, 
	    		React.createElement("div", {className: "buttonLarge bgGreen textWhite mt1", onClick: this.addTaskToQuest.bind(null, this.props.questId)}, "Add Task")
	  		)
	  	)
	}
});

module.exports = QuestsContainer;
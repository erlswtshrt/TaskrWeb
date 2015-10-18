var React = require('react/addons');
var TaskCard = require('./TaskCard');

var ref = new Firebase("https://taskrweb.firebaseio.com/");
var authData = null;

var uid = null;

var QuestsContainer = React.createClass({
	getInitialState: function() {
		return {	tasks: {},
					questName: ""	};
	},
	componentDidMount: function() {
    	authData = ref.getAuth();
    	if(authData !== null) uid = authData.uid;

		var usersRef = ref.child("users");
	    var userRef = usersRef.child(uid);
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

		var taskToRemove = ref.child("users").child(uid).child('quests').child(this.props.questId).child('tasks').child(__task);
		taskToRemove.remove();
	},
	render: function() {

		var taskList = [];

		for (var task in this.state.tasks) {
		   if (this.state.tasks.hasOwnProperty(task)) {
		       taskList.push(<TaskCard task={this.state.tasks[task]} removeTask={this.removeTask.bind(null, task)} />);
		    }
		}

		return this.props.user === null ? null : 
		<div>
			<div className="header">
				<div className="ml3 pt3 textWhite text2">taskr.</div>
			</div>
			<div className="ml3 mt2 textBlue text-l"><span className="p navLink" onClick={this.updateAppState.bind(null, "home")}>Home</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp; <span className="p navLink" onClick={this.updateAppState.bind(null, "quests")}>Quests</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp; Tasks</div>
			<hr className="mt1 ml3 mr3" />
			<div className="flex-row ml3">
				<div className="bgBlue p-0-25 sizeIcon mt0-5 br-0-25">
					<img className="sizeIcon" src="www/assets/task.svg" />
				</div>
				<div className="ml1 mt1 textBlue text-l">{this.state.questName}</div>
			</div>
			<hr className="mt1 ml3 mr3" />
			<div className="mt2 flex-col c-v mb3">
	    		{taskList}
	    		<div className="buttonLarge bgGreen textWhite mt1" onClick={this.addTaskToQuest.bind(null, this.props.questId)}>Add Task</div>
	  		</div>
	  	</div>
	}
});

module.exports = QuestsContainer;
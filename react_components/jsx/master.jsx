var React = require('react/addons');
var LoginContainer = require('./LoginContainer');
var RegisterContainer = require('./RegisterContainer');
var DashboardContainer = require('./DashboardContainer');
var NewQuestContainer = require('./NewQuestContainer');
var NewTaskContainer = require('./NewTaskContainer');
var QuestsContainer = require('./QuestsContainer');
var TasksContainer = require('./TasksContainer');
var StudentsContainer = require('./StudentsContainer');
var NewStudentContainer = require('./NewStudentContainer');
var StudentInformationContainer = require('./StudentInformationContainer');

var MasterContainer = React.createClass({
	updateAppState: function(__state) {
		this.setState({ appState: __state });
	},
	addTaskToQuest: function(__id) {
		this.setState({ appState: 'new_task',
						questId: __id });
	},
	updateQuest: function(__id) {
		this.setState({ appState: 'tasks',
						questId: __id });
	},
	viewStudent: function(__id) {
		this.setState( { 	appState: 'student_info',
						 	studentId: __id } );
	},
	getInitialState: function() {
		return {	user: null,
					appState: 'home',
					questId: null,
					studentId: null	};
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
		        return <RegisterContainer updateAppState={this.updateAppState} />
		        break;
		    case 'new_quest':
		        return <NewQuestContainer updateQuest={this.updateQuest} updateAppState={this.updateAppState}/>
		        break;
		    case 'new_task':
		        return <NewTaskContainer questId={this.state.questId} updateAppState={this.updateAppState}/>
		        break;
		    case 'tasks':
		    	return <TasksContainer questId={this.state.questId} addTaskToQuest={this.addTaskToQuest} updateAppState={this.updateAppState} />
		    	break;
		   	case 'quests':
		        return <QuestsContainer questId={this.state.questId} updateQuest={this.updateQuest} updateAppState={this.updateAppState}/>
		        break;
		    case 'students':
		        return <StudentsContainer studentId={this.state.studentId} viewStudent={this.viewStudent} updateAppState={this.updateAppState}/>
		        break;
		   	case 'new_student':
		        return <NewStudentContainer viewStudent={this.viewStudent} updateAppState={this.updateAppState}/>
		        break;
		    case 'student_info':
		        return <StudentInformationContainer studentId={this.state.studentId} viewStudent={this.viewStudent} updateAppState={this.updateAppState}/>
		        break;
		    default:
		        return <div>rendering error</div>
		}
	}
});

React.render(<MasterContainer />, document.body);
var React = require('react/addons');
var NewTaskContainer = require('./NewTaskContainer');

var StudentsContainer = React.createClass({
	getInitialState: function() {
		return {	students: {}	};
	},
	componentDidMount: function() {
		var ref = new Firebase("https://taskrweb.firebaseio.com");

		var usersRef = ref.child("users");
	    var userRef = usersRef.child(this.props.uid);
	    var studentsRef = userRef.child('students');

	    var self = this;

		studentsRef.on("value", function(snapshot) {
	      	self.setState({students: snapshot.val()})
	    });
	},
	updateAppState: function(__newState) {
		this.props.updateAppState(__newState);
	},
	viewStudent: function(student) {
		this.props.viewStudent(student);
	},
	render: function() {

		var studentList = [];

		console.log(this.state.students);

		for (var student in this.state.students) {
		   if (this.state.students.hasOwnProperty(student)) {
		       studentList.push(<div className="buttonLarge bgPurple textWhite" onClick={this.viewStudent.bind(null, student)}>{this.state.students[student].firstName} {this.state.students[student].lastName}</div>);
		    }
		}

		return this.props.user === null ? null : 
		<div>
			<div className="header">
				<div className="ml3 pt3 textWhite text2">taskr.</div>
			</div>
			<div className="ml3 mt2 textBlue text-l"><span className="p" onClick={this.updateAppState.bind(null, "home")}>Home</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp; Students</div>
			<hr className="mt1 ml3 mr3" />
			<div className="flex-row ml3">
				<div className="bgPurple p-0-25 sizeIcon mt0-5 br-0-25">
					<img className="sizeIcon" src="www/assets/new_custom88.svg" />
				</div>
				<div className="ml1 mt1 textPurple text-l">My Students</div>
			</div>
			<div className="mt3 flex-col c mb3">
	    		{studentList}
	    		<div className="buttonLarge bgGreen textWhite mt1" onClick={this.updateAppState.bind(null, "new_student")}>New student</div>
	  		</div>
	  	</div>
	}
});

module.exports = StudentsContainer;
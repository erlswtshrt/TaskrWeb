var React = require('react/addons');
var NewTaskContainer = require('./NewTaskContainer');

var StudentsContainer = React.createClass({displayName: "StudentsContainer",
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
		       studentList.push(React.createElement("div", {className: "buttonLarge bgPurple textWhite", onClick: this.viewStudent.bind(null, student)}, this.state.students[student].firstName, " ", this.state.students[student].lastName));
		    }
		}

		return this.props.user === null ? null : 
		React.createElement("div", null, 
			React.createElement("div", {className: "header"}, 
				React.createElement("div", {className: "ml3 pt3 textWhite text2"}, "taskr.")
			), 
			React.createElement("div", {className: "ml3 mt2 textBlue text-l"}, React.createElement("span", {className: "p", onClick: this.updateAppState.bind(null, "home")}, "Home"), "   >   Students"), 
			React.createElement("hr", {className: "mt1 ml3 mr3"}), 
			React.createElement("div", {className: "flex-row ml3"}, 
				React.createElement("div", {className: "bgPurple p-0-25 sizeIcon mt0-5 br-0-25"}, 
					React.createElement("img", {className: "sizeIcon", src: "www/assets/new_custom88.svg"})
				), 
				React.createElement("div", {className: "ml1 mt1 textPurple text-l"}, "My Students")
			), 
			React.createElement("div", {className: "mt3 flex-col c mb3"}, 
	    		studentList, 
	    		React.createElement("div", {className: "buttonLarge bgGreen textWhite mt1", onClick: this.updateAppState.bind(null, "new_student")}, "New student")
	  		)
	  	)
	}
});

module.exports = StudentsContainer;
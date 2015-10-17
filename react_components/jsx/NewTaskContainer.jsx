var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var QRCode = require('qrcode.react');

var NewTaskContainer = React.createClass({
  getInitialState: function() {
    return { taskId: null }
  },
  createTaskId: function(__task) {
    __task = __task.replace(/\s+/g, '');
    return __task;
  },
  addTask: function() {
    var id = "0";
    var id = this.createTaskId(React.findDOMNode(this.refs.question).value.trim());
    this.setState({ productId: id });

    var ref = new Firebase("https://taskrweb.firebaseio.com");

    var question = React.findDOMNode(this.refs.question).value.trim();
    var option1 = React.findDOMNode(this.refs.option1).value.trim()
    var option2 = React.findDOMNode(this.refs.option2).value.trim()
    var option3 = React.findDOMNode(this.refs.option3).value.trim()
    var option4 = React.findDOMNode(this.refs.option4).value.trim()

    console.log(this.props.questId)

    var usersRef = ref.child("users");
    var userRef = usersRef.child(this.props.uid);
    var questsRef = userRef.child("quests");
    var questRef = questsRef.child(this.props.questId);
    var tasksRef = questRef.child("tasks")
    tasksRef.child(id).set({ 
      question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4
    });
  },
  render: function() {
    return (
      <div className="flex-col c bgPurple h-full">
        <form className="flex-col">
          <input className="textInputLarge" type="text" name="question" placeholder="Question" ref="question" />
          <input className="textInputLarge" type="text" name="option1" placeholder="Option 1" ref="option1" />
          <input className="textInputLarge" type="text" name="option2" placeholder="Option 2" ref="option2" />
          <input className="textInputLarge" type="text" name="option3" placeholder="Option 3" ref="option3" />
          <input className="textInputLarge" type="text" name="option4" placeholder="Option 4" ref="option4" />
        </form>
        <div className="buttonLarge bgGreen textWhite mb3" onClick={this.addTask}>Add Task</div>
      </div>
    );
  }
});

module.exports = NewTaskContainer;
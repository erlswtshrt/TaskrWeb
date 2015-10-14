var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var QRCode = require('qrcode.react');

var NewQuestContainer = React.createClass({
  createQuestId: function(__quest) {
    __quest = __quest.replace(/\s+/g, '');
    return __quest;
  },
  addQuest: function() {
    var id = "0";
    var id = this.createQuestId(React.findDOMNode(this.refs.name).value.trim());

    var ref = new Firebase("https://taskrweb.firebaseio.com");

    var name = React.findDOMNode(this.refs.name).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();

    var usersRef = ref.child("users");
    var userRef = usersRef.child(this.props.uid);
    var questsRef = userRef.child("quests");
    questsRef.child(id).set({ 
      name: name,
      description: description,
    });
  },
  render: function() {
    return (
      <div className="flex-col c bgRed h-full">
        <form className="flex-col">
          <input className="textInputLarge" type="text" name="name" placeholder="Name your quest." ref="name" />
          <input className="textInputLarge" type="text" name="description" placeholder="Description" ref="description" />
        </form>
        <div className="buttonLarge bgYellow" onClick={this.addQuest}>Add Quest</div>
      </div>
    );
  }
});

module.exports = NewQuestContainer;
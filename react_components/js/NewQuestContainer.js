var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var QRCode = require('qrcode.react');

var ref = new Firebase("https://taskrweb.firebaseio.com/");
var authData = null;

var uid = null;

var NewQuestContainer = React.createClass({displayName: "NewQuestContainer",
  updateAppState: function(__newState) {
    this.props.updateAppState(__newState);
  },
  componentDidMount: function() {
    authData = ref.getAuth();
    if(authData !== null) uid = authData.uid;
  },
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
    var userRef = usersRef.child(uid);
    var questsRef = userRef.child("quests");
    questsRef.child(id).set({ 
      name: name,
      description: description,
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "flex-col c login-bg h-full"}, 
        React.createElement("div", {className: "textWhite text1-2"}, "Create a new quest."), 
        React.createElement("form", {className: "flex-col c mt2"}, 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "name", placeholder: "Name your quest.", ref: "name"}), 
          React.createElement("input", {className: "textInputLarge", type: "text", name: "description", placeholder: "Description", ref: "description"})
        ), 
        React.createElement("div", {className: "buttonLarge bgGreen textWhite", onClick: this.addQuest}, "Add Quest"), 
        React.createElement("div", {className: "buttonLarge bgRed textWhite mb3", onClick: this.updateAppState.bind(null, "quests")}, "Cancel")
      )
    );
  }
});

module.exports = NewQuestContainer;
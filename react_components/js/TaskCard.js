var React = require('react/addons');

var TaskCard = React.createClass({displayName: "TaskCard",
	getInitialState: function() {
		return {results: false}
	},
	toggleResults: function() {
		this.setState({results: !this.state.results})
	},
	removeTask: function() {
		this.props.removeTask();
	},
	render: function() {
		var results = this.state.results ? (React.createElement("div", null, 
				React.createElement("hr", null), 
				React.createElement("div", {className: "p-0-25 text0-9 textGreen"}, "75% Correct"), 
				React.createElement("hr", null), 
				React.createElement("div", {className: "p-0-25 text0-9"}, "Martin Pucilowski", React.createElement("span", {className: "floatRight textGreen"}, "Correct")), 
				React.createElement("div", {className: "p-0-25 text0-9"}, "John Earle", React.createElement("span", {className: "floatRight textRed"}, "Incorrect")), 
				React.createElement("div", {className: "p-0-25 text0-9"}, "Matthieu Devaux", React.createElement("span", {className: "floatRight textGreen"}, "Correct")), 
				React.createElement("div", {className: "p-0-25 text0-9"}, "Martin Pucilowski", React.createElement("span", {className: "floatRight textGreen"}, "Correct")), 
				React.createElement("div", {className: "p-0-25 text0-9"}, "John Smith", React.createElement("span", {className: "floatRight textRed"}, "Incorrect")), 
				React.createElement("div", {className: "p-0-25 text0-9"}, "Josh Groban", React.createElement("span", {className: "floatRight textGreen"}, "Correct")), 
				React.createElement("div", {className: "p-0-25 text0-9"}, "Ryan Green", React.createElement("span", {className: "floatRight textGreen"}, "Correct")), 
				React.createElement("div", {className: "p-0-25 text0-9"}, "Matt Weaver", React.createElement("span", {className: "floatRight textGreen"}, "Correct"))
			)) : null;
		return (React.createElement("div", {className: "mt1 mb1 p", onClick: this.toggleResults}, 
					React.createElement("div", {className: "card-header textWhite bgBlue"}, this.props.task.question, React.createElement("img", {className: "p sizeIconSmall floatRight", src: "www/assets/delete.svg", onClick: this.removeTask})), 
					React.createElement("div", {className: "card-body"}, 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textBlue"}, "a.  "), "  ", this.props.task.option1), 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textBlue"}, "b.  "), "  ", this.props.task.option2), 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textBlue"}, "c.  "), "  ", this.props.task.option3), 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textBlue"}, "d.  "), "  ", this.props.task.option4), 
						results
					)
				));
	}
});

module.exports = TaskCard;
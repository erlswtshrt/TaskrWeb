var React = require('react/addons');

var TaskCard = React.createClass({displayName: "TaskCard",
	removeTask: function() {
		this.props.removeTask();
	},
	render: function() {

		return (React.createElement("div", {className: "mt1"}, 
					React.createElement("div", {className: "card-header textWhite bgMagenta text0.9"}, this.props.task.question, React.createElement("span", {className: "p floatRight", onClick: this.removeTask}, "x")), 
					React.createElement("div", {className: "card-body"}, 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textMagenta"}, "A."), "  ", this.props.task.option1), 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textMagenta"}, "B."), "  ", this.props.task.option2), 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textMagenta"}, "C."), "  ", this.props.task.option3), 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textMagenta"}, "D."), "  ", this.props.task.option4)
					)
				));
	}
});

module.exports = TaskCard;
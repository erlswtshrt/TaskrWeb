var React = require('react/addons');

var TaskCard = React.createClass({displayName: "TaskCard",
	removeTask: function() {
		this.props.removeTask();
	},
	render: function() {

		return (React.createElement("div", {className: "mt1 mb1"}, 
					React.createElement("div", {className: "card-header textWhite bgGreen text0.9"}, this.props.task.question, React.createElement("img", {className: "p sizeIconSmall floatRight", src: "www/assets/delete.svg", onClick: this.removeTask})), 
					React.createElement("div", {className: "card-body"}, 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textGreen"}, "a.  "), "  ", this.props.task.option1), 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textGreen"}, "b.  "), "  ", this.props.task.option2), 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textGreen"}, "c.  "), "  ", this.props.task.option3), 
						React.createElement("div", {className: "p-0-25 text0-9"}, React.createElement("span", {className: "textGreen"}, "d.  "), "  ", this.props.task.option4)
					)
				));
	}
});

module.exports = TaskCard;
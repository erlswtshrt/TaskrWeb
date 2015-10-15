var React = require('react/addons');

var TaskCard = React.createClass({
	removeTask: function() {
		this.props.removeTask();
	},
	render: function() {

		return (<div className="mt1">
					<div className="card-header textWhite bgMagenta text0.9">{this.props.task.question}<span className="p floatRight" onClick={this.removeTask}>x</span></div>
					<div className="card-body">
						<div className="p-0-25 text0-9"><span className="textMagenta">A.</span>  {this.props.task.option1}</div>
						<div className="p-0-25 text0-9"><span className="textMagenta">B.</span>  {this.props.task.option2}</div>
						<div className="p-0-25 text0-9"><span className="textMagenta">C.</span>  {this.props.task.option3}</div>
						<div className="p-0-25 text0-9"><span className="textMagenta">D.</span>  {this.props.task.option4}</div>
					</div>
				</div>);
	}
});

module.exports = TaskCard;
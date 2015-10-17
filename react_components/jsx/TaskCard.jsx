var React = require('react/addons');

var TaskCard = React.createClass({
	removeTask: function() {
		this.props.removeTask();
	},
	render: function() {

		return (<div className="mt1 mb1">
					<div className="card-header textWhite bgGreen text0.9">{this.props.task.question}<img className="p sizeIconSmall floatRight" src="www/assets/delete.svg" onClick={this.removeTask} /></div>
					<div className="card-body">
						<div className="p-0-25 text0-9"><span className="textGreen">a.&nbsp;&nbsp;</span>  {this.props.task.option1}</div>
						<div className="p-0-25 text0-9"><span className="textGreen">b.&nbsp;&nbsp;</span>  {this.props.task.option2}</div>
						<div className="p-0-25 text0-9"><span className="textGreen">c.&nbsp;&nbsp;</span>  {this.props.task.option3}</div>
						<div className="p-0-25 text0-9"><span className="textGreen">d.&nbsp;&nbsp;</span>  {this.props.task.option4}</div>
					</div>
				</div>);
	}
});

module.exports = TaskCard;
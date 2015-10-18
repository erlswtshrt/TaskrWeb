var React = require('react/addons');

var TaskCard = React.createClass({
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
		var results = this.state.results ? (<div>
				<hr />
				<div className="p-0-25 text0-9 textGreen">75% Correct</div>
				<hr />
				<div className="p-0-25 text0-9">Martin Pucilowski<span className="floatRight textGreen">Correct</span></div>
				<div className="p-0-25 text0-9">John Earle<span className="floatRight textRed">Incorrect</span></div>
				<div className="p-0-25 text0-9">Matthieu Devaux<span className="floatRight textGreen">Correct</span></div>
				<div className="p-0-25 text0-9">Martin Pucilowski<span className="floatRight textGreen">Correct</span></div>
				<div className="p-0-25 text0-9">John Smith<span className="floatRight textRed">Incorrect</span></div>
				<div className="p-0-25 text0-9">Josh Groban<span className="floatRight textGreen">Correct</span></div>
				<div className="p-0-25 text0-9">Ryan Green<span className="floatRight textGreen">Correct</span></div>
				<div className="p-0-25 text0-9">Matt Weaver<span className="floatRight textGreen">Correct</span></div>
			</div>) : null;
		return (<div className="mt1 mb1 p" onClick={this.toggleResults}>
					<div className="card-header textWhite bgBlue">{this.props.task.question}<img className="p sizeIconSmall floatRight" src="www/assets/delete.svg" onClick={this.removeTask} /></div>
					<div className="card-body">
						<div className="p-0-25 text0-9"><span className="textBlue">a.&nbsp;&nbsp;</span>  {this.props.task.option1}</div>
						<div className="p-0-25 text0-9"><span className="textBlue">b.&nbsp;&nbsp;</span>  {this.props.task.option2}</div>
						<div className="p-0-25 text0-9"><span className="textBlue">c.&nbsp;&nbsp;</span>  {this.props.task.option3}</div>
						<div className="p-0-25 text0-9"><span className="textBlue">d.&nbsp;&nbsp;</span>  {this.props.task.option4}</div>
						{results}
					</div>
				</div>);
	}
});

module.exports = TaskCard;
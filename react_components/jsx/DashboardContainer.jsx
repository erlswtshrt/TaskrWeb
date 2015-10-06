var React = require('react/addons');
var NewProductContainer = require('./NewProductContainer');

var DashboardContainer = React.createClass({
	getInitialState: function() {
		return {	user: null	};
	},
	componentDidMount: function() {
		if(this.props.user === null) this.props.updateAppState('login');
	},
	render: function() {
		return <div>Welcome, {this.props.user.uid}</div>
	}
});

module.exports = DashboardContainer;
var React = require('react');

var Header = React.createClass({
	getInitialState: function() {
    	return {
      		height: 0
    	};
  	},
	componentDidMount: function() {
    	this.setState({
      		height: ($(window).pageYOffset())
    	});
  	},
	render: function() {
		var top = {
      		marginTop: this.state.height + 'px'
    	};

		var bar = <div className="textWhite text24 bgColorSoftOrange p10">Financial<span className="textBrown">Graphs</span></div>
		var bar1 = <div className="a"/>
		var bar2 = <div className="b"/>

		return (
			<div style={top}>
				{bar}
				{bar1}
				{bar2}
			</div>
		);
	}
});

module.exports = Header;
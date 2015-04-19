/** @jsx React.DOM */
var React = require('react');

var Header = React.createClass({displayName: 'Header',
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

		var bar = React.DOM.div({className: "textWhite text24 bgColorSoftOrange p10"}, "Financial", React.DOM.span({className: "textBrown"}, "Graphs"))
		var bar1 = React.DOM.div({className: "a"})
		var bar2 = React.DOM.div({className: "b"})

		return (
			React.DOM.div({style: top}, 
				bar, 
				bar1, 
				bar2
			)
		);
	}
});

module.exports = Header;
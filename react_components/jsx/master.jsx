var React = require('react/addons');

var Header = require('./header/Header.js');

var inf = Number.POSITIVE_INFINITY;
var N = 10;
var M = N * N;

var currencyCode = ["USD", "EUR", "AED", "JPY", "HKD", "CHF", "AUD", "GBP", "MXN", "SGD"];
var openExchangeData = [];

var exchangeRates = [];

var weightedMatrix = [];

var nodes = [];
var edges = [];
var weightLabels = [];
var example;
var data;

// Use jQuery.ajax to get the latest exchange rates, 

var populateExchangeRates = function() {

	// init empty matrix
	for(var i=0; i<N; i++) {
	    exchangeRates[i] = [];
	    for(var j=0; j<N; j++) {
	        exchangeRates[i][j] = 0;
	    }
	}

	for (var i = 0; i < N; i++) {
		for (var j = 0; j < N; j++) {
			exchangeRates[i][j] = openExchangeData[i].rates[currencyCode[j]];
		}
	}
}

var populateWeightedMatrix = function() {

	// init empty matrix
	for(var i=0; i<N; i++) {
	    weightedMatrix[i] = [];
	    for(var j=0; j<N; j++) {
	        weightedMatrix[i][j] = 0;
	    }
	}

	// compute negative log of all exchange rates, use as edge weights
	for(var i = 0; i < N-1; i++) {
		for(var j = 0; j < N-1; j++) {
			if(i == j) {
				weightedMatrix[i][j] = 0;
			} else {
				if(exchangeRates[i][j] == 0) weightedMatrix[i][j] = inf;
				else weightedMatrix[i][j] = -(Math.log(exchangeRates[i][j]));
			}
		}
	}

	// add non-weighted edge from new vertex to all vertices in G
	for(var j = 0; j < N-1; j++) {
		weightedMatrix[N-1][j] = 0;
	}
	
	for(var i = 0; i < N-1; i++) {
		weightedMatrix[i][N-1] = inf;
	}
}

var distance = [];
var pre = [];

var edgeWeights = [];

var negativeCycle = function() {

	// init empty matrix
	for(var i=0; i<N; i++) {
	    edgeWeights[i] = [];
	    for(var j=0; j<N; j++) {
	        edgeWeights[i][j] = 0;
	    }
	}

	var pathWeight = 0;
	
	for (var node = 0; node < N; node++) {
		distance[node] = inf;
		pre[node] = -1;
	}
	
	// set source vertex distance to zero
	distance[N-1] = 0;
	
	for (var node = 0; node < N; node++) {
		for (var src = 0; src < N; src++) {
			for (var dest = 0; dest < N; dest++) {
				if (weightedMatrix[src][dest] != inf)
                {
					// relaxation step
                    if (distance[dest] > distance[src] 
                            + weightedMatrix[src][dest]) {
                    	distance[dest] = distance[src]
                                + weightedMatrix[src][dest];
                    	pre[dest] = src;
                    }
                }
			}
		}
	}
	
	var negCycleStack = new Array();
	
	var count = 0;

	for (var src = 0; src < N; src++) {
		for (var dest = 0; dest < N; dest++) {
			if (weightedMatrix[src][dest] != inf) {
                if (distance[dest] > distance[src]
                       + weightedMatrix[src][dest]) {
                	// NEGIATIVE CYCLE DETECTED
                	var init = dest;
                	var current = pre[init];
                	
                	negCycleStack.push(current);
                	
                	// maintain stack to reverse order of path
                	var cycle = 0;
                	while (current != init && cycle < 10) {
                		current = pre[current];
                		negCycleStack.push(current);
                		cycle++
                	}
                	
                	// print in correct order
                	while (negCycleStack.length != 0) {
                		var currentIndex = negCycleStack.pop();
                		if(negCycleStack.length > 0) {
                			var i = currentIndex;
                			var j = negCycleStack[negCycleStack.length-1];
                			var weight = exchangeRates[i][j]
                			edgeWeights[i][j] = weight;
                		}
                	}
                	return
                }
            }
    	}
    }
}

var nodeCoordinates = [];

function populateNodeCoordinates() {
	var rowLength = Math.sqrt(N-1);
	for (var i = 0; i < rowLength; i++) {
		for (var j = 0; j < rowLength; j++) {
			var shiftX = (j%2) * 100
			var node = {"x":200*i+100 + shiftX, "y":100*j+100};
			nodeCoordinates.push(node);
		}
	}
}

var drawGraph = function() {
	var nodes = [];
	var edges = [];
	var weightLabels = [];

	for (var i = 0; i < N-1; i++) {
		var x = i * 100;
		nodes.push(	<svg x={nodeCoordinates[i].x-25} y={nodeCoordinates[i].y-25} width="50" height="50">
						<circle fill="#1ABCF2" cx="25" cy="25" r="25"/>
						<text x="25" y="30" textAnchor= "middle" width="50" height="50" fontFamily="Verdana"
													fontSize="12"
													fill="#ffffff">
												{currencyCode[i]}
										</text>
					</svg>);
		for (var j = 0; j < N-1; j++) {

			var roundedLabel = edgeWeights[i][j].toFixed(3);

			if (edgeWeights[i][j] != 0) {

				var x1 = nodeCoordinates[i].x;
				var x2 = nodeCoordinates[j].x;
				var y1 = nodeCoordinates[i].y;
				var y2 = nodeCoordinates[j].y;

				var height = Math.abs(y2-y1);
				var width = Math.abs(x2-x1);
				weightX = Math.min(x1, x2) + width/2 - 35;
				weightY = Math.min(y1, y2) + height/2 - 15;



				edges.push(	<line x1={x1}
								y1={y1}
								x2={x2}
								y2={y2}
								stroke="#344A5F"
								strokeWidth="2" />);

				weightLabels.push(	<svg width="70" height="30" x={weightX} y={weightY}>
										<rect width="70" height="30" rx="15" ry="15" x="0" y="0" fill="#1ABC9C" />
										<text x="35" textAnchor= "middle" width="70" y="20" fontFamily="Verdana"
													fontSize="12"
													fill="#ffffff">
												{roundedLabel}
										</text>
									</svg>);
			}
		}
	}
	return {nodes: nodes, edges: edges, weightLabels: weightLabels};
}

var SVGComponent = React.createClass({
	getInitialState: function() {

		// init empty matrix
		for(var i=0; i<N; i++) {
		    exchangeRates[i] = [];
		    for(var j=0; j<N; j++) {
		        exchangeRates[i][j] = 0;
		    }
		}

		populateWeightedMatrix();
		negativeCycle();
		populateNodeCoordinates();
		return drawGraph();
	},
	componentDidMount: function() {
		var requestNumber = 0;
		var getExchangeRate = function(context) {
			$.ajax({
				url: 'https://openexchangerates.org/api/latest.json?app_id=d3ee65deb8834a1f9d35e3481df50263&base=' + currencyCode[requestNumber], 
				dataType: 'json', 
				success: function(json) { 
					openExchangeData[requestNumber] = json;
					requestNumber++;
					if(requestNumber < N) {
						getExchangeRate(context);
					} else {
						populateExchangeRates()
						populateWeightedMatrix();
						negativeCycle();
						populateNodeCoordinates();
						context.setState(drawGraph())
					}
				}.bind(this), 
			});
		}
		getExchangeRate(this);
	},
    render: function() {
        return <svg height="1000" width={this.props.width}>{this.state.edges}{this.state.nodes}{this.state.weightLabels}</svg>;
    }
});

var MasterContainer = React.createClass({
	render: function() {
		console.log(example);
		return (<SVGComponent width="800" />);
	}
});

React.renderComponent(<MasterContainer />, document.body);
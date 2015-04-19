var React = require('react/addons');

var Header = require('./header/Header.js');

var inf = Number.POSITIVE_INFINITY;
var N = 5;
var M = N * N;

var USD = [1,		0.82, 	0, 		0];
var EUR = [0, 		1, 		129.7, 	0];
var JPY = [0, 		0, 		1, 		12];
var TRY = [0.0008, 	0, 		0, 		1];

var order = "hello";

var exchangeRates = [USD, EUR, JPY, TRY];
var weightedMatrix = [];

var nodes = [];
var edges = [];
var weightLabels = [];

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
			if(exchangeRates[i][j] == 0) weightedMatrix[i][j] = inf;
			else weightedMatrix[i][j] = -(Math.log(exchangeRates[i][j]));
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
                	while (current != init) {
                		current = pre[current];
                		negCycleStack.push(current);
                	}
                	
                	// print in correct order
                	while (negCycleStack.length != 0) {
                		var currentIndex = negCycleStack.pop();
                		if(negCycleStack.length > 0) {
                			var i = currentIndex;
                			var j = negCycleStack[negCycleStack.length-1];
                			var weight = exchangeRates[i][j];
                			console.log("i: " + i + ", j: " + j + ", " + weight);
                			edgeWeights[i][j] = weight;

                			//order = order + exchangeRates[currentIndex][negCycleStack[negCycleStack.length-1]] + ", ";
                		}
                	}
                }
            }
        }
    }
	return false;
}

var nodeCoordinates = [	{"x":100,	"y":100}, 
						{"x":250, 	"y":100}, 
						{"x":250,  	"y":250},
						{"x":100,  	"y":250} ];

function drawGraph() {
	for (var i = 0; i < 4; i++) {
		var x = i * 100;
		nodes.push(<circle fill="purple" cx={nodeCoordinates[i].x} cy={nodeCoordinates[i].y} r="15"/>);
		for (var j = 0; j < 4; j++) {
			console.log(edgeWeights[i][j]);
			if (edgeWeights[i][j] != 0) {

				var x1 = nodeCoordinates[i].x;
				var x2 = nodeCoordinates[j].x;
				var y1 = nodeCoordinates[i].y;
				var y2 = nodeCoordinates[j].y;

				var height = Math.abs(y2-y1);
				var width = Math.abs(x2-x1);
				weightX = Math.min(x1, x2) + width/2 - 30;
				weightY = Math.min(y1, y2) + height/2 - 15;



				edges.push(	<line x1={x1}
								y1={y1}
								x2={x2}
								y2={y2}
								stroke="purple"
								strokeWidth="3" />);

				weightLabels.push(	<svg width="60" height="30" x={weightX} y={weightY}>
										<rect width="60" height="30" rx="8" ry="8" x="0" y="0" />
										<text x="30" textAnchor= "middle" width="60" y="20" fontFamily="Verdana"
													fontSize="12"
													fill="#ffffff">
												{edgeWeights[i][j]}
										</text>
									</svg>);
			}
		}
	}
}

var SVGComponent = React.createClass({
    render: function() {
        return <svg height="1000" width={this.props.width}>{edges}{nodes}{weightLabels}</svg>;
    }
});

var MasterContainer = React.createClass({
	render: function() {
		populateWeightedMatrix();
		negativeCycle();
		drawGraph();

		var content = 150;

		return (<SVGComponent width="800" />);
	}
});

React.renderComponent(<MasterContainer />, document.body);
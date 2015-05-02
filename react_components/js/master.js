/** @jsx React.DOM */
var React = require('react/addons');

var Header = require('./header/Header.js');

var inf = Number.POSITIVE_INFINITY;
var N = 10;
var M = N * N;

var currencyCode = ["USD", "EUR", "AED", "JPY", "HKD", "CHF", "AUD", "GBP", "MXN", "SGD"];
var openExchangeData = [];

var USD = [1,		0.82, 	0, 		0, 	0, 0, 0, 0, 0];
var EUR = [0, 		1, 		129.7, 	0, 	0, 0, 0, 0, 0];
var JPY = [0, 		0, 		1, 		12, 0, 0, 0, 0, 0];
var TRY = [0.0008, 	0, 		0, 		1, 	0, 0, 0, 0, 0];
var a 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
var b 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
var c 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
var d 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];
var e 	= [0, 0, 0, 0, 0, 0, 0, 0, 0];

var exchangeRates = [USD, EUR, JPY, TRY, a, b, c, d, e];
var weightedMatrix = [];

var nodes = [];
var edges = [];
var weightLabels = [];
var example;
var data;

// Use jQuery.ajax to get the latest exchange rates, 

var getExchangeRates = function() {
	System.out.println(":::: ---> " + openExchangeData[0])
	for (var i = 0; i < N; i++) {
		for (var j = 0; j < N; j++) {
			var temp = currencyCode[j];
			exchangeRates[i][j] = openExchangeData[i].rates.obj['temp'];
			System.out.println(":::: ---> " + exchangeRates[i][j])
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
                		}
                	}
                }
            }
        }
    }
	return false;
}

var nodeCoordinates = [];

function populateNodeCoordinates() {
	var rowLength = Math.sqrt(N-1);
	for (var i = 0; i < rowLength; i++) {
		for (var j = 0; j < rowLength; j++) {
			var node = {"x":150*i+100, "y":150*j+100};
			nodeCoordinates.push(node);
		}
	}
}

function drawGraph() {
	for (var i = 0; i < N-1; i++) {
		var x = i * 100;
		nodes.push(React.DOM.circle({fill: "#2A94D6", cx: nodeCoordinates[i].x, cy: nodeCoordinates[i].y, r: "15"}));
		for (var j = 0; j < N-1; j++) {
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



				edges.push(	React.DOM.line({x1: x1, 
								y1: y1, 
								x2: x2, 
								y2: y2, 
								stroke: "#344A5F", 
								strokeWidth: "3"}));

				weightLabels.push(	React.DOM.svg({width: "60", height: "30", x: weightX, y: weightY}, 
										React.DOM.rect({width: "60", height: "30", rx: "15", ry: "15", x: "0", y: "0", fill: "#717ECD"}), 
										React.DOM.text({x: "30", textAnchor: "middle", width: "60", y: "20", fontFamily: "Verdana", 
													fontSize: "12", 
													fill: "#ffffff"}, 
												edgeWeights[i][j]
										)
									));
			}
		}
	}
}

var SVGComponent = React.createClass({displayName: 'SVGComponent',
    render: function() {
        return React.DOM.svg({height: "1000", width: this.props.width}, edges, nodes, weightLabels);
    }
});

var MasterContainer = React.createClass({displayName: 'MasterContainer',

	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		var i = 0;

		var requests = [];

		for (var i = 0; i < N; i++) {
			requests[i] = function () { 
				return $.ajax({
					url: 'https://openexchangerates.org/api/latest.json?app_id=d3ee65deb8834a1f9d35e3481df50263&base=' + currencyCode[i], 
					dataType: 'json', 
					success: function(json) { 
						openExchangeData[i] = json; 
						console.log(json);
						console.log("ll" + openExchangeData[i]); 
					}.bind(this), 
				}); 
			};
		}

		for (var i = 0; i < N; i++) {
			console.log("helloooo: " + requests[i]());
		}

		$.when(requests[0]).done( function() { console.log("kljlj: " + openExchangeData[0])});
		
	},
	render: function() {
		populateWeightedMatrix();
		negativeCycle();
		populateNodeCoordinates();
		drawGraph();
		console.log(example);
		return (SVGComponent({width: "800"}));
	}
});

React.renderComponent(MasterContainer(null), document.body);
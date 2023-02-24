import file from './db2.json' assert {type: 'json'};

function startNetwork(data) {
    const container = document.getElementById("mynetwork");
    const options = {};
    new vis.Network(container, data, options);
};

const problems = file["problems"];
const reductions = file["reductions"];

var nodes = new vis.DataSet();
var edges = new vis.DataSet();

// Add new problems as nodes
for (var i = 0; i < problems.length; i++) {
    var node = JSON.parse(JSON.stringify(problems[i]));
    var node_info = JSON.stringify(node);

    nodes.add({id: problems[i]["id"], label: problems[i]["name"], category: problems[i]["category"], title: node_info}); 
};

// Add new reductions as edges
for (var i = 0; i < reductions.length; i++) {
    var edge = JSON.parse(JSON.stringify(reductions[i]));
    var edge_info = JSON.stringify(edge);

    edges.add({from: reductions[i]["input"], to: reductions[i]["output"], title: edge_info, arrows: { to: { enabled: true, type: "arrow" }}, dashes: !reductions[i]["verified"]})
};

const nodesView = new vis.DataView( nodes );
const edgesView = new vis.DataView( edges );

startNetwork({ nodes: nodesView, edges: edgesView });
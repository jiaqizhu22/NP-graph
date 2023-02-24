import file from './db2.json' assert {type: 'json'};

const container = document.getElementById("mynetwork");
const options = {};

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

var network = new vis.Network(container, { nodes: nodesView, edges: edgesView }, options);

// Search problem by exact name and highlight node
const search = document.getElementById("searchterm");
document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    const term = search.value.toLowerCase();

    const result = nodes.get({
        filter: function (item) {
            return (item.label.toLowerCase() == term);
        }
    });

    if (result[0] == undefined) {
        network.unselectAll();
    } else {
        const nodeId = result[0].id;

        var mySelection = {
            nodes: [nodeId], 
            edges: []
        };
        
        var myOptions = {
            highlightEdges: false
        };
        network.setSelection(mySelection, myOptions);
    }
    
});


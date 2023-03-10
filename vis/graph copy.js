import file from './db2.json' assert {type: 'json'};

//const nodeCheckBoxes = document.getElementsByName("nodeFilter");
const problems = file["problems"];
const reductions = file["reductions"];
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
// Add nodes
for (var i = 0; i < problems.length; i++) {
    var node = JSON.parse(JSON.stringify(problems[i]));
    var node_info = JSON.stringify(node);
    nodes.add({id: problems[i]["id"], label: problems[i]["name"], category: problems[i]["category"][0], title: node_info}); 
}
// Add edges
for (var i = 0; i < reductions.length; i++) {
    var edge = JSON.parse(JSON.stringify(reductions[i]));
    var edge_info = JSON.stringify(edge);
    edges.add({from: reductions[i]["input"], to: reductions[i]["output"], title: edge_info, arrows: { to: { enabled: true, type: "arrow" }}, dashes: !reductions[i]["verified"]})
}

// Create network
const container = document.getElementById("mynetwork");
var data = {
    nodes: nodes,
    edges: edges
};
const options = {};
var network = new vis.Network(container, data, options);

let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-btn");

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    var query = searchInput.value.toLowerCase();
    if (!query) {
        network.unselectAll();
        return;
    }
    let searchStrings = query.split(" ");

    let matchingNodes = new vis.DataSet();
    let nodes = data.nodes.get();

    for (let n = 0; n < searchStrings.length; n++) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].label.toLowerCase().includes(searchStrings[n]) || nodes[i].title.toLowerCase().includes(searchStrings[n])) {
                matchingNodes.add(nodes[i]);
            }
        }
    }
    // Highlight matching nodes and their edges
    let matchingNodeIds = matchingNodes.getIds();
    network.selectNodes(matchingNodeIds);
    
});


// network.selectEdges(network.getConnectedEdges(matchingNodeIds));


 
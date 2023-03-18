import file from './db2.json' assert {type: 'json'};

//const nodeCheckBoxes = document.getElementsByName("nodeFilter");

const displayResult = document.getElementById("myresult");

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
    edges.add({from: reductions[i]["input"], to: reductions[i]["output"], weight: reductions[i]["weight"], title: edge_info, arrows: { to: { enabled: true, type: "arrow" }}, dashes: !reductions[i]["implemented"]});
}

// Create network
const container = document.getElementById("mynetwork");
var data = {
    nodes: nodes,
    edges: edges
};
const options = {
    nodes: {
        borderWidth: 2,
        shape: "circle",
        color: {
          border: "#2B7CE9", // default color for unselected nodes
          background: "#97C2FC", // default color for unselected nodes
        },
        font: {
          color: "#343434"
        },
        scaling: {
          min: 10,
          max: 30,
        },
        labelHighlightBold: true
    },
    edges: {
        color: {
            color: "#97C2FC", 
            highlight: "green",
            hover: "cyan",
            opacity: 0.9,
        },
        selectionWidth: 4.5,
    },
    interaction: {
        hover: true,
        tooltipDelay: 0,
        zoomView: true,
        dragView: false,
        multiselect: true,
    },
    physics: {
        enabled: true
    },
    nodes: {
        color: {
          background: "#97C2FC"
        }
    }
};
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
    

    // Highlight matching nodes
    let matchingNodeIds = matchingNodes.getIds();
    network.selectNodes(matchingNodeIds, false);

    let matchingNodeData = problems.filter(p => matchingNodeIds.includes(p["id"]));
    displayResult.innerHTML = JSON.stringify(matchingNodeData);
});

let findPathButton = document.getElementById("find-path");

function findNodeIdByLabel(targetLabel) {
    let nodes = data.nodes.get();
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].label.toLowerCase() === (targetLabel)) {
        return nodes[i].id;
      }
    }
    return null;
}

function findNodeById(id) {
    let nodes = data.nodes.get();
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        return nodes[i];
      }
    }
    return null;
}

function getConnectedEdgesByNode(id, edges) {
    let res = [];
    for (let i = 0; i < edges.length; i++) {
        if (edges[i].from == id && edges[i]["dashes"] === false) {
            res.push(edges[i]);
        }
    }
    return res;
}


function dijkstra(startNodeId, endNodeId, nodes, edges) {
    let distances = {};
    for (const node of nodes) {
        distances[node.id] = Infinity;
    }
    distances[startNodeId] = 0;
    let prev = {};

    let queue = [];
    queue.push(startNodeId);
    while (queue.length > 0) {
        let current = queue.shift();
        let connectedEdges = getConnectedEdgesByNode(current, edges);

        let tempDistance = distances[current] + 1;
        for (const edge of connectedEdges) {
            let neighbour = edge.to;

            if (tempDistance < distances[neighbour]) {
                distances[neighbour] = tempDistance;
                prev[neighbour] = current;
                queue.push(neighbour);
            }
        }
    }
    // test if end node was ever reached
    
    if (distances[endNodeId] === Infinity) {
        return [];
    }
    /*
    return distances[endNodeId];
    */

    let path = [];
    //let startNode = getNodeById(startNodeId);
    //let endNode = getNodeById(endNodeId);

    let end = endNodeId;
    while (end !== startNodeId) {
        path.unshift(end.toString());
        end = prev[end];
    }
    path.unshift(startNodeId);
    //let res = path.map(findNodeById);
    return path;
}

function getEdgesFromPath(path) {
    let edges = [];

    for (let i = 0; i < path.length - 1; i++) {
        let node1 = path[i];
        let node2 = path[i + 1];
    
        let connectedEdges = network.getConnectedEdges(node1);
        for (let edge of connectedEdges) {
            let edgeData = data.edges.get(edge);
            if (edgeData.from == node1 && edgeData.to == node2) {
                edges.push(edgeData.id);
                break;
            }
        }
    }
    return edges;
}

  
findPathButton.addEventListener("click", function(event) {
    event.preventDefault();
    let source = document.getElementById("from-node").value.toLowerCase();
    let target = document.getElementById("to-node").value.toLowerCase();
    let startNodeId = findNodeIdByLabel(source);
    let endNodeId = findNodeIdByLabel(target);
    let nodes = data.nodes.get();
    let edges = data.edges.get();

    let path = dijkstra(startNodeId, endNodeId, nodes, edges);
    
    let edges_need_highlight = getEdgesFromPath(path);
    network.selectEdges(edges_need_highlight);
});


// 

 
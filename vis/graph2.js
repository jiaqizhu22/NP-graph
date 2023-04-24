import file from './db2.json' assert {type: 'json'};
import * as helper from './helper.js';

const problems = file["problems"];
const reductions = file["reductions"];
var nodes = new vis.DataSet();
var edges = new vis.DataSet();

// Add nodes
for (let i = 0; i < problems.length; i++) {
    let node = JSON.parse(JSON.stringify(problems[i]));
    let node_info = JSON.stringify(node).replace(/:/g, ': ').replace(/\\n/g, '').replace(/,/g, ',\n');
    nodes.add({id: problems[i]["id"], label: problems[i]["name"], category: problems[i]["category"][0], title: node_info}); 
}

// Add edges
for (let i = 0; i < reductions.length; i++) {
    let edge = JSON.parse(JSON.stringify(reductions[i]));
    let edge_info = JSON.stringify(edge).replace(/:/g, ': ').replace(/,/g, ',\n');
    edges.add({
        from: reductions[i]["input"], 
        to: reductions[i]["output"], 
        weight: reductions[i]["weight"], 
        title: edge_info, 
        arrows: { to: { enabled: true, type: "arrow" }}, 
        dashes: !reductions[i]["implemented"]
    });
}

// Create network
const container = document.getElementById("mynetwork");
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    clickToUse: false,
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
            highlight: "blue",
            hover: "cyan",
            opacity: 0.9,
        },
        selectionWidth: 4,
        smooth: {
            type: 'discrete',
            forceDirection: 'none'
        },
    },
    interaction: {
        hover: true,
        tooltipDelay: 0,
        zoomView: true,
        zoomSpeed: 0.2,
        dragView: true,
        multiselect: true,
        navigationButtons: true,
    },
    physics: {
        enabled: false
    },
    nodes: {
        color: {
          background: "#97C2FC"
        }
    }
};
var network = new vis.Network(container, data, options);

// By default, select all nodes and edges
var allNodeIds = network.body.data.nodes.getIds();
var allEdgeIds = network.body.data.edges.getIds();
network.selectNodes(allNodeIds);

// Buttons
const searchNodeButton = document.getElementById("search-node-button");
const searchEdgeButton = document.getElementById("search-edge-button");
const findPathButton = document.getElementById("find-path");

// Highlight matching nodes only
const displayResult = document.getElementById("my-node-result");
const displayEdgeResult = document.getElementById("my-edge-result");
var matchingNodeIds = allNodeIds;
var matchingEdgeIds = allEdgeIds;

/*
function matchingNodes(node, searchQuery) {
    let target = Object.keys(searchQuery).length;
    let matchingFieldCount = 0;
    for (let field in searchQuery) {
        if (field === "problemName") {
            let fieldKeywords = searchQuery[field];
            if (fieldKeywords.includes(node["name"].toLowerCase())) {
                matchingFieldCount++;
            } else {
                let nodeKeywords = node["name"].toLowerCase().split(" ");
                for (let i = 0; i < node["also_known_as"].length; i++) {
                    nodeKeywords.push(node["also_known_as"][i].toLowerCase());
                }
                for (let i = 0; i < fieldKeywords.length; i++) {
                    if (nodeKeywords.includes(fieldKeywords[i])) {
                        matchingFieldCount++;
                    }
                }
            }
        }
        if (field === "paperTitle") {
            for (let i = 0; i < node["introduced_at"].length; i++) {
                let paper = node["introduced_at"][i];
                let fieldKeywords = searchQuery[field];
                if (fieldKeywords.includes(paper["title"].toLowerCase())) {
                    matchingFieldCount++;
                } else {
                    let titleKeywords = paper["title"].toLowerCase().split(" ");
                    for (let i = 0; i < fieldKeywords.length; i++) {
                        if (titleKeywords.includes(fieldKeywords[i])) {
                            matchingFieldCount++;
                        }
                    }
                }
            }
        }
        if (field === "author") {
            for (let i = 0; i < node["introduced_at"].length; i++) {
                let paper = node["introduced_at"][i];
                let fieldKeywords = searchQuery[field];
                if (fieldKeywords.includes(paper["author"].toLowerCase())) {
                    matchingFieldCount++;
                } else {
                    let titleKeywords = paper["author"].toLowerCase().split(" ");
                    for (let i = 0; i < fieldKeywords.length; i++) {
                        if (titleKeywords.includes(fieldKeywords[i])) {
                            matchingFieldCount++;
                        }
                    }
                }
            }
        }
        if (field === "categories") {
            for (let i = 0; i < node["category"].length; i++) {
                let category = node["category"][i].toLowerCase();
                let fieldKeywords = searchQuery[field];
                if (fieldKeywords.includes(category)) {
                    matchingFieldCount++;
                }
            }
        }
        if (field === "implemented" && node.implemented.toString() === searchQuery[field]) {
            matchingFieldCount++;
        }
    }
    if (matchingFieldCount === target) {
        return true;
    }
    return false;
}


function matchingEdges(edge, searchQuery) {
    let target = Object.keys(searchQuery).length;
    let matchingFieldCount = 0;
    for (let field in searchQuery) {
        if (field === "paperTitle") {
            for (let i = 0; i < edge["introduced_at"].length; i++) {
                let paper = edge["introduced_at"][i];
                let fieldKeywords = searchQuery[field];
                if (fieldKeywords.includes(paper["title"].toLowerCase())) {
                    matchingFieldCount++;
                } else {
                    let titleKeywords = paper["title"].toLowerCase().split(" ");
                    for (let i = 0; i < fieldKeywords.length; i++) {
                        if (titleKeywords.includes(fieldKeywords[i])) {
                            matchingFieldCount++;
                        }
                    }
                }
            }
        }
        if (field === "author") {
            for (let i = 0; i < edge["introduced_at"].length; i++) {
                let paper = edge["introduced_at"][i];
                let fieldKeywords = searchQuery[field];
                if (fieldKeywords.includes(paper["author"].toLowerCase())) {
                    matchingFieldCount++;
                } else {
                    let titleKeywords = paper["author"].toLowerCase().split(" ");
                    for (let i = 0; i < fieldKeywords.length; i++) {
                        if (titleKeywords.includes(fieldKeywords[i])) {
                            matchingFieldCount++;
                        }
                    }
                }
            }
        }
        if (field === "implemented" && edge.implemented.toString() === searchQuery[field]) {
            matchingFieldCount++;
        }
        if (field === "verified" && edge.verified.toString() === searchQuery[field]) {
            matchingFieldCount++;
        }
    }
    if (matchingFieldCount === target) {
        return true;
    }
    return false;
}
*/

function filterByPaper(node, keywords) {
    let papers = node.introduced_at;
    if 
};

// Search for nodes
searchNodeButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get all search keywords
    // A list of substrings or []
    let problemName = helper.trimSpace(document.getElementById("problem-name").value);
    console.log(problemName);
    let paperTitle = helper.trimSpace(document.getElementById("paper-name").value);
    console.log(paperTitle);
    let authorName = helper.trimSpace(document.getElementById("author-name").value);
    console.log(authorName);
    let algorithms = helper.trimSpace(document.getElementById("algorithms").value);
    console.log(algorithms);
    let categories = helper.trimSpace(document.getElementById("categories").value);
    console.log(categories);
    // Date in format of yyyy-mm-dd or empty as ""
    let fromDate = document.getElementById("from-date").value;
    console.log(fromDate);
    let toDate = document.getElementById("to-date").value;
    console.log(toDate);
    // true or false
    let implemented = document.getElementById("implemented").value.toLowerCase();
    console.log(implemented);

    let matchingNodes = problemName.length === 0 ? problems : problems.filter(p => helper.strMatchSubstr(p.name, problemName) || helper.listStrMatchSubstr(p.also_known_as, problemName));
    matchingNodes = paperTitle.length === 0 ? matchingNodes : matchingNodes.filter(node => filterByPaper(node));

    
    if (Object.keys(searchQuery).length === 1 && searchQuery["implemented"] === "true") {
        matchingNodeIds = [];
        displayResult.innerHTML = "";
        network.selectNodes(allNodeIds);
    } else {
        // Find nodes matching searchQuery
        for (let i = 0; i < problems.length; i++) {
            let node = problems[i];
            //let match = matchingNodes(node, searchQuery);
            // if (match) {
            //     matchingNodeIds.push(node["id"]);
            // }
        }

        if (matchingNodeIds.length > 0) {
            network.selectNodes(matchingNodeIds, false);

            // Display result on page
            let matchingNodeData = problems.filter(p => matchingNodeIds.includes(p["id"])).map(p => {
                var paperList = p.introduced_at.map(function(paper) {
                    return `title: ${paper.title}, author: ${paper.author}, publish date: ${paper['publish date']}`;
                }).join("<br>");

                var div = `<div class="result-field">
                    <p>id: ${p.id}&nbsp;
                    name: ${p.name}&nbsp;
                    also known as: ${p.also_known_as}<br>
                    introduced at:<br>${paperList}<br>
                    parameters: ${p.parameters}&nbsp;
                    algorithms: ${p.algorithms}&nbsp;
                    category: ${p.category}&nbsp;
                    implemented: ${p.implemented}
                    </p>
                </div>
                `;
                return div;
            }).join(""); //remove comma
            displayResult.innerHTML = matchingNodeData;
        } else {
            displayResult.innerHTML = "";
            network.unselectAll();
        } 
    }
});

searchEdgeButton.addEventListener("click", function(event) {
    event.preventDefault();

    let paperTitle = document.getElementById("edge-paper-name");
    let authorName = document.getElementById("edge-author-name");
    let algorithms = document.getElementById("edge-algorithm");
    let implemented = document.getElementById("edge-implemented");
    let verified = document.getElementById("edge-verified");

    let searchQuery = {};
    if (paperTitle.value !== "") {
        searchQuery["paperTitle"] = helper.trimSpace(paperTitle.value);
    }
    if (authorName.value !== "") {
        searchQuery["author"] = helper.trimSpace(authorName.value);
    }
    if (algorithms.value !== "") {
        searchQuery["algorithms"] = helper.trimSpace(algorithms.value);
    }
    if (verified.value) {
        searchQuery["verified"] = verified.value.toLowerCase();
    }
    if (implemented.value) {
        searchQuery["implemented"] = implemented.value.toLowerCase();
    }
    console.log(searchQuery);

    if (Object.keys(searchQuery).length === 2 && searchQuery["implemented"] === "true" && searchQuery["verified"] === "true") {
        matchingEdgeIds = [];
        displayEdgeResult.innerHTML = "";
        network.selectEdges(allEdgeIds);
    } else {
        // Find nodes matching searchQuery
        for (let i = 0; i < reductions.length; i++) {
            let edge = reductions[i];
            let match = matchingEdges(edge, searchQuery);
            if (match) {
                //matchingEdgeIds.push(edgeId);
            }
        }

        if (matchingNodeIds.length > 0) {
            network.selectNodes(matchingNodeIds, false);

            // Display result on page
            let matchingNodeData = problems.filter(p => matchingNodeIds.includes(p["id"])).map(p => {
                var paperList = p.introduced_at.map(function(paper) {
                    return `title: ${paper.title}, author: ${paper.author}, publish date: ${paper['publish date']}`;
                }).join("<br>");

                var div = `<div class="result-field">
                    <p>id: ${p.id}&nbsp;
                    name: ${p.name}&nbsp;
                    also known as: ${p.also_known_as}<br>
                    introduced at:<br>${paperList}<br>
                    parameters: ${p.parameters}&nbsp;
                    algorithms: ${p.algorithms}&nbsp;
                    category: ${p.category}&nbsp;
                    implemented: ${p.implemented}
                    </p>
                </div>
                `;
                return div;
            }).join(""); //remove comma
            displayResult.innerHTML = matchingNodeData;
        } else {
            displayResult.innerHTML = "";
            network.unselectAll();
        } 
    }
});



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


 
import file from '../db2.json' assert {type: 'json'};

const nodeCheckBoxes = document.getElementsByName("nodeFilter");

const container = document.getElementById("mynetwork");
const options = {};

const problems = file["problems"];
const reductions = file["reductions"];

//var render = function(problems, reductions) 
var nodes = new vis.DataSet();
var edges = new vis.DataSet();

// Add new problems as nodes
for (var i = 0; i < problems.length; i++) {
    var node = JSON.parse(JSON.stringify(problems[i]));
    var node_info = JSON.stringify(node);

    nodes.add({id: problems[i]["id"], label: problems[i]["name"], category: problems[i]["category"][0], title: node_info}); 
};

// Add new reductions as edges
for (var i = 0; i < reductions.length; i++) {
    var edge = JSON.parse(JSON.stringify(reductions[i]));
    var edge_info = JSON.stringify(edge);

    edges.add({from: reductions[i]["input"], to: reductions[i]["output"], title: edge_info, arrows: { to: { enabled: true, type: "arrow" }}, dashes: !reductions[i]["verified"]})
};

const nodesFilterValues = {
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    F: true,
};

const nodesFilter = (node) => {
    return nodesFilterValues[node.category];
};

const nodesView = new vis.DataView( nodes, { filter: nodesFilter} );
const edgesView = new vis.DataView( edges );

nodeCheckBoxes.forEach((checkbox) => checkbox.addEventListener("change", (e) => {
    const { value, checked } = e.target;

    if (value in nodesFilterValues) {
        nodesFilterValues[value] = checked;
    }

    nodesView.refresh();
}));



var network = new vis.Network(container, { nodes: nodesView, edges: edgesView }, options);

// Search problem by exact name and highlight node
// const search = document.getElementById("searchterm");

var handleSearch = function(event) {
    event.preventDefault();
    var searchTerm = event.target.elements['search'].value;
    var tokens = searchTerm
                  .toLowerCase()
                  .split(' ')
                  .filter(function(token){
                    return token.trim() !== '';
                  });

    if (tokens.length) {
        var searchTermRegex = new RegExp(tokens.join('|'), 'gim');
        var filteredListNodes = problems.filter(function(p){
            var s = '';
            for (var key in p) {
                if (p.hasOwnProperty(key) && p[key] != []) {
                    s += p[key].toString().toLowerCase().trim() + ' ';
                }
            }
            return s.match(searchTermRegex);
        });
        var filteredListEdges = reductions.filter(function(p){
            var s = '';
            for (var key in p) {
                if (p.hasOwnProperty(key) && p[key] != []) {
                    s += p[key].toString().toLowerCase().trim() + ' ';
                }
            }
            return s.match(searchTermRegex);
        });
        console.log(filteredListNodes);
        console.log(filteredListEdges);
    }
}
document.addEventListener('submit', handleSearch);
/*
document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    const term = search.value.toLowerCase();
    const words = term.split(' ');
    console.log(words);
    let matched_problems = []; 
    for (var i = 0; i < problems.length; i++) {
        for (var j = 0; j < words.length; j++) {
            const regex = new RegExp(words[j]);
            if (regex.test(problems[i]["name"]) === true) {
                console.log(problems[i]);
            }
        }    
    }
    
    
    const result = nodes.get({
        filter: function (item) {
            return (item.label.toLowerCase() == term);
        }
    });
    
    // console.log(result[0]);

    
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
*/

import json from "./db.json" assert { type: "json" };

const nodeFilterSelector = document.getElementById("nodeFilterSelect");

const edgeFilters = document.getElementsByName("edgesFilter");

function startNetwork(data) {
    const container = document.getElementById("mynetwork");
    const options = {};
    new vis.Network(container, data, options);
}

const problems = json["problems"];
const reductions = json["reductions"];

var nodes = new vis.DataSet();
var edges = new vis.DataSet();

for (var i = 0; i < problems.length; i++) {
    var copy = JSON.parse(JSON.stringify(problems[i]));
    delete copy["id"];
    var st = JSON.stringify(copy);
    nodes.add({id: problems[i]["id"], label: problems[i]["name"], category: problems[i]["category"], title: st}); 
}
for (var i = 0; i < reductions.length; i++) {
    edges.add({from: reductions[i]["input"], to: reductions[i]["output"], arrows: { to: { enabled: true, type: "arrow" }}})
}

// create a network
/* 
var container = document.getElementById("mynetwork");
var data = {
    nodes: nodes,
    edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);
*/


/**
 * filter values are updated in the outer scope.
 * in order to apply filters to new values, DataView.refresh() should be called
 */
let nodeFilterValue = "";
const edgesFilterValues = {
   input: true,
   output: true,
   friend: true,
};
/*
filter function should return true or false
based on whether item in DataView satisfies a given condition.
*/
const nodesFilter = (node) => {
    if (nodeFilterValue === "") {
        return true;
    }
    switch (nodeFilterValue) {
        case "A":
        return node.category === "A";
        case "B":
        return node.category === "B";
        case "C":
        return node.category === "C";
        case "D":
        return node.category === "D";
        default:
        return true;
    }
};

const nodesView = new vis.DataView(nodes, { filter: nodesFilter });
const edgesView = new vis.DataView(edges);


const form1 = document.getElementById("form1");
form1.addEventListener('submit', (e) => {
    e.preventDefault();
    const p = document.getElementById("searchterm").value;
    console.log(p);
    nodes.update({id: 10, label: p});
    network.redraw();
});

const tick1 = document.getElementById("tick1");
tick1.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        nodes.update({id: 11, label: "Yes"});
        network.redraw();
    } else {
        nodes.update({id: 11, label: "No"});
        network.redraw();
    }
})

var select = document.getElementById("select");
select.addEventListener('change', (e) => {
    var text = select.options[select.selectedIndex].text;
    for (var i = 0; i < problems.length; i++) { 
        var h = false;
        if (text === "Implementation Available") {       
            if (problems[i]["implemented"] === false) {
                h = true;
            }      
        } else if (text === "Implementation Unavailable") {       
            if (problems[i]["implemented"] === true) {
                h = true;
            }     
        }
        data.nodes.update([{id: problems[i]["id"], hidden: h}]);
    }
    network.redraw();
})

nodeFilterSelector.addEventListener("change", (e) => {
// set new value to filter variable
nodeFilterValue = e.target.value;
/*
        refresh DataView,
        so that its filter function is re-calculated with the new variable
    */
nodesView.refresh();
});

edgeFilters.forEach((filter) =>
filter.addEventListener("change", (e) => {
    const { value, checked } = e.target;
    edgesFilterValues[value] = checked;
    edgesView.refresh();
})
);

startNetwork({ nodes: nodesView, edges: edgesView });
  
import json from "./db.json" assert { type: "json" };

const nodeFilters = document.getElementsByName("nodeFilter");

function startNetwork(data) {
    const container = document.getElementById("mynetwork");
    const options = {};
    new vis.Network(container, data, options);
};

const problems = json["problems"];
const reductions = json["reductions"];

var nodes = new vis.DataSet();
var edges = new vis.DataSet();

for (var i = 0; i < problems.length; i++) {
    // get a copy of the problem info
    var copy = JSON.parse(JSON.stringify(problems[i]));
    // delete irrelavant/empty fields
    delete copy["id"];
    if (copy["also_known_as"] === []) { delete copy["also_known_as"]; }
    if (copy["introduced_at"] === []) { delete copy["introduced_at"]; }
    if (copy["parameters"] === []) { delete copy["parameters"]; }
    if (copy["algorithms"] === []) { delete copy["algorithms"]; }

    var st = JSON.stringify(copy);
    nodes.add({id: problems[i]["id"], label: problems[i]["name"], category: problems[i]["category"], title: st}); 
};

for (var i = 0; i < reductions.length; i++) {
    edges.add({from: reductions[i]["input"], to: reductions[i]["output"], arrows: { to: { enabled: true, type: "arrow" }}})
};

/**
 * filter values are updated in the outer scope.
 * in order to apply filters to new values, DataView.refresh() should be called
 */

const nodesFilterValues = {
   A: true,
   B: true,
   C: true,
   D: true,
};

const nodesFilterValues2 = {
    ImplementationAvailable: true,
    ImplementationAUnavailable: true,
};

const nodesFilter = (node) => {
    return nodesFilterValues[node.category];
};

const nodesFilter2 = (node) => {
    return nodesFilterValues2[node.implemented];
};

const nodesView = new vis.DataView(nodes, { filter: nodesFilter, nodesFilter2 });
const edgesView = new vis.DataView(edges);


nodeFilters.forEach((filter) => filter.addEventListener("change", (e) => {
    const { value, checked } = e.target;
    if (value in nodesFilterValues) {
        nodesFilterValues[value] = checked;
    } else if (value in nodesFilterValues2) {
        nodesFilterValues2[value] = checked;
    }
    nodesView.refresh();
}));

startNetwork({ nodes: nodesView, edges: edgesView });
  
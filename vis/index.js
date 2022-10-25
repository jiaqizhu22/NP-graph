import json from "./db.json" assert { type: "json" };

console.log(json);
const problems = json["problems"];
const reductions = json["reductions"];

var nodes = new vis.DataSet();
var edges = new vis.DataSet();

for (var i = 0; i < problems.length; i++) {
  nodes.add({id: problems[i]["id"], label: problems[i]["name"]});
}
for (var i = 0; i < reductions.length; i++) {
  edges.add({from: reductions[i]["input"], to: reductions[i]["output"], arrows: { to: { enabled: true, type: "arrow" }}})
}

// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);

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

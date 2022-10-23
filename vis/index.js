// fake data
const json = {
  "problems": [
      {
          "name": "3SAT",
          "id": "1",
          "also_known_as": ["Satisfiability with at least 3 parameters","3Sat"],
          "introduced_at": [""],
          "parameters" : [["u","number of variables"], ["k","number of clauses"]],
          "algorithms": [],
          "category": ["A"]
      }, {
          "name": "Directed Hamiltonian Path",
          "id": "2",
          "also_known_as": [],
          "introduced_at": [""],
          "parameters" : [["",""], ["",""]],
          "algorithms": [],
          "category": ["A", "B"]
      }, {
          "name": "Vertex Cover",
          "id": "3",
          "also_known_as": ["Satisfiability"],
          "introduced_at": [""],
          "parameters" : [["",""], ["",""]],
          "algorithms": [],
          "category": ["B"]
      }, {
          "name": "Clique",
          "id": "4",
          "also_known_as": ["Satisfiability"],
          "introduced_at": [""],
          "parameters" : [["",""], ["",""]],
          "algorithms": [],
          "category": ["B"]
      }, {
          "name": "3-Dimensional Matching",
          "id": "5",
          "also_known_as": ["Satisfiability"],
          "introduced_at": [""],
          "parameters" : [["",""], ["",""]],
          "algorithms": [],
          "category": ["B", "C"]
      }, {
          "name": "Undirected Hamiltonian Path",
          "id": "6",
          "also_known_as": [],
          "introduced_at": [""],
          "parameters" : [["",""], ["",""]],
          "algorithms": [],
          "category": ["A", "B", "C"]
      }

  ],
  "reductions": [
      {
          "input": 1,
          "output": 2,
          "introduced_at": [""],
          "formula": [["output", "complexity"]],
          "verified": true,
          "link": ""
      }, {
          "input": 1,
          "output": 3,
          "introduced_at": [""],
          "formula": [["output", "complexity"]],
          "verified": true,
          "link": ""
      }, {
          "input": 1,
          "output": 4,
          "introduced_at": [""],
          "formula": [["output", "complexity"]],
          "verified": true,
          "link": ""
      }, {
          "input": 1,
          "output": 5,
          "introduced_at": [""],
          "formula": [["output", "complexity"]],
          "verified": true,
          "link": ""
      }, {
          "input": 2,
          "output": 6,
          "introduced_at": [""],
          "formula": [["output", "complexity"]],
          "verified": true,
          "link": ""
      }, {
          "input": 1,
          "output": 6,
          "introduced_at": [""],
          "formula": [["output", "complexity"]],
          "verified": true,
          "link": ""
      }, {
          "input": 3,
          "output": 6,
          "introduced_at": [""],
          "formula": [["output", "complexity"]],
          "verified": true,
          "link": ""
      }
  ]
}


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
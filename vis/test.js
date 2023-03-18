var books = [
    {
      "title": "Cracking the coding interview",
      "subtitle":"189 programming questions and solutions",
      "author":"Gayle Laakmann McDowell",
      "category":"Programming",
      "publisher":"CareerCup, LLC"
    },
    {
      "title": "No friend but the mountains",
      "subtitle":"Writing from manu prison",
      "author":"Behrouz Boochani",
      "category":"Literature",
      "publisher":"Pan Macmillan Australia"
    },
    {
      "title": "Indian Harvest",
      "subtitle":"Classic and contemporary vegetarian dishes",
      "author":"Vikas Khanna",
      "category":"Cuisine",
      "publisher":"Bloomsbury USA"
    },
    {
      "title": "Upheaval",
      "subtitle":"Turning points for nations in crisis",
      "author":"Jared Diamond",
      "category":"Politics",
      "publisher":"Little, Brown & Company"
    },
    {
      "title": "Algorithms",
      "subtitle":"Fourth Edition",
      "author":"Robert Sedgewick, Kevin Wayne",
      "category":"Programming",
      "publisher":"Addison Wesley"
    },
    {
      "title": "How We Die",
      "subtitle":"Reflections on Life's Final Chapter",
      "author":"Sherwin B. Nuland",
      "category":"Literature",
      "publisher":"Vintage"
    },
    {
      "title": "The Circle",
      "subtitle":"",
      "author":"Dave Eggers",
      "category":"Fiction",
      "publisher":"Vintage"
    },
    {
      "title": "The Algorithm Design Manual",
      "subtitle":"",
      "author":"Steven S. Skiena",
      "category":"Programming",
      "publisher":"Springer"
    },
    {
      "title": "I Contain Multitudes",
      "subtitle":"The microbes within us and a grander view of life",
      "author":"Ed Yong",
      "category":"Science",
      "publisher":"HarperCollins"
    },
    {
      "title": "The Silkwarm",
      "subtitle":"A Cormoran Strike Novel",
      "author":"Robert Galbraith",
      "category":"Literature",
      "publisher":"Mulholland Books"
    },
    {
      "title": "Cosmos",
      "subtitle":"",
      "author":"Carl Sagan",
      "category":"Science",
      "publisher":"Ballantine Books"
    },
    {
      "title": "Comanche Moon",
      "subtitle":"",
      "author":"Larry McMurtry",
      "category":"Science",
      "publisher":"Simon & Schuster"
    },
    {
      "title": "Nine Pints",
      "subtitle":"A journey through the money, medicine, and mysteries of blook",
      "author":"Rose George",
      "category":"Science",
      "publisher":"Metropolitan books"
    },
  ]
  
  var render = function(data) {
    var app = document.getElementById('app');
    var booksHTMLString = '<ul>'+
      data.map(function(book){
        return '<li>'+
                '<strong>Title: </strong>' + book.title + '<br/>' +
                '<strong>Subtitle: </strong>' + book.subtitle + '<br/>' +
                '<strong>Author: </strong>' + book.author + '<br/>' +
                '<strong>Category: </strong>' + book.category + '<br/>' +
                '<strong>Publisher: </strong>' + book.publisher + '<br/>' +
              '</li>';
      }).join('');
      + '</ul>';

    app.innerHTML = booksHTMLString;
  }
  render(books);

  var handleSearch = function(event) {
    event.preventDefault();
    // Get the search terms from the input field
    var searchTerm = event.target.elements['search'].value;
    // Tokenize the search terms and remove empty spaces
    var tokens = searchTerm
                  .toLowerCase()
                  .split(' ')
                  .filter(function(token){
                    return token.trim() !== '';
                  });
   if(tokens.length) {
    //  Create a regular expression of all the search terms
    var searchTermRegex = new RegExp(tokens.join('|'), 'gim');
    var filteredList = books.filter(function(book){
      // Create a string of all object values
      var bookString = '';
      for(var key in book) {
        if(book.hasOwnProperty(key) && book[key] !== '') {
          bookString += book[key].toString().toLowerCase().trim() + ' ';
        }
      }
      // Return book objects where a match with the search regex if found
      return bookString.match(searchTermRegex);
    });
    // Render the search results
    render(filteredList);
   }
  };

document.addEventListener('submit', handleSearch);
document.addEventListener('reset', function(event){
    event.preventDefault();
    render(books);
})

var data = [
  {
    "src": "A",
    "dst": "B",
    "weight": [1,1,1]
  },
  {
    "src": "B",
    "dst": "C",
    "weight": [1,2,1]
  },
  {
    "src": "C",
    "dst": "D",
    "weight": [1,1,2]
  },
  {
    "src": "D",
    "dst": "G",
    "weight": [1,1,1]
  },
  {
    "src": "A",
    "dst": "E",
    "weight": [2,2,1]
  },
  {
    "src": "A",
    "dst": "F",
    "weight": [2,1,1]
  },
  {
    "src": "E",
    "dst": "D",
    "weight": [2,2,1]
  },
  {
    "src": "F",
    "dst": "D",
    "weight": [2,1,1]
  }
];

let nodes = ["A", "B", "C", "D", "E", "F", "G"];

// Test function for finding path between 2 nodes
function calculate() {
  var node1 = "A";
  var node2 = "G";

  let distances = {
    "A": [[0,0,0]],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": [],
    "G": []
  };

  let queue = [];
  queue.push("A");
  while (queue.length > 0) {
    let src = queue.shift();
    let connectedEdges = data.filter((e) => e["src"] === src);

    for (let e of connectedEdges) {
      let dst = e["dst"];
      let w = e["weight"];
      
      // no new path yet
      if (distances[dst].length === 0) {
        distances[dst].push(w);
        console.log("I pushed new distance:", w);
      } else {
        let new_path = distances[src][0];
        console.log(new_path);
        for (let i = 0; i <= 2; i++) {
          new_path[i] += w[i];
        }
        console.log("I found new path: ", new_path);
        // is this path shorter than the previous one?
        
        let shorter = true;
        for (let p of distances[dst]) {
          // compare new_path with p, if new_path is less than p, remove p

          // if p is smaller than new_path, shorter <- false; break

        }
        // if shorter then add p to the list
        // 

        for (let i = 0; i <= 2; i++) {
          if (new_path[i] <= distances[dst][0][i]) {
          }
        }
        if (shorter) {
          distances[dst][0] = new_path;
        }
      }
      if (!queue.includes(dst)) {
        queue.push(dst);
        console.log(dst);
      }
    }
  }

  console.log(queue);
  console.log(distances);
}

calculate();
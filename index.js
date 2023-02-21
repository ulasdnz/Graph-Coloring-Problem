const fs = require("fs");

// input and output file names are assigned.
const inputFilePath = "./test.txt";
const outputFileName = "./output.txt";

// 10 thousand number generated to be used as different colors.
colors = [];
for (let i = 0; i < 10000; i++) {
  colors.push(i.toString());
}

// Checks whether a node has a adjacent node which assigned to the specified "color".
// Because if any of the adjacent node has this color assigned to it, we will not use that color.
const checkColorOfEdges = (obj, color) => {
  let ret = true;
  if (obj.nodes.length > 0) {
    obj.nodes.map((e) => {
      if (e.color == color) {
        ret = false;
      }
    });
  }
  return ret;
};

// Read the input file.
let data;
try {
  data = fs.readFileSync(inputFilePath, "utf8");
} catch (err) {
  console.error(err);
}

// Split file data into lines
var fileData = data.split("\n");

// Nodes(objects) will be push this "Nodes" array.
let Nodes = [];

// Gets the vertex number in order to create objects of that size.
let vertexNumber = getVertexNumber(fileData[0]);

// Create nodes(objects) and give properties to it
for (let i = 0; i < vertexNumber; i++) {
  Nodes.push({ id: i + 1, nodes: [], color: "", visited: false });
}

fileData = fileData.filter((e) => e !== "");

// Loop through lines to connect the nodes.
for (let i = 1; i < fileData.length; i++) {
  let vertices = parseVertices(fileData[i]);
  let vertex1 = vertices.vertex1;
  let vertex2 = vertices.vertex2;

  if (!Nodes[vertex1 - 1]?.nodes.includes(Nodes[vertex2 - 1]))
    Nodes[vertex1 - 1]?.nodes.push(Nodes[vertex2 - 1]);
  if (!Nodes[vertex2 - 1]?.nodes.includes(Nodes[vertex1 - 1]))
    Nodes[vertex2 - 1]?.nodes.push(Nodes[vertex1 - 1]);
}

// Assign colors by using greedy method.
function setColor(node) {
  for (let i = 0; i < colors.length; i++) {
    if (node.color === "" && checkColorOfEdges(node, colors[i])) {
      node.color = colors[i];
      break;
    }
  }
}

// Breadth first search algorithm will be one of the methods we will use to assign colors.
function BFS(start) {
  var listToExplore = [...start.nodes];
  start.visited = true;
  setColor(start);

  while (listToExplore.length > 0) {
    var nodeIndex = listToExplore.shift();
    if (!nodeIndex.visited) {
      nodeIndex.visited = true;
      setColor(nodeIndex);
      nodeIndex.nodes.map((e2) =>
        !listToExplore.includes(e2) ? listToExplore.push(e2) : null
      );
    }
  }
}

// Every node will have its total edge number as a property. Later we will use this information
// to decide from which node we should start coloring.
Nodes.map((node) => (node.edgeNumber = node.nodes.length));
sortNodes = [...Nodes];

// Sort the nodes from the one which has most edges to the one which has least edges
// and store in "sortedNodes" array.
function compare(a, b) {
  //desc ? a < b : a > b
  return a < b;
}
function swap(i, j) {
  var temp = sortNodes[i];
  sortNodes[i] = sortNodes[j];
  sortNodes[j] = temp;
}

for (var i = 1; i < sortNodes.length; i += 1) {
  var j = i;
  while (
    j > 0 &&
    compare(sortNodes[j - 1].edgeNumber, sortNodes[j].edgeNumber)
  ) {
    swap(j - 1, j);
    j -= 1;
  }
}

// The first method is to start coloring the nodes from the one with the most neighbors
// to the one with the least.
sortNodes.map((node) => setColor(node));

// Get the total number of colors used as a result of the first method and keep the graph info
// We will use this if the first method is the most optimized method.
let firstMethodColorNumber = getColorNumber(sortNodes);
console.log("firstMethodColorNumber: " + firstMethodColorNumber);

let contentFirst = firstMethodColorNumber + "\n";
let str = Nodes.map((e) => e.color);
contentFirst += str.join(" ");

// Remove assigned color to proceed to the second method.
sortNodes.map((node) => (node.color = ""));

// The second mehtod is applying bfs but starting from the one with the most neighbors.
BFS(sortNodes[0]);

// Keep the result of the second method.
let secondMethodColorNumber = getColorNumber(sortNodes);
console.log("secondMethodColorNumber: " + secondMethodColorNumber);

let contentBFS = secondMethodColorNumber + "\n";
let str2 = Nodes.map((e) => e.color);
contentBFS += str2.join(" ");

// Remove the colors and assign false to the visited properties before proceeding the third method.
sortNodes.map((node) => {
  node.color = "";
  node.visited = false;
  return null;
});

function depthFirstSearch(currentVertex) {
  currentVertex.nodes.map((nextVertex) => {
    if (!nextVertex.visited) {
      currentVertex.visited = true;
      depthFirstSearch(nextVertex);
    }
  });
  setColor(currentVertex);
}

// The third mehtod is applying dfs but starting from the one with the least neighbors.
depthFirstSearch(sortNodes[sortNodes.length - 1]);

// Keep the result of the third method.
let thirdMethodColorNumber = getColorNumber(sortNodes);
console.log("thirdMethodColorNumber: " + thirdMethodColorNumber);

let contentDFS = thirdMethodColorNumber + "\n";
let str3 = Nodes.map((e) => e.color);
contentDFS += str3.join(" ");

// compare result in order to determine the most optimal one.
let content =
  firstMethodColorNumber < secondMethodColorNumber &&
  firstMethodColorNumber < thirdMethodColorNumber
    ? contentFirst
    : secondMethodColorNumber < thirdMethodColorNumber
    ? contentBFS
    : contentDFS;

// Write the result into the output file.
fs.writeFile(outputFileName, content, (err) => {
  if (err) console.error(err);
});

// Functions that are used for parsing the file and determine the total number of used colors.
function parseVertices(str) {
  let vertex1 = "";
  let i = 2;
  while (i < str.length && str[i] !== " ") {
    vertex1 += str[i];
    i++;
  }
  i++;
  let vertex2 = "";
  while (i < str.length && str[i] !== " ") {
    vertex2 += str[i];
    i++;
  }
  return { vertex1: parseInt(vertex1), vertex2: parseInt(vertex2) };
}

function getVertexNumber(str) {
  let vertexNumb = "";
  let i = 2;
  while (i < str.length && str[i] !== " ") {
    vertexNumb += str[i];
    i++;
  }
  return parseInt(vertexNumb);
}

function getColorNumber(Nodes) {
  let usedColors = [];

  Nodes.map((e) => {
    if (usedColors.includes(e.color)) return;
    else usedColors.push(e.color);
  });
  return usedColors.length;
}

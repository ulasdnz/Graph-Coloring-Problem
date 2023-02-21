# Graph Coloring Problem

Graph coloring problem is the process of assigning colors to the vertices such that no two adjacent vertices have the same color. The objective is to minimize
the number of colors while coloring a graph. In this project, three different methods were implemented. Before implementing these methods, nodes are sorted 
from the most edged to the least edged. Then all three methods are processed sequentially. The best solution will be written to the output file which you specified.

### Input file structure:
```
p <number of vertex> <number of edges>
e <number of a vertex> <number of a vertex>
```
First line specifies the vertex number and number of edges. Rest of the lines gives us the edges which is pointing from the first index number to the second
index number. You can see the test inputs in the project folder. Here's the example that you can find in the test.txt file:

```
p 4 3
e 1 2
e 1 3
e 1 4 
```

### Output file structure:
```
<number of colors used>
<first vertex's color number> <second vertex's color number> ...
```
First line gives the total number of color used to color the graph. Second line gives the color numbers of every vertex in order. First vertex's color 
is the first number. Here you can see the output of the above test.txt file:

```
2
1 0 0 0
```
We only used 2 colors. First vertex has the color "1" and the other vertices has "0" since they dont have any edges in between.


### Method 1

The first method simply assigns the colors starting from the node with the most neighbors(edges), to the least.


### Method 2

In the second method, the BFS Algorithm is used, starting with the node that has the maximum edge.


### Method 3

The third method colors the nodes starting from the one that has the least edge with using the DFS algorithm.

## Usage

* Install NodeJS
* In line 4 of the code, specify the path to the input file.
* In line 5 of the code, you can change the path for your output.
* Open the terminal and go to the directory that contains the file.
* Run `node code.js` command.
* According to the input file you specified, your output file will be created according to the file path and name you specified on the 5th line.

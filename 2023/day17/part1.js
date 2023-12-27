const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split("").map(y => parseInt(y)));
const rows = input.length;
const columns = input[0].length;
const graph = {};
let result = Infinity;

for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
        const vertical = graph[`vertical(${x},${y})`] = { heat: Infinity, neighbors: {}};
        const horizontal = graph[`horizontal(${x},${y})`] = { heat: Infinity, neighbors: {} };
        for (let i = 1; i <= 3; i++) {
            if (y + i >= 0 && y + i < rows)
                vertical.neighbors[`horizontal(${x},${y + i})`] = Array(i).fill(0).reduce((a, _, j) => a + input[y + j + 1][x], 0);
            if (y - i >= 0 && y - i < rows)
                vertical.neighbors[`horizontal(${x},${y - i})`] = Array(i).fill(0).reduce((a, _, j) => a + input[y - j - 1][x], 0);
            if (x + i >= 0 && x + i < columns)
                horizontal.neighbors[`vertical(${x + i},${y})`] = Array(i).fill(0).reduce((a, _, j) => a + input[y][x + j + 1], 0);
            if (x - i >= 0 && x - i < columns)
                horizontal.neighbors[`vertical(${x - i},${y})`] = Array(i).fill(0).reduce((a, _, j) => a + input[y][x - j - 1], 0);
        }
    }
}

const startingNeighbors = { ...graph["horizontal(0,0)"].neighbors, ...graph["vertical(0,0)"].neighbors };
for (const startingNeighbor of Object.keys(startingNeighbors)) {
    walk(startingNeighbor, startingNeighbors[startingNeighbor]);
}

function walk(neighbor, heat) {
    if (heat >= Math.min(graph[neighbor].heat, result)) return;
    if (neighbor.split("l")[1] == `(${columns - 1},${rows - 1})`) {
        result = heat;
        return;
    }
    graph[neighbor].heat = heat;
    const neighbors = Object.keys(graph[neighbor].neighbors);
    for (const key of neighbors) {
        walk(key, heat + graph[neighbor].neighbors[key]);
    }
}

console.log(result);
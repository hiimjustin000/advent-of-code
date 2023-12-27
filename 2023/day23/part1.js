const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
const rows = input.length;
const columns = input[0].length;
const invalidDirections = ["^v", "v^", "<>", "><"];
const visitedPositions = { "1,0^": new Set(["1,0"]) };
const neighbors = { "1,0": [1, 1] };
neighbors[[columns - 2, rows - 1].join(",")] = [columns - 2, rows - 2];
let result = 0;

for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < columns - 1; x++) {
        if (input[y][x] == "#") continue;
        const neighbor = [];
        if (input[y - 1][x] != "#") neighbor.push([x, y - 1, "^"]);
        if (input[y + 1][x] != "#") neighbor.push([x, y + 1, "v"]);
        if (input[y][x - 1] != "#") neighbor.push([x - 1, y, "<"]);
        if (input[y][x + 1] != "#") neighbor.push([x + 1, y, ">"]);
        neighbors[[x, y].join(",")] = neighbor;
    }
}

(function walk(x, y, visited, direction) {
    if (x == columns - 2 && y == rows - 1) {
        result = Math.max(result, visited.size);
        return;
    }
    const position = [x, y].join(",");
    const key = position + direction;
    if (!Array.isArray(neighbors[position][0]) && key in visitedPositions && [...visited].every(v => visitedPositions[key].has(v))) return;
    if (invalidDirections.includes(direction + input[y][x])) return;
    visited.add(position);
    visitedPositions[key] = new Set(visited);
    for (const [coordX, coordY, dir] of neighbors[position]) {
        if (!visited.has([coordX, coordY].join(","))) walk(coordX, coordY, new Set(visited), dir);
    }
})(1, 1, new Set(["1,0"]), "v");
console.log(result);
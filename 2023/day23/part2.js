const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
const rows = input.length;
const columns = input[0].length;
const invalidDirections = ["^v", "v^", "<>", "><"];
const graph = {};
let result = 0;

(function nextIntersection(x, y, direction, steps, original) {
    const coords = [x, y].join(",");
    if (x == columns - 2 && y == rows - 1) {
        graph[coords] ??= {};
        graph[coords][original] = steps;
        return;
    }
    let checkNeighbors = true;
    const neighbors = [];
    if (input[y - 1][x] != "#" && !invalidDirections.includes(direction + "^")) neighbors.push([x, y - 1, "^"]);
    if (input[y + 1][x] != "#" && !invalidDirections.includes(direction + "v")) neighbors.push([x, y + 1, "v"]);
    if (input[y][x - 1] != "#" && !invalidDirections.includes(direction + "<")) neighbors.push([x - 1, y, "<"]);
    if (input[y][x + 1] != "#" && !invalidDirections.includes(direction + ">")) neighbors.push([x + 1, y, ">"]);
    if (neighbors.length == 1) {
        nextIntersection(...neighbors[0], steps + 1, original);
        return;
    }
    if (coords in graph) checkNeighbors = false;
    graph[coords] ??= {};
    graph[coords][original] = steps;
    if (checkNeighbors) {
        for (const neighbor of neighbors) {
            nextIntersection(...neighbor, 1, coords);
        }
    }
}(1, 1, "v", 1, "1,0"));

for (const k of Object.keys(graph)) {
    for (const kv of Object.keys(graph[k])) {
        graph[kv] ??= {};
        graph[kv][k] = graph[k][kv];
    }
}

(function walk(x, y, steps, visited) {
    if (x == columns - 2 && y == rows - 1) {
        result = Math.max(result, steps);
        return;
    }
    const position = [x, y].join(",");
    visited.add(position);
    for (const next of Object.keys(graph[position])) {
        if (visited.has(next)) continue;
        walk(...next.split(",").map(Number), steps + graph[position][next], new Set(visited));
    
    }
})(1, 0, 0, new Set());
console.log(result);
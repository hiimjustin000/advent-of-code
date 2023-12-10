const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
let result = 0;

const moves = input[0].replace(/L/g, "0").replace(/R/g, "1").split("");
const nodes = {};
for (const line of input.slice(2)) {
    const node = line.split(" = ");
    nodes[node[0]] = JSON.parse(node[1].replace("(", "[\"").replace(")", "\"]").replace(", ", "\", \""));
}

let current = "AAA";
while (current != "ZZZ") {
    for (const move of moves) {
        current = nodes[current][move];
        result++;
        if (current == "ZZZ") break;
    }
}

console.log(result);
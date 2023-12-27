const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");

const moves = input[0].replace(/L/g, "0").replace(/R/g, "1").split("");
const nodes = {};
const current = [];
for (const line of input.slice(2)) {
    const node = line.split(" = ");
    nodes[node[0]] = JSON.parse(node[1].replace("(", "[\"").replace(")", "\"]").replace(", ", "\", \""));
    if (node[0].endsWith("A")) current.push(node[0]);
}
const result = Array(current.length).fill(0);

for (let i = 0; i < current.length; i++) {
    while (!current[i].endsWith("Z")) {
        for (const move of moves) {
            current[i] = nodes[current[i]][move];
            result[i]++;
            if (current[i].endsWith("Z")) break;
        }
    }
}

function lcm(...numbers) {
    return numbers.reduce((a, b) => a * b / gcd(a, b));
}

function gcd(...numbers) {
    return numbers.reduce((a, b) => {
        while (b) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a;
    });
}


console.log(lcm(...result));
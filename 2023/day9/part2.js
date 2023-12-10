const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(" ").map(y => parseInt(y)));
let result = 0;

for (const line of input) {
    const differences = [[...line]];
    while (differences[differences.length - 1].some(x => x != 0)) {
        differences.push(differences[differences.length - 1].map((x, i, r) => x - r[i - 1]).slice(1));
    }
    differences.reverse();
    differences[0].push(0);
    for (let i = 1; i < differences.length; i++) {
        const previousDifference = differences[i - 1];
        const currentDifference = differences[i];
        currentDifference.unshift(currentDifference[0] - previousDifference[0]);
    }
    const lastDifference = differences[differences.length - 1];
    result += lastDifference[0];
}

console.log(result);
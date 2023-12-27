const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
const hailstones = [];
let result = 0;

for (const line of input) {
    hailstones.push(line.split(" @ ").map(x => x.split(", ").map(y => parseInt(y)).slice(0, -1)));
}

for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
        const h1 = hailstones[i];
        const h2 = hailstones[j];
        const denominator = h1[1][0] * h2[1][1] * 1e28 - h2[1][0] * h1[1][1] * 1e28;
        if (denominator == 0) continue;
        const factor1 = h1[0][0] * (h1[0][1] + h1[1][1] * 1e14) - h1[0][1] * (h1[0][0] + h1[1][0] * 1e14);
        const factor2 = h2[0][0] * (h2[0][1] + h2[1][1] * 1e14) - h2[0][1] * (h2[0][0] + h2[1][0] * 1e14);
        const x = (factor2 * h1[1][0] * 1e14 - factor1 * h2[1][0] * 1e14) / denominator;
        const y = (factor2 * h1[1][1] * 1e14 - factor1 * h2[1][1] * 1e14) / denominator;
        if (x >= 2e14 && x <= 4e14 && y >= 2e14 && y <= 4e14 && (x - h1[0][0]) / h1[1][0] >= 0 && (x - h2[0][0]) / h2[1][0] >= 0) result++;
    }
}

console.log(result);
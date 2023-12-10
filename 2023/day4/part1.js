const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
let result = 0;

for (const line of input) {
    const [winningNumbers, numbers] = line.split(": ")[1].split(" | ").map(x => x.trim().split(" ").filter(x => x != "").map(y => parseInt(y)));
    let winningAmount = 0.5;
    for (const winningNumber of winningNumbers) {
        if (numbers.includes(winningNumber)) winningAmount *= 2;
    }
    if (winningAmount < 1) continue;
    result += winningAmount;
}

console.log(result);
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
const copiesArray = Array(input.length).fill(1);

for (let i = 0; i < input.length; i++) {
    const [winningNumbers, numbers] = input[i].split(": ")[1].split(" | ").map(x => x.trim().split(" ").filter(x => x != "").map(y => parseInt(y)));
    let winningAmount = 0;
    for (const winningNumber of winningNumbers) {
        if (numbers.includes(winningNumber)) winningAmount++;
    }
    for (let j = i + 1; j <= i + winningAmount; j++) {
        copiesArray[j] += copiesArray[i];
    }
}

console.log(copiesArray.reduce((a, x) => a + x, 0));
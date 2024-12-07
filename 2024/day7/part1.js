// Wow! Another inefficient solution! I'm on a roll!
// I better be lucky this doesn't take less than a second on my machine.
// hiimjustin000 December 7, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "");

const targetSums = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const targetSum = parseInt(line.split(":")[0]);
    const numbers = line.split(": ")[1].split(" ").map(Number);

    for (let j = 0; j < 2 ** (numbers.length - 1); j++) {
        const operations = j.toString(2).padStart(numbers.length - 1, "0").replace(/0/g, "+").replace(/1/g, "*");
        const parts = numbers.map((x, k) => x + (k < operations.length ? " " + operations[k] + " " : "")).join("").split(" ");
        let result = parseInt(parts[0]);
        for (let i = 1; i < parts.length; i += 2) {
            if (parts[i] == "+") result += parseInt(parts[i + 1]);
            else if (parts[i] == "*") result *= parseInt(parts[i + 1]);
        }
        if (result == targetSum) {
            targetSums.push(targetSum);
            break;
        }
    }
}

console.log(targetSums.reduce((a, x) => a + x, 0));

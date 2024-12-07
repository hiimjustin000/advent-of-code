// This doesn't take as long as Day 6 Part 2, but it's still inefficient.
// It took about 20 or so seconds to finish on my machine.
// This gives me a bad feeling of what is next to come.
// hiimjustin000 December 7, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "");

const targetSums = [];
for (let i = 0; i < lines.length; i++) {
    process.stdout.write(`\u001b[2KProcessing ${i + 1}/${lines.length}\u001b[0G`);
    const line = lines[i];
    const targetSum = parseInt(line.split(":")[0]);
    const numbers = line.split(": ")[1].split(" ").map(Number);

    for (let j = 0; j < 3 ** (numbers.length - 1); j++) {
        const operations = j.toString(3).padStart(numbers.length - 1, "0").replace(/0/g, "+").replace(/1/g, "*").replace(/2/g, "|");
        const parts = numbers.map((x, k) => x + (k < operations.length ? " " + operations[k] + " " : "")).join("").split(" ");
        let result = parseInt(parts[0]);
        for (let i = 1; i < parts.length; i += 2) {
            if (parts[i] == "+") result += parseInt(parts[i + 1]);
            else if (parts[i] == "*") result *= parseInt(parts[i + 1]);
            else if (parts[i] == "|") result = parseInt(result.toString() + parts[i + 1]);
        }
        if (result == targetSum) {
            targetSums.push(targetSum);
            break;
        }
    }
}

console.log();
console.log(targetSums.reduce((a, x) => a + x, 0));

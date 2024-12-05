// It took me quite a long time to realize that each line was part of the same cycle.
// It didn't matter before, but the conditions of the new "don't()" and "do()" functions
// made it so that I had to keep track of the state of the cycle.
// hiimjustin000 December 5, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.matchAll(/(?:mul\((\d+),(\d+)\))|(?:do\(\))|(?:don't\(\))/g));

let enabled = true;
console.log(lines.reduce((a, x) => {
    if (!x) return a;

    let result = 0;
    for (let y of x) {
        if (y[0] == "don't()") enabled = false;
        else if (y[0] == "do()") enabled = true;
        else if (enabled) result += y[1] * y[2];
    }

    return a + result;
}, 0));

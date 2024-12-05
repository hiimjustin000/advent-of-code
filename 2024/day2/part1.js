// This one is a nice one. I like it. It's a bit more challenging than the first one, but it's still a good one.
// hiimjustin000 December 5, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(" ").map(Number));

console.log(lines.filter(x => {
    let biggestChange;
    let smallestChange;
    let decrease = false;
    let increase = false;
    for (let i = 1; i < x.length; i++) {
        if (x[i] < x[i - 1]) decrease = true;
        if (x[i] > x[i - 1]) increase = true;
        biggestChange = typeof biggestChange != "undefined" ? Math.max(biggestChange, Math.abs(x[i] - x[i - 1])) : Math.abs(x[i] - x[i - 1]);
        smallestChange = typeof smallestChange != "undefined" ? Math.min(smallestChange, Math.abs(x[i] - x[i - 1])) : Math.abs(x[i] - x[i - 1]);
    }

    return ((decrease && !increase) || (!decrease && increase)) && biggestChange <= 3 && smallestChange >= 1;
}).length);

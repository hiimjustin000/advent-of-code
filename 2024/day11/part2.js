// Adapted from Jason Muzzy's solution.
// I doubt I would have had the patience for my original solution.
// https://www.reddit.com/r/adventofcode/comments/1hbm0al/comment/m1hg5a1
// hiimjustin000 December 11, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const stones = Object.fromEntries(input.replace(/\r/g, "").split("\n")[0].split(" ").map(Number).map(x => [x, 1]));

for (let i = 0; i < 75; i++) {
    const stoneCache = {};
    for (const [stone, count] of Object.entries(stones)) {
        const stoneString = stone.toString();
        if (stone == 0) stoneCache[1] = stoneCache[1] ? stoneCache[1] + count : count;
        else if (stoneString.length % 2 == 0) {
            const firstHalf = parseInt(stoneString.slice(0, stoneString.length / 2));
            const secondHalf = parseInt(stoneString.slice(stoneString.length / 2));
            stoneCache[firstHalf] = stoneCache[firstHalf] ? stoneCache[firstHalf] + count : count;
            stoneCache[secondHalf] = stoneCache[secondHalf] ? stoneCache[secondHalf] + count : count;
        }
        else {
            const multiplied = stone * 2024;
            stoneCache[multiplied] = stoneCache[multiplied] ? stoneCache[multiplied] + count : count;
        }
    }
    for (const key in stones) delete stones[key];
    Object.assign(stones, stoneCache);
}

console.log(Object.values(stones).reduce((a, b) => a + b, 0));

// Things are about to get crazy. I can sense it.
// hiimjustin000 December 11, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const stones = input.replace(/\r/g, "").split("\n")[0].split(" ").map(Number);

for (let i = 0; i < 25; i++) {
    const newStones = [];
    for (const stone of stones) {
        if (stone == 0) newStones.push(1);
        else if (stone.toString().length % 2 == 0) newStones.push(
            parseInt(stone.toString().slice(0, stone.toString().length / 2)),
            parseInt(stone.toString().slice(stone.toString().length / 2))
        );
        else newStones.push(stone * 2024);
    }
    stones.splice(0, stones.length);
    for (const newStone of newStones) stones.push(newStone); // Can't have spread in Detroit (Maximum call stack size exceeded)
}

console.log(stones.length);

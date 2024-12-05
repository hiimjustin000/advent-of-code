// Woahhh this is escalating quickly.
// MAS in the shape of an X was easier than I thought, but initially,
// I didn't continue when I found one, so my initial answer was twice the correct answer.
// hiimjustin000 December 5, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(""));

let found = 0;
for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[y].length - 1; x++) {
        if (lines[y][x] != "A") continue;

        if (lines[y - 1][x - 1] == "M" && lines[y + 1][x + 1] == "S") {
            if (lines[y + 1][x - 1] == "M" && lines[y - 1][x + 1] == "S") found++;
            if (lines[y - 1][x + 1] == "M" && lines[y + 1][x - 1] == "S") found++;
            continue;
        }
        if (lines[y - 1][x + 1] == "M" && lines[y + 1][x - 1] == "S") {
            if (lines[y + 1][x + 1] == "M" && lines[y - 1][x - 1] == "S") found++;
            if (lines[y - 1][x - 1] == "M" && lines[y + 1][x + 1] == "S") found++;
            continue;
        }
        if (lines[y + 1][x - 1] == "M" && lines[y - 1][x + 1] == "S") {
            if (lines[y - 1][x - 1] == "M" && lines[y + 1][x + 1] == "S") found++;
            if (lines[y + 1][x + 1] == "M" && lines[y - 1][x - 1] == "S") found++;
            continue;
        }
        if (lines[y + 1][x + 1] == "M" && lines[y - 1][x - 1] == "S") {
            if (lines[y - 1][x + 1] == "M" && lines[y + 1][x - 1] == "S") found++;
            if (lines[y + 1][x - 1] == "M" && lines[y - 1][x + 1] == "S") found++;
            continue;
        }
    }
}

console.log(found);

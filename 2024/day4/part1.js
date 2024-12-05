// I remember doing something similar to this in 2023.
// What I did was I implemented my word search algorithm that I've used since I was 10 years old,
// except in the form of code. It was a fun little project.
// hiimjustin000 December 5, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(""));

let found = 0;
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] != "X") continue;

        if (y > 2) {
            if (lines[y - 1][x - 1] == "M" && lines[y - 2][x - 2] == "A" && lines[y - 3][x - 3] == "S") found++;
            if (lines[y - 1][x] == "M" && lines[y - 2][x] == "A" && lines[y - 3][x] == "S") found++;
            if (lines[y - 1][x + 1] == "M" && lines[y - 2][x + 2] == "A" && lines[y - 3][x + 3] == "S") found++;
        }

        if (lines[y][x - 1] == "M" && lines[y][x - 2] == "A" && lines[y][x - 3] == "S") found++;
        if (lines[y][x + 1] == "M" && lines[y][x + 2] == "A" && lines[y][x + 3] == "S") found++;

        if (y < lines.length - 3) {
            if (lines[y + 1][x - 1] == "M" && lines[y + 2][x - 2] == "A" && lines[y + 3][x - 3] == "S") found++;
            if (lines[y + 1][x] == "M" && lines[y + 2][x] == "A" && lines[y + 3][x] == "S") found++;
            if (lines[y + 1][x + 1] == "M" && lines[y + 2][x + 2] == "A" && lines[y + 3][x + 3] == "S") found++;
        }
    }
}

console.log(found);

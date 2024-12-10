// Ironically, this code for part 2 is the exact code I had for part 1 before I went to sleep.
// Today's my lucky day, I guess. Looks like I just have to turn a bug into a feature.
// hiimjustin000 December 10, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const map = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(""));

const trailheads = [];
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] == "0") trailheads.push([x, y]);
    }
}

let score = 0;
function checkTrailhead(x, y, stage) {
    if (y > 0 && map[y - 1][x] == (stage + 1).toString()) {
        if (stage < 8) checkTrailhead(x, y - 1, stage + 1);
        else score++;
    }

    if (y < map.length - 1 && map[y + 1][x] == (stage + 1).toString()) {
        if (stage < 8) checkTrailhead(x, y + 1, stage + 1);
        else score++;
    }

    if (x > 0 && map[y][x - 1] == (stage + 1).toString()) {
        if (stage < 8) checkTrailhead(x - 1, y, stage + 1);
        else score++;
    }

    if (x < map[y].length - 1 && map[y][x + 1] == (stage + 1).toString()) {
        if (stage < 8) checkTrailhead(x + 1, y, stage + 1);
        else score++;
    }
}

for (const trailhead of trailheads) {
    checkTrailhead(trailhead[0], trailhead[1], 0);
}

console.log(score);

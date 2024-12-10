// I originally incremented a score for each end, but that gave me an answer that was too high.
// I then realized that I had to count the number of ends, not the number of paths.
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

const ends = {};
let trailhead = "";
function checkTrailhead(x, y, stage) {
    if (y > 0 && map[y - 1][x] == (stage + 1).toString()) {
        if (stage < 8) checkTrailhead(x, y - 1, stage + 1);
        else if (ends[trailhead].findIndex(e => e[0] == x && e[1] == y - 1) < 0) ends[trailhead].push([x, y - 1]);
    }

    if (y < map.length - 1 && map[y + 1][x] == (stage + 1).toString()) {
        if (stage < 8) checkTrailhead(x, y + 1, stage + 1);
        else if (ends[trailhead].findIndex(e => e[0] == x && e[1] == y + 1) < 0) ends[trailhead].push([x, y + 1]);
    }

    if (x > 0 && map[y][x - 1] == (stage + 1).toString()) {
        if (stage < 8) checkTrailhead(x - 1, y, stage + 1);
        else if (ends[trailhead].findIndex(e => e[0] == x - 1 && e[1] == y) < 0) ends[trailhead].push([x - 1, y]);
    }

    if (x < map[y].length - 1 && map[y][x + 1] == (stage + 1).toString()) {
        if (stage < 8) checkTrailhead(x + 1, y, stage + 1);
        else if (ends[trailhead].findIndex(e => e[0] == x + 1 && e[1] == y) < 0) ends[trailhead].push([x + 1, y]);
    }
}

for (let i = 0; i < trailheads.length; i++) {
    trailhead = trailheads[i].join(",");
    ends[trailhead] = [];
    checkTrailhead(trailheads[i][0], trailheads[i][1], 0);
}

console.log(Object.values(ends).reduce((a, x) => a + x.length, 0));

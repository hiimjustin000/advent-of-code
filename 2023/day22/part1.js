const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
const bricks = input.map(x => {
    const [start, end] = x.split("~").map(y => y.split(",").map(z => parseInt(z)));
    return {
        start,
        end,
        status: "falling",
        supports: [],
        supportedBy: []
    }
});
let result = 0;

for (const brick of bricks) {
    if (brick.start[2] == 1 || brick.end[2] == 1) {
        brick.status = "supported";
        brick.supportedBy.push(-1);
    }
}

function minimum(brick, dimension) {
    return Math.min(brick.start[dimension], brick.end[dimension]);
}

function maximum(brick, dimension) {
    return Math.max(brick.start[dimension], brick.end[dimension]);
}

function overlaps(brick1, brick2) {
    return minimum(brick1, 0) <= maximum(brick2, 0) &&
        maximum(brick1, 0) >= minimum(brick2, 0) &&
        minimum(brick1, 1) <= maximum(brick2, 1) &&
        maximum(brick1, 1) >= minimum(brick2, 1);
}

while (true) {
    let lowestBrick = -1;
    let lowestZ = 1000000;
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        if (brick.status == "supported") continue;
        const minZ = minimum(brick, 2);
        let z = minZ;
        if (z > lowestZ) continue;
        let supported = -1;
        for (let j = 0; j < bricks.length; j++) {
            if (i == j) continue;
            const otherBrick = bricks[j];
            if (maximum(otherBrick, 2) != minZ - 1) continue;
            if (overlaps(brick, otherBrick)) {
                supported = j;
                break;
            }
        }
        if (supported == -1) {
            lowestZ = z;
            lowestBrick = i;
        }
        else brick.status = bricks[supported].status;
    }
    if (lowestBrick == -1) break;
    const brick = bricks[lowestBrick];
    let highest = -1;
    const bottom = minimum(brick, 2);
    let highestZ = 0;
    for (let i = 0; i < bricks.length; i++) {
        if (i == lowestBrick) continue;
        const otherBrick = bricks[i];
        const maxZ = maximum(otherBrick, 2);
        if (maxZ >= bottom) continue;
        if (maxZ <= highestZ) continue;
        if (!overlaps(brick, otherBrick)) continue;
        highestZ = maxZ;
        highest = i;
    }
    if (highest == -1) {
        const drop = bottom - 1;
        brick.start[2] -= drop;
        brick.end[2] -= drop;
        brick.status = "supported";
        brick.supportedBy.push(-1);
    } else {
        const highestBrick = bricks[highest];
        const highestBottom = maximum(highestBrick, 2);
        const drop = bottom - highestBottom - 1;
        brick.start[2] -= drop;
        brick.end[2] -= drop;
        brick.status = highestBrick.status;
    }
}

for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];
    const maxZ = maximum(brick, 2);
    for (let j = 0; j < bricks.length; j++) {
        if (i == j) continue;
        const otherBrick = bricks[j];
        if (minimum(otherBrick, 2) != maxZ + 1) continue;
        if (!overlaps(brick, otherBrick)) continue;
        brick.supports.push(j);
        otherBrick.supportedBy.push(i);
    }
}

for (const brick of bricks) {
    let safe = true;
    for (const supportedBrick of brick.supports) {
        if (bricks[supportedBrick].supportedBy.length <= 1) {
            safe = false;
            break;
        }
    }

    result += Number(safe);
}

console.log(result);
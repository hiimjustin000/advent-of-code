const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const queue = [[input.findIndex(x => x.includes("S")), input[input.findIndex(x => x.includes("S"))].indexOf("S")]];
for (let i = 0; i < 64; i++) {
    const localQueue = [...queue];
    const uniqueQueue = new Set(queue.map(x => x.join(",")));   
    queue.splice(0, queue.length);

    while (localQueue.length > 0) {
        const element = localQueue.shift();

        for (const direction of directions) {
            const x = element[0] + direction[0];
            const y = element[1] + direction[1];
            if (x >= 0 && y >= 0 && x < input[0].length && y < input.length && !uniqueQueue.has([x, y].join(",")) && input[y][x] != "#") {
                uniqueQueue.add([x, y].join(","));
                queue.push([x, y]);
            }
        }
    }
}

console.log(queue.length);
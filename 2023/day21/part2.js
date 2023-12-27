const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
const start = [input.findIndex(x => x.includes("S")), input[input.findIndex(x => x.includes("S"))].indexOf("S")];
const rows = input.length;
const columns = input[0].length;
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const value = 26501365 % input.length;
const seen = [];

for (let i = 0; i < 3; i++) {
    const queue = [start];
    for (let j = 0; j < value + rows * i; j++) {
        const localQueue = [...queue];
        const uniqueQueue = new Set(queue.map(x => x.join(",")));   
        queue.splice(0, queue.length);

        while (localQueue.length > 0) {
            const element = localQueue.shift();

            for (const direction of directions) {
                const x = element[0] + direction[0];
                const y = element[1] + direction[1];
                if (!uniqueQueue.has([x, y].join(",")) && input[((y % rows) + rows) % rows][((x % columns) + columns) % columns] != "#") {
                    uniqueQueue.add([x, y].join(","));
                    queue.push([x, y]);
                }
            }
        }
    }

    seen.push(queue.length);
}

const a = Math.floor((seen[2] - seen[1] * 2 + seen[0]) / 2);
const b = seen[1] - seen[0] - 3 * a;
const c = seen[0] - a - b;
const x = Math.ceil(26501365 / input.length);

console.log(a * x ** 2 + b * x + c);
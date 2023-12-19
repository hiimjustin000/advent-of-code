const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
const shift = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const looped = {};
const energized = Array(input.length).fill(0).map(() => Array(input[0].length).fill("."));
const queue = [{ row: 0, column: 0, direction: 1 }];

while (queue.length > 0) {
    const { row, column, direction } = queue.pop();
    const key = [row, column, direction].join(",");
    if (looped[key]) continue;
    looped[key] = true;
    if (row >= 0 && row < input.length && column >= 0 && column < input[0].length) {
        const directions = [];
        energized[row][column] = "#";
        switch (input[row][column]) {
            case "|":
                if (!!(direction % 2)) directions.push(0, 2);
                else directions.push(direction);
                break;
            case "-":
                if (!(direction % 2)) directions.push(1, 3);
                else directions.push(direction);
                break;
            case "/":
                directions.push(direction ^ 1);
                break;
            case "\\":
                directions.push(direction ^ 3);
                break;
            default:
                directions.push(direction);
                break;
        }
        for (const dir of directions) {
            queue.push({
                row: row + shift[dir][0],
                column: column + shift[dir][1],
                direction: dir
            });
        }
    }
}

console.log(energized.flat().filter(x => x == "#").length);
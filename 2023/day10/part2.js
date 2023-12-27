const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
let result = 0;

const rows = input.length;
const cols = input[0].length;

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (input[i][j] != "S") continue;

        const canGoUp = ["|", "7", "F"].includes(input[i - 1][j]);
        const canGoDown = ["|", "L", "J"].includes(input[i + 1][j]);
        const canGoLeft = ["-", "L", "F"].includes(input[i][j - 1]);
        const canGoRight = ["-", "7", "J"].includes(input[i][j + 1]);

        if ([canGoUp, canGoDown, canGoLeft, canGoRight].map(x => x ? 1 : 0).reduce((a, b) => a + b) != 2) {
            console.error("Invalid input");
            process.exit(1);
        }

        if (canGoUp && canGoDown) input[i][j] = "|";
        else if (canGoUp && canGoRight) input[i][j] = "L";
        else if (canGoUp && canGoLeft) input[i][j] = "J";
        else if (canGoDown && canGoRight) input[i][j] = "F";
        else if (canGoDown && canGoLeft) input[i][j] = "7";
        else if (canGoLeft && canGoRight) input[i][j] = "-";
        else {
            console.error("Invalid input");
            process.exit(1);
        }
    }
}

const rows3 = rows * 3;
const cols3 = cols * 3;
const input3 = Array(rows3).fill(0).map(() => Array(cols3).fill("."));
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        switch (input[i][j]) {
            case "|":
                input3[i * 3][j * 3 + 1] = " ";
                input3[i * 3 + 1][j * 3 + 1] = " ";
                input3[i * 3 + 2][j * 3 + 1] = " ";
                break;
            case "-":
                input3[i * 3 + 1][j * 3] = " ";
                input3[i * 3 + 1][j * 3 + 1] = " ";
                input3[i * 3 + 1][j * 3 + 2] = " ";
                break;
            case "7":
                input3[i * 3 + 1][j * 3] = " ";
                input3[i * 3 + 1][j * 3 + 1] = " ";
                input3[i * 3 + 2][j * 3 + 1] = " ";
                break;
            case "F":
                input3[i * 3 + 2][j * 3 + 1] = " ";
                input3[i * 3 + 1][j * 3 + 1] = " ";
                input3[i * 3 + 1][j * 3 + 2] = " ";
                break;
            case "J":
                input3[i * 3 + 1][j * 3] = " ";
                input3[i * 3 + 1][j * 3 + 1] = " ";
                input3[i * 3][j * 3 + 1] = " ";
                break;
            case "L":
                input3[i * 3][j * 3 + 1] = " ";
                input3[i * 3 + 1][j * 3 + 1] = " ";
                input3[i * 3 + 1][j * 3 + 2] = " ";
                break;
            case ".":
                break;
            default:
                console.error("Invalid input");
                process.exit(1);
        }
    }
}

const queue = [];
const seen = new Set();

for (let i = 0; i < rows3; i++) {
    queue.push([i, 0]);
    queue.push([i, cols3 - 1]);
}

for (let i = 0; i < cols3; i++) {
    queue.push([0, i]);
    queue.push([rows3 - 1, i]);
}

const rowDirections = [-1, 0, 1, 0];
const colDirections = [0, 1, 0, -1];

while (queue.length > 0) {
    let [row, col] = queue.shift();
    if (seen.has(`${row},${col}`)) continue;
    if (0 > row || row >= rows3 || 0 > col || col >= cols3) continue;
    seen.add(`${row},${col}`);
    if (input3[row][col] == " ") continue;
    for (let i = 0; i < 4; i++) {
        queue.push([row + rowDirections[i], col + colDirections[i]]);
    }
}

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let hasSeen = false;
        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                hasSeen ||= seen.has(`${i * 3 + k},${j * 3 + l}`);
            }
        }

        if (!hasSeen) result++;
    }
}

console.log(result);
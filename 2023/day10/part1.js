const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
let result = 0;

const rows = input.length;
const cols = input[0].length;

let startingRow = 0;
let startingCol = 0;
let startingDir = 0;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (input[i][j] != "S") continue;

        startingRow = i;
        startingCol = j;
        const canGoUp = ["|", "7", "F"].includes(input[i - 1][j]);
        const canGoDown = ["|", "L", "J"].includes(input[i + 1][j]);
        const canGoLeft = ["-", "L", "F"].includes(input[i][j - 1]);
        const canGoRight = ["-", "7", "J"].includes(input[i][j + 1]);

        if ([canGoUp, canGoDown, canGoLeft, canGoRight].map(x => x ? 1 : 0).reduce((a, b) => a + b) != 2) {
            console.error("Invalid input");
            process.exit(1);
        }

        if (canGoUp && canGoDown) {
            input[i][j] = "|";
            startingDir = 0;
        }
        else if (canGoUp && canGoRight) {
            input[i][j] = "L";
            startingDir = 0;
        }
        else if (canGoUp && canGoLeft) {
            input[i][j] = "J";
            startingDir = 0;
        }
        else if (canGoDown && canGoRight) {
            input[i][j] = "F";
            startingDir = 2;
        }
        else if (canGoDown && canGoLeft) {
            input[i][j] = "7";
            startingDir = 2;
        }
        else if (canGoLeft && canGoRight) {
            input[i][j] = "-";
            startingDir = 1;
        }
        else {
            console.error("Invalid input");
            process.exit(1);
        }
    }
}

const rowDirections = [-1, 0, 1, 0];
const colDirections = [0, 1, 0, -1];
let currentRow = startingRow;
let currentCol = startingCol;
let currentDir = startingDir;
loop: while (true) {
    result++;
    currentRow += rowDirections[currentDir];
    currentCol += colDirections[currentDir];
    switch (input[currentRow][currentCol]) {
        case "L":
            if (currentDir != 2 && currentDir != 3) break loop;
            else currentDir ^= 3;
            break;
        case "J":
            if (currentDir != 1 && currentDir != 2) break loop;
            else currentDir ^= 1;
            break;
        case "7":
            if (currentDir != 0 && currentDir != 1) break loop;
            else currentDir ^= 3;
            break;
        case "F":
            if (currentDir != 0 && currentDir != 3) break loop;
            else currentDir ^= 1;
            break;
        case ".":
            console.error("Invalid input");
            process.exit(1);
    }

    if (currentRow == startingRow && currentCol == startingCol) break loop;
}

console.log(Math.floor(result / 2));
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
const platform = Array(input.length).fill().map((_, i) => [...input[i]]);
let result = 0;

for (let i = 0; i < platform.length; i++) {
    for (let j = 0; j < platform[i].length; j++) {
        if (platform[i][j] == "O") {
            for (let k = i - 1; k >= 0 && platform[k][j] == "."; k--) {
                platform[k][j] = "O";
                platform[k + 1][j] = ".";
            }
        }
    }
}

for (let i = 0; i < platform.length; i++) {
    result += platform[i].filter(x => x == "O").length * (platform.length - i);
}

console.log(result);
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
const platform = Array(input.length).fill().map((_, i) => [...input[i]]);
const cache = {};
let result = 0;

function rollRocksNorth() {
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
}

function rollRocksWest() {
    for (let i = 0; i < platform.length; i++) {
        for (let j = 0; j < platform[i].length; j++) {
            if (platform[i][j] == "O") {
                for (let k = j - 1; k >= 0 && platform[i][k] == "."; k--) {
                    platform[i][k] = "O";
                    platform[i][k + 1] = ".";
                }
            }
        }
    }
}

function rollRocksSouth() {
    for (let i = platform.length - 1; i >= 0; i--) {
        for (let j = 0; j < platform[i].length; j++) {
            if (platform[i][j] == "O") {
                for (let k = i + 1; k < platform.length && platform[k][j] == "."; k++) {
                    platform[k][j] = "O";
                    platform[k - 1][j] = ".";
                }
            }
        }
    }
}

function rollRocksEast() {
    for (let i = platform.length - 1; i >= 0; i--) {
        for (let j = platform[i].length - 1; j >= 0; j--) {
            if (platform[i][j] == "O") {
                for (let k = j + 1; k < platform[i].length && platform[i][k] == "."; k++) {
                    platform[i][k] = "O";
                    platform[i][k - 1] = ".";
                }
            }
        }
    }
}

let loops = 0;
let tempPlatform = "";
let i = 0;
for (; i < 1000000000; i++) {
    const str = platform.map(x => x.join("")).join("");
    const test = cache[str];
    if (test) {
        if (str == tempPlatform) break;
        if (loops <= 0) tempPlatform = str;
        platform.splice(0, platform.length, ...test.map(x => [...x]));
        loops++;
        continue;
    }
    rollRocksNorth();
    rollRocksWest();
    rollRocksSouth();
    rollRocksEast();
    cache[str] = platform.map(x => [...x]);
}

for (let j = 0; j < (1000000000 - i) % loops; j++) {
    rollRocksNorth();
    rollRocksWest();
    rollRocksSouth();
    rollRocksEast();
}

for (let i = 0; i < platform.length; i++) {
    result += platform[i].filter(x => x == "O").length * (platform.length - i);
}

console.log(result);
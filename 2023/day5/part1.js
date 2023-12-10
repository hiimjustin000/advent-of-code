const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n\n");
const seeds = input[0].split(": ")[1].split(" ").map(x => parseInt(x));
const maps = input.slice(1).map(x => x.split("\n").slice(1).map(y => y.split(" ").map(z => parseInt(z))));
const resultArray = [];

function translate(index, value) {
    if (index == maps.length) return value;

    for (const [destination, source, range] of maps[index]) {
        if (source <= value && value < source + range) return translate(index + 1, destination + value - source);
    }

    return translate(index + 1, value);
}

for (const seed of seeds) {
    resultArray.push(translate(0, seed));
}

console.log(Math.min(...resultArray));
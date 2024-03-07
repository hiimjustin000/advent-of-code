const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
const seeds = input[0].split(": ")[1].split(" ").map(x => parseInt(x));
const maps = input.slice(2).map(x => x.split(" ").map(y => parseInt(y)));
const resultArray = [];

function translate(index, value) {
    if (index == maps.length) return value;

    const [destination, source, range] = maps[index];
    if (source <= value && value < source + range) return translate(index + maps.slice(index + 1).findIndex(x => x.length < 3), destination + value - source);

    return translate(index + 1, value);
}

for (const seed of seeds) {
    resultArray.push(translate(0, seed));
}

console.log(Math.min(...resultArray));
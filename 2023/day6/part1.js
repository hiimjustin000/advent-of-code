const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
let result = 1;

const recordDistance = input[1].split(": ")[1].split(" ").filter(x => x != "").map(x => parseInt(x));
const timeDistance = input[0].split(": ")[1].split(" ").filter(x => x != "").map(x => parseInt(x)).map((x, i) => [x, recordDistance[i]]);

for (const [time, distance] of timeDistance) {
    let localResult = 0;
    for (let i = 0; i < time; i++) {
        const newDistance = (time - i) * i;
        if (newDistance > distance)
            localResult++;
    }

    result *= localResult;
}

console.log(result);
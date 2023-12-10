const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
let result = 0;

const time = parseInt(input[0].split(": ")[1].replace(/ /g, ""));
const distance = parseInt(input[1].split(": ")[1].replace(/ /g, ""));

for (let i = 0; i < time; i++) {
    const newDistance = (time - i) * i;
    if (newDistance > distance)
        result++;
}

console.log(result);
// I see some people complaining about having to use regular expressions on this one,
// and I'm like, "First time?".
// hiimjustin000 December 5, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.matchAll(/mul\((\d+),(\d+)\)/g));

console.log(lines.reduce((a, x) => {
    let result = 0;
    for (let y of x) {
        result += y[1] * y[2];
    }

    return a + result;
}, 0));

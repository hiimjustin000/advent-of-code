const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n\n")[0].split("\n");
const workflows = {};
let result = 0;

for (const line of input) {
    const split = line.split("{");
    workflows[split[0]] = split[1].slice(0, -1).split(",").map(x => {
        if (x.includes(">")) {
            const [greater, than] = x.split(">").map((x, i) => i == 1 ? parseInt(x.split(":")[0]) : "xmas".indexOf(x));
            return [greater, ">", than, x.split(":")[1]];
        }
        else if (x.includes("<")) {
            const [less, than] = x.split("<").map((x, i) => i == 1 ? parseInt(x.split(":")[0]) : "xmas".indexOf(x));
            return [less, "<", than, x.split(":")[1]];
        }
        else return x;
    });
}

const queue = [["in", [[1, 4000], [1, 4000], [1, 4000], [1, 4000]]]];
while (queue.length > 0) {
    const [workflow, intervals] = queue.pop();
    if (workflow == "A" || workflow == "R") {
        if (workflow == "A") result += intervals.reduce((a, b) => a * (b[1] - b[0] + 1), 1);
        continue;
    }

    for (const [left, op, right, then] of workflows[workflow].slice(0, -1)) {
        const [low, high] = intervals[left];

        if ((op == ">" && right >= high) || (op == "<" && right <= low)) continue;
        if ((op == ">" && right < low) || (op == "<" && right > high)) {
            queue.push([then, intervals]);
            break;
        }

        intervals[left] = [op == ">" ? low : right, op == ">" ? right : high];
        const newIntervals = [...intervals];
        newIntervals[left] = [op == ">" ? right + 1 : low, op == ">" ? high : right - 1];
        queue.push([then, newIntervals]);
    }

    queue.push([workflows[workflow].slice(-1)[0], intervals]);
}

console.log(result);
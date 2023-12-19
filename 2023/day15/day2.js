const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split(",").map(x => x.split(/=|-/)).map(x => [x[0], parseInt(x[1])]);
const lenses = {};
const boxes = Array(256).fill(0).map(() => []);
const hashMap = {};
let result = 0;

for (const [label, focalLength] of input) {
    lenses[label] ??= {};
    hashMap[label] ??= label.split("").map(x => x.charCodeAt(0)).reduce((a, x) => 17 * (a + x) % 256, 0);
    if (!Number.isNaN(focalLength)) {
        lenses[label].box = hashMap[label];
        lenses[label].focalLength = focalLength;
        const index = boxes[hashMap[label]].findIndex(x => x[0] == label);
        if (index >= 0) boxes[hashMap[label]][index][1] = focalLength;
        else boxes[hashMap[label]].push([label, focalLength]);
    } else {
        delete lenses[label];
        const index = boxes[hashMap[label]].findIndex(x => x[0] == label);
        if (index >= 0) boxes[hashMap[label]].splice(index, 1);
    }
}

for (const [label, info] of Object.entries(lenses)) {
    result += (info.box + 1) * info.focalLength * (boxes[hashMap[label]].findIndex(x => x[0] == label) + 1);
}

console.log(result);
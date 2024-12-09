// I did not expect the code to take more than five seconds to run, but it did.
// It's not too much time, and I got the right answer, so I'm not going to bother optimizing it.
// Plus, I have to study for finals today, so it's not like I have time to do it anyway.
// hiimjustin000 December 9, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const mapInput = input.replace(/\r/g, "").split("\n")[0].split("");
const map = [];

let id = 0;
for (let i = 0; i < mapInput.length; i++) {
    for (let j = 0; j < parseInt(mapInput[i]); j++) {
        map.push(i % 2 == 0 ? id : null);
    }
    if (i % 2 == 0) id++;
}

for (let i = map.length - 1; i >= 0; i--) {
    if (map[i] == null) continue;

    const firstNull = map.findIndex((x, j) => x == null && j < i);
    if (firstNull == -1) continue;

    map[firstNull] = map[i];
    map[i] = null;
}

console.log(map.reduce((a, x, i) => a + (x == null ? 0 : i * x), 0));

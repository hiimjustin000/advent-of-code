// As always, the second part comes with a twist.
// Not too outlandish, considering the stuff I've seen in 2023.
// hiimjustin000 December 5, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(" ").filter(x => x != "").map(x => Number(x.trim())));
const list1 = lines.map(x => x[0]).sort();
const list2 = lines.map(x => x[1]).sort();

console.log(list1.reduce((a, x) => a + x * list2.filter(y => y == x).length, 0));

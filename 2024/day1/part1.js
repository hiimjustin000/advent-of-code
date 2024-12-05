// Welcome back, folks!
// This year, I decided to throw in some comments to describe my thought process as I solve the puzzles.
// I hope you find them helpful. Enjoy!
// So someone by the name of https://github.com/TheBearodactyl posted a solution in Haskell in a Discord chat,
// reminding me that this event had started for the year.
// I quickly grabbed my laptop and started solving the puzzles, starting with this first one. A great starter, actually.
// hiimjustin000 December 5, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(" ").filter(x => x != "").map(x => Number(x.trim())));
const list1 = lines.map(x => x[0]).sort();
const list2 = lines.map(x => x[1]).sort();

console.log(list1.reduce((a, x, i) => a + Math.abs(x - list2[i]), 0));

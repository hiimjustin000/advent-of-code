// Are you tired yet? Because I am. This is the latest puzzle so far, until the next one opens tomorrow.
// I am writing this at 3:40 AM, and I am quite tired. I hope you enjoyed the snippets I provided.
// I initally mixed up whether the rules mean a page should come before or after another page. Silly me.
// hiimjustin000 December 5, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").replace(/\r/g, "").split("\n\n");
const rulesList = input[0].split("\n").filter(x => x != "").map(x => x.split("|").map(Number));
const pageList = input[1].split("\n").filter(x => x != "").map(x => x.split(",").map(Number));

const rules = {};

for (const rule of rulesList) {
    if (typeof rules[rule[0]] == "undefined") rules[rule[0]] = [];
    rules[rule[0]].push(rule[1]);
}

const correctPages = [];
for (let i = 0; i < pageList.length; i++) {
    const pages = pageList[i];
    let correct = true;
    for (let j = 0; j < pages.length; j++) {
        const page = pages[j];
        const pagesAfter = pages.slice(j + 1);

        if (!rules[page]) continue;
        for (const rule of rules[page]) {
            if (pages.includes(rule) && !pagesAfter.includes(rule)) {
                correct = false;
                break;
            }
        }

        if (!correct) break;
    }

    if (correct) correctPages.push(i);
}

console.log(correctPages.reduce((a, x) => a + pageList[x][pageList[x].length / 2 - 0.5], 0));

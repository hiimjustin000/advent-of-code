// In 2023, this problem would probably have pushed me to the point of stealing code.
// I still cannot figure out what is wrong with my logic.
// The only thing that works is re-sorting the pages until they are correct.
// There's probably something better on Reddit, I'll post there and wait for someone to call me out.
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

function sortPages(pages) {
    for (let i = 0; i < pages.length; i++) {
        if (!rules[pages[i]]) continue;
        for (const rule of rules[pages[i]]) {
            if (pages.includes(rule) && !pages.slice(i + 1).includes(rule)) {
                if (!rules[rule]) {
                    const removed = pages.splice(pages.indexOf(rule), 1);
                    pages.push(removed[0]);
                    continue;
                }

                const filteredRules = rules[rule].filter(x => pages.includes(x));
                if (filteredRules.length == 0) {
                    const removed = pages.splice(pages.indexOf(rule), 1);
                    pages.push(removed[0]);
                    continue;
                }

                let foundRules = 0;
                for (let j = pages.length - 1; j > 0; j--) {
                    if (filteredRules.includes(pages[j])) {
                        foundRules++;
                        if (foundRules == filteredRules.length) {
                            const removed = pages.splice(pages.indexOf(rule), 1);
                            pages.splice(j - 1, 0, removed[0]);
                            break;
                        }
                    }
                }
            }
        }
    }

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

    if (!correct) sortPages(pages); // This is literally bogo sort if it wasn't randomized.
}

const incorrectPages = pageList.filter((_, i) => !correctPages.includes(i));
for (const pages of incorrectPages) {
    sortPages(pages);
}

console.log(incorrectPages.reduce((a, x) => a + x[x.length / 2 - 0.5], 0));

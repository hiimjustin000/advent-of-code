// I initally deleted the first element that made the list not meet the conditions,
// but then I realized that I could delete any element and check if the list meets the conditions.
// I thought that wouldn't be a good solution, but it worked.
// hiimjustin000 December 5, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(" ").map(Number));

console.log(lines.filter(x => {
    let biggestChange;
    let smallestChange;
    let decrease = false
    let increase = false;
    for (let i = 1; i < x.length; i++) {
        if (x[i] < x[i - 1]) decrease = true;
        if (x[i] > x[i - 1]) increase = true;
        biggestChange = typeof biggestChange != "undefined" ? Math.max(biggestChange, Math.abs(x[i] - x[i - 1])) : Math.abs(x[i] - x[i - 1]);
        smallestChange = typeof smallestChange != "undefined" ? Math.min(smallestChange, Math.abs(x[i] - x[i - 1])) : Math.abs(x[i] - x[i - 1]);
        if ((decrease && increase) || (!decrease && !increase) || biggestChange > 3 || smallestChange < 1) {
            for (let j = 0; j < x.length; j++) {
                let temp = x.slice();
                temp.splice(j, 1);
                biggestChange = undefined;
                smallestChange = undefined;
                decrease = false;
                increase = false;
                for (let k = 1; k < temp.length; k++) {
                    if (temp[k] < temp[k - 1]) decrease = true;
                    if (temp[k] > temp[k - 1]) increase = true;
                    biggestChange = typeof biggestChange != "undefined" ? Math.max(biggestChange, Math.abs(temp[k] - temp[k - 1])) : Math.abs(temp[k] - temp[k - 1]);
                    smallestChange = typeof smallestChange != "undefined" ? Math.min(smallestChange, Math.abs(temp[k] - temp[k - 1])) : Math.abs(temp[k] - temp[k - 1]);
                }
                if (((decrease && !increase) || (!decrease && increase)) && biggestChange <= 3 && smallestChange >= 1) break;
            }
            break;
        }
    }

    return ((decrease && !increase) || (!decrease && increase)) && biggestChange <= 3 && smallestChange >= 1;
}).length);

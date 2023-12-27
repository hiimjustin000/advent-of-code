const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
const resultArray = [];

const numberIndices = [];
for (let i = 0; i < input.length; i++) {
    const numbers = input[i].replace(/\./g, " ");

    for (const match of numbers.matchAll(/\*/g)) {
        for (let j = match.index; j < match.index + match[0].length; j++) {
            const surrounding = [
                (input[i - 1] ?? "")[j - 1] ?? ".",
                (input[i - 1] ?? "")[j] ?? ".",
                (input[i - 1] ?? "")[j + 1] ?? ".",
                (input[i] ?? "")[j - 1] ?? ".",
                (input[i] ?? "")[j] ?? ".",
                (input[i] ?? "")[j + 1] ?? ".",
                (input[i + 1] ?? "")[j - 1] ?? ".",
                (input[i + 1] ?? "")[j] ?? ".",
                (input[i + 1] ?? "")[j + 1] ?? "."
            ]
            const indices = [
                [i - 1, j - 1],
                [i - 1, j],
                [i - 1, j + 1],
                [i, j - 1],
                [i, j],
                [i, j + 1],
                [i + 1, j - 1],
                [i + 1, j],
                [i + 1, j + 1]
            ]
            const localNumberIndices = [];
            for (let k = 0; k < surrounding.length; k++) {
                if (/\d/.test(surrounding[k]) && (!/\d/.test(surrounding[k - 1] ?? "") || k % 3 == 0)) localNumberIndices.push(indices[k]);
            }
            if (localNumberIndices.length == 2) numberIndices.push(...localNumberIndices);
        }
    }
}

for (const index of numberIndices) {
    const [i, j] = index;
    const line = input[i];
    const num = ["", "", "", line[j], "", "", ""];
    if (/\d/.test(line[j - 1] ?? "")) num[2] = line[j - 1];
    if (num[2] != "" && /\d/.test(line[j - 2] ?? "")) num[1] = line[j - 2];
    if (num[1] != "" && /\d/.test(line[j - 3] ?? "")) num[0] = line[j - 3];
    if (/\d/.test(line[j + 1] ?? "")) num[4] = line[j + 1];
    if (num[4] != "" && /\d/.test(line[j + 2] ?? "")) num[5] = line[j + 2];
    if (num[5] != "" && /\d/.test(line[j + 3] ?? "")) num[6] = line[j + 3];
    resultArray.push(num.join(""));
}

console.log(resultArray.reduce((a, x, i, r) => a + (i % 2 == 0 ? parseInt(x) * parseInt(r[i + 1]) : 0), 0));
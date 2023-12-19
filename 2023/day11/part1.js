const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(""));
const rows = input.map(x => x.join(""));
const columns = input[0].map((_, i) => input.map(x => x[i]).join(""));
const galaxies = [];
let result = 0;

const emptyRows = rows.map((_, i) => i).filter(x => !rows[x].includes("#"));
const emptyColumns = columns.map((_, i) => i).filter(x => !columns[x].includes("#"));

for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
        if (input[i][j] == "#") galaxies.push([i + emptyRows.filter(x => x < i).length, j + emptyColumns.filter(x => x < j).length]);
    }
}

for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        result += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]);
    }
}

console.log(result);
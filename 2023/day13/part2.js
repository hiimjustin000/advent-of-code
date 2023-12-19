const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n\n").map(x => x.split("\n").map(y => y.split("")));
let result = 0;

for (const str of input) {
    const rows = Array(str.length).fill("").map((_, i) => str[i].join(""));
    const columns = Array(str[0].length).fill("").map((_, i) => str.map(x => x[i]).join(""));
    
    const rowsOfReflection = [];
    for (let r = 1; r < rows.length; r++) {
        const failedInstances = [];
        rowsOfReflection.push(r);
        for (let i = r - 1, j = r; i >= 0 && j < rows.length; i--, j++) {
            if (rows[i] != rows[j]) failedInstances.push([i, j]);
        }
        
        if (failedInstances.length != 1 || rows[failedInstances[0][0]].split("").map((x, i) => x != rows[failedInstances[0][1]][i]).filter(x => x).length != 1)
            rowsOfReflection.splice(rowsOfReflection.length - 1, 1);
    }

    const columnsOfReflection = [];
    for (let c = 1; c < columns.length; c++) {
        const failedInstances = [];
        columnsOfReflection.push(c);
        for (let i = c - 1, j = c; i >= 0 && j < columns.length; i--, j++) {
            if (columns[i] != columns[j]) failedInstances.push([i, j]);
        }
        
        if (failedInstances.length != 1 || columns[failedInstances[0][0]].split("").map((x, i) => x != columns[failedInstances[0][1]][i]).filter(x => x).length != 1)
            columnsOfReflection.splice(columnsOfReflection.length - 1, 1);
    }

    if (rowsOfReflection.length > 0) result += 100 * rowsOfReflection[0];
    if (columnsOfReflection.length > 0) result += columnsOfReflection[0];
}

console.log(result);
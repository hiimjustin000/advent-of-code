const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
let result = 0;

for (const line of input) {
    const digits = line.replace(/\D/g, "");
    result += parseInt(digits[0] + (digits[digits.length - 1] ?? digits[0]));
}

console.log(result);
const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n\n").map(x => x.split("\n"));
globalThis.workflows = {};
const { workflows } = globalThis;
const parts = input[1].map(x => ({ ...JSON.parse(x.replace("{", "{\"").replace(/=/g, "\":").replace(/,/g, ",\"")), accepted: false }));
let result = 0;

for (const line of input[0]) {
    const [workflow, funcs] = line.slice(0, -1).split("{").map((x, i) => i == 1 ? x.split(",") : x);
    let functionString = "";
    for (const func of funcs) {
        if (func.includes(">")) {
            const [greater, than] = func.split(">").map((x, i) => i == 1 ? x.split(":")[0] : x);
            functionString += `if (part.${greater} > ${than}) return`;
            const then = func.split(":")[1];
            switch (then) {
                case "A":
                    functionString += " part.accepted = true;\n";
                    break;
                case "R":
                    functionString += ";\n";
                    break;
                default:
                    functionString += ` globalThis.workflows.${then}(part);\n`;
                    break;
            }
        }
        else if (func.includes("<")) {
            const [less, than] = func.split("<").map((x, i) => i == 1 ? x.split(":")[0] : x);
            functionString += `if (part.${less} < ${than}) return`;
            const then = func.split(":")[1];
            switch (then) {
                case "A":
                    functionString += " part.accepted = true;\n";
                    break;
                case "R":
                    functionString += ";\n";
                    break;
                default:
                    functionString += ` globalThis.workflows.${then}(part);\n`;
                    break;
            }
        }
        else {
            switch (func) {
                case "A":
                    functionString += "return part.accepted = true;";
                    break;
                case "R":
                    functionString += "return;";
                    break;
                default:
                    functionString += `return globalThis.workflows.${func}(part);`;
                    break;
            }
        }
    }

    workflows[workflow] = new Function("part", functionString);
}

for (const part of parts) {
    workflows.in(part);
    if (part.accepted) result += part.x + part.m + part.a + part.s;
}

console.log(result);
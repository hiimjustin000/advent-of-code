const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
let result = 0;

for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const game = line.split(": ")[1].split("; ").map(x => {
        const result = {
            red: 0,
            green: 0,
            blue: 0
        }
        const objects = x.split(", ");
        for (const object of objects) {
            if (object.endsWith("red")) result.red = parseInt(object.split(" ")[0]);
            if (object.endsWith("green")) result.green = parseInt(object.split(" ")[0]);
            if (object.endsWith("blue")) result.blue = parseInt(object.split(" ")[0]);
        }
    
        return result;
    });
    const redMax = Math.max(...game.map(x => x.red));
    const greenMax = Math.max(...game.map(x => x.green));
    const blueMax = Math.max(...game.map(x => x.blue));
    result += redMax * greenMax * blueMax;
}

console.log(result);
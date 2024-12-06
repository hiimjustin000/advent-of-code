// This solution took seven minutes to finish, but it got the right answer, so I'm just leaving it here.
// If you want to know the progress, just look at the console output.
// Brute forcing is cool when you have the patience for it.
// hiimjustin000 December 6, 2024

const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const mapped = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(""));

let result = 0;
for (let obY = 0; obY < mapped.length; obY++) {
    for (let obX = 0; obX < mapped[obY].length; obX++) {
        if (mapped[obY][obX] == "#" || mapped[obY][obX] == "^") continue;
        const newMapped = mapped.map(x => x.map(x => x));
        newMapped[obY][obX] = "#";
        process.stdout.write(`\u001b[2KProcessing ${obY}/${mapped.length} ${obX}/${mapped[obY].length} - ${result}\u001b[0G`);

        let xDirection = 0;
        let yDirection = -1;
        const areasVisited = [];
        let y = newMapped.findIndex(x => x.includes("^"));
        let x = newMapped[y].indexOf("^");

        while (x >= 0 && x < newMapped[0].length && y >= 0 && y < newMapped.length) {
            if (areasVisited.some(z => z.x == x && z.y == y && z.xDirection == xDirection && z.yDirection == yDirection)) {
                result++;
                break;
            }

            areasVisited.push({ x, y, xDirection, yDirection });

            const movedX = x + xDirection;
            const movedY = y + yDirection;
            
            if (movedX < 0 || movedX >= newMapped[0].length || movedY < 0 || movedY >= newMapped.length) break;

            if (newMapped[movedY][movedX] == "#") {
                if (xDirection == 0 && yDirection == -1) {
                    xDirection = 1;
                    yDirection = 0;
                }
                else if (xDirection == 1 && yDirection == 0) {
                    xDirection = 0;
                    yDirection = 1;
                }
                else if (xDirection == 0 && yDirection == 1) {
                    xDirection = -1;
                    yDirection = 0;
                }
                else if (xDirection == -1 && yDirection == 0) {
                    xDirection = 0;
                    yDirection = -1;
                }
            }
            else {
                x = movedX;
                y = movedY;
            }
        }
    }
}

console.log();
console.log(result);

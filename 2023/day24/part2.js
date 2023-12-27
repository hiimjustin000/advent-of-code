const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
const hailstones = [];
const velocities = [ {}, {}, {} ];

for (const line of input) {
    const [position, velocity] = line.split(" @ ").map(x => x.split(", ").map(y => parseInt(y)));
    velocities[0][velocity[0]] ??= [];
    velocities[0][velocity[0]].push(position[0]);
    velocities[1][velocity[1]] ??= [];
    velocities[1][velocity[1]].push(position[1]);
    velocities[2][velocity[2]] ??= [];
    velocities[2][velocity[2]].push(position[2]);
    hailstones.push([position, velocity]);
}

const rockVelocity = velocities.map(v => {
    const possibleVelocity = Array(2001).fill(0).map((_, i) => i - 1000);
    for (const velocity of Object.keys(v)) {
        if (v[velocity].length < 2) continue;
        const newPossibleVelocity = possibleVelocity.filter(x => (v[velocity][0] - v[velocity][1]) % (x - velocity) == 0);
        possibleVelocity.splice(0, possibleVelocity.length, ...newPossibleVelocity);
    }
    return possibleVelocity[0];
});

const results = {};
for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
        const h1 = hailstones[i];
        const h2 = hailstones[j];
        const quotient1 = (h1[1][1] - rockVelocity[1]) / (h1[1][0] - rockVelocity[0]);
        const quotient2 = (h2[1][1] - rockVelocity[1]) / (h2[1][0] - rockVelocity[0]);
        const rockX = Math.floor((h2[0][1] - (quotient2 * h2[0][0]) - h1[0][1] + (quotient1 * h1[0][0])) / (quotient1 - quotient2));
        const rockY = Math.floor(quotient1 * rockX + h1[0][1] - (quotient1 * h1[0][0]));
        const rockZ = h1[0][2] + (h1[1][2] - rockVelocity[2]) * Math.round((rockX - h1[0][0]) / (h1[1][0] - rockVelocity[0]));
        results[rockX + rockY + rockZ] ??= 0;
        results[rockX + rockY + rockZ]++;
    }
}

console.log(Object.keys(results).sort((a, b) => results[b] - results[a])[0]);
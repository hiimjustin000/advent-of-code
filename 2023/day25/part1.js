const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
const components = {};
const connections = new Set();

for (const line of input) {
    const [component1, connected] = line.split(": ");
    const component2s = connected.split(" ");
    for (const component2 of component2s) {
        components[component1] ??= [];
        components[component1].push(component2);
        components[component2] ??= [];
        components[component2].push(component1);
        connections.add([component1, component2].sort().join(","));
    }
}

const betweenness = {};
for (const component of Object.keys(components)) {
    const visited = new Set();
    const queue = [[component, []]];
    while (queue.length > 0) {
        for (let _ = 0; _ < queue.length; _++) {
            const [current, path] = queue.shift();
            for (const connection of path) {
                betweenness[connection] ??= 0;
                betweenness[connection]++;
            }
            for (const next of components[current]) {
                if (!visited.has(next)) {
                    visited.add(next);
                    queue.push([next, [...path, [current, next].sort().join(",")]]);
                }
            }
        }
    }
}

const importantConnections = Object.keys(betweenness).sort((a, b) => betweenness[b] - betweenness[a]).slice(0, 3).map(x => x.split(","));
for (const connection of importantConnections) {
    components[connection[0]].splice(components[connection[0]].indexOf(connection[1]), 1);
    if (components[connection[0]].length <= 0) delete components[connection[0]];
    components[connection[1]].splice(components[connection[1]].indexOf(connection[0]), 1);
    if (components[connection[1]].length <= 0) delete components[connection[1]];
}

const lastComponent = Object.keys(components).slice(-1)[0];
const visited = new Set([lastComponent]);
const queue = [lastComponent];
while (queue.length > 0) {
    const current = queue.pop();
    for (const next of components[current]) {
        if (!visited.has(next)) {
            visited.add(next);
            queue.push(next);
        }
    }
}

console.log(visited.size * (Object.keys(components).length - visited.size));
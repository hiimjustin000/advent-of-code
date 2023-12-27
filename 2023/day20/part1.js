const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
const modules = {};
const result = [0, 0];

for (const line of input) {
    const [amodule, destinations] = line.split(" -> ").map((x, i) => i == 1 ? x.split(", ") : x);
    modules[amodule.slice(1)] = { destinations, name: amodule.slice(1), type: amodule[0], pulse: false, pulseReceived: false };
    if (line.startsWith("%")) modules[amodule.slice(1)].on = false;
    else if (line.startsWith("&")) modules[amodule.slice(1)].modules = {};
    else if (line.startsWith("b")) modules[amodule.slice(1)].name = "broadcaster";
}

for (const amodule of Object.values(modules)) {
    amodule.destinations = amodule.destinations.map(x => modules[x]);
}

for (const amodule of Object.values(modules)) {
    for (const destination of amodule.destinations) {
        if (typeof destination != "undefined" && destination.type == "&") destination.modules[amodule.name] = amodule;
    }
}

function forEachDestination(amodule) {
    return destination => {
        if (typeof destination == "undefined") {
            result[Number(amodule.pulse)]++;
            return;
        }
        if (destination.type == "%" && amodule.pulse) {
            result[1]++;
            return;
        }
        result[Number(amodule.pulse)]++;
        destination.pulseReceived = amodule.pulse;
    }
}

function filterDestinations(amodule) {
    return destination => typeof destination != "undefined" && !(destination.type == "%" && amodule.pulse);
}

for (let _ = 0; _ < 1000; _++) {
    const queue = [Object.entries(modules).filter(([_, x]) => x.type == "b").map(([_, x]) => x)[0]];
    result[0]++;
    while (queue.length > 0) {
        const amodule = queue.shift();
        if (typeof amodule == "undefined") continue;
        switch (amodule.type) {
            case "%":
                if (!amodule.pulseReceived) amodule.pulse = amodule.on = !amodule.on;
                break;
            case "&":
                amodule.pulse = !Object.values(amodule.modules).every(x => x.pulse);
                break;
        }
        if ((amodule.type == "%" && !amodule.pulseReceived) || amodule.type != "%") {
            amodule.destinations.forEach(forEachDestination(amodule));
            queue.push(...amodule.destinations.filter(filterDestinations(amodule)));
        }
    }
}

console.log(result[0] * result[1]);
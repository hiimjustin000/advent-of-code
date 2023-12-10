const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n").map(x => x.split(" ")).map(x => [x[0], parseInt(x[1])]);

const cardMap = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
}

const fiveOfAKind = [];
const fourOfAKind = [];
const fullHouse = [];
const threeOfAKind = [];
const twoPairs = [];
const onePair = [];
const highCard = [];

for (const line of input) {
    const chars = {};
    for (const char of line[0]) {
        chars[char] == undefined ? chars[char] = 1 : chars[char]++;
    }
    const keys = Object.keys(chars);
    const values = Object.values(chars);
    if (keys.length == 1)  fiveOfAKind.push(line);
    else if (keys.length == 2) {
        if (values.includes(4)) fourOfAKind.push(line);
        else fullHouse.push(line);
    }
    else if (keys.length == 3) {
        if (values.includes(3)) threeOfAKind.push(line);
        else twoPairs.push(line);
    }
    else if (keys.length == 4) onePair.push(line);
    else highCard.push(line);
}

function sortCards(a, b) {
    if (cardMap[a[0][0]] != cardMap[b[0][0]]) return cardMap[a[0][0]] - cardMap[b[0][0]];
    else if (cardMap[a[0][1]] != cardMap[b[0][1]]) return cardMap[a[0][1]] - cardMap[b[0][1]];
    else if (cardMap[a[0][2]] != cardMap[b[0][2]]) return cardMap[a[0][2]] - cardMap[b[0][2]];
    else if (cardMap[a[0][3]] != cardMap[b[0][3]]) return cardMap[a[0][3]] - cardMap[b[0][3]];
    else if (cardMap[a[0][4]] != cardMap[b[0][4]]) return cardMap[a[0][4]] - cardMap[b[0][4]];
    else return 0;
}

fiveOfAKind.sort(sortCards);
fourOfAKind.sort(sortCards);
fullHouse.sort(sortCards);
threeOfAKind.sort(sortCards);
twoPairs.sort(sortCards);
onePair.sort(sortCards);
highCard.sort(sortCards);

const resultArray = [...highCard, ...onePair, ...twoPairs, ...threeOfAKind, ...fullHouse, ...fourOfAKind, ...fiveOfAKind];
console.log(resultArray.reduce((a, x, i) => a + x[1] * (i + 1), 0));
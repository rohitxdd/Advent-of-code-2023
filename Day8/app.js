const fs = require("node:fs")

const [directions, map] = fs.readFileSync('./input.txt', { encoding: "utf-8" }).split('\n\n')


const m = new Map()

map.split('\n').forEach(row => {
    const [k, v] = row.split('=').map(e => e.trim())
    m.set(k, v)
})

let currNodes = []

for (const k of m.keys()) {
    if (k.endsWith('A')) {
        currNodes.push(k)
    }
}

const steps = new Array(currNodes.length).fill(0)
console.log(steps)


console.log(currNodes)


let tempstep = 0
currNodes.forEach((node, index) => {
    let tempnode = node
    while (!tempnode.endsWith('Z')) {
        for (let i = 0; i < directions.length; i++) {
            const dir = directions[i]
            let v = m.get(tempnode).split(',').map(e => e.replace(/[()]/g, '').trim())
            if (dir === "L") {
                tempnode = v[0]
            } else {
                tempnode = v[1]
            }
            tempstep++
            if (tempnode.endsWith('Z')) {
                steps[index] = tempstep
                tempstep = 0
                break;
            }
        }
    }
})

console.log(steps)

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function calculateLCM(numbers) {
    if (numbers.length < 2) {
        throw new Error('At least two numbers are required to calculate LCM.');
    }

    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        result = lcm(result, numbers[i]);
    }

    return result;
}

console.log(calculateLCM(steps));

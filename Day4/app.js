const fs = require("node:fs")

const lines = fs.readFileSync("./input.txt", { encoding: "utf-8" }).split('\n').map(e => e.trim())
let totalpoints = 0
lines.forEach(line => {
    const [winningNums, Nums] = line.split(':')[1].split('|').map(e => e.trim().split(" ").filter(e => !!e))
    let point = 0
    Nums.forEach(element => {
        if (winningNums.includes(element)) {
            if (point === 0) {
                point = 1
            } else {
                point *= 2
            }
        }
    });
    totalpoints += point
})

console.log(totalpoints)
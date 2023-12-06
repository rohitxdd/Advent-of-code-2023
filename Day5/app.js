const fs = require("node:fs");

const file = fs.readFileSync('./input.txt', { encoding: "utf-8" }).split(/\n\s*\n/)

const mapping = {}

let iterable = "seed"

for (let index = 0; index < file.length; index++) {

    const line = file[index]

    if (!mapping.hasOwnProperty("seed")) {
        mapping[iterable] = line.split(":")[1].split(" ").map(e => e.trim()).filter(e => e)
        continue
    }

    let [map, mapVal] = line.split(":")
    map = map.split(" ")[0].split("-")
    const [source, _, destination] = map
    //init
    mapping[destination] = []

    mapVal = mapVal.split("\n").map(e => e.trim()).filter(e => e)
    mapping[iterable].forEach(itr => {
        const val = Number(itr)
        let flag = false;
        mapVal.forEach(row => {
            const [destinationRangeStart, sourceRangeStart, range] = row.split(" ").map(e => Number(e))
            if (val >= sourceRangeStart && val < sourceRangeStart + range) {
                const corrs = (val - sourceRangeStart) + destinationRangeStart
                mapping[destination].push(corrs)
                flag = true
                return;
            }
        })
        if (!flag) {
            mapping[destination].push(val)
        }
    });
    iterable = destination
}

const result = mapping[iterable].reduce((acc, curr) => {
    if (curr < acc) {
        return curr
    }
    return acc
}, Number.POSITIVE_INFINITY)

console.log(result)
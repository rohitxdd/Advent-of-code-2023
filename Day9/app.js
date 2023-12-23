const fs = require("node:fs")

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" }).split("\n")

let res = 0
for (const line of file) {

    let arr = line.trim().split(" ").map(parseFloat)

    let currArr = new Array(arr.length - 1).fill(-1)

    const arrs = [[...arr]]

    while (true) {
        for (let index = 0; index < arr.length - 1; index++) {
            currArr[index] = arr[index + 1] - arr[index]
        }
        arr = currArr
        arrs.push(currArr)
        currArr = []
        if (arr.every(e => e === 0)) {
            if (arr)
                break
        }
    }

    let lastelement = 0;

    while (true) {
        if (arrs.length > 0) {
            let elem = arrs.pop()[0]
            lastelement = elem - lastelement
        } else {
            break
        }
    }
    res += lastelement
}

console.log(res)



const fs = require("node:fs")

const lines = fs.readFileSync("./input.txt", { encoding: "utf-8" }).split('\n').map(e => e.trim())

const map = new Map()


lines.forEach(line => {
    const currentCardNo = Number(line.split(':')[0].split(" ").at(-1))

    if (!map.has(currentCardNo)) {
        map.set(currentCardNo, 1)
    }

    const [winningNums, Nums] = line.split(':')[1].split('|').map(e => e.trim().split(" ").filter(e => !!e))

    let point = 0

    Nums.forEach(element => {
        if (winningNums.includes(element)) {
            point++;
        }
    });

    for (let index = 1; index <= point; index++) {
        const nextCardNumber = currentCardNo + index
        if(nextCardNumber > lines.length){
            break
        }
        if(map.has(nextCardNumber)){
            map.set(nextCardNumber , map.get(nextCardNumber) + (map.get(currentCardNo)))
        }else{
            map.set(nextCardNumber, map.get(currentCardNo) + 1)
        }
    }
})

const result = Array.from(map.values()).reduce((acc, curr) => acc + curr, 0)

console.log(result)
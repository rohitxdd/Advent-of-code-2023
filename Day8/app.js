const fs = require("node:fs")

const [directions, map] = fs.readFileSync('./input.txt', { encoding: "utf-8" }).split('\n\n')


const m = new Map()

map.split('\n').forEach(row => {
    const [k, v] = row.split('=').map(e => e.trim())
    m.set(k, v)
})


let currNode = 'AAA'
let steps = 0
while(currNode != 'ZZZ'){   
    for (let i = 0; i < directions.length; i++) {
        const dir = directions[i]
        let v = m.get(currNode).split(',').map(e => e.replace(/[()]/g, '').trim())
        if(dir === "L"){
            currNode = v[0]
        }else{
            currNode = v[1]
        }
        steps ++
        if(currNode === 'ZZZ'){
            break
        }
    }
}
console.log(steps)

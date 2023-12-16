const fs = require("node:fs");

const [timeArr, distanceArr] = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n")
  .map((e) =>
    [Number(e
      .split(":")[1]
      .split(" ")
      .filter((e) => e).join('').trim())]
  );

let res = null

for (let index = 0; index < timeArr.length; index++) {
    
    let time = timeArr[index]
    let distance = distanceArr[index]
    let count = 0

    for (let t = 1; t < time; t++) {
        let d = t * (time - t)
        if(d > distance){
            count++;
        }
    }

    if(!res){
        res = count
    }else{
        res *= count
    }
}

console.log(res)

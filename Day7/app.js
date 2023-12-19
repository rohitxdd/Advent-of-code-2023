const fs = require("node:fs");

const input = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split("\n");

const TypeArr = ["FIVE", "FOUR", "FULL", "THREE", "TWO", "ONE", "HIGH"];

const cardsByStrength = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

function typeOfHand(hand) {
  const charobj = {};
  hand.split("").forEach((char) => {
    if (charobj.hasOwnProperty(char)) {
      charobj[char]++;
    } else {
      charobj[char] = 1;
    }
  });

  const arr = Object.values(charobj).sort((a, b) => b - a);
  if (arr.length === 1) {
    return "FIVE";
  } else if (arr.length === 2) {
    if (arr[0] === 4) {
      return "FOUR";
    } else {
      return "FULL";
    }
  } else if (arr.length === 3) {
    if (arr[0] === 3) {
      return "THREE";
    } else {
      return "TWO";
    }
  } else if (arr.length === 4) {
    return "ONE";
  } else {
    return "HIGH";
  }
}

const TypeObj = {};

for (let line of input) {
  const [hand, bid] = line.split(" ").map((e) => e.trim());
  const type = typeOfHand(hand);
  if (TypeObj.hasOwnProperty(type)) {
    TypeObj[type].push({ hand, bid });
  } else {
    TypeObj[type] = [{ hand, bid }];
  }
}

let startRank = 1;

let rank = []


let score = 0;

for (let tp of [...TypeArr].reverse()) {
  if (TypeObj.hasOwnProperty(tp)) {
    let temparr = [...TypeObj[tp]]
    temparr.forEach(curr => {
      if (rank.length === 0) {
        rank.push(curr)
      } else {
        let x = 0
        for (let index = 0; index < rank.length; index++) {
          const element = rank[index];
          const res = isStronger(element.hand, curr.hand);
          if (res) {
            rank.splice(x, 0, curr)
            x = -1
            break
          } else {
            x++
          }
        }
        if (x >= 0) {
          rank.splice(x, 0, curr)
        }
      }
    })
    rank.forEach((r, i) => {
      score += (startRank + i) * r.bid
    })
    startRank += rank.length
    rank = []
  }

}
console.log(score)


function isStronger(element, curr) {
  const elementArr = element.split('')
  const currArr = curr.split('')
  for (let index = 0; index < elementArr.length; index++) {
    const e = elementArr[index];
    const c = currArr[index];
    if (e !== c) {
      if (isNaN(e) && !isNaN(c)) {
        return true
      } else if (!isNaN(e) && isNaN(c)) {
        return false
      } else if (cardsByStrength.indexOf(e) < cardsByStrength.indexOf(c)) {
        return true
      } else {
        return false
      }
    }
  }
  return false
}
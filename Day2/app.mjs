import fs from "node:fs";

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const constrains = {
  red: 12,
  green: 13,
  blue: 14,
};

const partOne = () => {
  const possibleGames = [];
  input.split("\n").forEach((line) => {
    const gameId = line.split(":")[0].split(" ")[1];
    let isImpossile = false;
    const input = line
      .split(":")[1]
      .split(";")
      .map((e) => e.split(","));
    input.forEach((sets) => {
      sets.forEach((set) => {
        const [count, cube] = set.trim().split(" ");
        if (constrains[cube] < Number(count)) {
          isImpossile = true;
        }
      });
    });

    if (!isImpossile) possibleGames.push(Number(gameId));
  });

  console.log(possibleGames.reduce((acc, curr) => acc + curr, 0));
};

const InitialCount = {
    red : Number.NEGATIVE_INFINITY,
    green :Number.NEGATIVE_INFINITY,
    blue : Number.NEGATIVE_INFINITY
}

const partTwo = () => {
let sum = 0;
  input.split("\n").forEach((line) => {
    const cubeWithMaxCount = {...InitialCount}
    const input = line
      .split(":")[1]
      .split(";")
      .map((e) => e.split(","));
    input.forEach((sets) => {
      sets.forEach((set) => {
        const [count, cube] = set.trim().split(" ");
        if(cubeWithMaxCount[cube] < Number(count)){
            cubeWithMaxCount[cube] = count
        }
      });
    });
    sum += Object.values(cubeWithMaxCount).reduce((acc, curr) => acc * curr, 1)
  });
  console.log(sum)
};

partTwo()
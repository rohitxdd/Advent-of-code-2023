const fs = require("node:fs");

const file = fs
  .readFileSync("./input.txt", { encoding: "utf-8" })
  .split(/\n\s*\n/);

const mapping = {};

let iterable = "seed";

for (let index = 0; index < file.length; index++) {
  const line = file[index];

  if (!mapping.hasOwnProperty("seed")) {
    mapping[iterable] = [];
    const temp = line
      .split(":")[1]
      .split(" ")
      .map((e) => e.trim())
      .filter((e) => e);

    for (let index = 0; index < temp.length; index += 2) {
      const lowerlimit = Number(temp[index]);
      const upperLimit = Number(temp[index + 1]) + lowerlimit;
      mapping[iterable].push({ lowerlimit, upperLimit });
    }
    continue;
  }

  let [map, mapVal] = line.split(":");
  map = map.split(" ")[0].split("-");
  const [source, _, destination] = map;
  //init
  mapping[destination] = [];

  mapVal = mapVal
    .split("\n")
    .map((e) => e.trim())
    .filter((e) => e);

  for (let i = 0; i < mapping[iterable].length; i++) {
    let { lowerlimit, upperLimit } = mapping[iterable][i];
    mapVal.forEach((row) => {
      const [destinationRangeStart, sourceRangeStart, range] = row
        .split(" ")
        .map((e) => Number(e));
      if (
        lowerlimit >= sourceRangeStart &&
        lowerlimit < sourceRangeStart + range &&
        lowerlimit < upperLimit
      ) {
        // lowerlimit inside range
        if (upperLimit <= sourceRangeStart + range) {
          //both inside range
          const low = lowerlimit - sourceRangeStart + destinationRangeStart;
          const high = low + (upperLimit - lowerlimit);
          mapping[destination].push({ lowerlimit: low, upperLimit: high });
          lowerlimit = upperLimit;
        } else if (lowerlimit >= sourceRangeStart) {
          //upperlimit outof range
          const low = lowerlimit - sourceRangeStart + destinationRangeStart;
          const high = low + range - (lowerlimit - sourceRangeStart);
          mapping[destination].push({ lowerlimit: low, upperLimit: high });
          lowerlimit = sourceRangeStart + range;
        }
      } else if (
        upperLimit > sourceRangeStart &&
        upperLimit <= sourceRangeStart + range &&
        lowerlimit < upperLimit
      ) {
        // lowerlimit outside range and upperlimit falls in range
        const low = destinationRangeStart;
        const high = destinationRangeStart + (upperLimit - sourceRangeStart);
        mapping[destination].push({ lowerlimit: low, upperLimit: high });
        upperLimit = sourceRangeStart;
      } else if (
        lowerlimit < sourceRangeStart &&
        upperLimit > sourceRangeStart + range
      ) {
        //overlapping the range but not falling inside
        mapping[destination].push({
          lowerlimit: destinationRangeStart,
          upperLimit: destinationRangeStart + range,
        });
        mapping[iterable].push({
          lowerlimit: sourceRangeStart + range,
          upperLimit: upperLimit,
        });
        upperLimit = sourceRangeStart;
      }
    });

    if (lowerlimit < upperLimit) {
      mapping[destination].push({ lowerlimit, upperLimit });
    }
  }
  iterable = destination;
}

let min = Infinity;
mapping.location.forEach((e) => {
  if (e.lowerlimit < min) {
    min = e.lowerlimit;
  }
});

console.log(min);

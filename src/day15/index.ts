import { loadInput, profile } from "../utils.js";

const input = (await loadInput(15)).split(",");

function puzzle1(input: string[]) {
  let sum = 0;
  for (const str of input) {
    sum += hashStr(str);
  }
  return sum;
}

function hashStr(str: string) {
  return [...str].reduce((acc, curr, index) => {
    return ((acc + str.charCodeAt(index)) * 17) % 256;
  }, 0);
}

function puzzle2(input: string[]) {
  let sum = 0;
  let hashMap: Record<number, string[]> = {};

  for (const str of input) {
    if (str.includes("-")) {
      const [label] = str.split("-");
      const hashKey = hashStr(label);
      hashMap[hashKey] = hashMap[hashKey]?.filter((x) => {
        return x.split('=')[0] !== label
      });
      continue;
    }

    if (str.includes("=")) {
      const [label, focalLength] = str.split("=");
      const hashKey = hashStr(label);
      const index = hashMap[hashKey]?.findIndex((x) => x.includes(label));
      if (index >= 0) {
        hashMap[hashKey][index] = str;
      } else {
        if (hashMap[hashKey] === undefined) {
          hashMap[hashKey] = [str];
        } else {
          hashMap[hashKey].push(str);
        }
      }
      continue;
    }
  }

  for (const [box, content] of Object.entries(hashMap)) {
    let index = 1;
    for (const lens of content) {
      sum += (+box + 1) * index * +lens.split("=")[1];
      index++;
    }
  }
  return sum;
}

console.log(puzzle1(input));
console.log(puzzle2(input));

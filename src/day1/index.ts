import fs from 'fs/promises'
import path from "path";

import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = path.join(__dirname, 'input.txt');

async function loadInput(): Promise<string[]> {
    const filebuffer = await fs.readFile(inputFilePath)
    return filebuffer.toString().split('\n')
}

const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function puzzle1(input: string[]) {
    const combinedCalibrations = input.map((line) => {
        let first, last, index = 0;

        while (first === undefined || last === undefined) {
            const pos1 = +line.charAt(index);
            const pos2 = +line.charAt(line.length - index - 1)
            if (first === undefined && !Number.isNaN(pos1)) {
                first = pos1;
            }
            if (last === undefined && !Number.isNaN(pos2)) {
                last = pos2;
            }
            index++
        }
        return `${first}${last}`;
    })

    return combinedCalibrations.reduce((prev: number, curr: string, index) => {
        return prev + (+curr);
    }, 0);
}

function puzzle2(input: string[]) {
    function findIndexOfSpelledDigits(str: string) {
        const first = { index: Infinity, value: undefined }, last = { index: -Infinity, value: undefined };

        digits.map((digit, index) => {
            return [str.indexOf(digit), str.lastIndexOf(digit), index + 1];
        }).forEach(([firstIndex, lastIndex, value], index, array) => {
            if (firstIndex !== -1 && first.index > firstIndex) {
                first.index = firstIndex;
                first.value = value;
            }
            if (lastIndex !== -1 && last.index < lastIndex) {
                last.index = lastIndex;
                last.value = value;
            }
        });
        return [first, last];
    }

    const combinedCalibrations = input.map((line) => {
        let first, last, index = 0;
        const spelled = findIndexOfSpelledDigits(line);

        while (first === undefined || last === undefined) {
            if (index === line.length) {
                break;
            }
            const pos1 = +line.charAt(index);
            const pos2 = +line.charAt(line.length - index - 1)
            if (first === undefined && !Number.isNaN(pos1) && index < spelled[0].index) {
                first = pos1;
            }
            if (last === undefined && !Number.isNaN(pos2) && line.length - index - 1 > spelled[1].index) {
                last = pos2;
            }
            index++
        }

        return `${first || spelled[0].value}${last || spelled[1].value}`;
    })

    return combinedCalibrations.reduce((prev: number, curr: string, index) => {
        return prev + (+curr);
    }, 0);
}

const input = await loadInput();

const solution1 = puzzle1(input)
const solution2 = puzzle2(input);

console.log(solution1, solution2);
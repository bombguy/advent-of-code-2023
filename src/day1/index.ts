import { loadInput, profile } from "../utils.js";

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

const input = (await loadInput(1)).split('\n');

profile('part 1', () => {
    console.log(puzzle1(input));
});

profile('part 2', () => {
    console.log(puzzle2(input));
});
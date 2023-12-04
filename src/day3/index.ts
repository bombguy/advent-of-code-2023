import { loadInput, profile } from "../utils.js";

function part1(input) {
    let sum = 0;
    let node: {
        value: string
        isValid: boolean;
        row: number;
        col: number;
    };

    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (Number.isNaN(+(input[row][col]))) {
                if (node) {
                    // console.log(node.value);
                    if (checkSymbolNearby(input, node)) {
                        sum += +(node.value);
                    }
                    node = undefined;
                }
            } else {
                if (node) {
                    node.value = node.value + input[row][col];

                } else {
                    node = {
                        value: input[row][col],
                        isValid: false,
                        row, col
                    }
                }
            }
        }
    }
    return sum;
}

function part2(input) {
    let sum = 0;
    let node: {
        value: string
        isValid: boolean;
        row: number;
        col: number;
    };

    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (input[row][col] === '*') {
                const numbers = [];
                const stringsToCheck: string[] = getStringsToCheck(input, {
                    value: input[row][col],
                    isValid: false,
                    row, col
                });

                for (const str of stringsToCheck) {
                    const startCol = node.col === 0
                        ? 0
                        : node.col - 1;
                    const endCol = node.col + node.value.length + 1 >= input[node.row].length
                        ? input[node.row].length - 1
                        : node.col + node.value.length + 1
                    const stringToCheck = [];

                    if (node.row > 0) {
                        stringToCheck.push(input[node.row - 1].slice(startCol, endCol));
                    }

                    stringToCheck.push(input[node.row].slice(startCol, endCol));

                    if (node.row + 1 < input.length) {
                        stringToCheck.push(input[node.row + 1].slice(startCol, endCol));
                    }

                }
            } else {
                if (node) {
                    node.value = node.value + input[row][col];

                } else {
                    node = {
                        value: input[row][col],
                        isValid: false,
                        row, col
                    }
                }
            }
        }
    }
    return sum;
}

function checkNumberNearby(input: string[], node) {

}

function getStringsToCheck(input, node) {
    const startCol = node.col === 0
        ? 0
        : node.col - 1;
    const endCol = node.col + node.value.length + 1 >= input[node.row].length
        ? input[node.row].length - 1
        : node.col + node.value.length + 1
    const stringToCheck = [];

    if (node.row > 0) {
        stringToCheck.push(input[node.row - 1].slice(startCol, endCol));
    }

    stringToCheck.push(input[node.row].slice(startCol, endCol));

    if (node.row + 1 < input.length) {
        stringToCheck.push(input[node.row + 1].slice(startCol, endCol));
    }

    return stringToCheck;
}
function checkSymbolNearby(input: string[], node) {
    const stringToCheck = getStringsToCheck(input, node);

    for (const str of stringToCheck) {
        if (checkIfSymbolInString(str)) {
            return true;
        }
    }

    return false;
}

function checkIfSymbolInString(str: string) {
    const noDots = str.replaceAll('.', '');
    const check = noDots.match(/[\D]/);

    return check !== null;
}

const input = (await loadInput(3)).split('\n');

// console.log(part1(input));
console.log(part2(input));
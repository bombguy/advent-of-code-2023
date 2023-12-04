import { loadInput, profile } from "../utils.js";

const input = (await loadInput(4)).split('\n');


function part1(input) {
    return input.reduce((sum, card) => {
        const [_, cardData] = card.split(':');
        const [rawWinningNumbers, rawMyNumbers] = cardData.split('|');
        const winningNumbers: string[] = rawWinningNumbers.trim().split(/\s+/g);
        const myNumbers: string[] = rawMyNumbers.trim().split(/\s+/g);

        let matchedNumber = [];
        for (const number of myNumbers) {
            if (winningNumbers.includes(number)) {
                matchedNumber.push(number);
            }
        }

        const gameScore = matchedNumber.reduce((cardScore, number, index) => {
            if (index === 0) {
                return 1;
            }
            return cardScore * 2;
        }, 0);

        return sum + gameScore;
    }, 0)
}

function part2(input) {
    const copiesOfCards = new Array(input.length).fill(1);

    input.forEach((card, index) => {
        const [_, cardData] = card.split(':');
        const [rawWinningNumbers, rawMyNumbers] = cardData.split('|');
        const winningNumbers: string[] = rawWinningNumbers.trim().split(/\s+/g);
        const myNumbers: string[] = rawMyNumbers.trim().split(/\s+/g);

        let matchedNumber = [];
        let offset = 1;
        for (const number of myNumbers) {
            if (winningNumbers.includes(number)) {
                matchedNumber.push(number);
                const extraCopyIndex = index + offset >= input.length
                    ? input.length - 1
                    : index + offset;

                copiesOfCards[extraCopyIndex] += copiesOfCards[index];
                offset++;
            }
        }
        console.log(_, matchedNumber.length);
    });
    return copiesOfCards.reduce((sum, numCopies) => sum + numCopies, 0);
}


// console.log(part1(input));
console.log(part2(input));
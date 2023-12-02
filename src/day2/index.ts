import { loadInput, profile } from "../utils.js";

const total_red = 12;
const total_green = 13;
const total_blue = 14;

function puzzle1(input: string[]) {
    let sum = 0;

    for (const game of input) {
        const [gameinfo, roundData] = game.split(':');
        const rounds = roundData.split(';');
        let isValidGame = true;

        for (const round of rounds) {
            const trimmedRound = round.replaceAll(' ', '');
            const marbles = trimmedRound.split(',');

            for (const marble of marbles) {
                if (isValidGame === false) {
                    break;
                }

                const [_, numMarbles, color] = marble.match(/(\d+)(red|blue|green)/);
                // console.log(color, numMarbles)
                switch (color) {
                    case 'red':
                        isValidGame = +numMarbles <= total_red;
                        break;
                    case 'green':
                        isValidGame = +numMarbles <= total_green;
                        break;
                    case 'blue':
                        isValidGame = +numMarbles <= total_blue;
                        break;
                }
            }

        }
        if (isValidGame) {
            sum += +(gameinfo.split(' ')[1]);
            // console.log(+(gameinfo.split(' ')[1]), rounds);
        }
    }

    return sum;
}


function puzzle2(input: string[]) {
    let sum = 0;

    for (const game of input) {
        const [gameinfo, roundData] = game.split(':');
        const rounds = roundData.split(';');

        let minRed = -Infinity;
        let minGreen = -Infinity;
        let minBlue = -Infinity;

        for (const round of rounds) {

            const trimmedRound = round.replaceAll(' ', '');
            const marbles = trimmedRound.split(',');

            for (const marble of marbles) {
                const [_, numMarbles, color] = marble.match(/(\d+)(red|blue|green)/);

                switch (color) {
                    case 'red':
                        if (minRed < +numMarbles) {
                            minRed = +numMarbles;
                        }
                        break;
                    case 'green':
                        if (minGreen < +numMarbles) {
                            minGreen = +numMarbles;
                        }
                        break;
                    case 'blue':
                        if (minBlue < +numMarbles) {
                            minBlue = +numMarbles;
                        }
                        break;
                }
            }
        }
        sum += (minRed * minGreen * minBlue);
    }

    return sum;
}
const input = (await loadInput(2)).split('\n');

profile('part 1', () => {
    console.log(puzzle1(input));
});

profile('part 2', () => {
    console.log(puzzle2(input));
});
import { loadInput, profile } from "../utils.js";

const input = (await loadInput(7)).split('\n');

const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const cardOrder2 = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

enum HandCombo {
    fiveOfKind = 'fiveOfKind',
    fourOfKind = 'fourOfKind',
    fullHouse = 'fullHouse',
    threeOfKind = 'threeOfKind',
    twoPair = 'twoPair',
    onePair = 'onePair',
    highCard = 'highCard',
}

function part1(input) {
    const fiveOfKind = [];
    const fourOfKind = [];
    const fullHouse = [];
    const threeOfKind = [];
    const twoPair = [];
    const onePair = [];
    const highCard = [];

    input.forEach((cards) => {
        const handType = categorizeHand(cards);

        switch (handType) {
            case HandCombo.fiveOfKind:
                fiveOfKind.push(cards);
                break;
            case HandCombo.fourOfKind:
                fourOfKind.push(cards);
                break;
            case HandCombo.fullHouse:
                fullHouse.push(cards);
                break;
            case HandCombo.threeOfKind:
                threeOfKind.push(cards);
                break;
            case HandCombo.twoPair:
                twoPair.push(cards);
                break;
            case HandCombo.onePair:
                onePair.push(cards);
                break;
            case HandCombo.highCard:
                highCard.push(cards);
                break;
        }
    })
    sortHandType(fiveOfKind, cardOrder);
    sortHandType(fourOfKind, cardOrder);
    sortHandType(fullHouse, cardOrder);
    sortHandType(threeOfKind, cardOrder);
    sortHandType(twoPair, cardOrder);
    sortHandType(onePair, cardOrder);
    sortHandType(highCard, cardOrder);


    return [...highCard, ...onePair, ...twoPair, ...threeOfKind, ...fullHouse, ...fourOfKind, ...fiveOfKind].reduce((sum, hand, index) => {
        const [cards, betAmount] = hand.split(' ');

        sum += +betAmount * (index + 1);
        return sum;
    }, 0)
    // console.log('hello')

}

function part2(input) {
    const fiveOfKind = [];
    const fourOfKind = [];
    const fullHouse = [];
    const threeOfKind = [];
    const twoPair = [];
    const onePair = [];
    const highCard = [];

    input.forEach((cards) => {
        const handType = categorizeHand2(cards);

        switch (handType) {
            case HandCombo.fiveOfKind:
                fiveOfKind.push(cards);
                break;
            case HandCombo.fourOfKind:
                fourOfKind.push(cards);
                break;
            case HandCombo.fullHouse:
                fullHouse.push(cards);
                break;
            case HandCombo.threeOfKind:
                threeOfKind.push(cards);
                break;
            case HandCombo.twoPair:
                twoPair.push(cards);
                break;
            case HandCombo.onePair:
                onePair.push(cards);
                break;
            case HandCombo.highCard:
                highCard.push(cards);
                break;
        }
    })
    sortHandType(fiveOfKind, cardOrder2);
    sortHandType(fourOfKind, cardOrder2);
    sortHandType(fullHouse, cardOrder2);
    sortHandType(threeOfKind, cardOrder2);
    sortHandType(twoPair, cardOrder2);
    sortHandType(onePair, cardOrder2);
    sortHandType(highCard, cardOrder2);


    return [...highCard, ...onePair, ...twoPair, ...threeOfKind, ...fullHouse, ...fourOfKind, ...fiveOfKind].reduce((sum, hand, index, array) => {
        const [cards, betAmount] = hand.split(' ');

        sum += +betAmount * (index + 1);
        return sum;
    }, 0)
    // console.log('hello')

}

function sortHandType(bucket: string[], order) {
    for (let nthCard = 0; nthCard < 5; nthCard++) {
        bucket.sort((a, b) => {
            const cardsA = a.split(' ')[0];
            const cardsB = b.split(' ')[0];
            if (cardsA.substring(0, nthCard) !== cardsB.substring(0, nthCard)) {
                return 0;
            }
            return order.indexOf(cardsA[nthCard]) - order.indexOf(cardsB[nthCard]);
        })
        console.log('');
    }
}

function categorizeHand(input) {
    const [cards, betAmount] = input.split(' ')

    const uniqueCards = new Set(cards);
    if (uniqueCards.size < cards.length) {
        if (uniqueCards.size === 1)
            return HandCombo.fiveOfKind;
        if (uniqueCards.size === 2) {
            const count = cards.split('').filter((card) => {
                return card === cards[0]
            }).length;

            if (count === 4 || count === 1) {
                return HandCombo.fourOfKind;
            }
            return HandCombo.fullHouse;
        }
        if (uniqueCards.size === 3) {
            // three of kind, two pair
            for (const lookingCard of cards) {
                const count = cards.split('').filter((card) => {
                    return card === lookingCard
                }).length;
                if (count === 3) {
                    return HandCombo.threeOfKind
                }
                if (count == 2) {
                    return HandCombo.twoPair;
                }
            }
            return HandCombo.twoPair;

        }
        if (uniqueCards.size === 4) {
            return HandCombo.onePair;
        }
    }

    return HandCombo.highCard;
}


function categorizeHand2(input) {
    const [cards, betAmount] = input.split(' ')

    const uniqueCards = new Set(cards);
    if (uniqueCards.size < cards.length) {
        if (uniqueCards.size === 1)
            return HandCombo.fiveOfKind;
        if (uniqueCards.size === 2) {
            if (uniqueCards.has('J')) {
                return HandCombo.fiveOfKind;
            }

            const count = cards.split('').filter((card) => {
                return card === cards[0]
            }).length;

            if (count === 4 || count === 1) {
                return HandCombo.fourOfKind;
            }
            return HandCombo.fullHouse;
        }
        if (uniqueCards.size === 3) {
            const numOfJacks = findJacks(cards);
            if (numOfJacks === 3) {
                return HandCombo.fourOfKind;
            }
            for (const lookingCard of cards) {
                const count = cards.split('').filter((card) => {
                    return card === lookingCard
                }).length;

                if (count === 3) {
                    if (numOfJacks === 1) {
                        return HandCombo.fourOfKind;
                    }
                    return HandCombo.threeOfKind
                }

                if (count == 2) {
                    if (numOfJacks === 2) {
                        return HandCombo.fourOfKind;
                    }
                    if (numOfJacks === 1) {
                        return HandCombo.fullHouse
                    }
                    return HandCombo.twoPair;
                }
            }

            return HandCombo.twoPair;

        }
        if (uniqueCards.size === 4) {
            if (uniqueCards.has('J')) {
                return HandCombo.threeOfKind;
            }
            return HandCombo.onePair;
        }
    }
    if (uniqueCards.has('J')) {
        return HandCombo.onePair;
    } else {
        return HandCombo.highCard;
    }
}

function findJacks(cards: string) {
    return cards.split("").reduce((num, card) => {
        if (card === 'J') {
            return num + 1;
        }
        return num;
    }, 0)
}

// console.log(part1(input));
console.log(part2(input));

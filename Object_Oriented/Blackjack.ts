// Design a data structures for a generic deck of cards. Explain how you would subclass the data structures to implement blackjack.

class Card {
    suit: string
    rank: string

    constructor(suit: string, rank: string) {
        this.suit = suit
        this.rank = rank
    }

    toString(): string {
        return `${this.rank} of ${this.suit}`
    }
}

class BlackjackCard extends Card{
    value(card: Card): number {
        if (['Jack', 'Queen', 'King'].includes(card.rank)) {
            return 10;
        } else if (card.rank == 'Ace') {
            return 11;
        } else {
            return Number(card.rank);
        }
    }
}

class Deck {
    cards: BlackjackCard[] = []

    build(): void {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']

        this.cards = []
        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new BlackjackCard(suit, rank));
            }
        }
    }

    shuffle(): void {
        for (let i = this.cards.length -1; i >0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    dealCard() {
        return this.cards.pop();
    }
}

class BlackjackHand {
    cards: BlackjackCard[] = []

    addCard(card: BlackjackCard): void {
        this.cards.push(card)
    }

    getValue(): number {
        let total = 0
        let num_aces = 0

        this.cards.forEach(card => {
            total += card.value(card);

            if (card.rank == 'Ace') {
                num_aces += 1;
            }
        });

        while (total > 21 && num_aces > 0) {
            total -= 10;
            num_aces -= 1;
        }

        return total;
    }

    isBust(): boolean {
        return this.getValue() > 21;
    }

    isBlackjack(): boolean {
        return this.getValue() == 21 && this.cards.length == 2;
    }
}

const deck = new Deck();
// deck.cards = deck.cards.map(c => new BlackjackCard(c.suit, c.rank));
const player_hand = new BlackjackHand()
player_hand.addCard(deck.dealCard())
player_hand.addCard(deck.dealCard())

console.log(player_hand.isBlackjack())
console.log(player_hand.isBust())

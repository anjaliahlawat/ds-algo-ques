// design othelo game

type GridState = 'empty' | 'black' | 'white';

class OthelloBoard {
    grid: GridState[][];
    players: Player[];

    constructor(players: Player[], gridSize: number) {
        this.grid = this.initializeGrid(gridSize);
        this.players = players;
    }

    initializeGrid(size: number): GridState[][] {
        const grid: GridState[][] = [];
        for (let i = 0; i < size; i++) {
            const row: GridState[] = [];
            for (let j = 0; j < size; j++) {
                row.push('empty');
            }
            grid.push(row);
        }
        return grid;
    }

    onPositionSelected(player: Player, dimension: number[]) {
        // logic to select position on the board
        this.checkAdjacentPieces(player.color, dimension);
    }

    checkAdjacentPieces(color: string, [row, col]: number[]) {
        for (let i = row - 1; i >= 0; i--) {  // check top direction
            if (this.grid[i][col] === 'empty') break;
            if (this.grid[i][col] === color) {
                this.flipPiecesInDirection(color, [i+1, col], [row-1, col]);
                break;
            }
        }

        for (let i = row + 1; i < this.grid.length; i++) {  // check bottom direction
            if (this.grid[i][col] === 'empty') break;
            if (this.grid[i][col] === color) {
                this.flipPiecesInDirection(color, [row+1, col], [i-1, col]);
                break;
            }
        }

        for (let i = col - 1; i >= 0; i--) {  // check left direction
            if (this.grid[row][i] === 'empty') break;
            if (this.grid[row][i] === color) {
                this.flipPiecesInDirection(color, [row, i+1], [row, col-1]);
                break;
            }
        }

        for (let i = col + 1; i < this.grid[row].length; i++) {  // check right direction
            if (this.grid[row][i] === 'empty') break;
            if (this.grid[row][i] === color) {
                this.flipPiecesInDirection(color, [row, col+1], [row, i-1]);
                break;
            }
        }
    }

    flipPiecesInDirection(color: string, [fromRow, fromCol]: number[], [toRow, toCol]: number[]) {
        for (let i = fromRow ; i <= toRow; i++) {
            this.flipColor(this.grid[i][fromCol]);
        }
    }

    flipColor(color: GridState) {
        color = color === 'black' ? 'white' : 'black';
    }

    getWinner(): Player | null {
        
    }
}

class OthelloPiece {
    color: string;
    dimension: number[];

    constructor(color: string, dimension: number[]) {
        this.color = color;
        this.dimension = dimension;
    }

    setDimension(dimension: number[]) {
        this.dimension = dimension;
    }
}

class Player {
    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    choosePosition(board: OthelloBoard, dimension: number[]) {
        board.onPositionSelected(this, dimension);
    }
}

const player1 = new Player('Alice', 'black');
const player2 = new Player('Bob', 'white');

const board = new OthelloBoard([player1, player2], 8);


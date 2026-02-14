// Implement NxN Jigsaw Puzzle where N is number of rows and N is number of columns

enum Edge {
    TAB,
    BLANK,
    FLAT
}

class Piece {
    id: number;
    top: Edge;
    right: Edge;
    bottom: Edge;
    left: Edge;

    constructor(id: number, top: Edge, right: Edge, bottom: Edge, left: Edge) {
        this.id = id;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

}

function solveJigsawPuzzle(pieces: Piece[], board_size): void {
    // Implementation of the solving algorithm
    const result = [[]];
    const current = [[]];
    const unused = []

    current.push([pieces[0]])

    function backtrack() {
        if (current.length === pieces.length) {
            result.push([...current]);
            return true;
        }

        for (let i = 1; i < pieces.length; i++) {
            if (fitsWith(pieces[i], current, board_size)) {

            }
        }
    }   
}

function fitsWith(piece, currentBoard, board_size): boolean {
    if (isTopLeftCornerPiece(piece)) {
        currentBoard[0][0] = piece
        return true
    } else if (isTopRightCornerPiece(piece)) {
        currentBoard[0][board_size] = piece
        return true
    } else if (isBottomLeftCornerPiece) {
        currentBoard[board_size][0] = piece
        return true
    } else if (isBottomRightCornerPiece) {
        currentBoard[board_size][board_size] = piece
        return true
    }

    if (isTopPiece(piece)) {
        for (let col = 1; col < board_size - 1; col++) {
            if (currentBoard[0][col] == null && doesEdgeFit(currentBoard[0][col].right, piece.left)) {
                if (currentBoard[0][col+2] != null && !doesEdgeFit(currentBoard[0][col+2].left, piece.right)) {
                    return false
                }         
                currentBoard[0][col+1] = piece
                return true
            }
        }
    }

    if (isRightPiece(piece)) {
        for (let row = 1; row < board_size - 1; row++) {
            if (currentBoard[row][board_size] == null && doesEdgeFit(currentBoard[row][board_size].bottom, piece.top)) {
                if (currentBoard[row + 2][board_size] != null && !doesEdgeFit(currentBoard[row + 2][board_size].top, piece.bottom)) {
                    return false
                }         
                currentBoard[row + 1][board_size] = piece
                return true
            }
        }
    }

}

function isTopLeftCornerPiece(piece) {
    if (piece.top === Edge.FLAT && piece.left === Edge.FLAT) {
        return true
    }
}

function isTopRightCornerPiece(piece) {
    if (piece.top === Edge.FLAT && piece.right === Edge.FLAT) {
        return true
    }
}

function isBottomLeftCornerPiece(piece) {
    if (piece.bottom === Edge.FLAT && piece.left === Edge.FLAT) {
        return true
    }
}

function isBottomRightCornerPiece(piece) {
    if (piece.bottom === Edge.FLAT && piece.right === Edge.FLAT) {
        return true
    }
}

function isTopPiece(piece) {
    if (piece.top === Edge.FLAT) {
        return true
    }
}

function isLeftPiece(piece) {
    if (piece.left === Edge.FLAT) {
        return true
    }
}
function isRightPiece(piece) {
    if (piece.right === Edge.FLAT) {
        return true
    }
}
function isBottomPiece(piece) {
    if (piece.bottom === Edge.FLAT) {
        return true
    }
}

function checkAllEdges(piece1, piece2): string | null {
    if (doesEdgeFit(piece1.top, piece2.bottom)){
        return 'up'
    } else if (doesEdgeFit(piece1.right, piece2.left)) {
        return 'right'
    } else if (doesEdgeFit(piece1.bottom, piece2.top)) {
        return 'bottom'
    } else if (doesEdgeFit(piece1.left, piece2.right)) {
        return 'left'
    } else {
        return null
    }
}

function doesEdgeFit(edge1, edge2) {
    if (edge1.BLANK === edge2.TAB) {
        return true
    } else if (edge1.TAB === edge2.BLANK) {
        return true
    } else {
        return false
    }
}

// solveJigsawPuzzle(pieces, board_size)
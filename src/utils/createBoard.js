const createBoard = (row, col, bombs) => {
    let board = [];
    let mineLocation = [];

    createPlainBoard(row, col, board);

    addBombsToBoard(bombs, row, col, board, mineLocation);

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            updateValueBasedOnNeighbours(board, i, j, row, col);
        }
    }

    return { board, mineLocation };
};

function createPlainBoard(row, col, board) {
    for (let i = 0; i < row; i++) {
        let subCol = [];
        for (let j = 0; j < col; j++) {
            subCol.push({
                value: 0,
                revealed: false,
                revealTimeout: 0,
                neighbours: [],
                x: i,
                y: j,
                flagged: false,
            });
        }
        board.push(subCol);
    }
}

function addBombsToBoard(bombs, row, col, board, mineLocation) {
    let bombsCount = 0;
    while (bombsCount < bombs) {
        let x = randomNum(0, row - 1);
        let y = randomNum(0, col - 1);

        if (board[x][y].value === 0) {
            board[x][y].value = "X";
            mineLocation.push({
                x: x,
                y: y
            });
            bombsCount++;
        }
    }
}

function updateValueBasedOnNeighbours(board, i, j, row, col) {
    if (board[i][j].value !== "X") {
        getNeighboursRelativeIndices(i, j, 0, row - 1, 0, col - 1).forEach(
            (neighbourRelativeIndex) => {
                incrementValueIfNeighbourIsBomb(
                    board,
                    i,
                    neighbourRelativeIndex,
                    j
                );
            }
        );
    }
}

function incrementValueIfNeighbourIsBomb(board, i, neighbourRelativeIndex, j) {
    if (
        board[i + neighbourRelativeIndex.x][j + neighbourRelativeIndex.y]
            .value === "X"
    ) {
        board[i][j].value += 1;
    }
}

function randomNum(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getNeighboursRelativeIndices(
    row,
    col,
    rowMin = 0,
    rowMax,
    colMin = 0,
    colMax
) {
    let possibleRelativeIndices = [];
    allPossibleNeighbours().forEach((neighbourRelativeIndex) => {
        if (row === rowMin && neighbourRelativeIndex.x === -1) {
        } else if (col === colMin && neighbourRelativeIndex.y === -1) {
        } else if (row === rowMax && neighbourRelativeIndex.x === 1) {
        } else if (col === colMax && neighbourRelativeIndex.y === 1) {
        } else {
            possibleRelativeIndices.push(neighbourRelativeIndex);
        }
        // console.log(neighbourRelativeIndex.x, neighbourRelativeIndex.y);
    });
    return possibleRelativeIndices;
}

function allPossibleNeighbours() {
    return [
        { x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
    ];
}

export default createBoard;

export { getNeighboursRelativeIndices, randomNum };

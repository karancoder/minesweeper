import React, { useEffect, useState } from "react";
import createBoard from "../utils/createBoard";
import revealOnce from "../utils/reveal";
import styled from "styled-components";
import Cell from "./Cell";
import LiveScoreBoard from "./LiveScoreBoard";

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Board = () => {
    const [grid, setGrid] = useState([]);
    const [mines, setMines] = useState([]);
    const [winConditions, setWinConditions] = useState({
        numberOfUnrevealedCells: -1,
        timeoutDurationForWin: 0,
    });

    useEffect(() => {
        function freshBoard() {
            const newBoard = createBoard(10, 10, 5);
            console.log(newBoard);
            setGrid((_prevBoard) => newBoard.board);
            setMines((_prevMines) => newBoard.mineLocation);
            setWinConditions((_prevWinConditions) => ({
                numberOfUnrevealedCells: 10 * 10,
                timeoutDurationForWin: 1,
            }));
        }
        freshBoard();
    }, []);

    const updateFlag = (e, x, y) => {
        e.preventDefault();
        let newBoard = JSON.parse(JSON.stringify(grid));
        if (newBoard[x][y].flagged) {
            newBoard[x][y].flagged = false;
        } else {
            newBoard[x][y].flagged = true;
        }
        setGrid((_prevBoard) => newBoard);
    };

    const revealCellsStartingAtGivenCell = (x, y) => {
        let newBoard = JSON.parse(JSON.stringify(grid));
        console.log(newBoard, x, y);
        if (newBoard[x][y].value === "X") {
            // alert("mine found");
            revealAllMines(grid, mines, revealCellWithTimeout, newBoard);
            revealCellWithTimeout(newBoard, x, y, 200);
        } else {
            let resultFromBFS = revelationBFSFromGivesCell(
                x,
                y,
                grid,
                revealCellWithTimeout,
                newBoard
            );
            let noOfNewlyRevealedCells = resultFromBFS.numberOfNewRevealedCells;
            let timeoutDuration = resultFromBFS.timeoutDuration;
            setWinConditions((prevWinConditions) => ({
                numberOfUnrevealedCells:
                    prevWinConditions.numberOfUnrevealedCells -
                    noOfNewlyRevealedCells,
                timeoutDurationForWin: timeoutDuration,
            }));
        }
        setGrid((_prevBoard) => newBoard);
    };

    useEffect(() => {
        let numberOfMines = mines.length;
        if (winConditions.numberOfUnrevealedCells === numberOfMines) {
            setTimeout(() => {
                alert("Won!");
            }, winConditions.timeoutDurationForWin * 200);
        }
    }, [
        mines,
        mines.length,
        winConditions.numberOfUnrevealedCells,
        winConditions.timeoutDurationForWin,
    ]);

    if (!grid) {
        return <div> Loading...</div>;
    }
    return (
        <>
            <LiveScoreBoard
                tilesRemaining={
                    winConditions.numberOfUnrevealedCells - mines.length
                }
                timeSpent={1}
            />

            <Grid>
                {grid.map((singleRow, idx1) => {
                    return (
                        <div style={{ display: "flex" }} key={idx1}>
                            {singleRow.map((cell, idx2) => {
                                return (
                                    <div>
                                        <Cell
                                            details={cell}
                                            updateFlag={updateFlag}
                                            revealCellsStartingAtGivenCell={
                                                revealCellsStartingAtGivenCell
                                            }
                                            key={idx2}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </Grid>
        </>
    );
};

export default Board;

function revealCellWithTimeout(newBoard, x, y, revealTimeout) {
    newBoard[x][y].revealed = true;
    newBoard[x][y].revealTimeout = revealTimeout;
}

function revealAllMines(grid, mines, revealCellWithTimeout, newBoard) {
    let i = 0;
    for (let cell of mines) {
        i += 1;
        if (!grid[cell.x][cell.y].revealed) {
            revealCellWithTimeout(newBoard, cell.x, cell.y, i * 200);
        }
    }
    i += 1;
    setTimeout(() => {
        alert("Mine Found. Game Over!");
    }, i * 200);
}

function revelationBFSFromGivesCell(
    x,
    y,
    grid,
    revealCellWithTimeout,
    newBoard
) {
    let prevFrontier = [];
    let newFrontier = [
        {
            x: x,
            y: y,
        },
    ];
    let visited = Array(grid.length)
        .fill()
        .map(() => Array(grid[0].length).fill(false));
    visited[x][y] = true;
    let i = 0;
    let numberOfNewRevealedCells = 0;
    while (newFrontier.length) {
        i += 1;
        for (let cell of newFrontier) {
            if (!grid[cell.x][cell.y].revealed) {
                numberOfNewRevealedCells += 1;
                revealCellWithTimeout(newBoard, cell.x, cell.y, i * 200);
            }
        }
        prevFrontier = newFrontier;
        newFrontier = revealOnce(newBoard, prevFrontier, visited);
    }
    i += 1;
    return {
        numberOfNewRevealedCells: numberOfNewRevealedCells,
        timeoutDuration: i,
    };
}

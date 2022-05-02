import React, { useEffect, useState } from "react";
import createBoard from "../utils/createBoard";
import revealOnce from "../utils/reveal";
import styled from "styled-components";
import Cell from "./Cell";
import LiveScoreBoard from "./LiveScoreBoard";
import Menu from "./Menu";

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
    const [timeSpent, setTimeSpent] = useState(0);
    const [gameStopped, setGameStopped] = useState(true);
    const [firstTime, setFirstTime] = useState(true);

    const startGame = () => {
        function freshBoard() {
            const newBoard = createBoard(10, 10, 5);
            console.log(newBoard);
            setGrid((_prevBoard) => newBoard.board);
            setMines((_prevMines) => newBoard.mineLocation);
            setWinConditions((_prevWinConditions) => ({
                numberOfUnrevealedCells: 10 * 10,
                timeoutDurationForWin: 1,
            }));
            setTimeSpent((_prevTimeSpent) => 0);
            console.log(1);
            setInterval(() => {
                setTimeSpent((prevTimeSpent) => prevTimeSpent + 1);
            }, 1000);
        }
        setGameStopped((_prevGameStopped) => false);
        freshBoard();
    };

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
            revealAllMines(
                grid,
                mines,
                revealCellWithTimeout,
                newBoard,
                setFirstTime,
                setGameStopped
            );
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
                setFirstTime((_prevFirstTime) => false);
                setGameStopped((_prevGameStopped) => true);
            }, winConditions.timeoutDurationForWin * 200);
        }
    }, [
        mines,
        mines.length,
        winConditions.numberOfUnrevealedCells,
        winConditions.timeoutDurationForWin,
    ]);

    if (gameStopped) {
        return <Menu startGame={startGame} firstTime={firstTime} />;
    } else {
        if (!grid) {
            return <div> Loading...</div>;
        }
        return (
            <>
                <LiveScoreBoard
                    tilesRemaining={
                        winConditions.numberOfUnrevealedCells - mines.length
                    }
                    timeSpent={timeSpent}
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
    }
};

export default Board;

function revealCellWithTimeout(newBoard, x, y, revealTimeout) {
    newBoard[x][y].revealed = true;
    newBoard[x][y].revealTimeout = revealTimeout;
}

function revealAllMines(
    grid,
    mines,
    revealCellWithTimeout,
    newBoard,
    setFirstTime,
    setGameStopped
) {
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
        setFirstTime((_prevFirstTime) => false);
        setGameStopped((_prevGameStopped) => true);
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

import React, { useEffect, useState } from "react";
import createBoard from "../utils/createBoard";
import revealOnce from "../utils/reveal";
import Cell from "./Cell";

const Board = () => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        function freshBoard() {
            const newBoard = createBoard(10, 10, 5);
            console.log(newBoard);
            setGrid(newBoard.board);
        }
        freshBoard();
    }, []);

    const updateFlag = (e, x, y) => {
        e.preventDefault();
        let newBoard = JSON.parse(JSON.stringify(grid));
        newBoard[x][y].flagged = true;
        setGrid((prevBoard) => newBoard);
    };

    const revealCellsStartingAtGivenCell = (x, y) => {
        let newBoard = JSON.parse(JSON.stringify(grid));
        if (newBoard[x][y].value === "X") {
            alert("mine found");
            revealCellWithTimeout(newBoard, x, y, 200);
        } else {
            revelationBFSFromGivesCell(
                x,
                y,
                grid,
                revealCellWithTimeout,
                newBoard
            );
        }
        setGrid((prevBoard) => newBoard);
    };

    if (!grid) {
        return <div> Loading...</div>;
    }
    return grid.map((singleRow, idx1) => {
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
    });
};

export default Board;

function revealCellWithTimeout(newBoard, x, y, revealTimeout) {
    newBoard[x][y].revealed = true;
    newBoard[x][y].revealTimeout = revealTimeout;
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
    while (newFrontier.length) {
        i += 1;
        for (let cell of newFrontier) {
            revealCellWithTimeout(newBoard, cell.x, cell.y, i * 200);
        }
        prevFrontier = newFrontier;
        newFrontier = revealOnce(newBoard, prevFrontier, visited);
    }
}

import { getNeighboursRelativeIndices } from "./createBoard";

function revealOnce(grid, prevFrontier, visited) {
    let newFrontier = [];
    prevFrontier.forEach((cell) => {
        visited[cell.x][cell.y] = true;
        if (grid[cell.x][cell.y].value === 0) {
            getNeighboursRelativeIndices(
                cell.x,
                cell.y,
                0,
                grid.length - 1,
                0,
                grid[0].length - 1
            ).forEach((neighbourRelativeIndex) => {
                if (
                    !visited[cell.x + neighbourRelativeIndex.x][
                        cell.y + neighbourRelativeIndex.y
                    ]
                ) {
                    visited[cell.x + neighbourRelativeIndex.x][
                        cell.y + neighbourRelativeIndex.y
                    ] = true;
                    newFrontier.push({
                        x: cell.x + neighbourRelativeIndex.x,
                        y: cell.y + neighbourRelativeIndex.y,
                    });
                }
            });
        }
    });

    return newFrontier;
}

export default revealOnce;

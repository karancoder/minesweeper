import React, { useEffect, useState } from "react";
import "./Cell.css";

const Cell = ({ details, updateFlag, revealCellsStartingAtGivenCell }) => {
    const [revealed, setRevealed] = useState(false);
    const [coverClass, setCoverClass] = useState("cover");
    const [breakClass, setBreakClass] = useState("");

    useEffect(() => {
        if (details.revealed) {
            setTimeout(() => {
                setRevealed(() => true);
                setBreakClass(() => "break");
            }, details.revealTimeout);
        } else {
            setCoverClass(() => "cover");
            setBreakClass(() => "");
            setRevealed(() => false);
        }
    }, [details.revealTimeout, details.revealed, details.x, details.y]);

    return (
        <div className="cell">
            <div style={style.cellStyle}>
                {/* {details.value !== 0 && details.value} */}
                {revealed ? details.value : ""}
            </div>
            <div
                onAnimationEnd={() => {
                    setCoverClass(() => "uncover");
                    setBreakClass(() => "");
                }}
                className={`${coverClass} ${breakClass}`}
                onContextMenu={(e) => updateFlag(e, details.x, details.y)}
                onClick={() =>
                    revealCellsStartingAtGivenCell(details.x, details.y)
                }
            ></div>
        </div>
    );
};

const style = {
    cellStyle: {
        width: 40,
        height: 40,
        background: "rgb(170,215,82)",
        display: "flex",
        justifyContent: "center",
        border: "2px solid green",
        alignItems: "center",
    },
};

export default Cell;

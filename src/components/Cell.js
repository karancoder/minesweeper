import React, { useEffect, useState } from "react";
import { randomNum } from "../utils/createBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import "./Cell.css";
import Mine from "./Mine";

const FONT_COLORS_BASED_ON_VALUES = [
    "rgb(255, 247, 30)",
    "rgb(25, 118, 210)",
    "rgb(58, 143, 62)",
    "rgb(211, 48, 47)",
    "rgb(123, 31, 162)",
    "rgb(235, 132, 0)",
];

const Cell = ({ details, updateFlag, revealCellsStartingAtGivenCell }) => {
    const [revealed, setRevealed] = useState(false);
    const [coverClass, setCoverClass] = useState("cover");
    const [breakClass, setBreakClass] = useState("");

    useEffect(() => {
        if (details.revealed) {
            setTimeout(() => {
                setRevealed(() => true);
                const animationClassList = [
                    "break",
                    "break1",
                    "break2",
                    "break3",
                ];
                let randomAnimClass =
                    animationClassList[
                        randomNum(0, animationClassList.length - 1)
                    ];
                setBreakClass(() => randomAnimClass);
            }, details.revealTimeout);
        } else {
            setCoverClass(() => "cover");
            setBreakClass(() => "");
            setRevealed(() => false);
        }
    }, [details.revealTimeout, details.revealed, details.x, details.y]);

    return (
        <div className="cell">
            <div
                style={getStyle(details.x, details.y, details.value).cellStyle}
            >
                {/* {details.value !== 0 && details.value} */}
                {/* {revealed ? details.value : ""} */}
                {details.value !== 0 ? (
                    details.value === "X" ? (
                        <Mine />
                    ) : (
                        details.value
                    )
                ) : (
                    ""
                )}
            </div>
            <div
                style={getStyle(details.x, details.y).coverStyle}
                onAnimationEnd={() => {
                    setCoverClass(() => "uncover");
                    setBreakClass(() => "");
                }}
                className={`${coverClass} ${breakClass}`}
                onContextMenu={(e) => updateFlag(e, details.x, details.y)}
                onClick={() =>
                    revealCellsStartingAtGivenCell(details.x, details.y)
                }
            >
                {details.flagged ? (
                    <FontAwesomeIcon style={{ color: "red" }} icon={faFlag} />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

const getStyle = (x, y, value = 0) => {
    return {
        cellStyle: {
            width: 40,
            height: 40,
            fontSize: 20,
            background: getCellBackgroundPattern(x, y, value),
            color: getCellFontColor(value),
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        coverStyle: {
            background: getCoverBackgroundPattern(x, y),
        },
    };
};

const getCellFontColor = (value) => {
    value = value % FONT_COLORS_BASED_ON_VALUES.length;
    return FONT_COLORS_BASED_ON_VALUES[value];
};

const getCellBackgroundPattern = (x, y, value) => {
    if (value === "X") {
        return mineColor();
    }
    if ((x + y) % 2) {
        return "#e5c29f";
    } else {
        return "#d7b899";
    }
};

const getCoverBackgroundPattern = (x, y) => {
    if ((x + y) % 2) {
        return "#aad751";
    } else {
        return "#a2d249";
    }
};

const mineColor = () => {
    let colors = ["orange", "darkgreen", "cyan", "violet", "yellow", "red"];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default Cell;

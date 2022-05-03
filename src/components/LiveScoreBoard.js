import React from "react";
import styled from "styled-components";

const LiveScoreBoardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: rgb(74, 118, 43);
    padding: 0.5rem 0;
`;

const LiveScoreItems = styled.div`
    width: 200px;
`;

const LiveScoreBoard = ({ tilesRemaining, timeSpent }) => {
    return (
        <LiveScoreBoardContainer>
            <LiveScoreItems>
                <span
                    role="img"
                    aria-label="mines"
                    style={{ paddingRight: 10 }}
                >
                    💣
                </span>
                {tilesRemaining}
            </LiveScoreItems>
            <LiveScoreItems>
                <span
                    role="img"
                    aria-label="clock"
                    style={{ paddingRight: 10 }}
                >
                    ⏰
                </span>
                {timeSpent}
            </LiveScoreItems>
        </LiveScoreBoardContainer>
    );
};

export default LiveScoreBoard;

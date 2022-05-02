import React from "react";
import styled from "styled-components";

const LiveScoreBoardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LiveScoreItems = styled.div`
    width: 200px;
`;

const LiveScoreBoard = ({ tilesRemaining, timeSpent }) => {
    return (
        <LiveScoreBoardContainer>
            <LiveScoreItems>{tilesRemaining}</LiveScoreItems>
            <LiveScoreItems>{timeSpent}</LiveScoreItems>
        </LiveScoreBoardContainer>
    );
};

export default LiveScoreBoard;

import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    padding 0.8rem;
`;

const MenuItem = styled.button`
    position: relative;
    background-color: #3bb3e0;
    font-size: 0.9rem;
    font-weight: bold;
    text-decoration: none;
    color: rgb(61, 35, 24);
    padding: 1rem;
    background-image: linear-gradient(rgb(229, 194, 159), rgb(215, 184, 153));
    border-radius: 5px;
    box-shadow: inset 0px 1px 2px rgb(61, 35, 24),
        0px 3px 0px 0px rgb(61, 35, 24), -3px 10px 5px rgb(61, 35, 24);
    &:active {
        top: 3px;
        background-image: linear-gradient(
            rgb(229, 194, 159),
            rgb(215, 184, 153)
        );
        box-shadow: inset 0px 1px 0px rgb(61, 35, 24),
            0px 5px 0px 0px rgb(61, 35, 24), 0px 7px 5px rgb(61, 35, 24);
    }
`;

const Menu = ({ firstTime, startGame }) => {
    return (
        <Container>
            <MenuItem
                onClick={() => {
                    startGame();
                }}
            >
                {firstTime ? "Start Game" : "Restart Game"}
            </MenuItem>
        </Container>
    );
};

export default Menu;

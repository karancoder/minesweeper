import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const GlassPane = styled.div`
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

const MenuItem = styled.button`
    z-index: 4;
    margin: 0.5rem;
    font-size: 0.9rem;
    font-weight: bold;
    text-decoration: none;
    color: white;
    padding: 1rem;
    background-color: rgb(73, 119, 43);
    border-radius: 5px;
    &:active {
        transform: translateY(4%);
    }
`;

const MenuMessage = styled.div`
    font-size: 1.5rem;
    color: black;
    font-weight: bold;
    text-decoration: none;
    margin: 1rem;
`;

const Menu = ({ firstTime, startGame, message }) => {
    const getBackgroundColor = () => {
        return firstTime ? "rgb(29,114,231)" : "rgb(74, 118, 43)";
    };
    return (
        <Container>
            <GlassPane>
                <img
                    style={{ opacity: 1, zIndex: 4, borderRadius: 10 }}
                    id="gameOverImage"
                    src="https://www.google.com/logos/fnbx/minesweeper/lose_screen.png"
                    alt="Modal for minesweeper"
                />
                <MenuMessage>{message}</MenuMessage>
                <MenuItem
                    style={{ backgroundColor: getBackgroundColor() }}
                    onClick={() => {
                        startGame();
                    }}
                >
                    {firstTime ? (
                        <FontAwesomeIcon
                            style={{ paddingRight: 10 }}
                            icon={faPlay}
                        />
                    ) : (
                        <FontAwesomeIcon
                            style={{ paddingRight: 10 }}
                            icon={faRotateRight}
                        />
                    )}
                    {firstTime ? "Play" : "Try Again"}
                </MenuItem>
            </GlassPane>
        </Container>
    );
};

export default Menu;

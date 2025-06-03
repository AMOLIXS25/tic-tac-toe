import { createComputerPlayer, createPlayer } from "./player.js";
import { GameBoard } from "./gameBoard.js";


export const createDataStore = () => {
    let gameBoard = GameBoard;
    let player = createPlayer();
    let computer = createComputerPlayer(player);

    return { player, computer, gameBoard }
};



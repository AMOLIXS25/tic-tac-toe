import { createDataStore } from "./models/dataStore.js";
import { createResultGameDialogModal } from "./views/resultGameDialogModal.js";
import { createStartGameDialogModal } from "./views/startGameDialogModal.js";

export const createGameEngine = () => {
    const dataStore = createDataStore();
    const startGameDialogModal = createStartGameDialogModal(dataStore);
    const resultGameDialog = createResultGameDialogModal();
    let winPlayerX = ['x', 'x', 'x'];
    let winPlayerO = ['o', 'o', 'o'];
    let gameIsWin = false;
    let gameIsTie = false;
    let turnOrder = Math.floor(Math.random() * 2) + 1;
    let orderPlayFirst = Math.floor(Math.random() * 2) + 1;

    const initializeGraphics = () => {
        dataStore.player.initializeGraphicsPlayer();
        dataStore.computer.initializeGraphicsPlayer();
        dataStore.gameBoard.initializeGraphicsGameBoard();
    }

    const initializeListeners = () => {
        const gameBoardBoxes = document.querySelectorAll('.game-board-box');
        gameBoardBoxes.forEach((gameBoardBox) => {
            gameBoardBox.addEventListener('click', () => {
                turnOrder = 1;
                const rowToPlayTheRandomMove = gameBoardBox.getAttribute('board-box-index-row');
                const columnToPlayTheRandomMove = gameBoardBox.getAttribute('board-box-index-col');
                const isGameBoardChanged = dataStore.gameBoard.setGameBoard(
                    dataStore.player.getRole(),
                    rowToPlayTheRandomMove,
                    columnToPlayTheRandomMove
                );
                checkWins();
                checkTie();
                if (isGameBoardChanged) {
                    dataStore.gameBoard.updateGameBoardGraphics();
                    dataStore.player.setNotActive();
                    if (gameIsWin !== true && gameIsTie !== true) {
                        playIaMove();
                    }
                    checkWins();
                    checkTie();
                }
            });
        });
    }

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    const playIaMove = async () => {
        turnOrder = 2;
        dataStore.computer.setActive();
        let rowToPlayTheRandomMove = Math.floor(Math.random() * 3);
        let columnToPlayTheRandomMove = Math.floor(Math.random() * 3);
        let isGameBoardChanged = dataStore.gameBoard.setGameBoard(dataStore.computer.getRole(),
        rowToPlayTheRandomMove,
        columnToPlayTheRandomMove)
        while (isGameBoardChanged !== true) {
            rowToPlayTheRandomMove = Math.floor(Math.random() * 3);
            columnToPlayTheRandomMove = Math.floor(Math.random() * 3);
            isGameBoardChanged = dataStore.gameBoard.setGameBoard(dataStore.computer.getRole(),
            rowToPlayTheRandomMove,
            columnToPlayTheRandomMove)
        }
        await sleep(1000);
        dataStore.gameBoard.updateGameBoardGraphics();
        dataStore.computer.setNotActive();
        dataStore.player.setActive();
    }

    const runGame = () => {
        startGameDialogModal.show();
        initializeGraphics();
        initializeListeners();
        if (orderPlayFirst == 1) {
            dataStore.player.setActive();
        } else {
            dataStore.computer.setActive();
            playIaMove();
        }
        // const userRoleChoice = prompt('Entre le role que tu veux choisir (o) ou (x) : ');

        
        
        // const computer = createComputerPlayer(userRoleChoice === 'o' ? 'x' : 'o');

        // while (!checkWins() || !checkTie()) {
        //     playMoveManager(player, computer, playerTurnOrder);
        //     alert(gameBoard.getGameBoard());
        // }
    }

    const playMoveManager = (player, computer, turnOrder) => {
        if (turnOrder == 1) {
            const rowToPlayTheMove = prompt('Row : ');
            const columnToPlayTheMove = prompt('Col : ');
            let isPlayerMoveHasPlayed = player.playAMove(rowToPlayTheMove, columnToPlayTheMove);
            while (isPlayerMoveHasPlayed == false) {
                const rowToPlayTheMove = prompt('Row : ');
                const columnToPlayTheMove = prompt('Col : ');
                isPlayerMoveHasPlayed = player.playAMove(rowToPlayTheMove, columnToPlayTheMove);
            }
            let isComputerMoveHasPlayed = computer.playARandomMove();
            while (isComputerMoveHasPlayed == false) {
                isComputerMoveHasPlayed = computer.playARandomMove();
            }
        } else {
            let isComputerMoveHasPlayed = computer.playARandomMove();
            while (isComputerMoveHasPlayed == false) {
                isComputerMoveHasPlayed = computer.playARandomMove();
            }
            const rowToPlayTheMove = prompt('Row : ');
            const columnToPlayTheMove = prompt('Col : ');
            let isPlayerMoveHasPlayed = player.playAMove(rowToPlayTheMove, columnToPlayTheMove);
            while (isPlayerMoveHasPlayed == false) {
                const rowToPlayTheMove = prompt('Row : ');
                const columnToPlayTheMove = prompt('Col : ');
                isPlayerMoveHasPlayed = player.playAMove(rowToPlayTheMove, columnToPlayTheMove);
            }
        }
    }

    const checkWins = () => {
        if (isDiagonalWin() || isColsWin() || isRowsWin()) {
            if (turnOrder == 1) {
                resultGameDialog.setTextGameResult('YOU WIN !');
                resultGameDialog.setWinnerPlayerGraphics(dataStore.player);
                resultGameDialog.show();
            } else if (turnOrder == 2) {
                resultGameDialog.setWinnerPlayerGraphics(dataStore.computer);
                resultGameDialog.setTextGameResult('IA WIN !');
                resultGameDialog.show();
            }
            gameIsWin = true;
        }
    }

    const checkTie = () => {
        const dashsList = [];
        for (const subArray of dataStore.gameBoard.getGameBoard()) {
            for (const element of subArray) {
                if (element === '') {
                    dashsList.push('');
                }
            }
        }

        if (gameIsWin !== true && dashsList.length === 0) {
            gameIsTie = true;
            resultGameDialog.setTextGameResult('TIE !')
            resultGameDialog.show();
            return true;
        }
        return false;
    }

    const isColsWin = () => {
        let colsToVerif = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                colsToVerif.push(dataStore.gameBoard.board[j][i]);
            }
            if (JSON.stringify(colsToVerif) == JSON.stringify(winPlayerX) || JSON.stringify(colsToVerif) == JSON.stringify(winPlayerO)) {
                return true;
            }
            colsToVerif = [];
        }
    }

    const isRowsWin = () => {
        let rowsToVerif = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rowsToVerif.push(dataStore.gameBoard.board[i][j]);
            }
            if (JSON.stringify(rowsToVerif) == JSON.stringify(winPlayerX) || JSON.stringify(rowsToVerif) == JSON.stringify(winPlayerO)) {
                return true;
            }
            rowsToVerif = [];
        }
    }

    const isDiagonalWin = () => {
        let diagonalToVerif = [];
        for (let i = 0; i < 3; i++) {
            diagonalToVerif.push(dataStore.gameBoard.board[i][i]);
        }
        if (JSON.stringify(diagonalToVerif) == JSON.stringify(winPlayerX) || JSON.stringify(diagonalToVerif) == JSON.stringify(winPlayerO)) {
            return true;
        }
        diagonalToVerif = [];
        for (let i = 2, j = 0; i >= 0; i--, j++) {
            diagonalToVerif.push(dataStore.gameBoard.board[i][j]);    
        }
        
        if (JSON.stringify(diagonalToVerif) == JSON.stringify(winPlayerX) || JSON.stringify(diagonalToVerif) == JSON.stringify(winPlayerO)) {
            return true;
        }
    }

    return { runGame, checkWins, playMoveManager };
}
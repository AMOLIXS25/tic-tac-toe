export const GameBoard = (() => {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let player;

    const initializeGraphicsGameBoard = () => {
        const gameBoardSubContainer = document.querySelector('.game-board-sub-container');
        gameBoardSubContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const gameBoardBox = document.createElement('div');
                gameBoardBox.innerHTML = board[i][j];
                gameBoardBox.classList.add('game-board-box');
                gameBoardBox.setAttribute('board-box-index-row', i);
                gameBoardBox.setAttribute('board-box-index-col', j);
                gameBoardSubContainer.appendChild(gameBoardBox);
            }
        }
    }

    const updateGameBoardGraphics = () => {
        const gameBoardBoxes = document.querySelectorAll('.game-board-box');
        gameBoardBoxes.forEach((gameBoardBox) => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (gameBoardBox.getAttribute('board-box-index-row') == i && gameBoardBox.getAttribute('board-box-index-col') == j) {
                        gameBoardBox.innerHTML = board[i][j];
                    }
                }
            }
        })
    }

    const setPlayer = (newPlayer) => {
        player = newPlayer;
    }

    const getGameBoard = () => {
        return board;
    }

    const setGameBoard = (role, row, column) => {
        if (board[row][column] !== '') {
            return false;
        } else {
            board[row][column] = role;
            return true;
        }
    }

    const resetGameBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j  < 3; j++) {
                board[i][j] = '-';
            }
        }
    }

    return { board, resetGameBoard, setGameBoard, getGameBoard, initializeGraphicsGameBoard, updateGameBoardGraphics };
})();

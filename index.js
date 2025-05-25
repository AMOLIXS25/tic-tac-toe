const GameBoard = (() => {
    let board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ];

    const getGameBoard = () => {
        return board;
    }

    const setGameBoard = (role, row, column) => {
        board[row][column] = role;
    }

    const resetGameBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j  < 3; j++) {
                board[i][j] = '-';
            }
        }
    }

    return { board, resetGameBoard, setGameBoard, getGameBoard };
})();


const createPlayer = (role) => {
    let gameBoard = GameBoard;

    const playAMove = (rowToPlayTheMove, columnToPlayTheMove) => {
        if (gameBoard.getGameBoard()[rowToPlayTheMove][columnToPlayTheMove] == '-') {
            gameBoard.setGameBoard(role, rowToPlayTheMove, columnToPlayTheMove);
            return true;
        } else {
            return false
        }
    }

    return { role, playAMove };
};


const createComputerPlayer = (role) => {
    let gameBoard = GameBoard;

    const player = createPlayer(role); 

    const playARandomMove = () => {
        const rowToPlayTheRandomMove = Math.floor(Math.random() * 3);
        const columnToPlayTheRandomMove = Math.floor(Math.random() * 3);
        
        const isMovePlayed = player.playAMove(rowToPlayTheRandomMove, columnToPlayTheRandomMove);
        return isMovePlayed;
    }

    return { role, playARandomMove }
}


const createGameEngine = () => {
    let gameBoard = GameBoard;
    let winPlayerX = ['x', 'x', 'x'];
    let winPlayerO = ['o', 'o', 'o'];

    const runGame = () => {
        console.log('=============== TIC TAC TOE ================')
        let gameBoard = GameBoard;
        const playerTurnOrder = Math.floor(Math.random() * 2) + 1;
        const userRoleChoice = prompt('Entre le role que tu veux choisir (o) ou (x) : ');
        const player = createPlayer(userRoleChoice);
        const computer = createComputerPlayer(userRoleChoice === 'o' ? 'x' : 'o');

        while (!checkWins() || !checkTie()) {
            playMoveManager(player, computer, playerTurnOrder);
            alert(gameBoard.getGameBoard());
        }
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
            console.log("QQN a gagner");
            return true;
        }
    }

    const checkTie = () => {
        const dashsList = [];
        for (const subArray of gameBoard.getGameBoard()) {
            for (const element of subArray) {
                if (element === '-') {
                    dashsList.push('-');
                }
            }
        }

        if (dashsList.length === 0) {
            return true;
        }
        console.log(dashsList);
        console.log(dashsList.length);
        return false;
    }

    const isColsWin = () => {
        let colsToVerif = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                colsToVerif.push(gameBoard.board[j][i]);
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
                rowsToVerif.push(gameBoard.board[i][j]);
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
            diagonalToVerif.push(gameBoard.board[i][i]);
        }
        if (JSON.stringify(diagonalToVerif) == JSON.stringify(winPlayerX) || JSON.stringify(diagonalToVerif) == JSON.stringify(winPlayerO)) {
            return true;
        }
        diagonalToVerif = [];
        for (let i = 2, j = 0; i >= 0; i--, j++) {
            diagonalToVerif.push(gameBoard.board[i][j]);    
        }
        
        if (JSON.stringify(diagonalToVerif) == JSON.stringify(winPlayerX) || JSON.stringify(diagonalToVerif) == JSON.stringify(winPlayerO)) {
            return true;
        }
    }

    return { runGame, checkWins };
}


const main = () => {
    const gameEngine = createGameEngine();
    gameEngine.runGame();
}

main();
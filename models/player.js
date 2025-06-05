export const createPlayer = (role='x', pseudo='Anonyme', avatar_picture='../assets/images/avatars/2.jpg') => {
    const initializeGraphicsPlayer = () => {
        const playerContainer = document.querySelector('.player-container .player-sub-container');
        playerContainer.innerHTML = `
            <img class="player-avatar-picture" src="${avatar_picture}" width="100" height="100" />
            <h3 class="player-pseudo">${pseudo}</h3>
            <div class="player-role-container">
                ${role}
            </div>
        `
    }

    const generateRandomRole = () => {
        role = ['x', 'o'][Math.floor(Math.random() * 2)];
    }

    generateRandomRole();

    const updateGraphicsPseudo = () => {
        const playerPseudoText = document.querySelector('.player-pseudo');
        playerPseudoText.textContent = pseudo;
    }

    const updateGraphicsRole = () => {
        const playerRoleText = document.querySelector('.player-role-container');
        playerRoleText.textContent = role;
    }

    const setActive = () => {
        const playerContainer = document.querySelector('.player-container .player-sub-container');
        document.querySelector('.turn-container').innerHTML = '<p>YOUR TURN</p>';
        playerContainer.classList.add('active');
    }

    const setNotActive = () => {
        const playerContainer = document.querySelector('.player-container .player-sub-container');
        document.querySelector('.turn-container').innerHTML = '<p>IA TURN</p>';
        playerContainer.classList.remove('active');
    }

    // const playAMove = (rowToPlayTheMove, columnToPlayTheMove) => {
    //     if (gameBoard.getGameBoard()[rowToPlayTheMove][columnToPlayTheMove] == '-') {
    //         gameBoard.setGameBoard(role, rowToPlayTheMove, columnToPlayTheMove);
    //         return true;
    //     } else {
    //         return false
    //     }
    // }

    const setRole = (newRole) => {
        role = newRole
        updateGraphicsRole();
    }

    const getRole = () => {
        return role;
    }

    const getPseudo = () => {
        return pseudo;
    }

    const getAvatarPicture = () => {
        return avatar_picture;
    }

    const setPseudo = (newPseudo) => {
        pseudo = newPseudo;
        updateGraphicsPseudo();
    }
    
    return { 
        getPseudo, 
        initializeGraphicsPlayer, 
        setPseudo, 
        setRole,
        getRole,
        getAvatarPicture,
        setActive,
        setNotActive
    };
};


export const createComputerPlayer = (playerToBattle) => {
    const generateRandomPseudo = () => {
        const randomPseudos = ['#564', '#8745', '#9999'];
        return randomPseudos[Math.floor(Math.random() * 3)];
    }

    const generateRandomAvatarPicture = () => {
        return `/assets/images/avatars/${Math.floor(Math.random() * 4) + 1}.jpg`;
    }

    const { getAvatarPicture, getRole, getPseudo, setRole } = createPlayer(
        'x',
        generateRandomPseudo(),
        generateRandomAvatarPicture()

    );

    setRole(playerToBattle.getRole() == 'x' ? 'o' : 'x');
    

    const initializeGraphicsPlayer = () => {
        const playerContainer = document.querySelector('.computer-container .computer-sub-container');
        playerContainer.innerHTML = `
            <img class="computer-avatar-picture" src="${getAvatarPicture()}" width="100" height="100" />
            <h3 class="computer-pseudo">${getPseudo()}</h3>
            <div class="computer-role-container">
                ${getRole()}
            </div>
        `
    }

    const setActive = () => {
        const playerContainer = document.querySelector('.computer-container .computer-sub-container');
        document.querySelector('.turn-container').innerHTML = '<p>IA TURN</p>';
        playerContainer.classList.add('active');
    }

    const setNotActive = () => {
        const playerContainer = document.querySelector('.computer-container .computer-sub-container');
        document.querySelector('.turn-container').innerHTML = '<p>YOUR TURN</p>';
        playerContainer.classList.remove('active');
    }

    return { getAvatarPicture, getPseudo, getRole, initializeGraphicsPlayer, setActive, setNotActive };
};
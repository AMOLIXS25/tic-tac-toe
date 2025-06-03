export const createResultGameDialogModal = () => {
    const resultGameDialog = document.querySelector('.result-game-dialog');
    const resultGameDialogText = document.querySelector('.result-game-dialog-text');
    const replayGameButton = document.querySelector('.result-game-dialog-container button');

    const show = () => {
        replayGameButton.addEventListener('click', () => {
            window.location.reload();
        });
        resultGameDialog.showModal();
    }

    const setTextGameResult = (newTextGameResult) => {
        resultGameDialogText.textContent = newTextGameResult;
    }

    const setWinnerPlayerGraphics = (player) => {
        const winnerPlayerContainer = document.querySelector('.winner-player-sub-container');
        winnerPlayerContainer.innerHTML = `
            <img class="player-avatar-picture" src="${player.getAvatarPicture()}" width="100" height="100" />
            <h3 class="player-pseudo">${player.getPseudo()}</h3>
        `;
    }
    
    return { show, setTextGameResult, setWinnerPlayerGraphics };
}
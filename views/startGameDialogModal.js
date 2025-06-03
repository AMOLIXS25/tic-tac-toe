export const createStartGameDialogModal = (dataStore) => {
    const startGameDialog = document.querySelector('.start-game-dialog');
    const inputPseudoModal = document.querySelector('#pseudo-input');

    const show = () => {
        const buttonSubmitFormDialogModal = document.querySelector(".start-game-dialog form button[type='submit']");
        buttonSubmitFormDialogModal.addEventListener('click', (event) => {
            dataStore.player.setPseudo(inputPseudoModal.value);
            startGameDialog.close();
            event.preventDefault();
        });
        startGameDialog.showModal();      
    }

    return { show };
}
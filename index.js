import { createGameEngine } from "./gameEngine.js";

// const createDialogModal = () => {
//     const dialog = document.querySelector('dialog');
//     const inputPseudoModal = document.querySelector('#pseudo-input');

//     const updatePseudoModal = (player) => {
//         const buttonSubmitFormDialogModal = document.querySelector("dialog form button[type='submit']");
//         buttonSubmitFormDialogModal.addEventListener('click', (event) => {
//             player.setPseudo(inputPseudoModal.value);
//             dialog.close();
//             event.preventDefault();
//         });
//         dialog.showModal();      
//     }

//     return { updatePseudoModal };
// }

const main = () => {
    const gameEngine = createGameEngine();
    gameEngine.runGame();
}

main();
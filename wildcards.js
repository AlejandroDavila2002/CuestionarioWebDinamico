// c:\Users\Alejandro Davila\Desktop\MiCuestionario\wildcards.js
const WildcardManager = (() => {
    let fiftyFiftyBtn = null;
    let skipBtn = null;
    let answerButtonsContainer = null;

    let isFiftyFiftyEnabled = false;
    let isSkipEnabled = false;

    /**
     * Inicializa el módulo de comodines.
     * @param {object} config - Configuración de los comodines.
     * @param {HTMLElement} answersContainer - El contenedor de los botones de respuesta.
     */
    function init(config, answersContainer) {
        isFiftyFiftyEnabled = config.fiftyFifty.enabled;
        fiftyFiftyBtn = config.fiftyFifty.button;

        isSkipEnabled = config.skip.enabled;
        skipBtn = config.skip.button;

        answerButtonsContainer = answersContainer;

        if (fiftyFiftyBtn) {
            fiftyFiftyBtn.style.display = 'none';
        }
        if (skipBtn) {
            skipBtn.style.display = 'none';
        }
    }

    /**
     * Actualiza la visibilidad de todos los botones de comodín para el jugador actual.
     * @param {object} player - El objeto del jugador actual.
     */
    function updateButtonVisibility(player) {
        // Comodín 50/50
        if (isFiftyFiftyEnabled && fiftyFiftyBtn) {
            if (!player.hasUsed5050) {
                fiftyFiftyBtn.style.display = 'block';
            } else {
                fiftyFiftyBtn.style.display = 'none';
            }
        }

        // Comodín Saltar Pregunta
        if (isSkipEnabled && skipBtn) {
            if (!player.hasUsedSkip) {
                skipBtn.style.display = 'block';
            } else {
                skipBtn.style.display = 'none';
            }
        }
    }

    /**
     * Ejecuta la lógica del comodín 50/50.
     * @param {object} player - El objeto del jugador actual.
     */
    function useFiftyFifty(player) {
        if (!isFiftyFiftyEnabled || !fiftyFiftyBtn || !answerButtonsContainer || fiftyFiftyBtn.style.display === 'none') return;

        playSound('comodin'); // Reproducir sonido de comodín

        const allButtons = Array.from(answerButtonsContainer.children);
        let incorrectButtons = allButtons.filter(btn => btn.dataset.correct !== 'true' && !btn.disabled && btn.style.visibility !== 'hidden');

        if (incorrectButtons.length < 2) {
            console.warn("No hay suficientes respuestas incorrectas para usar el comodín 50/50.");
            return;
        }

        shuffleArray(incorrectButtons);
        const buttonsToRemove = incorrectButtons.slice(0, 2);

        buttonsToRemove.forEach(btn => {
            btn.classList.add('disappearing');
            setTimeout(() => {
                btn.style.visibility = 'hidden';
                btn.disabled = true;
            }, 500); // Duración de la animación
        });

        fiftyFiftyBtn.style.display = 'none';
        player.hasUsed5050 = true;
    }

    /**
     * Ejecuta la lógica del comodín Saltar Pregunta.
     * @param {object} player - El objeto del jugador actual.
     * @param {function} onSkipCallback - Función a llamar para saltar la pregunta.
     */
    function useSkip(player, onSkipCallback) {
        if (!isSkipEnabled || !skipBtn || skipBtn.style.display === 'none') return;

        playSound('skip'); // Nuevo sonido para saltar

        skipBtn.style.display = 'none';
        player.hasUsedSkip = true;

        // Ocultar también el 50/50 para esta ronda
        if (fiftyFiftyBtn) {
            fiftyFiftyBtn.style.display = 'none';
        }

        // Llamar al callback para que el juego principal maneje el salto
        if (typeof onSkipCallback === 'function') {
            onSkipCallback();
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /**
     * Resetea el estado de uso de todos los comodines para un jugador.
     * @param {object} player - El objeto del jugador.
     */
    function resetForPlayer(player) {
        if (player) {
            player.hasUsed5050 = false;
            player.hasUsedSkip = false;
        }
    }

    return {
        init,
        updateButtonVisibility,
        useFiftyFifty,
        useSkip,
        resetForPlayer
    };
})();

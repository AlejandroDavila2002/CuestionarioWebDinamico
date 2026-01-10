// --- LÓGICA DE LA RULETA ---

const rouletteWheel = document.getElementById('roulette-wheel');

let spinSoundInterval = null;

let onSpinCompleteCallback = () => {};

/**
 * Configura la ruleta con la lista de jugadores.
 * @param {Array<Object>} players - La lista de jugadores.
 * @param {Function} onSpinComplete - Callback que se ejecuta cuando la ruleta termina.
 */
function setupRoulette(players, onSpinComplete) {
    onSpinCompleteCallback = onSpinComplete;
    rouletteWheel.style.transition = ''; // Limpiar transición para el setup
    const playerCount = players.length;
    const anglePerSlice = 360 / playerCount;

    // Generar colores y gradiente
    const colors = generateThemeColors(playerCount);
    const gradientParts = colors.map((color, i) => {
        const start = i * anglePerSlice;
        const end = (i + 1) * anglePerSlice;
        return `${color} ${start}deg ${end}deg`;
    });
    rouletteWheel.style.backgroundImage = `conic-gradient(${gradientParts.join(', ')})`;

    // Limpiar nombres anteriores
    rouletteWheel.innerHTML = '';
    // Limpiar clases de ganador anteriores
    document.querySelectorAll('.roulette-player-name.winner').forEach(el => {
        el.classList.remove('winner');
    });

    // Añadir nombres a la ruleta
    players.forEach((player, i) => {
        const nameElement = document.createElement('div');
        nameElement.classList.add('roulette-player-name');
        nameElement.style.setProperty('--player-count', playerCount);

        // NUEVO: Ángulo ajustado para la nueva rotación de texto
        const segmentRotation = i * anglePerSlice;
        nameElement.style.setProperty('--segment-angle', segmentRotation);

        const span = document.createElement('span');
        span.textContent = player.name;
        nameElement.appendChild(span);
        rouletteWheel.appendChild(nameElement);
    });

    rouletteWheel.style.transform = 'rotate(0deg)'; // Resetear posición
}

/**
 * Inicia el giro dinámico y prepara la ruleta para ser detenida.
 * @param {Array<Object>} players - La lista de jugadores.
 */
function startDynamicSpin(players) {
    rouletteWheel.classList.remove('roulette-wheel-stopping');
    rouletteWheel.classList.add('roulette-wheel-dynamic-spin');

    // El manejador de eventos se añade una sola vez y se limpia después
    const stopSpinHandler = () => {
        stopRoulette(players);
        rouletteWheel.removeEventListener('click', stopSpinHandler);
    };
    rouletteWheel.addEventListener('click', stopSpinHandler);
}

/**
 * Detiene el giro de la ruleta y calcula el ganador.
 * @param {Array<Object>} players - La lista de jugadores.
 */
function stopRoulette(players) {
    if (rouletteWheel.classList.contains('roulette-wheel-stopping')) return;
    
    rouletteWheel.classList.add('roulette-wheel-stopping');
    rouletteWheel.classList.remove('roulette-wheel-dynamic-spin');

    const currentAngle = getElementRotation(rouletteWheel);
    rouletteWheel.style.transform = `rotate(${currentAngle}deg)`; // Fijar la posición actual

    const playerCount = players.length;
    const anglePerSlice = 360 / playerCount;

    // Forzar un reflow para aplicar la nueva animación de desaceleración
    void rouletteWheel.offsetWidth;

    // Calcular un ángulo de parada final
    const randomSpins = 4 + Math.random() * 3; // Entre 4 y 7 giros extra
    const finalAngle = currentAngle + (360 * randomSpins);

    // Aplicar la animación de desaceleración
    rouletteWheel.style.transition = `transform var(--turn-duration) var(--turn-ease)`;
    rouletteWheel.style.transform = `rotate(${finalAngle}deg)`;

    // --- SONIDO DE GIRO ---
    if (spinSoundInterval) clearInterval(spinSoundInterval);
    spinSoundInterval = setInterval(() => {
        if (typeof playSound === 'function') {
            playSound('roulette_tick');
        }
    }, 150); // Sonido cada 150ms

    // Determinar el ganador después de la animación
    const spinDurationMs = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--turn-duration')) * 1000;

    setTimeout(() => {
        // NUEVO: Asegurarse de que el intervalo de sonido se detenga
        clearInterval(spinSoundInterval);

        const finalRotation = getElementRotation(rouletteWheel);
        // El puntero está en la parte superior (posición 270deg). Calculamos qué ángulo del círculo original ha aterrizado allí.
        const winningAngle = (360 - (finalRotation % 360) + 270) % 360;
        
        // Calculamos el índice del segmento ganador
        const winnerIndex = Math.floor(winningAngle / anglePerSlice);
        
        // Resaltar al ganador
        if (rouletteWheel.children[winnerIndex]) {
            rouletteWheel.children[winnerIndex].classList.add('winner');
        }

        onSpinCompleteCallback(winnerIndex);
    }, spinDurationMs);
}

function generateThemeColors(count) {
    const themeColors = [
        '#424549', // --btn-bg-default
        '#36393f'  // --container-bg-dark
    ];
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(themeColors[i % themeColors.length]);
    }
    return colors;
}

/**
 * Obtiene el ángulo de rotación actual de un elemento.
 * @param {HTMLElement} el - El elemento.
 * @returns {number} - El ángulo en grados.
 */
function getElementRotation(el) {
    const st = window.getComputedStyle(el, null);
    const tm = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("transform");
    if (tm && tm !== "none") {
        const values = tm.split('(')[1].split(')')[0].split(',');
        return Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));
    }
    return 0;
}
// --- REFERENCIAS A ELEMENTOS HTML ---
const modeSelectionContainer = document.getElementById('mode-selection-container');
const setupContainer = document.getElementById('setup-container');
const rouletteContainer = document.getElementById('roulette-container');
const quizContainer = document.getElementById('quiz-container');
const leaderDisplayElement = document.getElementById('leader-display'); 
const eliminationMessageElement = document.getElementById('elimination-message');
const setupErrorElement = document.getElementById('setup-error');
const playerForm = document.getElementById('player-form');
const playerNameInput = document.getElementById('player-name-input');
const playerList = document.getElementById('player-list');
const startQuizBtn = document.getElementById('start-quiz-btn');
const playerTurnElement = document.getElementById('player-turn');
const playerTurnContainer = document.getElementById('player-turn-container');
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerContainer = document.getElementById('timer-container');
const timerText = document.getElementById('timer-text');
const milestoneMessage = document.getElementById('milestone-message');
const activePlayersPanel = document.getElementById('active-players-panel');
const stopGameBtn = document.getElementById('stop-game-btn');
const shuffleQuestionsToggle = document.getElementById('shuffle-questions-toggle');
const secondLifeToggle = document.getElementById('second-life-toggle');
const comodinToggle = document.getElementById('comodin-toggle');
const skipToggle = document.getElementById('skip-wildcard-toggle');
const musicToggle = document.getElementById('music-toggle');
const musicVolume = document.getElementById('music-volume');
const extraLifeBtn = document.getElementById('extra-life-btn');
const clearPlayersBtn = document.getElementById('clear-players-btn');
const revivalPopover = document.getElementById('revival-popover');
const comodinBtn = document.getElementById('comodin-btn');
const skipBtn = document.getElementById('skip-btn');
const manageQuestionsLink = document.getElementById('manage-questions-link');
const setupTitle = document.getElementById('setup-title');
const backToModesBtn = document.getElementById('back-to-modes-btn');
const addPlayerSection = document.querySelector('.add-player-section');
const setupLayout = document.getElementById('setup-layout'); // Contenedor de los paneles de configuración
// NUEVO MODO EQUIPOS: Referencias a elementos
const playerTeamSelect = document.getElementById('player-team-select');
const teamScoreboard = document.getElementById('team-scoreboard');
const teamAScoreElement = document.getElementById('team-a-score');
const teamConsultSetting = document.getElementById('team-consult-setting');
const teamConsultToggle = document.getElementById('team-consult-toggle');
const teamBScoreElement = document.getElementById('team-b-score');
const teamConsultBtn = document.getElementById('team-consult-btn');
// NUEVA MEJORA: Referencia a botón Doble o Nada
const doubleOrNothingBtn = document.getElementById('double-or-nothing-btn');

// --- VARIABLES DE ESTADO DEL JUEGO ---
let gameMode = '4_options'; // '4_options', '2_options', o 'team_duel'
let gameQuestions = [];
let players = []; 
let eliminatedPlayers = [];
let currentQuestionIndex = 0;
let interruptedPlayerIndex = null;
let currentPlayerIndex = 0; 
const MAX_PLAYERS = 50;
let currentLeaders = [];
const CORRECT_ANSWER_DELAY = 1500;
const MILESTONE_MESSAGE_DELAY = 2000;

let questionTimer;
let heartbeatTimer; // NUEVA MEJORA: Timer para el sonido de latido
let currentTimerDuration = 0;
let timerStartTime; // Para pausar y reanudar
let remainingTimeOnPause; // Para pausar y reanudar

// NUEVO MODO EQUIPOS: Variables de estado
let teamAScore = 0;
let teamBScore = 0;
let teamAStreakAchievers = []; // NUEVO: Registra jugadores que lograron racha
let teamBStreakAchievers = []; // NUEVO: Registra jugadores que lograron racha
let fireModeA = false;
let fireModeB = false;
let consultUsesA = 3;
let consultUsesB = 3;
// NUEVA MEJORA: Variable para Doble o Nada
let isDoubleOrNothingActive = false;
// --- CAMBIO: Nueva variable para rastrear la racha ---
let playerHasDoubled = false; 

// --- Audio Elements ---
const setupAudio = document.getElementById('setup-audio');
const gameAudio = document.getElementById('game-audio');

// --- Lógica para guardar y cargar jugadores ---
const PLAYERS_STORAGE_KEY = 'miCuestionarioJugadores';

function savePlayersToStorage() {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
}

function loadPlayers() {
    try {
        const storedPlayers = localStorage.getItem(PLAYERS_STORAGE_KEY);
        if (storedPlayers) {
            const parsed = JSON.parse(storedPlayers);
            if (Array.isArray(parsed)) {
                players = parsed;
            }
        } else if (typeof defaultPlayers !== 'undefined' && Array.isArray(defaultPlayers)) {
            players = defaultPlayers;
            savePlayersToStorage();
        }
        renderPlayerList();
    } catch (e) {
        console.error("Error al cargar jugadores de localStorage:", e);
        players = [];
        renderPlayerList();
    }
}

// --- Cargar preguntas desde LocalStorage o desde el archivo .js ---
function loadGameQuestions() {
    gameQuestions = []; // Limpiar antes de cargar
    let defaultQuestionsSource = [];
    let storageKey = '';

    // NUEVO MODO EQUIPOS: El modo equipos usa las preguntas de 4 opciones
    if (gameMode === '2_options') {
        storageKey = 'miCuestionarioPreguntas_2_options';
        defaultQuestionsSource = (typeof questions_2_options !== 'undefined' && Array.isArray(questions_2_options)) ? questions_2_options : [];
    } else { // '4_options' y 'team_duel' por defecto
        storageKey = 'miCuestionarioPreguntas';
        defaultQuestionsSource = (typeof questions !== 'undefined' && Array.isArray(questions)) ? questions : [];
    }

    try {
        const storedQuestions = localStorage.getItem(storageKey);
        if (storedQuestions && storedQuestions !== '[]') {
            const parsed = JSON.parse(storedQuestions);
            if (Array.isArray(parsed) && parsed.length > 0) {
                gameQuestions = parsed;
                return;
            }
        }
    } catch (e) {
        console.error(`Error al cargar preguntas de ${storageKey} desde localStorage, usando preguntas por defecto:`, e);
    }
    
    if (defaultQuestionsSource.length > 0) {
        gameQuestions = defaultQuestionsSource;
    } else {
        gameQuestions = [];
    }
}

// --- LÓGICA DE CONFIGURACIÓN ---
playerForm.addEventListener('submit', addPlayer);
function addPlayer(e) {
    e.preventDefault(); 
    setupErrorElement.innerText = '';
    const playerName = playerNameInput.value.trim();
    const lowerCaseName = playerName.toLowerCase();
    if (playerName === '') {
        setupErrorElement.innerText = 'Por favor, ingresa un nombre.'; return;
    }
    if ((players.length + eliminatedPlayers.length) >= MAX_PLAYERS) {
        setupErrorElement.innerText = `Límite de ${MAX_PLAYERS} jugadores alcanzado.`; return;
    }
    if (players.some(p => p.name.toLowerCase() === lowerCaseName) || eliminatedPlayers.some(p => p.name.toLowerCase() === lowerCaseName)) {
         setupErrorElement.innerText = 'Ese nombre ya existe. Elige otro.'; return;
    }
    const player = { 
        name: playerName.slice(0, 50), 
        score: 0, 
        hasBeenRevived: false,
        hasUsed5050: false,
        hasUsedSkip: false,
        // NUEVO MODO EQUIPOS: Asignar equipo
        team: gameMode === 'team_duel' ? playerTeamSelect.value : null
    };
    players.push(player);
    renderPlayerList();
    savePlayersToStorage();
    playerNameInput.value = ''; playerNameInput.focus();
}

function renderPlayerList() {
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.dataset.playerName = player.name;

        // NUEVO MODO EQUIPOS: Mostrar equipo en la lista
        const teamIndicator = gameMode === 'team_duel' ? `<span class="team-indicator-sphere team-${player.team.toLowerCase()}"></span>` : '';

        li.innerHTML = `
            <span class="player-name-text">${teamIndicator}${player.name}</span>
            <div class="player-actions">
                <div>
                    <button class="player-action-btn edit" title="Editar nombre">✏️</button>
                </div>
                <div>
                    <button class="player-action-btn delete" title="Eliminar jugador">🗑️</button>
                </div>
            </div>
        `;

        li.querySelector('.edit').addEventListener('click', () => handleEditPlayer(player.name));
        li.querySelector('.delete').addEventListener('click', () => handleDeletePlayer(player.name));

        playerList.appendChild(li);
    });

    if (players.length === 0) {
        startQuizBtn.style.display = 'none';
        clearPlayersBtn.style.display = 'none';
    } else {
        startQuizBtn.style.display = 'block';
        clearPlayersBtn.style.display = 'block';
    }
}

function handleEditPlayer(playerName) {
    const playerIndex = players.findIndex(p => p.name === playerName);
    if (playerIndex === -1) return;

    const newName = prompt("Introduce el nuevo nombre para el jugador:", playerName);

    if (newName === null || newName.trim() === '') {
        return;
    }

    const trimmedNewName = newName.trim();
    const lowerCaseNewName = trimmedNewName.toLowerCase();

    if (players.some((p, i) => i !== playerIndex && p.name.toLowerCase() === lowerCaseNewName)) {
        alert("Ese nombre ya está en uso. Por favor, elige otro.");
        return;
    }

    players[playerIndex].name = trimmedNewName;
    renderPlayerList();
    savePlayersToStorage();
}

function handleDeletePlayer(playerName) {
    const playerIndex = players.findIndex(p => p.name === playerName);
    if (playerIndex > -1) {
        players.splice(playerIndex, 1);
        savePlayersToStorage();
        renderPlayerList();
    }
}

startQuizBtn.addEventListener('click', initializeGame);
function initializeGame() {
    loadGameQuestions();

    setupErrorElement.innerText = '';
    if (gameQuestions.length === 0) {
        setupErrorElement.innerText = 'No hay preguntas cargadas para este modo de juego.'; return;
    }

    // NUEVO MODO EQUIPOS: Validación y preparación
    if (gameMode === 'team_duel') {
        const teamA = players.filter(p => p.team === 'A');
        const teamB = players.filter(p => p.team === 'B');

        if (teamA.length !== teamB.length || teamA.length === 0) {
            setupErrorElement.innerText = 'Para el Duelo de Equipos, ambos equipos deben tener el mismo número de jugadores (y al menos 1).';
            return;
        }

        // Ordenar jugadores de forma intercalada: A1, B1, A2, B2...
        const interleavedPlayers = [];
        for (let i = 0; i < teamA.length; i++) {
            interleavedPlayers.push(teamA[i]);
            interleavedPlayers.push(teamB[i]);
        }
        players = interleavedPlayers;

        // Reiniciar variables de equipo
        teamAScore = 0; teamBScore = 0;
        fireModeA = false; fireModeB = false;
        teamAStreakAchievers = []; teamBStreakAchievers = []; // Reiniciar listas
        consultUsesA = 3; consultUsesB = 3;
        updateTeamScoreboard();
        teamScoreboard.style.display = 'flex';
        leaderDisplayElement.style.display = 'none'; // Ocultar líder individual
    } else {
        teamScoreboard.style.display = 'none';
        leaderDisplayElement.style.display = 'flex';
    }

    eliminatedPlayers = [];
    currentQuestionIndex = 0;
    interruptedPlayerIndex = null;

    players.forEach(player => {
        player.score = 0; // Reiniciar puntaje individual
        player.hasUsed5050 = false;
        player.hasUsedSkip = false;
    });
    
    if (shuffleQuestionsToggle.checked) {
        shuffleArray(gameQuestions);
    }

    const wildcardConfig = {
        fiftyFifty: {
            enabled: gameMode !== '2_options' && comodinToggle.checked,
            button: comodinBtn
        },
        skip: {
            enabled: skipToggle.checked,
            button: skipBtn
        }
    };
    WildcardManager.init(wildcardConfig, answerButtonsElement);

    setupContainer.style.display = 'none';
    rouletteContainer.style.display = 'flex';
    setupRoulette(players, startQuizWithPlayer);
    updateActivePlayersList();

    if (musicToggle.checked) {
        setupAudio.pause();
        setupAudio.currentTime = 0;
        gameAudio.play().catch(e => console.log("Autoplay blocked for game music:", e));
    }
    
    startDynamicSpin(players);
}

function startQuizWithPlayer(winnerIndex) {
    playSound('roulette_win');
    
    setTimeout(() => {
        currentPlayerIndex = winnerIndex;
        rouletteContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        stopGameBtn.style.display = 'block';
        
        if (gameMode !== 'team_duel') {
            activePlayersPanel.style.display = 'block';
            leaderDisplayElement.style.display = 'flex';
            updateLeaderDisplay();
        }

        if (secondLifeToggle.checked) {
            extraLifeBtn.style.display = 'block';
        }
        showNextTurn();
        
    }, 2000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

extraLifeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleRevivalPopover();
});

function toggleRevivalPopover() {
    const isVisible = revivalPopover.classList.contains('show');
    if (isVisible) {
        revivalPopover.classList.remove('show');
        return;
    }

    const list = document.getElementById('revivable-players-list');
    list.innerHTML = '';

    const revivablePlayers = eliminatedPlayers.filter(p => p.score >= 1 && !p.hasBeenRevived);
    
    if (revivablePlayers.length === 0) {
        list.innerHTML = '<li class="no-players">No hay jugadores elegibles para revivir.</li>';
    } else {
        revivablePlayers.forEach(player => {
            const li = document.createElement('li');
            
            // NUEVO: Añadir indicador de equipo si aplica
            const teamIndicator = (gameMode === 'team_duel' && player.team)
                ? `<span class="team-indicator-sphere team-${player.team.toLowerCase()}"></span>`
                : '';

            li.innerHTML = `${teamIndicator}${player.name} (${player.score} puntos)`;
            li.addEventListener('click', () => revivePlayer(player.name));
            list.appendChild(li);
        });
    }
    revivalPopover.classList.add('show');
}

function revivePlayer(playerName) {
    const playerIndex = eliminatedPlayers.findIndex(p => p.name === playerName);
    if (playerIndex === -1) return;

    // NUEVO MODO EQUIPOS: Penalización al revivir
    const [revivedPlayer] = eliminatedPlayers.splice(playerIndex, 1); // Saca al jugador de la lista de eliminados

    // En modo equipos, revivir a un jugador tiene un coste para el equipo.
    // Se restan los puntos que el jugador había conseguido antes de ser eliminado.
    if (gameMode === 'team_duel') {
        if (revivedPlayer.team === 'A') {
            teamAScore = Math.max(0, teamAScore - revivedPlayer.score); // Evita puntuaciones negativas
        } else {
            teamBScore = Math.max(0, teamBScore - revivedPlayer.score); // Evita puntuaciones negativas
        }
        updateTeamScoreboard();
    }

    revivedPlayer.score = 0; // El jugador vuelve con 0 puntos.
    WildcardManager.resetForPlayer(revivedPlayer); // Se resetean sus comodines.
    revivedPlayer.hasBeenRevived = true; // Marcar que ya no puede ser revivido de nuevo.
    players.push(revivedPlayer); // Añadirlo de nuevo a la lista de jugadores activos.

    currentPlayerIndex = players.length - 1;

    // Si el juego estaba en curso, guardamos el índice del jugador actual para no saltarnos su turno.
    interruptedPlayerIndex = currentPlayerIndex;

    updateActivePlayersList();
    if (gameMode !== 'team_duel') updateLeaderDisplay();
    revivalPopover.classList.remove('show');
    showNextTurn();
}

document.body.addEventListener('click', (e) => {
    if (!revivalPopover.contains(e.target) && revivalPopover.classList.contains('show')) {
        revivalPopover.classList.remove('show');
    }
});

stopGameBtn.addEventListener('click', stopGameManually);
function stopGameManually() {
    if (confirm('¿Estás seguro de que quieres detener el juego? Se mostrarán los resultados finales.')) {
        showScoreboard();
    }
}

function updateLeaderDisplay() {
    if (gameMode === 'team_duel') return; // No se usa en modo equipos
    leaderDisplayElement.style.display = 'flex';
    const allPlayers = [...players, ...eliminatedPlayers];
    if (allPlayers.length === 0) return;

    const highScore = Math.max(0, ...allPlayers.map(p => p.score));
    const newLeaders = allPlayers.filter(p => p.score === highScore && highScore > 0);
    const newLeaderNames = newLeaders.map(l => l.name);
    const oldLeaderNames = currentLeaders.map(l => l.name);

    currentLeaders.forEach(oldLeader => {
        if (!newLeaderNames.includes(oldLeader.name)) {
            const tag = document.querySelector(`.leader-tag[data-name="${oldLeader.name}"]`);
            if (tag) {
                tag.classList.add('exploding');
                setTimeout(() => tag.remove(), 600);
            }
        }
    });

    newLeaders.forEach(newLeader => {
        if (!oldLeaderNames.includes(newLeader.name)) {
            const tag = document.createElement('div');
            tag.className = 'leader-tag';
            tag.dataset.name = newLeader.name;
            tag.innerHTML = `🏆 <strong>${newLeader.name}</strong> (${newLeader.score})`;
            leaderDisplayElement.appendChild(tag);
        }
    });

    document.querySelectorAll('.leader-tag').forEach(tag => {
        if (newLeaderNames.includes(tag.dataset.name)) {
            tag.innerHTML = `🏆 <strong>${tag.dataset.name}</strong> (${highScore})`;
        }
    });

    if (newLeaders.length === 0 && !document.querySelector('.leader-tag[data-name="Nadie"]')) {
        leaderDisplayElement.innerHTML = '<div class="leader-tag" data-name="Nadie">🏆 <strong>Nadie</strong> (0)</div>';
    } else {
        if (newLeaders.length > 0 && document.querySelector('.leader-tag[data-name="Nadie"]')) {
            document.querySelector('.leader-tag[data-name="Nadie"]').remove();
        }
    }

    currentLeaders = newLeaders;

    updateActivePlayersList();
}

// NUEVO MODO EQUIPOS: Actualizar marcador de equipos
function updateTeamScoreboard() {
    teamAScoreElement.querySelector('span').textContent = `${teamAScore} Puntos`;
    teamBScoreElement.querySelector('span').textContent = `${teamBScore} Puntos`;

    teamAScoreElement.classList.toggle('fire-mode-active', fireModeA);
    teamBScoreElement.classList.toggle('fire-mode-active', fireModeB);
}

function updateActivePlayersList() {
    const listElement = document.getElementById('active-players-list');
    if (!listElement || gameMode === 'team_duel') return;
    listElement.innerHTML = '';
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    sortedPlayers.forEach(player => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${player.name}</span><span>${player.score}</span>`;
        listElement.appendChild(li);
    });
}

function showNextTurn() {
    resetState();
    // Reiniciar la bandera que rastrea si el jugador ya duplicó en este turno.
    playerHasDoubled = false;

    if (currentQuestionIndex >= gameQuestions.length || (players.length === 0 && eliminatedPlayers.length > 0)) {
        showScoreboard();
        return;
    }

    currentPlayerIndex = currentPlayerIndex % players.length; 
    const player = players[currentPlayerIndex];
    
    // NUEVO MODO EQUIPOS: Lógica de ambiente visual y marcador
    if (gameMode === 'team_duel') {
        document.body.classList.toggle('team-a-turn', player.team === 'A');
        document.body.classList.toggle('team-b-turn', player.team === 'B');
        teamAScoreElement.classList.toggle('active-turn', player.team === 'A');
        teamBScoreElement.classList.toggle('active-turn', player.team === 'B');
        
        // NUEVA MEJORA: Aplicar fondo de fireMode si está activo
        const isFireMode = player.team === 'A' ? fireModeA : fireModeB;
        document.body.classList.toggle('fire-background', isFireMode);
    }

    showQuestionForPlayer(player);
}

// NUEVO MODO EQUIPOS: Función separada para mostrar pregunta (reutilizable)
function showQuestionForPlayer(player) {
    const question = gameQuestions[currentQuestionIndex];
    if (!question) { // Si no hay más preguntas
        showScoreboard();
        return;
    }

    // NUEVA MEJORA: Indicador de racha con emojis de fuego
    let streakIndicator = '';
    if (gameMode === 'team_duel') {
        if (player.score >= 10) streakIndicator = ' 🔥🔥🔥';
        else if (player.score >= 5) streakIndicator = ' 🔥🔥';
        else if (player.score >= 3) streakIndicator = ' 🔥';
    }
    playerTurnElement.innerHTML = `${player.name} (${player.score} Puntos)${streakIndicator}`;

    questionElement.innerText = `(Pregunta ${currentQuestionIndex + 1}) ${question.question}`;

    WildcardManager.updateButtonVisibility(player);

    // NUEVA LÓGICA DOBLE O NADA: Mostrar botón si el jugador tiene 5+ puntos y no está activo
    if (gameMode === 'team_duel' && player.score >= 5 && !isDoubleOrNothingActive) {
        doubleOrNothingBtn.style.display = 'block';
        doubleOrNothingBtn.textContent = '🔥 Doble o Nada 🔥';
        doubleOrNothingBtn.disabled = false;
    }

    currentTimerDuration = 0; // Por defecto no hay timer
    if (gameMode === 'team_duel') {
        if (player.score >= 10) currentTimerDuration = 15;
        else if (player.score >= 5) currentTimerDuration = 30;
        else if (player.score >= 3) currentTimerDuration = 60;
    } else { // Lógica de timer para otros modos
        if (player.score >= 10) currentTimerDuration = 15;
        else if (player.score >= 5) currentTimerDuration = 30;
        else if (player.score >= 3) currentTimerDuration = 60;
    }
    
    if (currentTimerDuration > 0) {
        timerContainer.style.display = 'flex';
        timerText.innerText = currentTimerDuration;
        startTimer(currentTimerDuration);

        // Mostrar el botón de consulta SOLO si el timer está activo y la opción está habilitada
        if (teamConsultToggle.checked) {
            teamConsultBtn.style.display = 'block';
            const consultsLeft = player.team === 'A' ? consultUsesA : consultUsesB;
            teamConsultBtn.textContent = `🤝 Consultar (${consultsLeft})`;
            teamConsultBtn.disabled = consultsLeft <= 0;
        }
    } else {
        timerContainer.style.display = 'none';
    }

    answerButtonsElement.className = 'btn-grid';
    if (gameMode === '2_options') {
        answerButtonsElement.classList.add('two-options');
    }

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        const letter = String.fromCharCode(65 + index);
        button.innerText = `${letter}) ${answer.text}`;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    // --- NUEVO: Lógica para expandir la barra de comodines ---
    // Contar cuántos comodines están visibles
    const visibleWildcards = [
        comodinBtn,
        skipBtn,
        teamConsultBtn,
        doubleOrNothingBtn
    ].filter(btn => btn.style.display !== 'none').length;

    // Si hay 4 comodines, expandir el contenedor del quiz
    quizContainer.classList.toggle('wide-quiz', visibleWildcards >= 4);
    // ---------------------------------------------------------
}

function startTimer(duration) {
    let timeLeft = duration;
    clearInterval(questionTimer);
    timerContainer.classList.remove('warning');
    
    timerStartTime = Date.now(); // Guardar tiempo de inicio
    remainingTimeOnPause = duration * 1000; // Guardar duración total

    questionTimer = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;
        playSound('timer_tick');
        
        if (timeLeft <= 10) {
            timerContainer.classList.add('warning');
        }

        if (timeLeft <= 5) {
            document.body.classList.add('flashing-red');
            startHeartbeat(timeLeft); // NUEVA MEJORA: Iniciar o ajustar el latido
        }
        
        if (timeLeft <= 0) {
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    clearInterval(questionTimer);
    clearInterval(heartbeatTimer); // NUEVA MEJORA: Detener latido
    document.body.classList.remove('flashing-red');
    disableButtons();

    const player = players[currentPlayerIndex];    
    let reason = `¡${player.name} se quedó sin tiempo!`;

    // LÓGICA DE FALLO POR TIEMPO EN DOBLE O NADA
    if (isDoubleOrNothingActive) {
        reason = `¡${player.name} lo perdió todo en Doble o Nada!`;
        eliminatePlayer(reason, true); // Pasar el flag de fallo en Doble o Nada
    } else {
        eliminatePlayer(reason, false);
    }
}

function disableButtons() {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
}

function resetState() {
    clearInterval(questionTimer);
    clearInterval(heartbeatTimer); // NUEVA MEJORA: Detener latido
    timerContainer.style.display = 'none';
    if (gameMode !== 'team_duel') {
        activePlayersPanel.style.display = 'none';
        document.body.className = ''; // Limpiar clases de equipo
    }
    document.body.classList.remove('flashing-red');
    document.body.classList.remove('fire-background'); // NUEVA MEJORA: Limpiar fondo de fuego
    timerContainer.classList.remove('warning');
    comodinBtn.style.display = 'none';
    skipBtn.style.display = 'none';
    teamConsultBtn.style.display = 'none';
    doubleOrNothingBtn.style.display = 'none'; // NUEVA MEJORA: Ocultar botón
    isDoubleOrNothingActive = false; // NUEVA MEJORA: Resetear estado
    nextButton.style.display = 'none';
    eliminationMessageElement.innerText = ''; 
    eliminationMessageElement.style.color = 'var(--correct-color)';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    clearInterval(questionTimer);
    clearInterval(heartbeatTimer); // NUEVA MEJORA: Detener latido
    document.body.classList.remove('flashing-red');
    disableButtons();
    comodinBtn.style.display = 'none';
    skipBtn.style.display = 'none';
    teamConsultBtn.style.display = 'none';
    doubleOrNothingBtn.style.display = 'none'; // NUEVA MEJORA: Ocultar botón
    
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    const player = players[currentPlayerIndex];
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        playSound('correct');
        
        // Determinar cuántos puntos sumar por esta respuesta
        let pointsFromThisAnswer = 1;
        const isInFireMode = player.team === 'A' ? fireModeA : fireModeB;

        if (gameMode === 'team_duel' && isInFireMode) {
            pointsFromThisAnswer = 2; // ¡MODO FUEGO! Suma 2 puntos por acierto.
            showPointFeedback('+2'); // Revertido: Mostrar en el centro
        }

        // --- CAMBIO: Si acertó estando en Doble o Nada, activamos la bandera ---
        if (isDoubleOrNothingActive) {
            playerHasDoubled = true;
        }

        // NUEVA LÓGICA DOBLE O NADA: Determina los puntos a sumar
        player.score += isDoubleOrNothingActive ? player.score : pointsFromThisAnswer;

        // NUEVO MODO EQUIPOS: Lógica de acierto
        if (gameMode === 'team_duel') { // Esta lógica solo se aplica en Duelo de Equipos
            // NUEVA LÓGICA: Activar Modo Fuego cuando 3 jugadores DIFERENTES logran una racha de 3.
            if (player.score === 3) { // Se activa justo al alcanzar la racha de 3
                if (player.team === 'A' && !fireModeA && !teamAStreakAchievers.includes(player.name)) {
                    teamAStreakAchievers.push(player.name);
                    if (teamAStreakAchievers.length >= 3) {
                        fireModeA = true;
                        playSound('fire_mode_activated');
                        triggerScreenShake(); // Activar efecto visual
                    }
                } else if (player.team === 'B' && !fireModeB && !teamBStreakAchievers.includes(player.name)) {
                    teamBStreakAchievers.push(player.name);
                    if (teamBStreakAchievers.length >= 3) {
                        fireModeB = true;
                        playSound('fire_mode_activated');
                        triggerScreenShake(); // Activar efecto visual
                    }
                }
            }
            // No actualizamos el marcador del equipo aquí, solo el del jugador.
        } else {
            updateLeaderDisplay();
        }
        
        let showMilestone = false;
        if (player.score === 10) { showMilestoneMessage("Cristoo, no quieres ser pastor?"); showMilestone = true; } 
        else if (player.score === 5) { showMilestoneMessage("¡Naah usted sabe mucho!"); showMilestone = true; } 
        else if (player.score === 3) { showMilestoneMessage("¡USTED SI SABEEE!"); showMilestone = true; } 
        else {
            eliminationMessageElement.innerText = '¡Correcto! Siguiente pregunta...';
        }
        
        const delay = showMilestone ? MILESTONE_MESSAGE_DELAY : CORRECT_ANSWER_DELAY;
        
        setTimeout(() => {
            currentQuestionIndex++;
            // NUEVO MODO EQUIPOS: Sigue el mismo jugador
            if (gameMode === 'team_duel') {
                playerHasDoubled = false; // <<< --- CORRECCIÓN APLICADA AQUÍ ---
                resetState();
                showQuestionForPlayer(player);
            } else {
                showNextTurn();
            }
        }, delay);

    } else {
        // --- LÓGICA DE RESPUESTA INCORRECTA ---
        selectedButton.classList.add('incorrect');
        playSound('incorrect');
        
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
        });

        let reason = `¡${player.name} ha fallado!`;

        // LÓGICA DE FALLO POR RESPUESTA INCORRECTA EN DOBLE O NADA
        // Esto se aplica a todos los modos de juego.
        if (isDoubleOrNothingActive) {
            reason = `¡${player.name} lo perdió todo en Doble o Nada!`;
            // **LA CORRECCIÓN MÁS IMPORTANTE**:
            // Ya no ponemos el score a 0 aquí, lo hará `eliminatePlayer`
            eliminatePlayer(reason, true);
        } else {
            // Llamar a eliminar DESPUÉS de haber ajustado el puntaje si era necesario.
            eliminatePlayer(reason, false);
        }
    }
}

function eliminatePlayer(reason, isDoubleOrNothingFailure = false) {
    const eliminatedPlayer = players[currentPlayerIndex];
    
    // NUEVO MODO EQUIPOS: Transferir puntos al equipo al ser eliminado
    if (gameMode === 'team_duel') {
        let pointsForTeam = 0;

        if (!isDoubleOrNothingFailure && !playerHasDoubled) {
            pointsForTeam = eliminatedPlayer.score; 
        } else {
            eliminatedPlayer.score = 0;
            reason = `¡${eliminatedPlayer.name} lo perdió todo!`; // Actualizamos mensaje
        }

        if (eliminatedPlayer.team === 'A') {
            // teamAStreakAchievers = []; // NO se reinicia el progreso para que sea acumulativo.
            fireModeA = false;
        } else {
            // teamBStreakAchievers = []; // NO se reinicia el progreso para que sea acumulativo.
            fireModeB = false;
        }

        // --- NUEVA LÓGICA DE ANIMACIÓN ---
        // La animación se encarga de actualizar el marcador visualmente.
        if (pointsForTeam > 0) {
            animatePointsTransfer(pointsForTeam, eliminatedPlayer);
        }
    }
    
    // Lógica de eliminación/turno (común a todos los modos)
    // Un jugador que falla siempre es eliminado, sin importar el modo.
    const [removedPlayer] = players.splice(currentPlayerIndex, 1);
    eliminatedPlayers.push(removedPlayer);
    if (interruptedPlayerIndex !== null && currentPlayerIndex < interruptedPlayerIndex) {
        interruptedPlayerIndex--;
    }
    
    eliminationMessageElement.innerText = reason;
    eliminationMessageElement.style.color = 'var(--incorrect-color)';
    
    if (gameMode !== 'team_duel') {
        updateLeaderDisplay();
        updateActivePlayersList();
        currentQuestionIndex++; // Solo avanza a la siguiente pregunta en modos no-equipo.
    }

    eliminationMessageElement.innerText = reason;
    eliminationMessageElement.style.color = 'var(--incorrect-color)';

    if ((players.length <= 0) || (currentQuestionIndex >= gameQuestions.length)) {
        nextButton.innerText = 'Ver Resultados Finales';
    } else {
        let nextPlayerIdx = currentPlayerIndex % players.length; 
        nextButton.innerText = `Empezar Turno de ${players[nextPlayerIdx].name}`;
    }
    nextButton.style.display = 'block';
}

/**
 * NUEVA FUNCIÓN: Anima la transferencia de puntos al marcador del equipo.
 * @param {number} points - Puntos a transferir.
 * @param {object} player - El jugador que aporta los puntos.
 */
function animatePointsTransfer(points, player) {
    const sourceElement = playerTurnElement;
    const destElement = player.team === 'A' ? teamAScoreElement : teamBScoreElement;

    const sourceRect = sourceElement.getBoundingClientRect();
    const destRect = destElement.getBoundingClientRect();

    const animationEl = document.createElement('div');
    animationEl.className = 'point-transfer-animation';
    animationEl.textContent = `+${points}`;

    // Posición inicial en el centro del elemento de origen
    const startX = sourceRect.left + sourceRect.width / 2;
    const startY = sourceRect.top + sourceRect.height / 2;
    animationEl.style.left = `${startX}px`;
    animationEl.style.top = `${startY}px`;

    document.body.appendChild(animationEl);

    // Forzar un reflow para que la transición se aplique
    void animationEl.offsetWidth;

    // Calcular la posición final en el centro del elemento de destino
    const endX = destRect.left + destRect.width / 2;
    const endY = destRect.top + destRect.height / 2;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Aplicar la transformación para mover el elemento
    animationEl.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.5)`;
    animationEl.style.opacity = '0';

    // Después de la animación, actualizar el puntaje y limpiar
    setTimeout(() => {
        if (player.team === 'A') teamAScore += points;
        else teamBScore += points;
        updateTeamScoreboard();
        animationEl.remove();
    }, 1000); // Debe coincidir con la duración de la transición en CSS
}

/**
 * Muestra una animación de feedback de puntos en pantalla (ej: "+2").
 * @param {string} text - El texto a mostrar en la animación.
 */
function showPointFeedback(text) {
    const feedbackContainer = document.getElementById('point-feedback-display');
    if (!feedbackContainer) {
        console.error("No se encontró el contenedor central para el feedback de puntos.");
        return;
    }

    const feedbackEl = document.createElement('span');
    // Usamos la clase original para el feedback central
    feedbackEl.className = 'point-feedback-item-central'; 
    feedbackEl.textContent = text;

    feedbackContainer.appendChild(feedbackEl);

    // Eliminar el elemento después de la animación para mantener el DOM limpio
    setTimeout(() => {
        feedbackEl.remove();
    }, 1000); // Coincide con la duración de la animación 'growAndFade'
}

/**
 * NUEVA FUNCIÓN: Activa el efecto de sacudida de pantalla.
 */
function triggerScreenShake() {
    document.body.classList.add('screen-shake');
    setTimeout(() => {
        document.body.classList.remove('screen-shake');
    }, 500); // Duración de la animación
}

/**
 * NUEVA MEJORA: Inicia o ajusta la velocidad del sonido de latido.
 * @param {number} currentTime - El tiempo restante en segundos.
 */
function startHeartbeat(currentTime) {
    // Si el timer ya está corriendo, no hacer nada.
    if (heartbeatTimer) return;
    
    heartbeatTimer = setInterval(() => {
        playSound('heartbeat');
    }, 1000); // Sincronizado con la animación CSS de 1 segundo.
}

function showMilestoneMessage(message) {
    milestoneMessage.innerText = message;
    milestoneMessage.classList.add('show');
    setTimeout(() => {
        milestoneMessage.classList.remove('show');
    }, MILESTONE_MESSAGE_DELAY - 500);
}

nextButton.addEventListener('click', handleNextButton);

function handleNextButton() {
    if (interruptedPlayerIndex !== null) {
        currentPlayerIndex = interruptedPlayerIndex;
        interruptedPlayerIndex = null;
    }
    // La lógica de `showNextTurn` ya maneja el índice del jugador correctamente
    showNextTurn();
}

function showScoreboard() {
     resetState();
     leaderDisplayElement.style.display = 'none';
     activePlayersPanel.style.display = 'none';
     stopGameBtn.style.display = 'none';
     revivalPopover.classList.remove('show');
     extraLifeBtn.style.display = 'none';
     playerTurnContainer.style.display = 'none';
     teamScoreboard.style.display = 'none';
     document.body.className = ''; // Limpiar clases de fondo
     
     const allPlayers = [...players, ...eliminatedPlayers];
     if (allPlayers.length === 0) {
         questionElement.innerText = '¡Juego Terminado!';
         nextButton.innerText = 'Jugar de Nuevo';
         nextButton.addEventListener('click', returnToSetup, { once: true });
         nextButton.style.display = 'block';
         return;
     }

     // NUEVO MODO EQUIPOS: Lógica de ganador por equipos
     if (gameMode === 'team_duel') {
        if (teamAScore > teamBScore) {
            questionElement.innerText = `¡El Equipo A gana! 🏆`;
        } else if (teamBScore > teamAScore) {
            questionElement.innerText = `¡El Equipo B gana! 🏆`;
        } else {
            questionElement.innerText = '¡Hay un empate entre equipos!';
        }
        if (teamAScore > 0 || teamBScore > 0) triggerConfetti();
     } else {
        const highScore = Math.max(0, ...allPlayers.map(p => p.score));
        const winners = allPlayers.filter(p => p.score === highScore && highScore > 0);
 
        if (highScore === 0) {
            playSound('incorrect');
            questionElement.innerText = '¡Juego Terminado! (Nadie anotó)';
        } else if (winners.length > 1) {
            questionElement.innerText = '¡Hay un empate!';
        } else {
            questionElement.innerText = `¡El ganador es ${winners[0].name}! 🏆`;
        }
        if (highScore > 0) triggerConfetti();
     }
     
     // Lógica para mostrar las listas de puntuaciones
     if (gameMode === 'team_duel') {
         const teamA = allPlayers.filter(p => p.team === 'A').sort((a, b) => b.score - a.score);
         const teamB = allPlayers.filter(p => p.team === 'B').sort((a, b) => b.score - a.score);
 
         const scoreboardContainer = document.createElement('div');
         scoreboardContainer.id = 'team-scoreboard-final';
 
         const createTeamList = (team, title, isWinner) => {
             const listWrapper = document.createElement('div');
             if (isWinner) listWrapper.classList.add('winner-panel');

             const listTitle = document.createElement('h3');
             listTitle.innerHTML = isWinner ? `${title} 🏆` : title;

             const list = document.createElement('ol');
             list.className = 'scoreboard-team-list';
 
             const topScore = team.length > 0 ? team[0].score : 0;

             team.forEach((player, index) => {
                 const li = document.createElement('li');
                 if (topScore > 0 && player.score === topScore) {
                     li.classList.add('top-player');
                     li.innerHTML = `⭐ <strong>${player.name}</strong> <span>${player.score} Puntos</span>`;
                 } else {
                     li.innerHTML = `<strong>${player.name}</strong> <span>${player.score} Puntos</span>`;
                 }
                 li.style.animationDelay = `${index * 0.1}s`;
                 list.appendChild(li);
             });

             listWrapper.appendChild(listTitle);
             listWrapper.appendChild(list);
             return listWrapper;
         };
 
         scoreboardContainer.appendChild(createTeamList(teamA, '🔴 Equipo A', teamAScore > teamBScore));
         scoreboardContainer.appendChild(createTeamList(teamB, '🔵 Equipo B', teamBScore > teamAScore));
         answerButtonsElement.appendChild(scoreboardContainer);
 
     } else {
         allPlayers.sort((a, b) => b.score - a.score);
         const scoreboardList = document.createElement('ol');
         scoreboardList.id = 'scoreboard';
         const highScore = Math.max(0, ...allPlayers.map(p => p.score));
 
         allPlayers.forEach((player, index) => {
             const li = document.createElement('li');
             li.innerHTML = `<strong>${player.name}</strong> <span>${player.score} Puntos</span>`;
             if (highScore > 0 && player.score === highScore) li.classList.add('winner');
             li.style.animationDelay = `${index * 0.1}s`;
             scoreboardList.appendChild(li);
         });
         answerButtonsElement.appendChild(scoreboardList);
     }
     
     nextButton.innerText = 'Jugar de Nuevo';
     nextButton.style.display = 'block';
     nextButton.addEventListener('click', returnToSetup, { once: true });

     if (musicToggle.checked) {
        gameAudio.pause();
        gameAudio.currentTime = 0;
        setupAudio.play().catch(e => console.log("Autoplay blocked for setup music:", e));
     }
}

function triggerConfetti() {
    playSound('roulette_win');
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function returnToSetup() {
    modeSelectionContainer.classList.remove('fade-out');
    modeSelectionContainer.style.display = 'block';
    
    setupContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    rouletteContainer.style.display = 'none';
    stopGameBtn.style.display = 'none';
    revivalPopover.classList.remove('show');
    extraLifeBtn.style.display = 'none';
    activePlayersPanel.style.display = 'none';
    leaderDisplayElement.style.display = 'none';
    teamScoreboard.style.display = 'none';
    document.body.className = '';
    playerTurnContainer.style.display = 'block';
    
    if (musicToggle.checked) {
        gameAudio.pause();
        gameAudio.currentTime = 0;
        setupAudio.play().catch(e => console.log("Autoplay blocked for setup music:", e));
    }
}

comodinBtn.addEventListener('click', () => {
    const player = players[currentPlayerIndex];
    WildcardManager.useFiftyFifty(player);
});

skipBtn.addEventListener('click', () => {
    const player = players[currentPlayerIndex];
    WildcardManager.useSkip(player, () => {
        disableButtons();
        currentQuestionIndex++;
        setTimeout(() => {
            if (gameMode === 'team_duel') {
                resetState();
                showQuestionForPlayer(player);
            } else {
                showNextTurn();
            }
        }, 500);
    });
});

// NUEVO MODO EQUIPOS: Lógica del botón de consulta
// FIX TIEMPO EN CONSULTA (Bug del Alert)
teamConsultBtn.addEventListener('click', () => {
    clearInterval(questionTimer); // Pausar siempre el temporizador
    const player = players[currentPlayerIndex];
    const consultsLeft = player.team === 'A' ? consultUsesA : consultUsesB;
    if (consultsLeft <= 0) return;

    const isTimerRunning = currentTimerDuration > 0;
    let remainingTime = 0;
    if (isTimerRunning) {
        remainingTime = parseInt(timerText.innerText, 10);
    }

    if (player.team === 'A') consultUsesA--;
    else consultUsesB--;

    teamConsultBtn.textContent = `🤝 Consultar (${player.team === 'A' ? consultUsesA : consultUsesB})`;
    teamConsultBtn.disabled = (player.team === 'A' ? consultUsesA : consultUsesB) <= 0;

    alert(`¡Consulta de equipo! Tienen tiempo para discutir. Presiona Aceptar para reanudar el tiempo.`);

    if (isTimerRunning) {
         startTimer(remainingTime);
    }
});

// NUEVA LÓGICA DOBLE O NADA: Lógica del botón Doble o Nada
doubleOrNothingBtn.addEventListener('click', () => {
    isDoubleOrNothingActive = true;
    doubleOrNothingBtn.style.display = 'none';
    comodinBtn.style.display = 'none';
    skipBtn.style.display = 'none';
    teamConsultBtn.style.display = 'none';
    eliminationMessageElement.innerText = '¡DOBLE O NADA! ¡Cuidado!';
    eliminationMessageElement.style.color = 'var(--incorrect-color)';
});

clearPlayersBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres borrar la lista de todos los jugadores? Esta acción no se puede deshacer.')) {
        players = [];
        savePlayersToStorage();
        renderPlayerList();
    }
});

backToModesBtn.addEventListener('click', returnToModeSelection);

function returnToModeSelection() {
    setupContainer.style.display = 'none';
    modeSelectionContainer.style.display = 'block';
    modeSelectionContainer.classList.remove('fade-out');
}

/**
 * Ajusta la visibilidad de las opciones de configuración según el modo de juego.
 * @param {string} mode - El modo de juego seleccionado ('2_options', 'team_duel', etc.).
 */
function setModeSettingsDisplay(mode) {
    const comodin5050Setting = document.getElementById('comodin-5050-setting');
    
    // Ocultar/mostrar selector de equipo
    playerTeamSelect.style.display = mode === 'team_duel' ? 'block' : 'none';
    
    // Ocultar/mostrar opción de consulta de equipo
    teamConsultSetting.style.display = mode === 'team_duel' ? 'flex' : 'none';

    // Ocultar/mostrar comodín 50/50 (no disponible en modo duelo)
    if (comodin5050Setting) {
        comodin5050Setting.style.display = mode === '2_options' ? 'none' : 'flex';
    }

    // Hacer el contenedor de configuración más grande para el modo de equipos
    if (setupContainer) {
        if (mode === 'team_duel') {
            setupContainer.classList.add('wide-container');
        } else {
            setupContainer.classList.remove('wide-container');
        }
    }
}

if (addPlayerSection) {
    // Cambiado de hover a click para mejor compatibilidad con móviles
    addPlayerSection.addEventListener('click', () => {
        // Si ya está expandido y se hace clic de nuevo, no hacer nada para no cerrarlo accidentalmente.
        if (!addPlayerSection.classList.contains('expanded')) {
            addPlayerSection.classList.add('expanded');
        }
    });
}

// --- Lógica del Panel de Modo ---
document.querySelectorAll('.mode-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        gameMode = e.currentTarget.dataset.mode;

        const modeTitleText = e.currentTarget.querySelector('h3').textContent;
        setupTitle.textContent = modeTitleText;
        
        setModeSettingsDisplay(gameMode); // Call helper function

        manageQuestionsLink.href = `manage-questions.html?mode=${gameMode}`;

        modeSelectionContainer.classList.add('fade-out');
        setTimeout(() => {
            modeSelectionContainer.style.display = 'none';
            setupContainer.style.display = 'block';
            loadPlayers();
        }, 500);
    });
});

function returnToModeSelection() {
    setupContainer.style.display = 'none';
    modeSelectionContainer.style.display = 'block';
    modeSelectionContainer.classList.remove('fade-out');
}

// --- Control de música y volumen ---
musicToggle.addEventListener('change', () => {
    if (musicToggle.checked) {
        if (setupContainer.style.display !== 'none' || modeSelectionContainer.style.display !== 'none') {
            setupAudio.play().catch(e => {});
        } else if (quizContainer.style.display !== 'none' || rouletteContainer.style.display !== 'none') {
            gameAudio.play().catch(e => {});
        }
    } else {
        setupAudio.pause();
        gameAudio.pause();
    }
});

musicVolume.addEventListener('input', () => {
    setupAudio.volume = musicVolume.value;
    gameAudio.volume = musicVolume.value;
});

// --- Inicialización al cargar la página ---
function initializePage() {
    setupAudio.volume = musicVolume.value;
    gameAudio.volume = musicVolume.value;

    if (musicToggle.checked) {
        setupAudio.play().catch(e => {});
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('return') === 'true') {
        gameMode = params.get('mode') || '4_options';

        if (gameMode === '2_options') {
            setupTitle.textContent = 'Modo Duelo';
        } else if (gameMode === 'team_duel') {
            setupTitle.textContent = 'Duelo de Equipos';
        } else {
            setupTitle.textContent = 'Modo Clásico';
        }

        // Configurar la visibilidad de las opciones para el modo de juego
        setModeSettingsDisplay(gameMode);
        manageQuestionsLink.href = `manage-questions.html?mode=${gameMode}`;

        // Ocultar la selección de modo y mostrar la configuración del juego directamente
        modeSelectionContainer.style.display = 'none';
        setupContainer.style.display = 'block';
        loadPlayers(); // Cargar jugadores para el modo

        // CORRECCIÓN: Limpiar la URL para evitar problemas al recargar
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

initializePage();
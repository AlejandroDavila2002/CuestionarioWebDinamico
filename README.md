MiCuestionario — Instrucciones y notas

Resumen de cambios realizados
- Moví la inicialización del módulo a una función `init()` y la expuse para que el DOM la llame correctamente.
- Reemplacé la lógica de la ruleta que referenciaba elementos DOM inexistentes por un placeholder seguro (`showRoulette()` que inicia el juego).
- Añadí comprobaciones defensivas para evitar accesos fuera de rango a `players[currentPlayerIndex]` y para evitar operaciones modulo por 0.
- Aseguré que el temporizador llama a `handleTimeUp()` cuando llega a 0 y se limpia el intervalo.
- Añadí logs y manejadores globales (`window.error` y `unhandledrejection`) que muestran errores en consola y en `#setup-error` para facilitar debugging.
- Mejoré la lógica de eliminación y la actualización de récords antes de guardar en localStorage.

Cómo probar localmente (Windows)
1. Abre el archivo `quiz.html` en tu navegador (doble clic o arrastrar al navegador).
2. Abre las Herramientas de desarrollador (F12) y ve a la pestaña "Console".
3. Flujo básico a probar:
   - Añade al menos un jugador en el formulario y pulsa "Ingresar con los que tenemos".
   - Responde preguntas: prueba respuestas correctas e incorrectas.
   - Si hay temporizador activo, espera a que llegue a 0 para verificar la eliminación por tiempo.
   - Abre "Gestionar Preguntas" y añade/elimna preguntas; revisa que los cambios se conserven en localStorage.
4. Si ves errores en la consola, copia y pégalos aquí (o toma una captura de pantalla) para que los arregle.

Notas importantes
- Audio: los navegadores modernos a menudo bloquean reproducción automática. Si la música no suena, haz clic en algún lugar de la página para permitir reproducción.
- Node no está disponible en mi entorno (no pude ejecutar una comprobación con Node). Por eso la validación en tiempo de ejecución necesita hacerse en el navegador.

Siguientes pasos sugeridos (opcional)
- Si quieres la ruleta visual, dime y la añado con su HTML/CSS minimal.
- Puedo añadir tests unitarios (por ejemplo, extraer la lógica JS a un archivo separado y usar Jest) si quieres pruebas automatizadas.
- Puedo limpiar/normalizar la indentación y eliminar caracteres no-ASCII si ves algún comportamiento raro.

Contacto
- Si aparece algún error en la consola, pégalo aquí y lo corrijo.

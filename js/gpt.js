// Referencias a los elementos del DOM
const sendButton = document.querySelector(".send");
const sendInput = document.querySelector(".send-input");
const messagesArea = document.querySelector(".messages-area");
const suggestionsArea = document.querySelector("#suggestions-area");
const snackbar = document.createElement("div"); // Snackbar dinámico
const helpButton = document.getElementById("help-button");

// Agregar el snackbar al body
document.body.appendChild(snackbar);
snackbar.style.position = "fixed";
snackbar.style.bottom = "20px";
snackbar.style.left = "50%";
snackbar.style.transform = "translateX(-50%)";
snackbar.style.backgroundColor = "#333";
snackbar.style.color = "white";
snackbar.style.padding = "10px";
snackbar.style.borderRadius = "5px";
snackbar.style.display = "none"; // Inicialmente oculto

// Función para mostrar el snackbar
function showSnackbar(message) {
    snackbar.textContent = message;
    snackbar.style.display = "block";
    setTimeout(() => {
        snackbar.style.display = "none";
    }, 3000); // Ocultar después de 3 segundos
}
// Función para mostrar preguntas de manera interactiva
function showQuestions() {
    const message = responses["preguntas"] + suggestions.join("\n");
    addMessage(message, 'left'); // Agregar respuesta del bot
}
// Función para guardar los mensajes en localStorage
function saveMessages(messages) {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// Función para cargar los mensajes desde localStorage
function loadMessages() {
    const storedMessages = localStorage.getItem("chatMessages");
    const messages = storedMessages ? JSON.parse(storedMessages) : [];

    // Si no hay mensajes, agregar el mensaje predeterminado
    if (messages.length === 0) {
        messages.push({ text: "Hola, ¿en qué puedo ayudarte? 😊", type: "left" });
    }

    return messages;
}

// Función para mostrar los mensajes en el chat
function renderMessages(messages) {
    messagesArea.innerHTML = ''; // Limpiar los mensajes existentes
    messages.forEach((message) => {
        const messageBox = document.createElement("div");
        messageBox.classList.add("message-box", message.type);
        messageBox.innerHTML = message.text; // Usar innerHTML para que los links sean interpretados como clickeables
        messagesArea.appendChild(messageBox);
    });

    // Desplazar automáticamente al final del contenedor de mensajes
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Función para agregar un mensaje al array y actualizar el localStorage
function addMessage(messageText, messageType) {
    const newMessage = { text: messageText, type: messageType };
    messages.push(newMessage);
    saveMessages(messages);
    renderMessages(messages);
}

// Sugerencias predefinidas
const suggestions = [
    "¿quién eres?",
    "¿quién te diseño?",
    "¿quién es sebastián tixilema?",
    "¿cuál es tu propósito?",
    "¿qué tecnologías utilizas?",
    "¿cómo puedo interactuar contigo?",
    "¿qué tipo de información puedes proporcionar?",
    "¿qué limitaciones tienes?",
    "¿cómo manejas la privacidad de los usuarios?",
    "¿puedes aprender de las interacciones?",
    "dame más información del curriculum de tu creador.",
    "dame más información del portafolio de tu creador.",
    "dame información de contacto."
];

// Respuestas predefinidas
const responses = {
    "hola": "Hola, si tienes alguna pregunta escribe 'preguntas' o 'sugerencias'.",
    "preguntas": "Aquí tienes todas las preguntas que puedes hacer:",
    "sugerencias": "Aquí tienes algunas sugerencias que puedes hacer:",
    "¿quién eres?": "Soy un Bot básico funcional en páginas estáticas tales como esta.",
    "¿quién te diseño?": "Fui desarrollado por Sebastián Tixilema, un estudiante de Software.",
    "¿quién es sebastián tixilema?": "Es un estudiante de software en la Universidad Técnica de Ambato de 22 años, apasionado por la programación y la IA.",
    "¿cuál es tu propósito?": "Mi propósito es asistir a los usuarios proporcionando información y respuestas rápidas y precisas.",
    "¿qué tecnologías utilizas?": "Utilizo tecnologías como HTML, CSS y JavaScript para funcionar en páginas estáticas.",
    "¿cómo puedo interactuar contigo?": "Puedes interactuar conmigo escribiendo preguntas y presionando enter.",
    "¿qué tipo de información puedes proporcionar?": "Puedo proporcionar información sobre diversos temas, responder preguntas frecuentes y ayudar con tareas básicas.",
    "¿qué limitaciones tienes?": "Mis limitaciones incluyen la incapacidad de procesar solicitudes complejas o realizar tareas que requieren comprensión profunda.",
    "¿cómo manejas la privacidad de los usuarios?": "No almaceno ninguna información personal de los usuarios, garantizando así su privacidad.",
    "¿puedes aprender de las interacciones?": "No, actualmente no tengo la capacidad de aprender de las interacciones. Mis respuestas son predefinidas.",
    "dame más información del curriculum de tu creador.": "Mi creador estudió Informática en el colegio y desde 2020 comenzó a hacerlo en la universidad. Más información la puedes encontrar en el apartado de curriculum.",
    "dame más información del portafolio de tu creador.": "Mi creador ha desarrollado varias aplicaciones tanto de escritorio como web y móviles. Los repositorios los puedes encontrar en GitHub.",
    "dame información de contacto.": "Todos los contactos los encuentras en la parte inferior o en el apartado de Contactos del menú principal."
};
helpButton.addEventListener('click', () => {
    const questionText = `${responses["preguntas"]}<br>${suggestions.map(suggestion => `<a href="#" class="suggestion-link">${suggestion}</a>`).join(" | ")}`;
    addMessage(questionText, 'left'); // Agregar respuesta del bot
});
// Función para obtener una respuesta del bot
async function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Si el usuario dice 'hola', responde con un mensaje específico
    if (lowerMessage === "hola") {
        return responses["hola"];
    }

    // Si el usuario dice 'preguntas', mostrar todas las preguntas posibles
    if (lowerMessage === "preguntas") {
        return `${responses["preguntas"]}<br>${suggestions.map(suggestion => `<a href="#" class="suggestion-link">${suggestion}</a>`).join(" | ")}`;
    }

    // Si el usuario dice 'sugerencias', mostrar 3 sugerencias aleatorias
    if (lowerMessage === "sugerencias") {
        const randomSuggestions = getRandomSuggestions(3);
        return `${responses["sugerencias"]}<br>${randomSuggestions.map(suggestion => `<a href="#" class="suggestion-link">${suggestion}</a>`).join(" | ")}`;
    }

    // Si no hay respuesta predefinida, buscarla
    if (responses[lowerMessage]) {
        return responses[lowerMessage];
    }

    return "Lo siento, no entiendo esa pregunta. Por favor, intenta con 'preguntas'.";
}

// Función para obtener N sugerencias aleatorias
function getRandomSuggestions(count) {
    const shuffledSuggestions = suggestions.sort(() => 0.5 - Math.random()); // Mezclar el array
    return shuffledSuggestions.slice(0, count); // Tomar las primeras 'count' sugerencias
}

// Función para borrar el chat
function clearChat() {
    localStorage.removeItem("chatMessages");
    messages.length = 0; // Limpiar el array de mensajes
    messages.push({ text: "Hola, ¿en qué puedo ayudarte? 😊", type: "left" });
    renderMessages(messages); // Volver a renderizar el chat vacío
    sendInput.value = '';
}

// Enviar un nuevo mensaje
async function sendMessage(userMessage) {
    if (!userMessage) userMessage = sendInput.value.trim(); // Si no se pasó un mensaje, tomarlo del input
    if (userMessage.toLowerCase() === "borrar chat") {
        clearChat();
    } else {
        if (userMessage !== '') {
            // Agregar el mensaje del usuario
            addMessage(userMessage, 'right');

            // Limpiar el input
            sendInput.value = '';

            // Obtener la respuesta del bot
            const botMessage = await getBotResponse(userMessage);

            // Agregar el mensaje del bot
            addMessage(botMessage, 'left');
        } else {
            // Mostrar el snackbar si el mensaje está vacío
            showSnackbar("No se pueden enviar mensajes vacíos");
        }
    }
}

// Evento para enviar mensaje al hacer clic en el botón
sendButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que se recargue la página al hacer clic en el botón
    sendMessage(); // Llama a la función sin pasarle el evento
});

// Evento para enviar mensaje al presionar "Enter"
sendInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita cualquier acción predeterminada
        sendMessage(); // Llama a la función sin pasarle el evento
    }
});

// Evento para manejar los clics en las sugerencias
messagesArea.addEventListener('click', function (event) {
    if (event.target.classList.contains('suggestion-link')) {
        sendInput.value = event.target.textContent; // Completar el input con la sugerencia clickeada
    }
});
// Agregar la funcionalidad de clic a las sugerencias
document.querySelector(".messages-area").addEventListener('click', (event) => {
    if (event.target.classList.contains('suggestion-link')) {
        sendInput.value = event.target.textContent; // Establecer el texto de la sugerencia en el input
        sendMessage(); // Enviar el mensaje con la sugerencia seleccionada
    }
});

// Cargar los mensajes al cargar la página
const messages = loadMessages();
renderMessages(messages);

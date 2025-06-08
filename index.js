document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('setting');
    const buttonSender = document.getElementById('send-button');
    const dropdown = document.getElementById('dropdown-content');


    buttonSender.addEventListener('click', function () {
        const input = document.getElementById('input-text');
        const text = input.value;
        if (text) {
            new_mensaje_cliente(text);
            peticion_respuesta(text);
            input.value = ''; 
        } 
    })

});

function new_mensaje_cliente(text) {
    // Crear el contenedor del mensaje alineado a la derecha
    const outerDiv = document.createElement('div');
    outerDiv.className = 'flex justify-end';

    // Crear el mensaje con fondo azul claro y estilo de burbuja
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-[#f5f5dc] text-black p-2 rounded-lg max-w-xs';
    messageDiv.textContent = text;

    // Añadir el mensaje al contenedor
    outerDiv.appendChild(messageDiv);

    // Insertar en el contenedor principal de mensajes
    const container = document.getElementById('messages-container');
    if (container) {
        container.appendChild(outerDiv);
        // Scroll automático al final
        scrollToBottom();
    }
}
async function peticion_respuesta(text) {
    const messagesContainer = document.getElementById("messages-container");

    // 1. Mostrar animación de "escribiendo..."
    const typingDiv = document.createElement("div");
    typingDiv.className = "flex";
    typingDiv.innerHTML = `
        <div id="typing-indicator" class="bg-gray-300 text-black p-2 rounded-lg max-w-xs animate-pulse">
            Escribiendo...
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        // 2. Enviar petición a la API
        const response = await fetch("https://hook.eu2.make.com/dsa3s0n461vpntgrnm5mn4vg2kqzgz12", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje: text })
        });

        // 3. Esperar la respuesta
        const data = await response.text();


        // 4. Eliminar animación y mostrar respuesta
        messagesContainer.removeChild(typingDiv);
        new_mensaje_asistente(data);
    } catch (error) {
        // En caso de error, eliminar animación y mostrar error
        messagesContainer.removeChild(typingDiv);
        new_mensaje_asistente("Ha ocurrido un error. Inténtalo de nuevo.");
        console.error("Error en la petición:", error);
    }
}

function new_mensaje_asistente(text) {
    // Crear el contenedor del mensaje alineado a la izquierda
    const outerDiv = document.createElement('div');
    outerDiv.className = 'flex';

    // Crear el mensaje con fondo gris claro y estilo de burbuja
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-gray-300 text-black p-2 rounded-lg max-w-xs';
    messageDiv.innerHTML = text; // ← Permite insertar HTML

    // Añadir el mensaje al contenedor
    outerDiv.appendChild(messageDiv);

    // Insertar en el contenedor principal de mensajes
    const container = document.getElementById('messages-container');
    if (container) {
        container.appendChild(outerDiv);
        // Scroll automático al final
        scrollToBottom();
    }
}

function scrollToBottom() {
    // Para desarrollar en otro momento, no es esencial para el MVP
}


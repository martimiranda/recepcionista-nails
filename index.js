const LISTA_RESPUESTAS = [
    `<p>¡Hola! 👋 Soy el asistente virtual de la peluquería canina, aquí para ayudarte con cualquier duda o consulta sobre nuestros servicios. 🐶✨</p>
    <p>Si tienes alguna pregunta, estaré encantado de asistirte. 😊</p>`,
    `<p>¡Hola! 😊 Ofrecemos una variedad de servicios para que tu peludito luzca y se sienta genial. 🐕✂️</p>
<ul>
    <li>Baño con shampoo especial y secado 🛁</li>
    <li>Corte de pelo a medida ✂️</li>
    <li>Limpieza de oídos y corte de uñas 🐾</li>
    <li>Tratamientos de spa para un mimo extra 🌸</li>
</ul>
<p>Si necesitas más información o tienes alguna consulta específica, aquí estoy para ayudarte. ¡Gracias por tu interés! 💛</p>`,
`<p>¡Hola! 🐶✨ Los Frenchies suelen tener la piel sensible, así que lo ideal es bañarlos cada 4-6 semanas. 🛁 Esto ayuda a mantener su pelaje limpio sin irritar su piel.</p>
<p>Si tu peludito se ensucia mucho o tiene alguna condición especial, siempre es bueno consultar al veterinario. 😊</p>
<p>¡Gracias por tu pregunta! Si necesitas más consejos, aquí estoy. 🐾💛</p>`,
`<p>¡Hola! 😄 Claro que sí, estaremos encantados de ayudar a Charlie con su pelaje enredado. 🐕✨</p>
<p>Ofrecemos servicios de desenredado y acondicionamiento que dejarán su pelo suave y manejable nuevamente. ✂️🌟</p>
<p>Si deseas agendar una cita para él, puedes hacerlo aquí 👉 <a href="https://ejemplo-cita.com" target="_blank">https://ejemplo-cita.com</a></p>
<p>¡Estamos ansiosos por conocer a Charlie y darle el mejor cuidado! 🐾❤️</p>`,


]
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('setting');
    const buttonSender = document.getElementById('send-button');
    const dropdown = document.getElementById('dropdown-content');


    buttonSender.addEventListener('click', function () {
        const input = document.getElementById('input-text');
        const text = input.value;
        if (text) {
            new_mensaje_cliente(text);
            // peticion_respuesta(text);
            peticion_respuesta_fake();
            input.value = ''; 
        } 
    })

});
function peticion_respuesta_fake() {
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
    if (LISTA_RESPUESTAS.length > 0) {
        const respuesta = LISTA_RESPUESTAS[0]; // Obtener el primer valor
        
        setTimeout(() => {
            new_mensaje_asistente(respuesta); // Enviarlo después de 2 segundos
            messagesContainer.removeChild(typingDiv);
            LISTA_RESPUESTAS.shift();         // Eliminar el primer valor
        }, 2000); // Pausa de 2 segundos
    }
}


function new_mensaje_cliente(text) {
    // Crear el contenedor del mensaje alineado a la derecha
    const outerDiv = document.createElement('div');
    outerDiv.className = 'flex justify-end';

    // Crear el mensaje con fondo azul claro y estilo de burbuja
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-[turquoise] text-black p-2 rounded-lg max-w-xs';
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


const messagesDiv = document.getElementById('messages');

const socket = new WebSocket('ws://127.0.0.1:777');

socket.addEventListener('open', (event) => {
    console.log('Connected to server');
});

socket.addEventListener('message', (event) => {
    const message = event.data;
    const messageElement = document.createElement('p');
    messageElement.textContent = `From Server: ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the latest message
});

socket.addEventListener('close', (event) => {
    console.log('Connection closed');
});

socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
});

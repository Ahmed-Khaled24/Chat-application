const socket = io();
const newMessageForm = document.getElementById('send-message-form');
const messages = document.querySelector('#messages');
const messageInput = document.querySelector('#message-content');

socket.on('newMessage', async (message) => {
    appendMessage(message);
    scrollToBottom();
    new Audio('audio/tone.mp3').play();
});

newMessageForm.addEventListener('submit', 
    async (event) => {
        event.preventDefault();
        const messageContent = messageInput.value;
        messageInput.value = '';
        try{
            let response = await fetch('/messages', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    content: messageContent,
                })
            });
            response = await response.json();

            if (response.status === 'success') {
                appendMessage(response.message);
                socket.emit('newMessage', response.message);
                scrollToBottom(); 
            }
        } catch(err) {
            console.log(err.message);
        }
    }
);

async function loadAllMessages(){
    let response = await fetch('/messages');
    response = await response.json();
    let messages = response.messages;
    for(msg of messages) {
        appendMessage(msg);
    }
}

function appendMessage(msg) {
    const messageContainer = document.createElement('div')
    messageContainer.classList.add('message-container');

    const imgSrc = ( 
        msg.createdBy.profileUrl ? 
        `https://chat-application-bucket01.s3.eu-west-3.amazonaws.com/${msg.createdBy.profileUrl}`: 
        `/img/default.png` 
    );

    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `
        <div class="message-header"> 
            <img alt="profile" src=${ imgSrc }>
            <p> ${ msg.createdBy.firstName } ${ msg.createdBy.lastName } </p>
        </div>
        <p> ${ msg.content } </p>
        <p class="sent-at"> ${ simplifyDate(new Date(msg.createdAt)) } </p>
    `;
    
    messageContainer.appendChild(newMessage);
    messages.appendChild(messageContainer);
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

async function loadPage(){
    await loadAllMessages();
    scrollToBottom();
}

loadPage();
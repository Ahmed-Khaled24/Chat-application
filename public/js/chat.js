const socket = io();
const  newMessageForm = document.getElementById('send-message-form');

socket.on('newMessage', async (message) => {
    addMessageToScreen(createMessageContainer(message));
    scrollToBottom();
    new Audio('audio/tone.mp3').play();
});

newMessageForm.addEventListener('submit', 
    async (event) => {
        event.preventDefault();
        const messageContent = document.getElementById('message-content').value;
        document.getElementById('message-content').value = '';
        try{
            let response = await fetch('/messages', {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    content: messageContent,
                })
            });
            response = await response.json();

            if (response.status === 'success') {
                addMessageToScreen(createMessageContainer(response.message));
                scrollToBottom(); 
                socket.emit('newMessage', response.message);
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
    for(message of messages) {
        addMessageToScreen(
            createMessageContainer(message)
        );
    }
}
function createMessageContainer(messageObject){
    const messageHeader = createMessageHeaderElement(messageObject);
    const messageContent = createMessageContentElement(messageObject);
    const sentAt = createSentAtElement(messageObject);

    const message = document.createElement('div');
    message.classList.add('message');
    message.appendChild(messageHeader);
    message.appendChild(messageContent);
    message.appendChild(sentAt); 

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    messageContainer.appendChild(message);

    return messageContainer;
}
function createUserImgElement(messageObject){
    const userImg = document.createElement('img');
    userImg.alt = 'img';
    if (messageObject.createdBy.profileUrl) {
        userImg.src = `https://chat-application-bucket01.s3.eu-west-3.amazonaws.com/${messageObject.createdBy.profileUrl}`;
    } else { 
        userImg.src = '/img/default.png';
    }
    return userImg;
}
function createUsernameElement(messageObject) {
    const username = document.createElement('p');
    username.innerText = `${messageObject.createdBy.firstName} ${messageObject.createdBy.lastName}`;   
    return username;
}
function createMessageHeaderElement(messageObject){
    const userImg = createUserImgElement(messageObject);
    const username = createUsernameElement(messageObject);
    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header');
    messageHeader.appendChild(userImg);
    messageHeader.appendChild(username);
    return messageHeader
}
function createMessageContentElement(messageObject) {
    const messageContent = document.createElement('p');
    messageContent.innerText = messageObject.content;
    return messageContent;
}
function createSentAtElement(messageObject){
    const sentAt = document.createElement('p');
    sentAt.classList.add('sent-at');
    createdAt = new Date(messageObject.createdAt)
    sentAt.innerText = simplifyDate(createdAt);
    return sentAt;
}
function addMessageToScreen(messageContainer) {
    document.getElementById('messages').appendChild(messageContainer);
}
function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}
async function loadPage(){
    await loadAllMessages();
    scrollToBottom();
}

loadPage();
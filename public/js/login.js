document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Stop the normal submit.
    Array.from(document.getElementsByClassName('error')).forEach( (element)=> element.remove()); // Remove all the errors in the DOM

    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value.toLowerCase();
    try {
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password}),   
        });
        response = await response.text();
        if(response.toLowerCase() === 'unauthorized'){
            throw Error('Invalid email or password');
        } else {
            window.location.href = '/chat-room';
        }
    } catch(err){
        const errorMessage = constructErrorMessage(err.message.toLowerCase()); 
        const errorNode = createErrorNode(errorMessage);
        return document.getElementById('login-form').appendChild(errorNode);
    }
});



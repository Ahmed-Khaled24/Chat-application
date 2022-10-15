document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    Array.from(document.getElementsByClassName('error')).forEach( (element) => element.remove()); 

    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;
    try {
        await sendLoginRequest(email, password);
    } catch(err){
        handleError(err, 'login-form');
    }
});



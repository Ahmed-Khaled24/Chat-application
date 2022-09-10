document.getElementById('login-form').addEventListener('submit', async (event) => {
    // Stop the normal submit action.
    event.preventDefault(); 
    // Remove all the errors in the DOM
    Array.from(document.getElementsByClassName('error')).forEach( (element)=> element.remove()); 

    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value.toLowerCase();
    try {
        await sendLoginRequest(email, password);
    } catch(err){
        handleError(err, 'login-form');
    }
});



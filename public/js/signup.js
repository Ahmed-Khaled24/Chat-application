document.getElementById('signup-form').addEventListener('submit', 
    async (event) => {
        event.preventDefault(); 
        Array.from(document.getElementsByClassName('error')).forEach( (element)=> element.remove() ); 
        
        const firstName =  document.getElementById('firstName').value;
        const lastName =  document.getElementById('lastName').value;
        const email =  document.getElementById('email').value.toLowerCase();
        const password =  document.getElementById('password').value;
        
        try{
            await sendSignupRequest(firstName, lastName, email, password);
            await sendLoginRequest(email, password);
            window.location.href = '/chat-room';
        } catch (err){
            handleError(err, 'signup-form');
        }
    }
)


const signupForm = document.querySelector('form');
const submitBtn = document.getElementById('signup-btn');

signupForm.addEventListener('submit', 
    async (event) => {
        event.preventDefault(); 
        Array.from(document.getElementsByClassName('error')).forEach( (element)=> element.remove() ); 
        startLoader();

        const firstName =  document.getElementById('firstName').value;
        const lastName =  document.getElementById('lastName').value;
        const email =  document.getElementById('email').value.toLowerCase();
        const password =  document.getElementById('password').value;
        
        try{
            await sendSignupRequest(firstName, lastName, email, password);
            await sendLoginRequest(email, password);
            window.location.href = '/chat-room';
        } catch (err){
            stopLoader();
            handleError(err, 'signup-form');
        }
    }
)

function startLoader() {
    submitBtn.innerHTML = '<div class="loader"></div>';
    submitBtn.disabled = true;
}

function stopLoader() {
    submitBtn.innerHTML = 'Sign up';
    submitBtn.disabled = false;
}

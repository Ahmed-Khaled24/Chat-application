const loginForm = document.querySelector('form');
const submitBtn = document.getElementById('login-btn');

loginForm.addEventListener('submit', 
    async (event) => {
        event.preventDefault(); 
        Array.from(document.getElementsByClassName('error')).forEach( (element) => element.remove()); 
        startLoader();

        const email = document.getElementById('email').value.toLowerCase();
        const password = document.getElementById('password').value;
        try {
            await sendLoginRequest(email, password);
        } catch(err){
            stopLoader();
            handleError(err, 'login-form');
        }
    }
);

function startLoader() {
    submitBtn.innerHTML = '<div class="loader"></div>';
    submitBtn.disabled = true;
}

function stopLoader() {
    submitBtn.innerHTML = 'Login';
    submitBtn.disabled = false;
}


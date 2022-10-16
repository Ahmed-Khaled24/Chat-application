async function sendLoginRequest(email, password){
    let response = await fetch('/auth/local', {
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
}

async function sendSignupRequest(firstName, lastName, email, password){
    const isStrongPassword = checkStrength(password);
    if(!isStrongPassword) {   
        throw Error('Weak password, your password must be at least 8 characters, containing uppercase, lowercase, and digits.')  
    }

    let response = await fetch('/users', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, email, password}),   
    });
    response = await response.json();
    if(response.status === 'fail'){
        throw Error(response.error);
    }
}


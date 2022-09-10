function createErrorNode(errorTxt){
    const error = document.createElement('p');
    const txt = document.createTextNode(errorTxt);
    error.appendChild(txt);
    error.classList.add('error');
    return error;
}

function constructErrorMessage(responseError){
    if(responseError.includes('duplicate') && responseError.includes('email')){
        return `The email you entered is already registered use it to login or user another email`
    } else if (responseError.includes('duplicate') && responseError.includes('username')){
        return `The username you entered is already taken, choose another one`
    } else if(responseError === 'failed to fetch') {
        return `Connection error, check your connection and try again`
    } else {
        return responseError;
    }
}
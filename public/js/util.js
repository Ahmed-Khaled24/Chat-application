function createErrorNode(errorTxt){
    const error = document.createElement('p');
    const txt = document.createTextNode(errorTxt);
    error.appendChild(txt);
    error.classList.add('error');
    return error;
}

function constructErrorMessage(responseError){
    if(responseError.includes('duplicate') && responseError.includes('email')){
        return `The email you entered is already registered use it to login or use another email`
    } else if (responseError.includes('duplicate') && responseError.includes('username')){
        return `The username you entered is already taken, choose another one`
    } else if(responseError === 'failed to fetch') {
        return `Connection error, check your connection and try again`
    } else {
        return responseError;
    }
}

function handleError(err){
    const errorMessage = constructErrorMessage(err.message.toLowerCase()); 
    const errorNode = createErrorNode(errorMessage);
    return document.querySelector('.app').appendChild(errorNode);
}

function checkStrength(password){
   	return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,50}$/.test(password);
}

function simplifyDate(messageDate) {
	const monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const createdAt = messageDate.valueOf();
	const renderAt = Date.now();

	const minutes = Math.floor((renderAt - createdAt) / (1000 * 60));
	if (minutes < 1) {
		return 'Now';
	}
	else if (minutes == 1) {
		return `${minutes} minute ago`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 1) {
		return `${minutes} minutes ago`;
	}
	else if (hours == 1) {
		return `${hours} hour ago`;
	}
	else if (hours > 1 && hours < 24) {
		return `${hours} hours ago`;
	}

	const days = Math.floor(hours / 24);
	if (days == 1) {
		return `${days} day ago`;
	}
	else if (days < 30) {
		return `${days} days ago`;
	}

	const months = Math.floor(days / 30);
	if (months == 1) {
		return `${months} month ago`
	}
	else if (months < 12) {
		return `${months} months ago`
	}

	return `${monthsName[messageDate.getMonth()]}, ${messageDate.getFullYear()}`
}
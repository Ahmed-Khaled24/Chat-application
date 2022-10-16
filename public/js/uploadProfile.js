const uploadBtn = document.querySelector('#profile-img button');
const filePicker = document.querySelector('input[type="file"]');

filePicker.addEventListener('change', () => {
    uploadBtn.disabled = false;
});

uploadBtn.addEventListener('click', async () => {
    startLoader();
    const photo = document.querySelector('#profile-img input').files[0];
    try {
        console.log('getting signed url');
        let uploadResponse = await fetch('/upload/requestUploadSignedUrl');
        uploadResponse = await uploadResponse.json();

        console.log('upload photo');
        await fetch(uploadResponse.signedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': photo.type,
            },
            body: photo,
        });

        console.log('update user data');
        await fetch('/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: {
                    profileUrl: uploadResponse.key,
                }
            })
        })

        window.location.reload();
    } catch(err) {
        stopLoader();
        createErrorNode(err.message);
    } 
});

function startLoader() {
    uploadBtn.innerHTML = '<div class="loader"></div>';
    uploadBtn.disabled = true;
}

function stopLoader() {
    uploadBtn.innerHTML = 'Upload new photo';
    uploadBtn.disabled = true;
}
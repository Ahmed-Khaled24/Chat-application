const uploadBtn = document.querySelector('#visual-section button');
const filePicker = document.querySelector('input[type="file"]');

filePicker.addEventListener('change', () => {
    uploadBtn.disabled = false;
});

uploadBtn.addEventListener('click', async () => {
    startLoader();
    const photo = filePicker.files[0];
    try {
        // Get upload link
        let uploadResponse = await fetch('/upload/requestUploadSignedUrl');
        uploadResponse = await uploadResponse.json();

        // Upload the photo
        await fetch(uploadResponse.signedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': photo.type,
            },
            body: photo,
        });

        // Update the user
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

        // Reload the page
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
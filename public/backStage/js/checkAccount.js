document.addEventListener('DOMContentLoaded', async () => {
    let protectedUrl = 'http://localhost/pokemon-popup-gruop//public/backStage/login/protected.php';
    const response = await fetch(protectedUrl, {
        method: 'GET',
        // credentials: 'include'
    });

    const data = await response.json();
    if (data.success) {
        // document.getElementById('message').innerText = data.message;
        console.log(data.message);
    } else {
        alert('Access denied');
        window.location.href = './login/login.html';
    }
});

window.onload = function(){
    let loginUrl = 'http://localhost/pokemon-popup-gruop/public/backStage/login/login.php'
    
    $('#forgetBN').click(function(){
        window.location.href = './loginForget.html';
    })
    

    document.getElementById('loginBN').addEventListener('click', async () => {
        const account = document.getElementById('account').value;
        const password = document.getElementById('password').value;
        
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ account, password })
        });
    
        const data = await response.json();

        if (data.success) {
            window.location.href = '../overAll.html';
        } else {
            console.log(data.success);
            $('#loginWrongDiv').html(`<div id="loginWrong">帳號或密碼錯誤</div>`)
        }
    });
    
}

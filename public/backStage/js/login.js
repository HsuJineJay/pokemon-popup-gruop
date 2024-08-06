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
            body: JSON.stringify({ account, password })
        });
    
        const data = await response.json();
        // console.log(data);
        if (data.success) {
            window.location.href = '../overAll.html';
        } else {
            // alert('Login failed');
            $('#inputContent').prepend(`<div id="loginWrong">帳號或密碼錯誤</div>`)
        }
    });
    
}

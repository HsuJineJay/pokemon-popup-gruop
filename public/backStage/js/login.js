window.onload = function () {
    let loginUrl = 'http://localhost/pokemon-popup-gruop/public/backStage/login/login.php'
    // let loginUrlNodejs = 'http://localhost:3000/loginApi'
    let loginUrlNodejs = 'https://pokemon-popup-gruopbruce.onrender.com/loginApi'
    // let loginUrlNodejs = 'http://localhost:5432/loginApi'

    $('#forgetBN').click(function () {
        window.location.href = './loginForget.html';
    })



    document.getElementById('loginBN').addEventListener('click', function () {
        let account = document.getElementById('account').value;
        let password = document.getElementById('password').value;

        $.ajax({
            // url: loginUrl,
            url: loginUrlNodejs,
            method: 'Post',
            data: {
                "account": account,
                "password": password,
            },
            success: function (data) {
                console.log(data);
                if (data) {
                    // alert('登入成功')

                    window.location.href = '../overAll.html';
                } else {
                    // console.log(data);
                    $('#loginWrongDiv').html(`<div id="loginWrong">帳號或密碼錯誤</div>`)
                }
            }
        }).fail(function (res) {
            console.log('fail:', res);
        });


    })

}


let loginUrlNodejs = 'http://localhost:3000/loginForgetCheckApi'

function checkAccount(){
    let code = document.getElementById('code').value;
    $.ajax({
        // url: loginUrl,
        url: loginUrlNodejs,
        method: 'Post',
        data: {
            "code": code,
        },
        success: function (data) {
            // console.log(data);
            if (data) {
                // alert('登入成功')

                window.location.href = './changePW.html';
            } else {
                // console.log(data);
                $('#loginWrongDiv').html(`<div id="loginWrong">驗證碼錯誤</div>`)
            }
        }
    }).fail(function (res) {
        console.log('fail:', res);
    });
}


window.addEventListener('load',function(){
    $('#backBN').click(function(){
        window.location.href = './login.html';

    })
    $('#sendBN').click(function(){
        checkAccount()
    })
    
})



let loginUrlNodejs = 'http://localhost:3000/loginForgetApi'

function checkAccount(){
    let account = document.getElementById('account').value;
    $.ajax({
        // url: loginUrl,
        url: loginUrlNodejs,
        method: 'Post',
        data: {
            "account": account,
        },
        success: function (data) {
            // console.log(data);
            if (data) {
                // alert('登入成功')

                window.location.href = './loginForgetCheckNumber.html';
            } else {
                // console.log(data);
                $('#loginWrongDiv').html(`<div id="loginWrong">帳號錯誤</div>`)
            }
        }
    }).fail(function (res) {
        console.log('fail:', res);
    });
}


window.addEventListener('load',function(){
    $('#backBN').click(function(){
        window.location.href = './login.html';
        console.log('a');
    })
    $('#sendBN').click(function(){
        checkAccount()
    })
    
})


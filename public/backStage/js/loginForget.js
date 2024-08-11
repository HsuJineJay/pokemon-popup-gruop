




let loginUrlNodejs = 'http://localhost:3000/loginForgetApi'
let loginUrlMail = 'http://localhost:3000/mailSomeone'

function checkAccount(){
    let account = document.getElementById('account').value;
    $.ajax({
        // url: loginUrl,
        url: loginUrlNodejs,
        method: 'Post',
        data: {
            "account": account,
        },
        success: function (dataStr) {
            let data = JSON.parse(dataStr);
            // console.log(typeof(dataStr) );
            console.log('jj');
            console.log(data);
            if(data !== undefined){
                if (data) {
                    let email = data[0].userEmail;
                    let code = data[0].code;
                    // alert('登入成功')
                    postMailApi(email, '寶可夢快閃店_驗證碼', `您的驗證碼為${code}`)
                    window.location.href = './loginForgetCheckNumber.html';
                } else {
                    // console.log(data);
                    $('#loginWrongDiv').html(`<div id="loginWrong">帳號錯誤</div>`)
                }
            }else{
                $('#loginWrongDiv').html(`<div id="loginWrong">帳號錯誤</div>`)
            }

        }
    }).fail(function (res) {
        console.log('fail:', res);
    });
}

function postMailApi(mail, subject, text){

    $.ajax({
        // url: loginUrl,
        url: loginUrlMail,
        method: 'Post',
        data: {
            "mail": mail,
            "subject": subject,
            "text": text
        },
        success: function (data) {
            console.log('已寄出');
            

        }
    }).fail(function (res) {
        console.log('fail:', res);
    });
}


window.addEventListener('load',function(){
    $('#backBN').click(function(){
        window.location.href = './login.html';
        // console.log('a');
    })
    $('#sendBN').click(function(){
        checkAccount()

    })
    
})


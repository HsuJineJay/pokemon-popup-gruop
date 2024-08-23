
// let loginUrlNodejs = 'http://localhost:3000/loginForgetApi'
// let loginUrlMail = 'http://localhost:3000/mailSomeone'
let loginUrlNodejs = 'http://localhost:5432/loginForgetApi'
let loginUrlMail = 'http://localhost:5432/mailSomeone'

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
            // console.log('jj');
            // console.log(data);
                if (data) {
                    let account = data[0].userAccount;
                    fetch('http://localhost:5432/getITAccount')
                    .then(function(response){
                        return response.json();
                        // console.log(response);
                    })
                    .then(function(ITdata){
                        let ITEmail = ITdata[0].userEmail;
                        // console.log(data);
                        // console.log(ITAccount);
                        console.log(ITdata);
                        postMailApi(ITEmail, '職員申請修改密碼', `申請人帳號：${account}`)
                        window.location.href = './loginForgetSuccess.html';
                        // alert('已寄出密碼重設申請至IT人員')
                    })
                    
                    // let email = data[0].userEmail;
                    // let code = data[0].code;
                    // alert('登入成功')
                    
                } else {
                    // console.log(data);
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


window.onload = function () {
    let loginUrl = 'http://localhost:3000/updatePWApi'
    let loginUrlNodejs = 'http://localhost:3000/changePWApi'

    $('#backBN').click(function () {
        window.location.href = './login.html';
    })



    document.getElementById('sendBN').addEventListener('click', function () {
        let pW = document.getElementById('pW').value;
        let pWAgain = document.getElementById('pWAgain').value;

        if (pW === pWAgain) {
            $.ajax({
                // url: loginUrl,
                url: loginUrlNodejs,
                method: 'Post',
                // data: {
                //     "account": account,
                //     "password": password,
                // },
                success: function (data) {
                    // console.log(data);
                    if (data) {

                        $.ajax({
                            url: loginUrl,
                            method: 'post',
                            data: {
                                "userAccount": data,
                                "userPassword": pW,
                            },
                            success: function (dataStr) {
                                console.log(dataStr);
                                if(dataStr){
                                    alert('更改密碼成功')
                                }else{
                                    alert('更改密碼失敗')
                                }
                                window.location.href = './login.html';


                            }
                        }).fail(function (res) {
                            console.log('fail:', res.innerText);
                        })

                        
                    } else {
                        console.log(data);

                    }
                }
            }).fail(function (res) {
                console.log('fail:', res);
            });
        } else {
            $('#loginWrongDiv').html(`<div id="loginWrong">密碼不一致</div>`)
        }
    })

}

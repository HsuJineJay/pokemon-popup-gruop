
document.addEventListener('DOMContentLoaded', () => {
    let protectedUrl = 'http://localhost/pokemon-popup-gruop/public/backStage/login/protected.php';
    let protectedUrlNodeJs = 'http://localhost:5432/check';

    $.ajax({
        // url: protectedUrl,
        url: protectedUrlNodeJs,
        method: 'GET',
        // xhrFields: {
        //     withCredentials: true // 包含凭据
        // },
        success: function (data) {
            // console.log('OK');
            if (data) {
                console.log('You Good');
                // console.log(data.message);
                // console.log(data.responseText);
            } else {
                // console.log(data.message);
                // console.log(data.responseText);
                alert('Access denied');
                window.location.href = './login/login.html';
            }
        }
         
    }).fail(function (error) {
        console.log('fail1');
        console.log(error);
        console.log(error.responseText);
    })
});

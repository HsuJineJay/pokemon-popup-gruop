// document.addEventListener('DOMContentLoaded', async () => {
//     let protectedUrl = 'http://localhost/pokemon-popup-gruop//public/backStage/login/protected.php';
//     // const response = await fetch(protectedUrl, {
//     //     method: 'GET',
//     //     // credentials: 'include'
//     // });


//     // const data = await response.json();
//     // if (data.success) {
//     //     // document.getElementById('message').innerText = data.message;
//     //     console.log(data.message);
//     // } else {
//     //     console.log(data);
//     //     // alert('Access denied');
//     //     // window.location.href = './login/login.html';
//     // }
//     $.get(protectedUrl, function (data) {
//         // console.log(data.data);
//         if (data.success) {
//             // document.getElementById('message').innerText = data.message;
//             console.log(data.message);
//         } else {
//             console.log(data.message);
//             // console.log(data);
//             alert('Access denied');
//             window.location.href = './login/login.html';
//         }
//     })
//         .fail(function (error) {
//             console.log('fail');
//             console.log(error.responseText);
//         })
// });
document.addEventListener('DOMContentLoaded', async () => {
    let protectedUrl = 'http://localhost/pokemon-popup-gruop/public/backStage/login/protected.php';

    $.ajax({
        url: protectedUrl,
        method: 'GET',
        // xhrFields: {
        //     withCredentials: true // 包含凭据
        // },
        success: function (data) {
            // console.log('OK');
            if (data.success) {
                console.log(data.message);
                console.log(data.responseText);
            } else {
                console.log(data.message);
                console.log(data.responseText);
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

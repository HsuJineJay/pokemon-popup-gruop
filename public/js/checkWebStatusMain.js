function checkWebStatus() {
    let apiUrlWebStatus = 'http://localhost/frontend/bigProject/root/backEnd/api/webStatus/webStatus.php'

    $.ajax({
        url: apiUrlWebStatus,
        method: 'GET',
        success: function (data) {
            if (parseInt(data[0].webStatus)){
                // console.log('1');
            }else{
                // console.log('0');
                window.location.href = './error.html'

            }
        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    });
}
checkWebStatus()
setInterval(checkWebStatus,5000)
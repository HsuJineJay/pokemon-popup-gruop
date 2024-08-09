


function getDataCreateTable() {
    let apiUrlWebStatus = 'http://localhost/pokemon-popup-gruop/backEnd/api/webStatus/webStatus.php'
    let apiUrlOverAll = 'http://localhost/pokemon-popup-gruop/backEnd/api/overAll/overAll.php'
    let result = '';

    let request1 = $.ajax({
        url: apiUrlWebStatus,
        method: 'GET',
        success: function (data) {
            result += `
            <tr>
                <td class="overAllTD">上線狀態：${parseInt(data[0].webStatus) ? 'ON' : 'OFF'}</td>
            </tr>
            `;
        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    });

    let requestCreatTable = $.ajax({
        url: apiUrlOverAll,
        method: 'GET',
        success: function (dataStr) {
            let data = JSON.parse(dataStr);
            // console.log(data);
            result += `
            <tr>
                <td class="overAllTD">商品數量：  ${data[0].productNum}  個</td>
            </tr>
            <tr>
                <td class="overAllTD">
                    交易筆數：  ${data[1].orderNum}  筆
                </td>
            </tr>
            <tr>
                <td class="overAllTD">
                    交易金額：  ${data[2].amount}  新台幣
                </td>
            </tr>
            <tr>
                <td class="overAllTD">咖啡廳預定總人數：  ${data[3].cafeBookingNum}  人</td>
            </tr>
            <tr>
                <td class="overAllTD">快閃店預定總人數：  ${data[4].storeBookingNum}  人</td>
            </tr>
            `;
        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    });

    // 使用 Promise.all 等待兩個請求都完成後才更新頁面
    Promise.all([request1, requestCreatTable]).then(() => {
        $('#overAlltbody').html(result);
    });
}

function changeWebStatus() {
    let apiUrlWebStatus = 'http://localhost/pokemon-popup-gruop/backEnd/api/webStatus/webStatus.php';

    // 先獲取當前的 webStatus
    return $.ajax({
        url: apiUrlWebStatus,
        method: 'GET'
    }).then(function (data) {
        let currentStatus = parseInt(data[0].webStatus);
        let newStatus = currentStatus === 1 ? 0 : 1;

        // 更新 webStatus
        return $.ajax({
            url: apiUrlWebStatus,
            method: 'PATCH',
            contentType: 'text/plain',
            data: JSON.stringify({
                "id": 1,
                "webStatus": newStatus,
            })
        });
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    });
}
function switchEditUIDisplay(display, elem) {
    $('#editContainer').css('display', display)
    // $('#editBlack').css('display', display)
    $('#editBlack').fadeToggle()
    if (elem !== undefined) {
        // console.log(elem);
        $(elem).css('display', display)
    } else {
        // console.log(elem);
        $('#createUI').css('display', display)
        $('#editUI').css('display', display)
        $('#removeUI').css('display', display)
        $('#webStatusUI').css('display', display)
        $('#onUI').css('display', display)

    }
}
function webStatusBN() {
    switchEditUIDisplay('block', '#webStatusUI')
}

window.onload = function () {
    getDataCreateTable();

    $('#editBlack,.UICancelBN,#webStatusUICancelBn').click(function () {
        switchEditUIDisplay('none')
    })


    $('#webOnline').on('click', function () {
        webStatusBN()
    });

    $('#webStatusUISubmit').on('click', function () {
        changeWebStatus().done(function () {
            getDataCreateTable();
        });
    });



}

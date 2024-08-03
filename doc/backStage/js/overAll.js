


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

    let request2 = $.ajax({
        url: apiUrlOverAll,
        method: 'GET',
        success: function (dataStr) {
            let data = JSON.parse(dataStr);
            result += `
            <tr>
                <td class="overAllTD">商品數量：${data[0].productNum}個</td>
            </tr>
            <tr>
                <td class="overAllTD">
                    交易筆數：100筆
                </td>
            </tr>
            <tr>
                <td class="overAllTD">
                    交易金額：100新台幣
                </td>
            </tr>
            <tr>
                <td class="overAllTD">咖啡廳預定總人數：${data[1].cafeBookingNum}人</td>
            </tr>
            <tr>
                <td class="overAllTD">快閃店預定總人數：${data[2].storeBookingNum}人</td>
            </tr>
            `;
        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    });

    // 使用 Promise.all 等待兩個請求都完成後才更新頁面
    Promise.all([request1, request2]).then(() => {
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

window.onload = function () {
    getDataCreateTable();

    $('#webOnline').on('click', function () {
        changeWebStatus().done(function () {
            getDataCreateTable();
        });
    });



//     $('#logout').click(async function () {
//         console.log('Logout button clicked');
//         let apiUrl = 'http://localhost/frontend/bigProject/root/public/backStage/login/logout.php';
        
//         try {
//             let response = await $.ajax({
//                 url: apiUrl,
//                 method: 'GET',
//                 dataType: 'json'
//             });
//             console.log(response);
//             if (response === 'out') {
//                 window.location.href = './login/login.html';
//             } else {
//                 console.log('Unexpected response:', response);
//             }
//         } catch (error) {
//             console.error('AJAX request failed:', error);
//         }
// })
}


// 載入台灣縣市區域
$(document).ready(function(){
    $("#twzipcode").twzipcode();

    $("#twzipcode_ADV").twzipcode({
    zipcodeIntoDistrict: true, // 郵遞區號自動顯示在地區
    css: ["city form-control", "town form-control"], // 自訂 "城市"、"地區" class 名稱 
    countyName: "city", // 自訂城市 select 標籤的 name 值
    districtName: "town" // 自訂地區 select 標籤的 name 值
    });
})


//------------------------交易明細------------------------
$(document).ready(function(){

    $('#submitOderList').click(async function(event){
        event.preventDefault();
        
        // 收集訂單明細
        let formData = $('#orderForm').serializeArray();

        // 分析訂單明細
        let formDataArray = formData;
        let orderDate = formatDate(new Date());

        // 商品訂單取值
        let productArray = JSON.parse(localStorage.getItem("goods")) || [];
        let orderProductID = productArray.map(item => item.id).join(',');
        console.log(orderProductID);
        let productQ = productArray.map(item => item.num).join(',');
        // console.log(typeof productQ);


        // 轉換及定義data格式
        const data = {
            orderExist: 1,
            orderProductID:orderProductID, // 示例值
            productQ: productQ, // 示例值
            buyerName: '',
            buyerEmail: '',
            buyerTel: '',
            buyerAddr: '',
            transportNote: '',
            orderDate: orderDate, 
            payment: '',
            receiptType: '',
            companyTitle: '',
            taxIDNumber: '',
            orderStatus: 1 // 示例值
        };

        // 訂單時間取值
        function formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
    
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        // 地址取值
        let addressParts = {
            zipcode: '',
            city: '',
            town: '',
            buyerAddr: ''
        };
        
        $.each(formDataArray, function(index, item) {
            switch (item.name) {
                case 'zipcode':
                    addressParts.zipcode = item.value;
                    break;
                case 'city':
                    addressParts.city = item.value;
                    break;
                case 'town':
                    addressParts.town = item.value;
                    break;
                case 'buyerAddr':
                    addressParts.buyerAddr = item.value;
                    break;
            }
        });
        
        // 格式化地址
        data.buyerAddr = `${addressParts.zipcode}${addressParts.city}${addressParts.town}${addressParts.buyerAddr}`;

        // 分析其他欄位 Array 並填入 data
        formDataArray.forEach(item => {
            switch(item.name) {
                case 'buyerName':
                    data.buyerName = item.value;
                    break;
                case 'buyerTel':
                    data.buyerTel = item.value;
                    break;
                case 'buyerEmail':
                    data.buyerEmail = item.value;
                    break;
                case 'transportNote':
                    data.transportNote = item.value;
                    break;
                case 'receiptType':
                    data.receiptType = item.value;
                    break;
                case 'taxIDNumber':
                    ( data.receiptType === '三聯式' )? data.taxIDNumber = item.value : data.taxIDNumber = '';
                    break;
                case 'companyTitle':
                    ( data.receiptType === '三聯式' )? data.companyTitle = item.value : data.companyTitle = '';
                    break;
                case 'payment':
                    if (item.value !== '客戶同意條款') {
                        data.payment = item.value;
                    }
                    break;
            }
        });

        

        console.log(data);

// 訂單明細 AJAX 傳送 ----------------------------------------------->
        try {
            let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/orderList/orderList.php';
            const response = await $.ajax({
                url: apiUrl,
                method: 'POST',
                data: data,
            });

            // 成功處理
            alert('成功送出表單');
            console.log(response);
            // localStorage.removeItem("goods");
            // window.location.href = 'goods.html';
        } catch (error) {
            // 失敗處理
            console.error('錯誤訊息:', error);
        }
    });

})





// $('#oPostInsert').click(function () {
//     let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/orderList/orderList.php' 
//     $.ajax({
//         url: apiUrl,
//         method: 'Post',
//         data: data,
//         success: function (dataStr) {
//             $('#result').html(dataStr)
//         }
//     }).fail(function (z) {
//             console.log('fail:', z.innerText);
//         })
// })

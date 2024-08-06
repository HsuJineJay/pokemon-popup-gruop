
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

    $('#submitOderList').click(function(){
        
        // 收集所有表单数据
        var formData = $('#orderForm').serializeArray();
        console.log(formData);


        // 原始表单数据数组
        const formDataArray = formData;
        const orderDate = formatDate(new Date());

        // 轉換及定義data格式
        const data = {
            orderExist: 1,
            // orderProductID: '1,2', // 示例值
            // productQ: '4,5', // 示例值
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

        
        function formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
    
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        // 分析 Array 並填入 data
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
                case 'zipcode':
                case 'city':
                case 'town':
                case 'buyerAddr':
                    data.buyerAddr += item.value; // 合併地址
                    break;
                case 'transportNote':
                    data.transportNote = item.value;
                    break;
                case 'receiptType':
                    data.receiptType = item.value;
                    break;
                case 'taxIDNumber':
                    if (data.receiptType === '三聯式') {
                        data.taxIDNumber = item.value;
                    } else {
                        data.taxIDNumber = ''; // 二聯式时，設為空值
                    }
                    break;
                case 'companyTitle':
                    if (data.receiptType === '三聯式') {
                        data.companyTitle = item.value;
                    } else {
                        data.companyTitle = ''; // 二聯式时，設為空值
                    }
                    break;
                case 'payment':
                    if (item.value !== '客戶同意條款') {
                        data.payment = item.value;
                    }
                    break;
            }
        });

        

        console.log(data);
        
    });

})

// $('#oPostInsert').click(function () {
//     let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/orderList/orderList.php' 
//     $.ajax({
//         url: apiUrl,
//         method: 'Post',
//         data: {
//         "orderExist":0,
//         "orderProductID":'1,2',
//         "productQ":'4,5',
//         "buyerName":"Bob",
//         "buyerEmail":"Bob@gmail.com",
//         "buyerTel":"0912123123",
//         "buyerAddr":"台中市台中公園",
//         "transportNote":"",
//         "orderDate":"2024-07-18 00:10:00",
//         "payment":"現金",
//         "receiptType":"三聯式",
//         "companyTitle":"company",
//         "taxIDNumber":"12341234",
//         "orderStatus":1


        // 0:{name: 'Delivery', value: '貨到付款'}
        // 1:{name: 'payment', value: '貨到付款'}
        // 2:{name: 'buyerNames', value: '王小明'}
        // 3:{name: 'buyerTel', value: '0911111111'}
        // 4:{name: 'buyerEmail', value: 'abc@yahoo.com.tw'}
        // 5:{name: 'city', value: '臺北市'}
        // 6:{name: 'town', value: '大同區'}
        // 7:{name: 'zipcode', value: '103'}
        // 8:{name: 'buyerAddr', value: '中正路5號1樓'}
        // 9:{name: 'transportNote', value: '請按電鈴'}
        // 10:{name: 'receiptType', value: '三聯式'}
        // 11:{name: 'taxIDNumber', value: '84690000'}
        // 12:{name: 'companyTitle', value: '快樂股份有限公司'}
        // 13:{name: 'payment', value: '客戶同意條款'}

//         },
//         success: function (dataStr) {
//             $('#result').html(dataStr)
//         }
//     }).fail(function (z) {
//             console.log('fail:', z.innerText);
//         })
// })

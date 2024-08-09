
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

// 電話格式的限制

$(document).ready(function() {
    $('#contactForm').on('submit', function(event) {
        var telInput = $('#buyerTel');
        var telValue = telInput.val();
        var telPattern = /^0[9][0-9]{8}$/; // 電話號碼正則表達式

        if (!telPattern.test(telValue)) {
            event.preventDefault(); // 阻止表單提交
            $('#telError').show(); // 顯示錯誤訊息
        } else {
            $('#telError').hide(); // 隱藏錯誤訊息
        }
    });

    // 自動格式化電話號碼
    $('#buyerTel').on('input', function() {
        var input = $(this).val().replace(/\D/g, ''); // 移除所有非數字的字元
        var formatted = '';

        if (input.length > 0) {
            formatted += input.substring(0, 4); // 區碼
            if (input.length > 4) {
                formatted += '-' + input.substring(4, 7); // 中段
            }
            if (input.length > 7) {
                formatted += '-' + input.substring(7, 10); // 末段
            }
        }

        $(this).val(formatted);
    });
});


// 發票的填寫限制
function invoiceStyles() {
    document.querySelectorAll('.invoiceText').forEach(function(label) {
        label.style.color = 'lightgray';
    });
    console.log('invoiceStyles()')

}

$(document).ready(function() {
    function toggleInputs() {
        const isDuplicateSelected = $('#DuplicateUniformInvoice').is(':checked');   //當二聯式被選擇時
        $('#taxIDNumber, #companyTitle').prop('disabled', isDuplicateSelected);     //統一編號&抬頭框不得輸入
        $('.invoiceText').css('color', isDuplicateSelected ? 'lightgray' : '#3F3A3A');   //統一編號&抬頭字為灰色
        
    }

    toggleInputs();

    $('input[name="receiptType"]').on('change', toggleInputs);
});

// 綠界的前往超商按鈕-----------------------------ING---------------------------->
$(document).ready(function(){
    $('#ecpay_btn').on('click', function(){
        console.log('123');
    });

});

// 準備一個全域函式，待取得超商資訊後，供另開視窗的頁面將資訊傳進來，放到要顯示的位置
window.map_return = function(info) {
    info = JSON.parse(info); // 我們預期傳進來的參數會是被json_encode的超商資訊
    $("#cvs_title").value(info.CVSStore);
};


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
        let productQ = productArray.map(item => item.num).join(',');

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
            // localStorage.removeItem("goods");        // 結帳送出後清空購物車
            // window.location.href = 'goods.html';     // 結帳送出後回到商品頁面
        } catch (error) {
            // 失敗處理
            console.error('錯誤訊息:', error);
        }
    });

})







setInterval(sc_checkoutlist, 1000);

    // 訂單明細隱藏/載入按鈕
    $(document).ready(function() {
        $('.order-text1').click(function() {
            $('#orderTable').toggleClass('table-hidden');
            // 切換按鈕文本，例如從 "+" 變成 "-" 或 "訂單明細"
            const isHidden = $('#orderTable').hasClass('table-hidden');
            $(this).html('訂單明細 ' + (isHidden ? '+' : '-')); // 使用 .html() 方法來更新文本
        });
        sc_checkoutlist();
    });

    // 訂單明細載入
    function sc_checkoutlist() {
    $('#result_checkoutlist').html("");

    let apiUrl = 'http://localhost/mfee51/root/backEnd/api/product/product.php';
    let Exist_apiUrl = apiUrl + '?productExist=1';

    return new Promise((resolve, reject) => {
        $.ajax({
            url: Exist_apiUrl,
            method: 'GET',
            async:false,
            success: function(arr) {
                var cookieStr = localStorage.getItem("goods");
                arr = JSON.parse(arr);
                if (cookieStr) {
                    // 取得 cookie 中的商品購物清單
                    var cookieArr = JSON.parse(cookieStr);
                    var newgoodsArr = [];

                    for (let i = 0; i < arr.length; i++) {
                        for (let j = 0; j < cookieArr.length; j++) {
                            if (arr[i].productID == cookieArr[j].id) {
                                arr[i].num = cookieArr[j].num;
                                newgoodsArr.push(arr[i]);
                            }
                        }
                    }

                    // 獲取現有的 billList 陣列--------------------------------------------------->
                    let billList = JSON.parse(localStorage.getItem("billList")) || [];

                    let total = 0;
                    for ( j of newgoodsArr) {
                        let value = j['productPrice'] * j['num'];
                        total += value; }

                    let subtotal = total;
                    let fee = subtotal === 0 ? 0 : (subtotal <= 1500 ? 100 : 0);
                    let billtotal = total + fee;

                    // 使用三元運算子進行條件判斷並更新 billList
                    billList = billList.length === 0
                        ? [{ billtotal: 0, fee: 0, subtotal: 0 }]
                        : [{ billtotal: billtotal, fee: fee, subtotal: subtotal }];

                    // 存回 billList localStorage
                    localStorage.setItem("billList", JSON.stringify(billList));
                    // 清除 billList localStorage
                    ( billtotal === 0 )? localStorage.removeItem("billList") : '';
                    // 更新現有的 billList 結束--------------------------------------------------->

                    let result = ` `;

                    // 取得購物清單陣列並輸出-----------------------------------------------------
                    for (let row of newgoodsArr) {
                        result += `

                    <tr id="${row['productID']}">
                        <td class="ProductDetails">
                            <img src="${row['productImg'][0]['productImg']}" class="image-container">
                            <span>${row['productName']}</span>
                        </td>
                        <td class="align-middle">$${row['productPrice'].toLocaleString()}</td>
                        <td class="align-middle"> 
                            <span name="num" class="quantity  d-flex align-items-center">${row['num']}</span>
                        </td>
                        <td class="align-middle">$${(row['productPrice']*row['num']).toLocaleString()}</td>
                    </tr>
                        `;
                    }

                    // 取得帳單金額陣列並輸出------------------------------------------------------
                    for( i of billList ) {
                        result += `
 
                        <tr>
                            <td class="text-end" scope="row" colspan="3">商品小計</td>
                            <td id="checkouttotal" >$${i['subtotal'].toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td class="text-end" scope="row" colspan="3">運費</td>
                            <td>$${i['fee'].toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td class="text-end" scope="row" colspan="3">總計</td>
                            <td>$${i['billtotal'].toLocaleString()}</td>
                        </tr>

                    `;
                    }

                    $('#result_checkoutlist').html(result);
                }
                resolve(); // 完成 AJAX 請求後解析 Promise
            },
            error: function(err) {
                reject(err); // 如果請求出錯，拒絕 Promise
            }
        });
    }).then(() => {
        // console.log('sc_checkoutlist 載入完成');
        
    });
}

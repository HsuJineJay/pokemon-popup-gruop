// 每秒訂單明細更新頁面
// $(document).ready(function() {
//     setInterval(sc_checkoutlist, 1000); 
// });


    // 訂單明細隱藏/載入按鈕
    $(document).ready(function() {
        $('.order-text1').click(function() {
            $('#orderTable').toggleClass('table-hidden');
            // 切換按鈕文本，例如從 "+" 變成 "-" 或 "訂單明細"
            const isHidden = $('#orderTable').hasClass('table-hidden');
            $(this).html('訂單明細 ' + (isHidden ? '+' : '-')); // 使用 .html() 方法來更新文本
        });
    });

    // 購物車清單載入
    function sc_checkoutlist() {
    $('#result_checkoutlist').html("");

    // let apiUrl = 'http://localhost/mfee51/root/backEnd/api/product/product.php';
    let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/product/product.php'
    let Exist_apiUrl = apiUrl + '?productExist=1';

    return new Promise((resolve, reject) => {
        $.ajax({
            url: Exist_apiUrl,
            method: 'GET',
            async:false,
            success: function(arr) {
                let cookieArr = JSON.parse(localStorage.getItem("goods")) || [];
                let billListArr = JSON.parse(localStorage.getItem("billList")) || [];

                arr = JSON.parse(arr);
                if (cookieArr) {
                    var newgoodsArr = [];

                    for (let i = 0; i < arr.length; i++) {
                        for (let j = 0; j < cookieArr.length; j++) {
                            if (arr[i].productID == cookieArr[j].id) {
                                arr[i].num = cookieArr[j].num;
                                newgoodsArr.push(arr[i]);
                            }
                        }
                    }

                    let result = ` `;

                    for (let row of newgoodsArr) {
                        result += `

                    <tr id="${row['productID']}">
                        <td class="ProductDetails">
                            <img src="${row['productImg'][0]['productImg']}" class="image-container">
                            <span>${row['productName']}</span>
                        </td>
                        <td class="align-middle">$${row['productPrice'].toLocaleString()}</td>
                        <td class="align-middle"> 
                            <div class="d-flex align-items-center">
                                <button class="btn-decrement">-</button>
                                <span name="num" class="quantity">${row['num']}</span>
                                <button class="btn-increment">+</button>
                                <p name="productInStock" class="d-none">${row['productInStock']}</p>
                            </div>
                        </td>
                        <td class="align-middle subtotal-row" name="subtotal-row">$${(row['productPrice']*row['num']).toLocaleString()}</td>

                        

                        `;
                    }

                    for (let j of billListArr) {
                    result += `
                        <tr>
                            <td class="text-end" scope="row" colspan="3">商品小計</td>
                            <td id="checkouttotal" >$${j['subtotal'].toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td class="text-end" scope="row" colspan="3">運費</td>
                            <td>$${j['fee'].toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td class="text-end" scope="row" colspan="3">總計</td>
                            <td>$${j['billtotal'].toLocaleString()}</td>
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


// 庫存數量對話框
$(document).ready(function() {
    $('#dialog-messages').dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Ok: function() {
                $(this).dialog("close");
            }
        }
    });
})

// 按鈕 + , 增加1個項目
$(document).on('click', '.btn-increment', function(){
    var nweID = parseInt($(this).closest('tr').attr('id'));
    var productInStock = parseInt($(this).next().text());
    var cartList = JSON.parse(localStorage.getItem("goods")) || [];

    var existingItem = cartList.find(item => item.id === nweID);
    if (existingItem.num < productInStock) {
        existingItem.num++;
        $(this).prev().text(existingItem.num); // 更新数字
    } else {
        // 使用 jQuery UI 弹出庫存數量對話框
        $('#dialog-messages').dialog('open');
    }


        // 將資料存回 localStorage
        localStorage.setItem("goods", JSON.stringify(cartList));

        sc_subtotal_td();
    });

// 按鈕 - , 減少1個項目
$(document).on('click', '.btn-decrement', function(){
    var nweID = parseInt($(this).closest('tr').attr('id'));
    var cartList = JSON.parse(localStorage.getItem("goods")) || [];

    var existingItem = cartList.find(item => item.id === nweID);
    if (existingItem) {
        if (existingItem.num > 0) {
            existingItem.num--;
            $(this).next().text(existingItem.num);  // 更新數字
        }

        // 檢查數量是否小於或等於 0
        if (existingItem.num <= 0) {
            var shouldDelete = window.confirm('數量小於 0，是否要刪除該商品？');
            if (shouldDelete) {
                // 移除該項目
                cartList = cartList.filter(item => item.id !== nweID);
                $(this).closest('tr').remove();
            } else {
                // 恢復數量顯示
                existingItem.num = 1;
                $(this).next().text(existingItem.num);
            }
        }
    }

        // 將資料存回 localStorage
        localStorage.setItem("goods", JSON.stringify(cartList));

        sc_subtotal_td();

});

// 商品計算更新
    function sc_subtotal_td(){
    
        let total = 0; // 將 total 初始化在外面以累加所有項目的值

            $('tr').each(function(index, elem) {
                let subtotalText = $(this).find("td[name='subtotal-row']").text();
                let subtotalValue = parseFloat(subtotalText.replace(/[$,]/g, ''));
                ( subtotalValue > 0 )? total += subtotalValue: '';
            });

            // 取得 billList 資訊
            let billList = JSON.parse(localStorage.getItem("billList")) || [];
            let fee = total < 0 ? 0 : (total <= 1500 ? 100 : 0);    //滿1,500免運費
            
            // 更新或初始化 billList 陣列
            if (billList.length === 0) {
                billList.push({
                    billtotal: total + fee,
                    fee: fee,
                    subtotal: total
                });
            } else {
                billList[0].billtotal = total + fee;
                billList[0].fee = fee;
                billList[0].subtotal = total;
            }
    
        // 存回 localStorage
        localStorage.setItem("billList", JSON.stringify(billList));
        // 刪除 billList 資訊
        (total === 0 )? localStorage.removeItem("billList", JSON.stringify(billList)) : '';

        sc_checkoutlist()
    
}


// 再去逛逛導入商品頁面
$(document).ready(function(){
    $('#GoShoppingbtn').click(function(){
        window.location.href = 'product_all.html';
    });
});

            
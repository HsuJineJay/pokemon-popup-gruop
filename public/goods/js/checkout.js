

    // $('#openNav').on('click', async function(){
    //     await sc_golist();
    //     sc_subtotal();
    //     sc_SubtotalCard();
    // });

    // 判斷購物車清單小計是否顯示&提示訊息------------------------------- 01
    // function sc_SubtotalCard(){
    //     var x = localStorage.getItem("goods");
    //     if( x === null || x === '[]' ){
    //         $('.SubtotalCard').css('display', 'none');
    //         $('#buyprompt_message').html("");
    //         $('#buyprompt_message').append('目前尚未添加任何商品...');
            
    //     }else{
    //         $('#buyprompt_message').html("");
    //         $('.SubtotalCard').css('display', 'flex');
    //     }
    // }

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
                var cookieStr = localStorage.getItem("goods");
                arr = JSON.parse(arr);
                if (cookieStr) {
                    var cookieArr = JSON.parse(cookieStr);
                    var newgoodsArr = [];
                    console.log(cookieArr);

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
                            <span name="num" class="quantity  d-flex align-items-center">${row['num']}</span>
                        </td>
                        <td class="align-middle subtotal-row">$${(row['productPrice']*row['num']).toLocaleString()}</td>
                    </tr>
                        `;
                    }

                    result += `
 
                        <tr>
                            <td class="text-end" scope="row" colspan="3">商品小計</td>
                            <td id="checkouttotal" >$33</td>
                        </tr>
                        <tr>
                            <td class="text-end" scope="row" colspan="3">運費</td>
                            <td>$0</td>
                        </tr>
                        <tr>
                            <td class="text-end" scope="row" colspan="3">總計</td>
                            <td>$33</td>
                        </tr>

                    `;

                    $('#result_checkoutlist').html(result);
                }
                resolve(); // 完成 AJAX 請求後解析 Promise
            },
            error: function(err) {
                reject(err); // 如果請求出錯，拒絕 Promise
            }
        });
    }).then(() => {
        console.log('sc_checkoutlist 載入完成');
    });
}
   
    // 再去逛逛導入商品頁面
    $(document).ready(function(){
        $('#GoShoppingbtn').click(function(){
            window.location.href = 'product_all.html';
        });
    });

    // 訂單明細小計更新
    // function sc_checkoutsubtotal(){
    //         $('#checkouttotal').html("$0");
    //         console.log('1.開始執行 sc_checkoutsubtotal');
    //         let total = 0; // 將 total 初始化在外面以累加所有項目的值

    //             $('li').each(function(index, elem) {
    //                 let qty = parseFloat($(this).find("span[name='num']:first").text());
    //                 let price = parseFloat($(this).find("span[name='productPrice']:first").text());
                    
    //                 if (!isNaN(qty) && !isNaN(price)) {
    //                     let subtotal = qty * price;
    //                     total += subtotal;
    //                 }

    //                 // 確保 elem.innerText 是數字並累加到 total
    //                 let value = parseInt(elem.innerText);
    //                 if (!isNaN(value)) {
    //                     total += value;
    //                 }
    //                 // console.log('2.執行計算 sc_subtotal');
    //             });

    //             $('#subtotal').html(total.toLocaleString());
    //             // console.log('3.計算完成並輸出 sc_subtotal');
            
    //     }


        $(document).ready(function() {
            function sc_checkoutsubtotal(){
            // 提取小計數值
            $('.subtotal-row td').each(function() {
                let subtotalText = $(this).text();
                let subtotalValue = parseFloat(subtotalText.replace(/[$,]/g, ''));
                console.log('Subtotal:', subtotalValue);

            })
            }})
    
            

            
        

        // 清空購物車按鈕 & 小計欄位也會消失
        // $(document).ready(function() {
        //     $(document).on('click', '.CleargoodsList', function() {
        //         localStorage.removeItem("goods");
        //         sc_golist();
        //         sc_SubtotalCard();
        //     });
        // });


    
    // 按鈕 + , 增加1個項目
    // $(document).on('click', '.btn-increment-sm', function(){
    //         var nweID = parseInt($(this).closest('li').attr('id'));
    //         var cartList = JSON.parse(localStorage.getItem("goods")) || [];
        
    //         var existingItem = cartList.find(item => item.id === nweID);
    //         if (existingItem) {
    //             existingItem.num++;
    //             parseInt($(this).prev().text(existingItem.num));    //更新數字
    //         }

    //     // 將資料存回 localStorage
    //         localStorage.setItem("goods", JSON.stringify(cartList));

    //         sc_subtotal()

    //     });
    
    // $(document).on('click', '.btn-decrement-sm', function(){
    //     var nweID = parseInt($(this).closest('li').attr('id'));
    //     var cartList = JSON.parse(localStorage.getItem("goods")) || [];
        
    //     var existingItem = cartList.find(item => item.id === nweID);
    //     if (existingItem) {
    //         if (existingItem.num > 0) {
    //             existingItem.num--;
    //             $(this).next().text(existingItem.num);  // 更新數字
    //         }
    
    //         // 檢查數量是否小於或等於 0
    //         if (existingItem.num <= 0) {
    //             var shouldDelete = window.confirm('數量小於 0，是否要刪除該商品？');
    //             if (shouldDelete) {
    //                 // 移除該項目
    //                 cartList = cartList.filter(item => item.id !== nweID);
    //                 $(this).closest('li').remove(); // 更新 UI
    //             } else {
    //                 // 恢復數量顯示
    //                 existingItem.num = 1;
    //                 $(this).next().text(existingItem.num);
    //             }
    //         }
    //     }
    
    //     // 將資料存回 localStorage
    //     localStorage.setItem("goods", JSON.stringify(cartList));

    //     sc_subtotal();
    // });
    


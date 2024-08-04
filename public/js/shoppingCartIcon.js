

function openNav() {
    document.getElementById("mySidenav").style.width = "360px";
    document.getElementById("mySidenav").style.padding = "140px 30px 75px";
    document.getElementById("backgroundOverlay").classList.add("backgroundOverlay");

    sc_msg();
    sc_subtotal();
    sc_SubtotalCard();
    
}

// 購物車導覽列 - 點選 X 關閉
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.padding = "0px 0px 0px";
    document.getElementById("backgroundOverlay").classList.remove("backgroundOverlay")
}

    $('#openNav').on('click', async function(){
        await sc_msg();
        sc_subtotal();
        sc_SubtotalCard();
    });

    // 判斷購物車清單小計是否顯示&提示訊息
    function sc_SubtotalCard(){
        var x = localStorage.getItem("goods");
        if( x === null || x === '[]' ){
            $('.SubtotalCard').css('display', 'none');
            $('#buyprompt_message').html("");
            $('#buyprompt_message').append('目前尚未添加任何商品...');
            
        }else{
            $('#buyprompt_message').html("");
            $('.SubtotalCard').css('display', 'flex');
        }
    }

    // 購物車清單載入
    function sc_msg() {
    $('#result_goodslist').html("");

    // let apiUrl = 'http://localhost/mfee51/root/backEnd/api/product/product.php';
    let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/product/product.php';
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

                    for (let i = 0; i < arr.length; i++) {
                        for (let j = 0; j < cookieArr.length; j++) {
                            if (arr[i].productID == cookieArr[j].id) {
                                arr[i].num = cookieArr[j].num;
                                newgoodsArr.push(arr[i]);
                            }
                        }
                    }

                    console.log(newgoodsArr);

                    let result = ` `;

                    for (let row of newgoodsArr) {
                        result += `
                        <li id="${row['productID']}">
                            <img class=" image-container" src="${row['productImg'][0]['productImg']}" alt="圖片描述">
                            <div class="texr1">${row['productName']}</div>
                            <span class="texr2">$ </span>
                            <span name="productPrice">${row['productPrice'].toLocaleString()}</span>
                            <div class="d-flex align-items-center">
                                <button class="btn-decrement-sm">-</button>
                                <span name="num" class="quantity-sm">${row['num']}</span>
                                <button class="btn-increment-sm">+</button>
                            </div>
                        </li>
                        <br />
                        `;
                    }

                    result += `
                        <div class="SubtotalCard">
                            <span class="text3">小計 $ <span id="subtotal"></span>  </span>
                            
                            <a href="checkout.html" class="Checkout">前往結帳</a>
                            <button class="CleargoodsList">清空購物車</button>
                        </div>
                    `;

                    $('#result_goodslist').html(result);
                }
                resolve(); // 完成 AJAX 請求後解析 Promise
            },
            error: function(err) {
                reject(err); // 如果請求出錯，拒絕 Promise
            }
        });
    }).then(() => {
        // console.log('sc_msg');
    });
}
   

    // 購物車小計更新
    function sc_subtotal(){
            $('#subtotal').html("");
            // console.log('1.開始執行 sc_subtotal');
            let total = 0; // 將 total 初始化在外面以累加所有項目的值

                $('li').each(function(index, elem) {
                    let qty = parseFloat($(this).find("span[name='num']:first").text());
                    let price = parseFloat($(this).find("span[name='productPrice']:first").text());
                    
                    if (!isNaN(qty) && !isNaN(price)) {
                        let subtotal = qty * price;
                        total += subtotal;
                    }

                    // 確保 elem.innerText 是數字並累加到 total
                    let value = parseInt(elem.innerText);
                    if (!isNaN(value)) {
                        total += value;
                    }
                    // console.log('2.執行計算 sc_subtotal');
                });

                $('#subtotal').html(total.toLocaleString());
                // console.log('3.計算完成並輸出 sc_subtotal');
            
        }

        // 清空購物車按鈕 & 小計欄位也會消失
        $(document).ready(function() {
            $(document).on('click', '.CleargoodsList', function() {
                localStorage.removeItem("goods");
                sc_msg();
                sc_SubtotalCard();
            });
        });


    
    // 按鈕 + , 增加1個項目
    $(document).on('click', '.btn-increment-sm', function(){
            var nweID = parseInt($(this).closest('li').attr('id'));
            var cartList = JSON.parse(localStorage.getItem("goods")) || [];
        
            var existingItem = cartList.find(item => item.id === nweID);
            if (existingItem) {
                existingItem.num++;
                parseInt($(this).prev().text(existingItem.num));    //更新數字
            }

        // 將資料存回 localStorage
            localStorage.setItem("goods", JSON.stringify(cartList));

            sc_subtotal()

        });
    
    $(document).on('click', '.btn-decrement-sm', function(){
        var nweID = parseInt($(this).closest('li').attr('id'));
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
                    $(this).closest('li').remove(); // 更新 UI
                } else {
                    // 恢復數量顯示
                    existingItem.num = 1;
                    $(this).next().text(existingItem.num);
                }
            }
        }
    
        // 將資料存回 localStorage
        localStorage.setItem("goods", JSON.stringify(cartList));

        sc_subtotal();
    });
    


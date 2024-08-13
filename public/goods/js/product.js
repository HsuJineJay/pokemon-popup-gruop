
    // 點選縮圖圖片替換大圖
    function myFunction(imgs) {
        var expandImg = document.getElementById("expandedImg"); // 取得展開後的影像
        expandImg.src = imgs.src;
        expandImg.parentElement.style.display = "block";
    }

    // 商品導入
    window.onload = function () {

    urlStr = location.href;
    url = new URL(urlStr);
    let productID = url.searchParams.get('id')? url.searchParams.get('id') : 1 ;     // 商品 ID, 預設ID=1
    // let apiUrl = 'http://localhost/mfee51/root/backEnd/api/product/product.php';
    let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/product/product.php'
    let Exist_apiUrl = apiUrl + '?productID=' + productID;

    return new Promise((resolve, reject) => {
        $.ajax({
            url: Exist_apiUrl,
            method: 'GET',
            success: function (dataStr) {
                data = JSON.parse(dataStr);
                console.log(data);
                result = ` `;

                for(row of data){
                    // 迴圈縮圖
                    var productImg = ''
                    for(picUrl of row['productImg']){
                        productImg += `
                            <img src="${picUrl['productImg']}"  onclick="myFunction(this);" />
                            `                            
                    }
                    // 判斷特殊標籤
                    var productTags = '';
                    if( row['storeOnly'] === 1 ){
                        productTags +=`
                        <span class="product_tag">會場限定</span>
                    `;
                    }
                    if( row['productMain'] === 1 ){
                        productTags +=`
                            <span class="product_tag">限量商品</span>
                        `;
                    }

                    // 印出商品頁面
                    result += `

                    <div class="col-md-1 column"> ${productImg}  </div>

                    
                    <div class="col-md-5 MainProduct">
                        <img id="expandedImg" src="${row['productImg'][0]['productImg']}">

                    </div>

                    <div class="col-md-4 ProductDescription">
                        ${productTags}
                        <div>
                            <h2>${row['productName']}</h2>
                            <p>${row['productDescribe']}</p>
                        </div>
                        <div>
                            <span class="Activity_tag">活動</span><p>【全站商品滿$1,500，免運費】</p><br>
                            <span class="Activity_tag">贈品</span><p>【全站滿$4,500 送限量貼紙】</p><br>
                        </div>
                        <div class="bg_card">
                            <p class="bg_cardtexth3">售價$${row['productPrice'].toLocaleString()}元</p>
                            <p style="color: #3F3A3A;">庫存 <span id="stock">${row['productInStock']}</span> 件</p>

                            <!-- 購物車按鈕 -->
                            <div class="row justify-content-around">
                                <button class="col-1 btn-decrement" id="btn-decrement">-</button>
                                <span name="num" class="col-2 quantity">1</span>
                                <button class="col-1 btn-increment">+</button>
                                <button class="col-6 btn-add-to-cart" id="${row['productID']}">加入購物車</button>
                            </div>

                        </div>
                    </div>
                
                    `;

                result +=` `;

                $('#result_product').html(result);
                console.log('輸出成功');

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

// 購物車按鈕----------------------------------------------------->

$(document).ready(function() {
        // 使用事件委托绑定點擊事件到動態+載的btn
        // -- 不低於數量 1
        $('#result_product').on('click', '.btn-decrement', function() {
            let stockElement = parseInt($('#stock').text());
            let quantity = parseInt($(this).next().text());
            (quantity>1)? quantity-- : console.log('oh! no 數量不得低於1');
            $('span[name="num"]').html(quantity);
        });
        // ++ 不超過庫存數
        $('#result_product').on('click', '.btn-increment', function() {
            let stockElement = parseInt($('#stock').text());
            let quantity = parseInt($(this).prev().text());
            (  stockElement > quantity  )? quantity++ : console.log('oh! no 庫存不夠') ;
            $('span[name="num"]').html(quantity);
        });
    })


// <---------------------添加購物車清單--------------------->
$(document).ready(function(){
$('#result_product').on('click', '.btn-add-to-cart', function() {
    // 點擊購物車按鈕，抓取產品 ID 及 數量
        var id =  parseInt(this.id);
        var num = parseInt($(this).siblings('span[name="num"]').text());
    
    // 從 localStorage 取得購物車清單
         var cartList = JSON.parse(localStorage.getItem("goods")) || [];

    // 判斷是否已經添加過該商品
        var existingItem = cartList.find(item => item.id === id);
        if (existingItem) {
            existingItem.num += num
        } else {
            cartList.push({ id: id, num: num });
        }
    
    // 將資料存回 localStorage
            localStorage.setItem("goods", JSON.stringify(cartList));

        });
    })
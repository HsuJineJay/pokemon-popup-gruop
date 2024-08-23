window.addEventListener('load',function(){
    let apiUrl = 'http://localhost:5432/checkUserAuthority'
    $.ajax({
        url: apiUrl,
        method: 'get',
        success: function (data) {
            // console.log(data);
            // console.log(typeof(data));
            let result = '';
            data.rows.forEach(element => {
                // console.log(element);
                if(element.pagename === 'overAll'){
                    result += '<div class="navTextDiv noto-sans-tc_r" id="navOverAll">總覽</div>'
                }else if(element.pagename === 'product'){
                    result += '<div class="navTextDiv noto-sans-tc_r" id="navProduct">商品管理</div>'
                }else if(element.pagename === "orderList"){
                    result += '<div class="navTextDiv noto-sans-tc_r" id="navOrder">交易紀錄管理</div>'
                }else if(element.pagename === "menuItem"){
                    result += '<div class="navTextDiv noto-sans-tc_r" id="navMenu">咖啡廳品項管理</div>'
                }else if(element.pagename === "cafeBooking"){
                    result += '<div class="navTextDiv noto-sans-tc_r" id="navCafeBooking">咖啡廳預定管理</div>'
                }else if(element.pagename === "storeBooking"){
                    result += '<div class="navTextDiv noto-sans-tc_r" id="navStoreBooking">快閃店預定管理</div>'
                }else if(element.pagename === "account"){
                    result += '<div class="navTextDiv noto-sans-tc_r" id="navAccount">帳號管理</div>'
                }
            });

            result += '<button id="logout">LOGOUT</button>';
            
            $('.navList').html(result)
            $('#navOverAll').on('click',function(){
                window.location.href = './overAll.html'
            })
            $('#navProduct').on('click',function(){
                window.location.href = './product.html'
            })
            $('#navOrder').on('click',function(){
                window.location.href = './orderList.html'
            })
            $('#navMenu').on('click',function(){
                window.location.href = './menuItem.html'
            })
            $('#navCafeBooking').on('click',function(){
                window.location.href = './cafeBooking.html'
            })
            $('#navStoreBooking').on('click',function(){
                window.location.href = './storeBooking.html'
            })
            $('#navAccount').on('click',function(){
                window.location.href = './account.html'
            })
            $('#logout').click(async function () {
                // console.log('Logout button clicked');
                // let apiUrl = 'http://localhost/pokemon-popup-gruop/public/backStage/login/logout.php';
                let apiUrlNodejs = 'http://localhost:5432/logout';
                
                try {
                    let response = await $.ajax({
                        // url: apiUrl,
                        url: apiUrlNodejs,
                        method: 'GET',
                        // dataType: 'json'
                    });
                    // console.log(response);
                    if (response === 'out') {
                        window.location.href = './login/login.html';
                    } else {
                        console.log('Unexpected response:', response);
                    }
                } catch (error) {
                    console.error('AJAX request failed:', error);
                }
                
            })
        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    })


    
})

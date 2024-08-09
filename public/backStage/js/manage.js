window.addEventListener('load',function(){
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
        let apiUrlNodejs = 'http://localhost:3000/logout';
        
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
})

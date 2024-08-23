window.onload = function () {

  //=================================================
  //餐點api
  //=================================================

  // >>>>>>>>>>撈資料<<<<<<<<<<<<<

  //一載入就顯示全部內容
  menuSwitch("?menuExist=1")


  //點擊來切換menu的類別
  $('.menu_category li').on('click', function() {
    // console.log(this);
    
    //再次點選已經active按鈕的話就顯示全部
    if ($(this).find('a').hasClass('active')) {
      // console.log('remove');
      
      //如果現在點選的li裡面的a有.active的話就移除.active
      $(this).find('a').removeClass('active');
      //顯示所有的菜單內容
      menuSwitch("?menuExist=1");

    } else { //切換個別類別的菜單內容

      //移除所有的.active
      $('.menu_category li a').removeClass('active')
      //對現在點選的a標籤添加.active
      $(this).find('a').addClass('active');
      // 針對不同id名稱加入apiUrl的切換菜單內容
      switch($(this).attr('id')) {
        case 'selectMeal':
          menuSwitch('?itemType=主餐&menuExist=1');
          break;
        case 'selectDrinks':
          menuSwitch('?itemType=飲品&menuExist=1');
          break;
        case 'selectDersert':
          menuSwitch('?itemType=甜點&menuExist=1');
          break;
      }
    
    }

  })



  //類別按鈕切換不同菜單內容
  // $('#selectMeal').on('click', () => { menuSwitch('?itemType=主餐')} )
  // $('#selectDrinks').on('click', () => { menuSwitch('?itemType=飲品') })
  // $('#selectDersert').on('click', () => { menuSwitch('?itemType=甜點') })

  function menuSwitch(menuName) {
    //這裡要帶入的參數名稱 都是資料庫的欄位名稱
    // let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/menuItem/menuItem.php?itemMain=1&menuExist=1'//以這個例子來說 以itemMain=1（主打商品）和menuExist=1（上架商品）為篩選條件 篩出資料
    let apiUrl = `https://pokemon-popup-gruop.onrender.com/api/menuItem${menuName}`//以這個例子來說 以itemMain=1（主打商品）和menuExist=1（上架商品）為篩選條件 篩出資料
    // console.log('apiUrl:::::::' , apiUrl);
    $.ajax({
      url: apiUrl,
      method: 'GET',
      success: function (dataStr) {
        // data = JSON.parse(dataStr);
        console.log(dataStr);
        result = ""
        for (row of dataStr) {
          console.log(row);
          result += `
                    <div class="menu_card d-flex flex-column justify-content-center align-items-center gap-3">
                      <figure><img src="${row.itemImg}" ></figure>
                      <div class="menu_card_detail d-flex flex-fill flex-column justify-content-center align-items-center">
                        <h4 class="font-chin">${row.itemName}</h4>
                        <h5 class="font-chin">${row.itemPrice}元</h5>
                        <p class="font-chin m-0">
                            ${row.itemDescribe}
                        </p>
                      </div>
                    </div>
        `;
        }

        $('#menuContainer').html(result)

      }
    }).fail(function (z) {
      console.log('fail:', z.innerText);
    })


  }



}
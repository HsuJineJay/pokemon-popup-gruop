
let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/orderList/orderList.php'
let col = ['orderID','transactionID','productName','productQ','orderAmount','buyerName','buyerEmail','buyerTel','buyerAddr','orderDate','payment','receiptType','companyTitle','taxIDNumber','orderStatus','transportNote']
let colTW = ['資料ID','訂單編號','商品名稱','商品數量','單品總價','買家姓名','信箱','電話','地址','訂單日期','付款方式','發票類別','公司名稱','統一編號','訂單狀態','物流備註']
let colExist = 'orderExist'
function setUp(){
    for(i in col){
        $('#condition').append(`
            <option class="selectOption" value=${col[i]}>${colTW[i]}</option>
        `)
    }
    for(item of colTW){
        $('#existTHead,#noExistTHead').append(`
        <td>
            <span >${item}</span>
        </td>
        `)
    }
    $('#existTHead,#noExistTHead').append(`
    <td>
        <span>編輯</span>
    </td>
    `)
}
function getDataCreateTable(condition, place) {
    let apiUrl2 = apiUrl + condition
    $.ajax({
        url: apiUrl2,
        method: 'GET',
        success: function (dataStr) {
            let data = JSON.parse(dataStr);
            // console.log(data);
            result = '';
            for (item of data) {
            
            result += `<tr>`
                for(key of col){
                    //change here
                    if(key==='transportNote'){
                        result += `
                        <td>
                        ${item[key]===null?'無':item[key]}
                        </td>
                        `
                    
                    }else if(key==='orderStatus'){
                        result += `
                        <td>
                        ${item[key]===0?'訂單已接收':item[key]===1?'待出貨':'已出貨'}
                        </td>
                        `
                    }else{
                        result += `
                        <td>${item[key]}</td>
                        `
                    }
                    //////
                    
                }
                if($('#one').prop('checked')){
                    result += `
                        <td>
                            <button title='編輯資料' class="edit tableBn" onclick='edit(this)'></button>
                            <button title='改成無效資料' class='remove tableBn' onclick='removeBN(this)'></button>
                        </td>
                    `;

                }else{
                    result += `
                        <td>
                        <button title='編輯資料' class='edit tableBn' onclick='edit(this)'></button>
                            <button title='改成有效資料' class='on tableBn' onclick='on(this)'></button>
                        </td>
                    `;
                    
                }
            }

            result += '</tr> <tr><td></td><tr><tr><td></td><tr>'


            $(place).html(result)



        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    })
}
function getData(condition) {
    let apiUrl2 = apiUrl + condition
    return $.ajax({
        url: apiUrl2,
        method: 'GET',
        success: function (dataStr) {
            // let data = JSON.parse( dataStr);
            // console.log(data);
        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    });
}
function postData() {
    // console.log('post');
    let orderExistCreate = $('#orderExistCreate').val()

    let orderProductIDCreate = $('#orderProductIDCreate').val()
    $('.orderProductIDCreate').each(function(index, elem ){
        // console.log(index,' ',elem);
        orderProductIDCreate += ','+elem.value
    })
    // console.log(orderProductIDCreate);
    let productQCreate = $('#productQCreate').val()
    $('.productQCreate').each(function(index, elem ){
        // console.log(index,' ',elem);
        productQCreate += ','+elem.value
    })
    // console.log(productQCreate);

    let buyerNameCreate = $('#buyerNameCreate').val()
    let buyerEmailCreate = $('#buyerEmailCreate').val()
    let buyerTelCreate = $('#buyerTelCreate').val()
    let buyerAddrCreate = $('#buyerAddrCreate').val()
    let transportNoteCreate = $('#transportNoteCreate').val()
    let orderDate_dateCreate = $('#orderDate_dateCreate').val()
    let orderDate_timeCreate = $('#orderDate_timeCreate').val()
    let orderDate = orderDate_dateCreate + ' ' + orderDate_timeCreate;
    let paymentCreate = $('#paymentCreate').prop('checked') ? '貨到付款' : '線上刷卡';
    let receiptTypeCreate = $('#receiptTypeCreate').val()
    let companyTitleCreate = $('#companyTitleCreate').val()
    let taxIDNumberCreate = $('#taxIDNumberCreate').val()
    let orderStatusCreate = $('#orderStatusCreate').val()


    $.ajax({
        url: apiUrl,
        method: 'Post',
        data: {
            "orderExist": orderExistCreate,
            "orderProductID": orderProductIDCreate,
            "productQ": productQCreate,
            "buyerName": buyerNameCreate,
            "buyerEmail": buyerEmailCreate,
            "buyerTel": buyerTelCreate,
            "buyerAddr": buyerAddrCreate,
            "transportNote": transportNoteCreate,
            "orderDate": orderDate,
            "payment": paymentCreate,
            "receiptType": receiptTypeCreate,
            "companyTitle": companyTitleCreate,
            "taxIDNumber": taxIDNumberCreate,
            "orderStatus": orderStatusCreate
        },
        success: function (dataStr) {
            console.log(dataStr);
            switchEditUIDisplay('none')
            conditionReload()
            
        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    })

}
function putData() {
    // console.log('put');
    let orderIDEdit = $('.editUIID').val()
    let orderExistEdit = $('#orderExistEdit').val()
    let orderProductIDEdit = $('#orderProductIDEdit').val()
    let productQEdit = $('#productQEdit').val()
    let buyerNameEdit = $('#buyerNameEdit').val()
    let buyerEmailEdit = $('#buyerEmailEdit').val()
    let buyerTelEdit = $('#buyerTelEdit').val()
    let buyerAddrEdit = $('#buyerAddrEdit').val()
    let transportNoteEdit = $('#transportNoteEdit').val()
    let orderDate_dateEdit = $('#orderDate_dateEdit').val()
    let orderDate_timeEdit = $('#orderDate_timeEdit').val()
    let orderDate = orderDate_dateEdit + ' ' + orderDate_timeEdit;
    let paymentEdit = $('#paymentEdit').prop('checked') ? '貨到付款' : '線上刷卡';
    let receiptTypeEdit = $('#receiptTypeEdit').val()
    let companyTitleEdit = $('#companyTitleEdit').val()
    let taxIDNumberEdit = $('#taxIDNumberEdit').val()
    let orderStatusEdit = $('#orderStatusEdit').val()


    $.ajax({
        url: apiUrl,
        method: 'put',
        data: JSON.stringify({
            "orderID": orderIDEdit,
            "orderExist": orderExistEdit,
            "orderProductID": orderProductIDEdit,
            "productQ": productQEdit,
            "buyerName": buyerNameEdit,
            "buyerEmail": buyerEmailEdit,
            "buyerTel": buyerTelEdit,
            "buyerAddr": buyerAddrEdit,
            "transportNote": transportNoteEdit,
            "orderDate": orderDate,
            "payment": paymentEdit,
            "receiptType": receiptTypeEdit,
            "companyTitle": companyTitleEdit,
            "taxIDNumber": taxIDNumberEdit,
            "orderStatus": orderStatusEdit
        }),
        success: function (dataStr) {
            console.log(dataStr);
            switchEditUIDisplay('none')
            conditionReload()

        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    })


}
function patchData(exist){
    // console.log('patch');
    let orderID = exist==1? $('.onUIID').val(): $('.removeUIID').val();
    // console.log(orderID);

    $.ajax({
        url: apiUrl,
        method: 'Patch',
        contentType : 'text/plain',
        data: JSON.stringify({
            "orderID": orderID,
            "orderExist": exist,
        }),
        success: function (dataStr) {
            // console.log(dataStr);
            switchEditUIDisplay('none')
            conditionReload()

        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    })
}
function deleteData(){
    // console.log('delete');
    let orderID = $('.deleteUIID').val();
    // console.log(orderID);

    $.ajax({
        url: apiUrl,
        method: 'Delete',
        contentType : 'text/plain',
        data: JSON.stringify({
            "orderID": orderID
        }),
        success: function (dataStr) {
            console.log(dataStr);
            switchEditUIDisplay('none')
            conditionReload()

        }
    }).fail(function (res) {
        console.log('fail:', res.innerText);
    })
}


function setCondition() {
    let exist = $('#one').prop('checked')? '1':'0';
    let condition;
    // let orderStatus = $('#conditionInput').val();
    // let list = [];
    // let rule0 = /.*[已接收訂單].*/
    // let rule1 = /.*[待出貨].*/
    // let rule2 = /.*[已出貨].*/
    if ($('#condition').val() == 'orderStatus') {
        // if ($('#conditionInput').val() == '已接收訂單') {
        //     condition = '?orderExist=' + exist + '&' + $('#condition').val() + '=' + '0'
        // } else if ($('#conditionInput').val() == '待出貨') {
        //     condition = '?orderExist=' + exist + '&' + $('#condition').val() + '=' + '1'
        // } else if ($('#conditionInput').val() == '已出貨') {
        //     condition = '?orderExist=' + exist + '&' + $('#condition').val() + '=' + '2'
        // }
        // if(orderStatus.search(rule0)!= -1){
        //     list.push('0')
        //     // console.log(0);
        // }
        // if(orderStatus.search(rule1)!= -1){
        //     list.push('1')
        //     // console.log(1);
        // }
        // if(orderStatus.search(rule2)!= -1){
        //     list.push('2')
        //     // console.log(2);
        // }
        // condition = '?orderExist=' + exist 
        // for(num of list){
        //     condition += '&' + $('#condition').val() + '=' + num
        // }
        condition = '?orderExist=' + exist + '&' + $('#condition').val() + '=' + $('#conditionSelect3').val()


    } else if($('#condition').val() == 'orderDate') {
        condition = '?orderExist=' + exist + '&' + $('#condition').val() + '=' + $('#conditionSelect1').val() + ' ' +$('#conditionSelect2').val()
    } else {
        condition = '?orderExist=' + exist + '&' + $('#condition').val() + '=' + $('#conditionInput').val()
    }
    return condition;
}
function conditionReload(){
    if ($('#one').prop('checked')) {
        let condition = setCondition()
        // console.log(condition);
        getDataCreateTable(condition, '#existTBody')
    } else if ($('#two').prop('checked')) {
        let condition = setCondition()
        // console.log(condition);
        getDataCreateTable(condition, '#noExistTBody')
    }
}
function reload(){
    if ($('#one').prop('checked')) {
        getDataCreateTable('?orderExist=1', '#existTBody')
    } else if ($('#two').prop('checked')) {
        getDataCreateTable('?orderExist=0', '#noExistTBody')
    }
}
function switchEditUIDisplay(display, elem) {
    $('#editContainer').css('display', display)
    // $('#editBlack').css('display', display)
    $('#editBlack').fadeToggle()
    if (elem !== undefined) {
        // console.log(elem);
        $(elem).css('display', display)
    } else {
        // console.log(elem);
        $('#createUI').css('display', display)
        $('#editUI').css('display', display)
        $('#removeUI').css('display', display)
        $('#deleteUI').css('display', display)
        $('#onUI').css('display', display)

    }
}








function add() {
    // console.log('add');
    switchEditUIDisplay('block', '#createUI')

}
async function edit(elem) {
    switchEditUIDisplay('block', '#editUI')
    let id = $(elem).parent().parent().find('td:nth-of-type(1)')[0].innerText;
    // $('#editUIIDEdit').val(id)


    let dataStr = await  getData(`?orderID=${id}`)
    let dataJson = JSON.parse( dataStr)
    let data = dataJson[0]
    // console.log(data);
    $('.editUIID').val(data.orderID)
    $('#orderExistEdit').val(data.orderExist)
    $('#orderProductIDEdit').val(data.orderProductID)
    $('#productQEdit').val(data.productQ)
    $('#buyerNameEdit').val(data.buyerName)
    $('#buyerEmailEdit').val(data.buyerEmail)
    $('#buyerTelEdit').val(data.buyerTel)
    $('#buyerAddrEdit').val(data.buyerAddr)
    $('#transportNoteEdit').val(data.transportNote)

    let orderDate_date = data.orderDate.split(' ')[0]
    let orderDate_time = data.orderDate.split(' ')[1]
    $('#orderDate_dateEdit').val(orderDate_date)
    $('#orderDate_timeEdit').val(orderDate_time)
    
    $('#paymentEdit').prop('checked',data.payment=='貨到付款'?true:false);
    $('#receiptTypeEdit').val(data.receiptType)
    $('#companyTitleEdit').val(data.companyTitle)
    $('#taxIDNumberEdit').val(data.taxIDNumber)
    $('#orderStatusEdit').val(data.orderStatus)
}
function on(elem){
    switchEditUIDisplay('block', '#onUI')
    let id = $(elem).parent().parent().find('td:nth-of-type(1)')[0].innerText;
    // console.log(id);
    $('.onUIID').val(id)
}
function removeBN(elem) {
    switchEditUIDisplay('block', '#removeUI')
    let id = $(elem).parent().parent().find('td:nth-of-type(1)')[0].innerText;
    // console.log(id);
    $('.removeUIID').val(id)
}
function deleteBN(elem) {
    switchEditUIDisplay('block', '#deleteUI')
    let id = $(elem).parent().parent().find('td:nth-of-type(1)')[0].innerText;
    // console.log(id);
    $('.deleteUIID').val(id)
}

function moreDiv(place){
    $(place).append(`
    <div class="orderProductCreateDiv divMore">
        <div class="UILittleDiv row">
            <div class="UISpan col-3">產品ID</div>
            <div class="col-9">
                <input class="UIInput orderProductIDCreate TESTorderProductID" type="text"  >
            </div>
        </div>
        <div class="UILittleDiv row">
            <div class="UISpan col-3">產品數量</div>
            <div class="col-9">
                <input class="UIInput productQCreate TESTproductQ" type="text" >
            </div>
        </div>
        <button class="plusProduct plusButtonMore" onclick="moreDiv('#orderProductCreateBigDiv')"></button>
        <button class="minusButtonMore" onclick="lessDiv(this)"></button>
    </div>
    `)
}
function lessDiv(elem){
    $(elem).parent().detach()
}



function testCreatValueSet() {
    $('.TESTorderExist').val(0)
    $('.TESTorderProductID').val(7)
    $('.TESTproductQ').val(10)
    $('.TESTbuyerName').val('拉拉')
    $('.TESTbuyerEmail').val('lala@gmail')
    $('.TESTbuyerTel').val('0911123123')
    $('.TESTbuyerAddr').val('台中市')
    $('.TESTtransportNote').val('玻璃物品')
    $('.TESTorderDate_date').val('2024-10-10')
    $('.TESTorderDate_time').val('12:00:00')
    $('.TESTpayment').prop('checked', true)
    $('.TESTreceiptType').val('二聯式')
    $('.TESTcompanyTitle').val('某某公司')
    $('.TESTtaxIDNumber').val('85917148')
    $('.TESTorderStatus').val('2')


}


window.onload = function () {
    setUp()
    getDataCreateTable('?orderExist=1','#existTBody');

    $('#editBlack,.UICancelBN,#deleteUICancelBn,#removeUICancelBn,#onUICancelBn').click(function () {
        switchEditUIDisplay('none')
    })



    testCreatValueSet()

    $('#one').on('click', function () {
        conditionReload()
    })
    $('#two').on('click', function () {
        conditionReload()
    })

    $('#condition').on('change', function () {
        if ($('#condition').val() == 'orderDate'){
            $('#conditionInput').css('display','none')
            $('#conditionSelect1').fadeIn()
            $('#conditionSelect2').fadeIn()
            $('#conditionSelect3').css('display','none')

            $('#conditionSelect').val('')
        }else if($('#condition').val() == 'orderStatus'){
            $('#conditionInput').css('display','none')
            $('#conditionSelect1').css('display','none')
            $('#conditionSelect2').css('display','none')
            $('#conditionSelect3').fadeIn()

            $('#conditionSelect').val('')
        }else{
            $('#conditionInput').fadeIn()
            $('#conditionSelect1').css('display','none')
            $('#conditionSelect2').css('display','none')
            $('#conditionSelect3').css('display','none')

            $('#conditionSelect').val('')
        }

        if ($('#conditionInput').val() != '') {
            // console.log(condition);
            conditionReload()
        }else{
            reload()
        }
    })
    $('#conditionInput').on('input', function () {
        // console.log('change');
        if ($('#conditionInput').val() != '') {
            // console.log(condition);
            conditionReload()
        } else {
            reload()
        }
    })
    $('#conditionSelect1').on('change', function () {
        if ($('#conditionSelect').val() != '') {
            conditionReload()
        } else {
            reload()
        }
    })
    $('#conditionSelect2').on('change', function () {
        if ($('#conditionSelect').val() != '') {
            conditionReload()
        } else {
            reload()
        }
    })
    $('#conditionSelect3').on('change', function () {
        if ($('#conditionSelect').val() != '') {
            conditionReload()
        } else {
            reload()
        }
    })

    $('#createUISubmit').click(function () {
        postData()
    })
    $('#editUISubmit').click(function () {
        putData()
    })
    $('#removeUISubmit').click(function () {
        patchData(0)
    })
    $('#onUISubmit').click(function () {
        patchData(1)
    })
    // $('#deleteUISubmit').click(function () {
    //     deleteData()
    // })

    $('.plusProduct').click(function(){
        moreDiv('#orderProductCreateBigDiv');
    })


}

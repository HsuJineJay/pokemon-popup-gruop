//change here
let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/storeBooking/storeBooking.php'
let col = ['storeBookingID','bookingTimePeriod','bookingDate','bookingNumber','bookingName','bookingEmail','bookingTel']
let colTW = ['預定編號','預定時段','下訂日期','預定人數','預約姓名','信箱','電話']
let colExist = 'storeBookingExist'
function setUp(){
    for(i in col){
        if(col[i] === 'bookingTimePeriod'){
            $('#condition').append(`
            <option class="selectOption" value=${col[i]} selected>${colTW[i]}</option>
            `)
        }else{
            $('#condition').append(`
            <option class="selectOption" value=${col[i]}>${colTW[i]}</option>
            `)
        }

    }

    const d = new Date();
    let year = d.getFullYear()
    let month =  d.getMonth() + 1 
    let date = d.getDate()

    let todayStr = year + '-' + (month<10?'0'+month:month) + '-' + (date<10?'0'+date:date);
    // console.log(todayStr);
    $('#conditionSelect1').val(todayStr) ; 


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
/////

function getDataCreateTable(condition, place) {
    let apiUrl2 = apiUrl + condition
    $.ajax({
        url: apiUrl2,
        method: 'GET',
        success: function (dataStr) {
            let data = JSON.parse(dataStr);
            // console.log(data);
            let result = '';
            for (item of data) {

                result += `<tr>`
                for(key of col){
                    //change here
      
                        result += `
                        <td>${item[key]}</td>
                        `
                    
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
    let bookingExistCreate = $('#bookingExistCreate').val()
    
    let bookingTimePeriod_DateCreate = $('#bookingTimePeriod_DateCreate').val()
    let bookingTimePeriod_TimeCreate = $('#bookingTimePeriod_TimeCreate').val()
    let bookingTimePeriodCreate = bookingTimePeriod_DateCreate + ' ' + bookingTimePeriod_TimeCreate
    let bookingNumberCreate = $('#bookingNumberCreate').val()
    let bookingNameCreate = $('#bookingNameCreate').val()
    let bookingEmailCreate = $('#bookingEmailCreate').val()
    let bookingTelCreate = $('#bookingTelCreate').val()




    $.ajax({
        url: apiUrl,
        method: 'Post',
        data: {
            "storeBookingExist": bookingExistCreate,

            "bookingTimePeriod": bookingTimePeriodCreate,
            "bookingNumber": bookingNumberCreate,
            "bookingName": bookingNameCreate,
            "bookingEmail": bookingEmailCreate,
            "bookingTel": bookingTelCreate,
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
    let storeBookingIDEdit = $('.editUIID').val()
    let bookingExistEdit = $('#bookingExistEdit').val()
    let bookingDate_DateEdit = $('#bookingDate_DateEdit').val()
    let bookingDate_TimeEdit = $('#bookingDate_TimeEdit').val()
    let bookingDateEdit = bookingDate_DateEdit + ' ' + bookingDate_TimeEdit
    let bookingTimePeriod_DateEdit = $('#bookingTimePeriod_DateEdit').val()
    let bookingTimePeriod_TimeEdit = $('#bookingTimePeriod_TimeEdit').val()
    let bookingTimePeriodEdit = bookingTimePeriod_DateEdit + ' ' + bookingTimePeriod_TimeEdit
    let bookingNumberEdit = $('#bookingNumberEdit').val()
    let bookingNameEdit = $('#bookingNameEdit').val()
    let bookingEmailEdit = $('#bookingEmailEdit').val()
    let bookingTelEdit = $('#bookingTelEdit').val()




    $.ajax({
        url: apiUrl,
        method: 'put',
        data: JSON.stringify({
            "storeBookingID": storeBookingIDEdit,
            "storeBookingExist": bookingExistEdit,
            "bookingDate": bookingDateEdit,
            "bookingTimePeriod": bookingTimePeriodEdit,
            "bookingNumber": bookingNumberEdit,
            "bookingName": bookingNameEdit,
            "bookingEmail": bookingEmailEdit,
            "bookingTel": bookingTelEdit,
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
    let storeBookingID = exist==1? $('.onUIID').val(): $('.removeUIID').val();
    // console.log(storeBookingID);

    $.ajax({
        url: apiUrl,
        method: 'Patch',
        contentType : 'text/plain',
        data: JSON.stringify({
            "storeBookingID": storeBookingID,
            "storeBookingExist": exist,
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
    let storeBookingID = $('.deleteUIID').val();
    // console.log(storeBookingID);

    $.ajax({
        url: apiUrl,
        method: 'Delete',
        contentType : 'text/plain',
        data: JSON.stringify({
            "storeBookingID": storeBookingID
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
    //change here
    if ($('#condition').val() == 'bookingDate') {
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionSelect1').val()+' '+ $('#conditionSelect2').val()
    } else if($('#condition').val() == 'bookingTimePeriod'){
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionSelect1').val()+' '+ $('#conditionSelect3').val()
    } else {
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionInput').val()
    }
    // console.log(condition);
    /////
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
        getDataCreateTable(`?${colExist}=1`, '#existTBody')
    } else if ($('#two').prop('checked')) {
        getDataCreateTable(`?${colExist}=0`, '#noExistTBody')
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


    let dataStr = await  getData(`?storeBookingID=${id}`)
    let dataJson = JSON.parse( dataStr)
    let data = dataJson[0]
    // console.log(data);
    $('.editUIID').val(data.storeBookingID)
    $('#bookingExistEdit').val(data.storeBookingExist)
    let bookingDate_DateEdit = data.bookingDate.split(' ')[0]
    let bookingDate_TimeEdit = data.bookingDate.split(' ')[1]
    $('#bookingDate_DateEdit').val(bookingDate_DateEdit)
    $('#bookingDate_TimeEdit').val(bookingDate_TimeEdit)
    let bookingTimePeriod_DateEdit = data.bookingTimePeriod.split(' ')[0]
    let bookingTimePeriod_TimeEdit = data.bookingTimePeriod.split(' ')[1]
    $('#bookingTimePeriod_DateEdit').val(bookingTimePeriod_DateEdit)
    $('#bookingTimePeriod_TimeEdit').val(bookingTimePeriod_TimeEdit)
    $('#bookingNumberEdit').val(data.bookingNumber)
    $('#bookingNameEdit').val(data.bookingName)
    $('#bookingEmailEdit').val(data.bookingEmail)
    $('#bookingTelEdit').val(data.bookingTel)

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



function testCreatValueSet() {
    $('.TESTbookingExist').val(1)
    $('.TESTbookingTimePeriod_Date').val('2024-07-30')
    $('.TESTbookingTimePeriod_Time').val('10:00:00')
    $('.TESTbookingNumber').val(4)
    $('.TESTbookingName').val('熊')
    $('.TESTbookingEmail').val('bear@gmail.com')
    $('.TESTbookingTel').val('0987654321')



}


window.onload = function () {
    
    setUp()

    // getDataCreateTable(`?${colExist}=1`,'#existTBody');
    conditionReload()

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
        //change here
        if ($('#condition').val() == 'bookingDate'){
            $('#conditionInput').css('display','none')
            $('#conditionSelect1').fadeIn()
            $('#conditionSelect2').fadeIn()
            $('#conditionSelect3').css('display','none')
            
            $('#conditionSelect1').val('')
            $('#conditionSelect2').val('')
            $('#conditionSelect3').val('')
        }else if($('#condition').val() == 'bookingTimePeriod'){
            $('#conditionInput').css('display','none')
            $('#conditionSelect1').fadeIn()
            $('#conditionSelect2').css('display','none')
            $('#conditionSelect3').fadeIn()
            
            $('#conditionSelect1').val('')
            $('#conditionSelect2').val('')
            $('#conditionSelect3').val('')
        }else{
            // $('#conditionInput').css('display','block')
            $('#conditionInput').fadeIn()
            $('#conditionSelect1').css('display','none')
            $('#conditionSelect2').css('display','none')
            $('#conditionSelect3').css('display','none')

            $('#conditionSelect1').val('')
            $('#conditionSelect2').val('')
            $('#conditionSelect3').val('')
        }
        /////

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
    //change here
    $('#conditionSelect1').on('change', function () {
        if ($('#conditionSelect1').val() != '') {
            conditionReload()
        } else {
            reload()
        }
    })
    $('#conditionSelect2').on('change', function () {
        if ($('#conditionSelect2').val() != '') {
            conditionReload()
        } else {
            reload()
        }
    })
    $('#conditionSelect3').on('change', function () {
        if ($('#conditionSelect3').val() != '') {
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


}

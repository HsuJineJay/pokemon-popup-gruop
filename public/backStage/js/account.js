

//change here
let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/account/account.php'
let col = ['userID','userName','userAccount','userPassword','userTitle','userEmail']
let colTW = ['管理者編號','姓名','帳號','密碼','職稱','信箱']
let colExist = 'userExist'
function setUp(){
    for(i in col){
        if(col[i] != 'userPassword'){
            $('#condition').append(`
                <option class="selectOption" value=${col[i]}>${colTW[i]}</option>
            `)
        }
    }
    for(item of colTW){
        if(item != '密碼'){
            $('#existTHead,#noExistTHead').append(`
            <td>
                <span >${item}</span>
            </td>
            `)
        }
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
                    if(key != 'userPassword'){
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
async function postData() {
    // console.log('post');
    let userExistCreate = $('#userExistCreate').val()
    
    let userNameCreate = $('#userNameCreate').val()
    let userAccountCreate = $('#userAccountCreate').val()
    let userPasswordCreate = $('#userPasswordCreate').val()
    let userTitleCreate = $('#userTitleCreate').val()
    let userEmailCreate = $('#userEmailCreate').val()

    
    let dataStrOld = await  getData(`?userAccount=${userAccountCreate}`)
    let dataJsonOld = JSON.parse(dataStrOld)
    let dataOld = dataJsonOld[0]
    console.log(dataOld);

    if(dataOld !== undefined){
        if(dataOld.userAccount === userAccountCreate){
            // console.log('重複');
            $('#accountRepeatDivCreate').html(`<div id="accountRepeat">帳號重複</div>`)
        }else{
            $.ajax({
                url: apiUrl,
                method: 'Post',
                data: {
                    "userExist": userExistCreate,
        
                    "userName": userNameCreate,
                    "userAccount": userAccountCreate,
                    "userPassword": userPasswordCreate,
                    "userTitle": userTitleCreate,
                    "userEmail": userEmailCreate,
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
    }else{  
        $.ajax({
            url: apiUrl,
            method: 'Post',
            data: {
                "userExist": userExistCreate,
    
                "userName": userNameCreate,
                "userAccount": userAccountCreate,
                "userPassword": userPasswordCreate,
                "userTitle": userTitleCreate,
                "userEmail": userEmailCreate,
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



}
async function putData() {
    // console.log('put');
    let userIDEdit = $('.editUIID').val()
    let userExistEdit = $('#userExistEdit').val()
    let userNameEdit = $('#userNameEdit').val()
    let userAccountEdit = $('#userAccountEdit').val()
    let userPasswordEdit = $('#userPasswordEdit').val()
    let userTitleEdit = $('#userTitleEdit').val()
    let userEmailEdit = $('#userEmailEdit').val()

    let userOriginPassword = $('.editUIPW').val()

    let dataStrOld = await  getData(`?userAccount=${userAccountEdit}`)
    let dataJsonOld = JSON.parse(dataStrOld)
    let dataOld = dataJsonOld[0]
    console.log(dataOld);
    // console.log('sql:',dataOld.userAccount,'/edit:',userAccountEdit);

    if(dataOld !== undefined){
        if(dataOld.userAccount === userAccountEdit & dataOld.userID !==userIDEdit ){
            console.log('重複');
            $('#accountRepeatDivEdit').html(`<div id="accountRepeat">帳號重複</div>`)
        }else{
            console.log('不重複');
            $.ajax({
                url: apiUrl,
                method: 'put',
                data: JSON.stringify({
                    "userID": userIDEdit,
                    "userExist": userExistEdit,
                    "userName": userNameEdit,
                    "userAccount": userAccountEdit,
                    "userPassword": userPasswordEdit,
                    "userOriginPassword": userOriginPassword,
                    "userTitle": userTitleEdit,
                    "userEmail": userEmailEdit,
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
    }else{
        $.ajax({
            url: apiUrl,
            method: 'put',
            data: JSON.stringify({
                "userID": userIDEdit,
                "userExist": userExistEdit,
                "userName": userNameEdit,
                "userAccount": userAccountEdit,
                "userPassword": userPasswordEdit,
                "userOriginPassword": userOriginPassword,
                "userTitle": userTitleEdit,
                "userEmail": userEmailEdit,
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




}
function patchData(exist){
    // console.log('patch');
    let userID = exist==1? $('.onUIID').val(): $('.removeUIID').val();
    // console.log(userID);

    $.ajax({
        url: apiUrl,
        method: 'Patch',
        contentType : 'text/plain',
        data: JSON.stringify({
            "userID": userID,
            "userExist": exist,
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
    let userID = $('.deleteUIID').val();
    // console.log(userID);

    $.ajax({
        url: apiUrl,
        method: 'Delete',
        contentType : 'text/plain',
        data: JSON.stringify({
            "userID": userID
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
    condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionInput').val()
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


    let dataStr = await  getData(`?userID=${id}`)
    let dataJson = JSON.parse( dataStr)
    let data = dataJson[0]
    // console.log(data);
    $('.editUIID').val(data.userID)
    $('.editUIPW').val(data.userPassword)
    $('#userExistEdit').val(data.userExist)
    $('#userName_DateEdit').val(userNameEdit)
    $('#userAccountEdit').val(data.userAccount)
    $('#userPasswordEdit').val(data.userPassword)
    $('#userTitleEdit').val(data.userTitle)
    $('#userEmailEdit').val(data.userEmail)

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
    $('.TESTbuserExist').val(1)
    $('.TESTuserName').val('John')
    $('.TESTuserAccount').val('JohnWick')
    $('.TESTuserPassword').val('j12345')
    $('.TESTuserTitle').val('Assassin')
    $('.TESTuserEmail').val('john@gmail.com')

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
        }else if($('#condition').val() == 'userName'){
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

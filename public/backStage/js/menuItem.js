//change here
let apiUrl = 'http://localhost/pokemon-popup-gruop/backEnd/api/menuItem/menuItem.php'
let col = ['itemID', 'itemImg', 'itemName', 'itemType', 'itemMain', 'itemPrice', 'itemDescribe']
let colTW = ['餐點編號', '餐點圖片', '餐點名稱', '餐點類型', '首頁呈現品項', '餐點價格', '餐點描述']
let colExist = 'menuExist'
/////
function setUp() {
    for (i in col) {
        if (col[i] != 'itemImg') {
            $('#condition').append(`
                <option class="selectOption" value=${col[i]}>${colTW[i]}</option>
            `)
        }
    }
    for (item of colTW) {
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
            let result = '';
            for (item of data) {

                result += `<tr>`
                for (key of col) {
                    //change here
                    if (key == 'itemMain') {
                        result += `
                        <td>${item[key] == 1 ? 'V' : 'X'}</td>
                        `
                    } else if (key == 'itemImg') {
                        result += `
                        <td><img width='100px' src=${item[key]}></td>
                        `
                    } else {
                        result += `
                        <td>${item[key]}</td>
                        `
                    }
                    //////

                }



                if ($('#one').prop('checked')) {
                    result += `
                        <td>
                            <button title='編輯資料' class="edit tableBn" onclick='edit(this)'></button>
                            <button title='改成無效資料' class='remove tableBn' onclick='removeBN(this)'></button>
                        </td>
                    `;

                } else {
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
    let menuExistCreate = $('#menuExistCreate').val()
    let itemNameCreate = $('#itemNameCreate').val()
    let itemTypeCreate = $('#itemTypeCreate').val()
    let itemDescribeCreate = $('#itemDescribeCreate').val()
    let itemMainCreate = $('#itemMainCreate').val()
    let itemPriceCreate = $('#itemPriceCreate').val()
    let itemImgCreate = $('#itemImgCreate').val()




    $.ajax({
        url: apiUrl,
        method: 'Post',
        data: {
            "menuExist": menuExistCreate,
            "itemName": itemNameCreate,
            "itemType": itemTypeCreate,
            "itemDescribe": itemDescribeCreate,
            "itemMain": itemMainCreate,
            "itemPrice": itemPriceCreate,
            "itemImg": itemImgCreate,
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
    let itemIDEdit = $('.editUIID').val()
    let menuExistEdit = $('#menuExistEdit').val()
    let itemNameEdit = $('#itemNameEdit').val()
    let itemTypeEdit = $('#itemTypeEdit').val()
    let itemDescribeEdit = $('#itemDescribeEdit').val()
    let itemMainEdit = $('#itemMainEdit').val()
    let itemPriceEdit = $('#itemPriceEdit').val()
    let itemImgEdit = $('#itemImgEdit').val()



    $.ajax({
        url: apiUrl,
        method: 'put',
        data: JSON.stringify({
            "itemID": itemIDEdit,
            "menuExist": menuExistEdit,
            "itemName": itemNameEdit,
            "itemType": itemTypeEdit,
            "itemDescribe": itemDescribeEdit,
            "itemMain": itemMainEdit,
            "itemPrice": itemPriceEdit,
            "itemImg": itemImgEdit,
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
function patchData(exist) {
    // console.log('patch');
    let itemID = exist == 1 ? $('.onUIID').val() : $('.removeUIID').val();
    // console.log(itemID);

    $.ajax({
        url: apiUrl,
        method: 'Patch',
        contentType: 'text/plain',
        data: JSON.stringify({
            "itemID": itemID,
            "menuExist": exist,
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
function deleteData() {
    // console.log('delete');
    let itemID = $('.deleteUIID').val();
    // console.log(itemID);

    $.ajax({
        url: apiUrl,
        method: 'Delete',
        contentType: 'text/plain',
        data: JSON.stringify({
            "itemID": itemID
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
    let exist = $('#one').prop('checked') ? '1' : '0';
    let condition;
    //change here
    if ($('#condition').val() == 'itemType') {
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionSelect1').val()
    } else if ($('#condition').val() == 'itemMain') {
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionSelect2').val()
    } else {
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionInput').val()
    }
    /////
    return condition;
}
function conditionReload() {
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
function reload() {
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


function changeImg(elem) {
    $(elem).next().prop('src', elem.value)
}



function add() {
    // console.log('add');
    switchEditUIDisplay('block', '#createUI')

}
async function edit(elem) {
    switchEditUIDisplay('block', '#editUI')
    let id = $(elem).parent().parent().find('td:nth-of-type(1)')[0].innerText;
    // $('#editUIIDEdit').val(id)


    let dataStr = await getData(`?itemID=${id}`)
    let dataJson = JSON.parse(dataStr)
    let data = dataJson[0]
    // console.log(data);
    $('.editUIID').val(data.itemID)
    $('#menuExistEdit').val(data.menuExist)
    $('#itemNameEdit').val(data.itemName)
    $('#itemTypeEdit').val(data.itemType)
    $('#itemDescribeEdit').val(data.itemDescribe)
    $('#itemMainEdit').val(data.itemMain)
    $('#itemPriceEdit').val(data.itemPrice)
    $('#itemImgEdit').val(data.itemImg)
    $('#itemImgEdit+img').prop('src', data.itemImg)

}
function on(elem) {
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
    $('.TESTmenuExist').val(1)
    $('.TESTitemName').val('寶可夢拿鐵')
    $('.TESTitemType').val('飲品')
    $('.TESTitemDescribe').val('每一杯寶可夢拿鐵都充滿驚喜，選擇你的最愛，讓冒險從咖啡開始！')
    $('.TESTitemMain').val(0)
    $('.TESTitemPrice').val(150)
    $('.TESTitemImg').val('https://www.pokemoncenter-online.com/cafe/common/img/menu/2024/photo_special11.jpg')


}


window.onload = function () {

    setUp()

    // getDataCreateTable(`?${colExist}=1`, '#existTBody');
    conditionReload()

    $('#editBlack,.UICancelBN,#deleteUICancelBn,#removeUICancelBn,#onUICancelBn').click(function () {
        switchEditUIDisplay('none')
    })



    // testCreatValueSet()

    $('#one').on('click', function () {
        conditionReload()
    })
    $('#two').on('click', function () {
        conditionReload()
    })

    $('#condition').on('change', function () {
        //change here
        if ($('#condition').val() == 'itemType') {
            $('#conditionInput').css('display', 'none')
            $('#conditionSelect1').fadeIn()
            $('#conditionSelect2').css('display', 'none')

            $('#conditionSelect1').val('')
        } else if ($('#condition').val() == 'itemMain') {
            $('#conditionInput').css('display', 'none')
            $('#conditionSelect1').css('display', 'none')
            $('#conditionSelect2').fadeIn()

            $('#conditionSelect2').val('')
        } else {
            // $('#conditionInput').css('display','block')
            $('#conditionInput').fadeIn()
            $('#conditionSelect1').css('display', 'none')
            $('#conditionSelect2').css('display', 'none')
        }
        /////

        if ($('#conditionInput').val() != '') {
            // console.log(condition);
            conditionReload()
        } else {
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

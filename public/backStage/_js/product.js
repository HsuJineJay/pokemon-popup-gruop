//change here
let apiUrl = 'http://localhost/frontend/bigProject/root/backEnd/api/product/product.php'
let col = ['productID','productName','productType','productDescribe','productPrice','productInStock','storeOnly','productMain']
let colTW = ['商品編號','商品名稱','商品類型','商品描述','商品價格','庫存','快閃店限定','主打商品']
let colExist = 'productExist'
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
                    if(key=='productType'){
                        result += `
                        <td>
                        ${item[key]=='toy'?'玩具、玩偶':''+item[key]=='decoration'?'家飾用品':''+item[key]=='stationery'?'文具、文創':''+item[key]=='jewelry'?'珠寶首飾':''+item[key]=='model'?'模型':''}
                        </td>
                        `
                    }else if (key=='storeOnly'){
                        result += `
                        <td>${item[key]==1?'V':'X'}</td>
                        `
                    }else if(key=='productMain'){
                        result += `
                        <td>${item[key]==1?'V':'X'}</td>
                        `
                    }else{
                        result += `
                        <td>${item[key]}</td>
                        `
                    }
                    //////
                    
                }
                // result += `<td>`
                // for(obj of item.productImg){
                //     result += `
                //     <img width='50px' src='${obj.productImg}'>
                //     `
                // }
                // result += `</td>`


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
                            <button title='改成有效資料' class='on tableBn' onclick='on(this)'></button>
                            <button title='編輯資料' class='edit tableBn' onclick='edit(this)'></button>
                            <button title='刪除該筆資料' class='delete tableBn' onclick='deleteBN(this)'></button>
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
    let productExistCreate = $('#productExistCreate').val()
    let productNameCreate = $('#productNameCreate').val()
    let productTypeCreate = $('#productTypeCreate').val()
    let productDescribeCreate = $('#productDescribeCreate').val()
    let productPriceCreate = $('#productPriceCreate').val()
    let productInStockCreate = $('#productInStockCreate').val()
    let storeOnlyCreate = $('#storeOnlyCreate').val()
    let productMainCreate = $('#productMainCreate').val()
    
    let productImg=[]
    // let productImg1Create = $('#productImg1Create').val()
    // let productImg2Create = $('#productImg2Create').val()
    // let productImg3Create = $('#productImg3Create').val()
    // productImg1Create != ''?productImg.push({'img':productImg1Create}):null;
    // productImg2Create != ''? productImg.push({'img':productImg2Create}):null;
    // productImg3Create != ''? productImg.push({'img':productImg3Create}):null;
    $('.productImgCreate').each(function(index,elem){
        // console.log(index);
        // console.log(item);
        if(elem.value != ''){
            productImg.push({'img': elem.value})
        }

    })



    $.ajax({
        url: apiUrl,
        method: 'Post',
        data: {
            "productExist": productExistCreate,
            "productName": productNameCreate,
            "productType": productTypeCreate,
            "productDescribe": productDescribeCreate,
            "productPrice": productPriceCreate,
            "productInStock": productInStockCreate,
            "storeOnly": storeOnlyCreate,
            "productMain": productMainCreate,
            "productImg" : JSON.stringify(productImg)
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
    let productIDEdit = $('.editUIID').val()
    let productExistEdit = $('#productExistEdit').val()
    let productNameEdit = $('#productNameEdit').val()
    let productTypeEdit = $('#productTypeEdit').val()
    let productDescribeEdit = $('#productDescribeEdit').val()
    let productPriceEdit = $('#productPriceEdit').val()
    let productInStockEdit = $('#productInStockEdit').val()
    let storeOnlyEdit = $('#storeOnlyEdit').val()
    let productMainEdit = $('#productMainEdit').val()

    let productImg = []
    $('.productImgEdit').each(function(index,elem){
        // console.log(index);
        // console.log(item);
        if(elem.value != ''){
            productImg.push({'img': elem.value})
        }

    })
    // console.log(productImg);



    $.ajax({
        url: apiUrl,
        method: 'put',
        data: JSON.stringify({
            "productID": productIDEdit,
            "productExist": productExistEdit,
            "productName": productNameEdit,
            "productType": productTypeEdit,
            "productDescribe": productDescribeEdit,
            "productPrice": productPriceEdit,
            "productInStock": productInStockEdit,
            "storeOnly": storeOnlyEdit,
            "productMain": productMainEdit,
            "productImg" : productImg
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
    let productID = exist==1? $('.onUIID').val(): $('.removeUIID').val();
    // console.log(productID);

    $.ajax({
        url: apiUrl,
        method: 'Patch',
        contentType : 'text/plain',
        data: JSON.stringify({
            "productID": productID,
            "productExist": exist,
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
    let productID = $('.deleteUIID').val();
    // console.log(productID);

    $.ajax({
        url: apiUrl,
        method: 'Delete',
        contentType : 'text/plain',
        data: JSON.stringify({
            "productID": productID
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
    if ($('#condition').val() == 'productType') {
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionSelect1').val()
    } else if($('#condition').val() == 'storeOnly'){
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionSelect2').val()
    } else if($('#condition').val() == 'productMain'){
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionSelect3').val()
    } else {
        condition = `?${colExist}=` + exist + '&' + $('#condition').val() + '=' + $('#conditionInput').val()
    }
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


function changeImg(elem){
    $(elem).next().prop('src',elem.value)
}



function add() {
    // console.log('add');
    switchEditUIDisplay('block', '#createUI')

}
async function edit(elem) {
    switchEditUIDisplay('block', '#editUI')
    let id = $(elem).parent().parent().find('td:nth-of-type(1)')[0].innerText;
    // $('#editUIIDEdit').val(id)


    let dataStr = await  getData(`?productID=${id}`)
    let dataJson = JSON.parse( dataStr)
    let data = dataJson[0]
    // console.log(data);
    $('.editUIID').val(data.productID)
    $('#productExistEdit').val(data.productExist)
    $('#productIDEdit').val(data.productID)
    $('#productNameEdit').val(data.productName)
    $('#productTypeEdit').val(data.productType)
    $('#productDescribeEdit').val(data.productDescribe)
    $('#productPriceEdit').val(data.productPrice)
    $('#productInStockEdit').val(data.productInStock)
    $('#storeOnlyEdit').val(data.storeOnly)
    $('#productMainEdit').val(data.productMain)

    let result = '';
    for (i in data.productImg){
        result += `
        <div class="UILittleDiv row">
            <div class="UISpan col-3">圖片連結</div>
            <div class="col-9">
                <input oninput='changeImg(this)' class="UIInput TESTproductImg1 productImgEdit" type="test" id="productImg${i}Edit" value="${data.productImg[i].productImg}">
                <img style='margin-top: 10px' width='50px' src='${data.productImg[i].productImg}'>
            </div>
        </div>
        `
    }
    $('#lastInput').html(result)
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
    $('.TESTproductExist').val(0)
    $('.TESTproductName').val('熊')
    $('.TESTproductType').val('toy')
    $('.TESTproductDescribe').val('一隻熊')
    $('.TESTproductPrice').val(200)
    $('.TESTproductInStock').val(50)
    $('.TESTstoreOnly').val(0)
    $('.TESTproductMain').val(1)

    $('#productImg1Create').val('./img1.png')
    $('#productImg2Create').val('./img2.png')
    $('#productImg3Create').val('./img3.png')


}


window.onload = function () {
    
    setUp()

    getDataCreateTable(`?${colExist}=1`,'#existTBody');

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
        if ($('#condition').val() == 'productType'){
            $('#conditionInput').css('display','none')
            $('#conditionSelect1').fadeIn()
            $('#conditionSelect2').css('display','none')
            $('#conditionSelect3').css('display','none')

            $('#conditionSelect1').val('')
        }else if($('#condition').val() == 'storeOnly'){
            $('#conditionInput').css('display','none')
            $('#conditionSelect1').css('display','none')
            $('#conditionSelect2').fadeIn()
            $('#conditionSelect3').css('display','none')

            $('#conditionSelect2').val('')
        }else if($('#condition').val() == 'productMain'){
            $('#conditionInput').css('display','none')
            $('#conditionSelect1').css('display','none')
            $('#conditionSelect2').css('display','none')
            $('#conditionSelect3').fadeIn()

            $('#conditionSelect3').val('')
        }else{
            // $('#conditionInput').css('display','block')
            $('#conditionInput').fadeIn()
            $('#conditionSelect1').css('display','none')
            $('#conditionSelect2').css('display','none')
            $('#conditionSelect3').css('display','none')
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

    $('.createImgBN').on('click',function(){
        $('#createDiv').append(`
        <div class="UILittleDiv row">
            <div class="UISpan col-3">圖片連結</div>
            <div class="col-9">
                <input oninput='changeImg(this)' class="UIInput TESTproductImg1 productImgCreate" type="test" >
                <img class="createImg" src="" alt="">
            </div>
        </div>
        `)
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
    $('#deleteUISubmit').click(function () {
        deleteData()
    })


}

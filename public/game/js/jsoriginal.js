$(document).ready(function () {

    //控制聲音開關 預設關閉
    $('#soundContainer').on('click',function(){
        if(soundIcon.innerText =='volume_off'){
            soundIcon.innerText='volume_up'}else{
                soundIcon.innerText='volume_off'
            }
        
        
    })    
    //把題目裝到陣列裡
    const allQuestion = [{quesNumber:"Q1", question: '有一顆寶貝球滾到你面前不斷閃爍....你會...', text: 'WELCOME TO THE POkEMON ADVENTURE', option: ['默默把它撿起來帶走', '當作沒看到經過它', '站在原地觀察它'] }
        , { quesNumber:"Q2",question: '突然前方傳來熟悉的’美妙’旋律....你會...', text: 'BOBOROROBOBOLIBO~~', option: ['看來胖丁又在禍害人間了', '不錯喔 胖丁的歌藝越來越精湛了', '我不要聽！拿出耳塞 塞好塞滿', '最近都失眠 聽完睡著剛剛好'] }
        , { quesNumber:"Q3",question: '碰！極巨肥化皮卡丘掉到了你面前....你會...', text: '走著走著天空突然下起蛋糕雨', option: ['摸摸看他的大肚子', '餵他吃更多蛋糕', '警告他吃太胖會被殺掉'] }
        , { quesNumber:"Q4",question: '你在天空看見了喵喵熱氣球飄向你....你會....', text: '皮卡丘一巴掌把你拍上了天空', option: ['進到熱氣球裡一探究竟', '趕快拿手機拍下來留念', '不想被發現 躲到雲後面'] }
        , { quesNumber:"Q5",question: '你發現睡著的耿鬼....你認為....', text: '喵喵突然把你抓進熱氣球裡', option: ['他一定是被火箭隊抓住了', '一定有詐 他可是耿鬼', '太可愛了吧 反差萌', '大好機會 我要收服耿鬼'] }
        , { quesNumber:"Q6",question: '你掉在一群移動中的可達鴨裡....你想....', text: '耿鬼突然驚醒 嚇得你掉出熱氣球', option: ['跟著他們繼續走', '趁亂抱走一隻', '敲敲看他們的腦殼'] }
        , { quesNumber:"Q7",question: ' 可達鴨對你使出念力抬起你....你認為你會被送去....', text: '(可達鴨發現你了！)', option: ['真新鎮 ', '大木博士的研究所', '探望常磐森林的比雕'] }]

    //把進度條裝到陣列裡
    const allProcess =[
        "./images/publicImg/process1.svg",
        "./images/publicImg/process2.svg",
        "./images/publicImg/process3.svg",
        "./images/publicImg/process4.svg",
        "./images/publicImg/process5.svg",
        "./images/publicImg/process6.svg",
        "./images/publicImg/process7.svg",]


    //讓題目數一開始為0 題目數變化:選項button被點擊就＋1
    let currentQuestion = 0
    //讓使用者的答案存在變數裡
    let userSelect = []
    //宣告一個使用者的名字為全域變數
    let userName
    //宣告一個使用者各項得分為全域變數
    let get0
    let get1
    let get2
    let get3

    //當冒險開始按鈕被點擊時 使用者有輸入姓名 則動態產出下一頁 沒有的話跳出請輸入姓名視窗
    // button #startPlay onclick
    //判斷#userName value是否為假  
    $('#startButtonContainer').click(function () {
        // console.log('#startPlay is alive')
        //false->跳出alert 留在原頁
        if ($('#userName').val() == false) {
            $('#alertText').html('請輸入姓名')
        } else {
            //印出使用者姓名
            // console.log($('#userName').val())
            //把使用者輸入的值（姓名）放到userName變數裡
            userName = $('#userName').val()
            //true-> 清空div #testStart內容 動態生成第一題
            $('.superBigWebCon').empty()
            // console.log('清空#testStart裡的東西 ', 'empty is ok')
            renderQuestion(currentQuestion)

        }
    })

    //
    //函數渲染出題目跟結果

    function renderQuestion(currentQuestion) {
        //所有題目陣列索引裝到questionData
        let questionData = allQuestion[currentQuestion]
        //如果currentQuestion小於allQuestion陣列的長度就印出題目
        if (currentQuestion < allQuestion.length) {
            // console.log(questionData)
            //印出題目跟對話框
            $('#questionContainer').append(`<p>${questionData.text}</p><p>${questionData.question}</p>`)
            //暫時印出皮卡丘
            $('#questionContainer').append(`<video width="400px" src="./images/animation/pikaWalk.webm" autoplay loop muted>
</video>`)
$('#questionContainer').append(` <img style="border:2px solid black" src="./images/question1Img/cloudWhite.svg" alt="">`)

            // 尋訪每一個選項 印出每一個選項
            for (let i = 0; i < questionData.option.length; i++) {
                $('#questionContainer').append(`<button class="option${i}">${questionData.option[i]}</button>`)
            }


        } else {
            //題目結束播放猜猜我是誰動畫跟結果印出userName
            console.log('播放猜猜我是誰動畫跟結果')
            console.log(`${userName}的寶可夢屬性是...`)
        }
    }

    //#questionContainer裡的任一.option按鈕被點擊 currentQuestion就自增1
    //清空div #questionContainer內容
    //呼叫renderQuestion(currentQuestion)函數
    //紀錄被按的選項加到userSelect[]裡
    //.option0 ,.option1 ,option2,option3
    //使用迴圈尋訪0-3 四個選項的 class名稱= .option0/1/2/3

    for (let optionIndex = 0; optionIndex < 4; optionIndex++) {

        $('#questionContainer').on('click', `.option${optionIndex}`, function () {
            currentQuestion++
            //把使用者的答案push到陣列裡
            userSelect.push(optionIndex)
            // console.log(currentQuestion)
            $('#questionContainer').empty()
            console.log('現在選的答案:', optionIndex)
            console.log('總共的答案:', userSelect)
            //呼叫countScore()函數 計算使用者各選項計分
            countScore()
            //呼叫showResult()函數 計算結果
            showResult()
            //呼叫renderQuestion(currentQuestion)函數
            renderQuestion(currentQuestion)


        })



    }

    //遍歷userSelect[]統計各選項得分
    //計算使用者各選項計分函數
    async function countScore() {
        //如果userSelect陣列長度與allQuestion陣列長度相同 就計算分數
        //計算分數：遍歷userSelect[]統計各選項得分
        if (userSelect.length == allQuestion.length) {
            //讓每個選項得分都先為0 0,1,2,3:選項索引值
            get0 = 0
            get1 = 0
            get2 = 0
            get3 = 0
            // console.log('選項', userSelect[6])
            for (let i = 0; i < userSelect.length; i++) {
                //遍歷userSelect[]
                //把分數計分加到各個計分變數
                // console.log('選項', userSelect[i])
                switch (userSelect[i]) {
                    case 0: get0++
                        break
                    case 1: get1++
                        break
                    case 2: get2++
                        break
                    case 3: get3++
                        break
                }

            }
            //印出每個選項的計分
            console.log('選選項0的:', get0, '選選項1的:', get1, '選選項2的:', get2, '選選項3的:', get3)
        }



    }

    //得出結果 根據得分判斷結果
    async function showResult() {
        //判斷答題是否完成 答案長度 ＝ 題目長度
        if (userSelect.length == allQuestion.length) {
            //判斷各個得分條件
            if (get3 == 2) {
                console.log('你是：百變怪')
            } else if (get0 == 7 || get1 == 7 || get2 == 7) {
                console.log('你是：超能力屬性')
            } else if (get0 == 6 || get1 == 6 || get2 == 6) {
                console.log('你是：岩屬性')
            } else if (get0 == 5 || get1 == 5 || get2 == 5) {
                console.log('你是：草屬性')
            } else if (get0 == 4 || get1 == 4 || get2 == 4) {
                console.log('你是：雷屬性')
            } else if (get0 == 3 || get1 == 3) {
                console.log('你是：水屬性')
            } else {
                console.log('你是：火屬性')
            }
        }



    }





})
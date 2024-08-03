$(document).ready(function () {

    chubbySong.volume = 1;
    bgmusic.volume = 0.4;

    //控制聲音總開關 預設關閉
    let CtrlSound = async function () {
        $('#soundContainer').on('click', function () {
            if ($('#soundIcon').attr('src') === './images/publicImg/soundOn.svg') {
                // 確認是否加載音樂
                bgmusic.play().catch(e => console.log("播放失敗:", e))
                bgmusic.muted = false
                $('#soundIcon').attr('src', './images/publicImg/soundOff.svg')

            } else {
                bgmusic.muted = true
                chubbySong.muted = true
                $('#soundIcon').attr('src', './images/publicImg/soundOn.svg')

            }



        })
    }


    //功能 播放胖丁音樂===========
    // 題目索引為1並且#soundIcon是Off的時候 把靜音打開 然後播放音樂
    let chubbysongCtrl = async function () {
        if (currentQuestion === 1 && $('#soundIcon').attr('src') === './images/publicImg/soundOff.svg') {
            $('#chubbySong').prop('muted', false)
            chubbySong.play().catch(e => console.log("胖丁播放失敗:", e))

        }
    }
    //初始就呼叫控制音樂
    CtrlSound()
    //把題目裝到陣列裡
    const allQuestion = [{ quesNumber: "Q1", questionLine1: '有一顆寶貝球滾到你面前不斷閃爍....', questionLine2: '你會...', text: 'WELCOME TO THE POKEMON ADVENTURE', option: ['默默把它撿起來帶走', '當作沒看到經過它', '站在原地觀察它'] }
        , { quesNumber: "Q2", questionLine1: '突然前方傳來熟悉的美妙旋律....', questionLine2: '你會...', text: 'BOBOROROBOBOLIBO~~', option: ['看來胖丁又在禍害人間了', '不錯喔 胖丁的歌藝越來越精湛了', '我不要聽！拿出耳塞 塞好塞滿', '最近都失眠 聽完睡著剛剛好'] }
        , { quesNumber: "Q3", questionLine1: '碰！極巨肥化皮卡丘掉到了你面前....', questionLine2: '你會...', text: '走著走著天空突然下起蛋糕雨', option: ['摸摸看他的大肚子', '餵他吃更多蛋糕', '警告他吃太胖會被殺掉'] }
        , { quesNumber: "Q4", questionLine1: '你在天空看見了喵喵熱氣球飄向你....', questionLine2: '你會....', text: '皮卡丘一巴掌把你拍上了天空', option: ['進到熱氣球裡一探究竟', '趕快拿手機拍下來留念', '不想被發現 躲到雲後面'] }
        , { quesNumber: "Q5", questionLine1: '你發現睡著的耿鬼....', questionLine2: '你認為....', text: '喵喵突然把你抓進熱氣球裡', option: ['他一定是被火箭隊抓住了', '一定有詐 他可是耿鬼', '太可愛了吧 反差萌', '大好機會 我要收服耿鬼'] }
        , { quesNumber: "Q6", questionLine1: '你掉在一群移動中的可達鴨裡....', questionLine2: '你想....', text: '耿鬼突然驚醒 嚇得你掉出熱氣球', option: ['跟著他們繼續走', '趁亂抱走一隻', '敲敲看他們的腦殼'] }
        , { quesNumber: "Q7", questionLine1: ' 可達鴨對你使出念力抬起你....', questionLine2: '你認為你會被送去....', text: '(可達鴨發現你了！)', option: ['真新鎮 ', '大木博士的研究所', '探望常磐森林的比雕'] }]

    //把進度條裝到陣列裡
    const allProcess = [
        "./images/publicImg/process1.svg",
        "./images/publicImg/process2.svg",
        "./images/publicImg/process3.svg",
        "./images/publicImg/process4.svg",
        "./images/publicImg/process5.svg",
        "./images/publicImg/process6.svg",
        "./images/publicImg/process7.svg",]

    // 每一頁背景裝到陣列========
    const allBackground = [
        //第一題 陣列索引0
        [` <section class="webBgContainerSec">

        <div class="sec_bgContainer" style="z-index: 1; ">




            <!-- process -->
            <div class="bigprocessCon">
                <!-- 換進度條圖片src -->
                <div class="processContainer"><img id="process" src="" alt=""></div>
            </div>
            <!-- 題目選項按鈕區 -->
            <div class="questionAndbuttonCon">
                <!-- 題目 -->
                 <!-- .questionContainer換成圖片跟文字 -->
                 <div class="storyTextCtrl">
                    <div class="storyText"><h4 ></h4></div>
                </div>
                 <div class="questionContainer">
                    <div class="questionIcon"></div>
                    <div class="questionTextCon">
                        <h4 id="questionline1" class="textContent"></h4>
                        <h4 id="questionline2" class="textContent"></h4>

                    </div>

                </div> 
                <!-- 選項按鈕 -->
                  
                <div class="btnContainer">
                </div>
            </div>

            <div >

                <!-- 動畫區 -->
                <div class="pokeaniCon"><img id="pokeaniImg" src="./images/secondPageImg/pokeballNormal.svg" alt="">
                </div>

            </div>
        </div>



        <!-- 雲朵 -->
        <div class="thir_cloudscontainer">
            <div class="sec_cloud1container"><img width="100vw" src="./images/secondPageImg/cloudWhite1.svg" alt="">
            </div>
            <div class="sec_cloud2container"><img width="90vw" src="./images/secondPageImg/cloudWhite1.svg" alt="">
            </div>
            <div class="sec_cloud3container"><img width="110vw" src="./images/secondPageImg/cloudWhite2.svg" alt="">
            </div>
            <div class="sec_cloud4container"><img width="75vw" src="./images/secondPageImg/cloudWhite2.svg" alt="">
            </div>
            <!-- 草皮 -->
            <div class="grassContainer"><img src="./images/secondPageImg/grass.svg" alt=""></div>

        </div>

    </section>
`],
        //第二題 陣列索引1
        [`        <div class="superBigWebCon">
    <!-- 網頁版bg容器 -->
    <section class="webBgContainerSec">

        <div class="thir_bgContainer" style="z-index: 1; ">



            <!-- process -->
            <div class="bigprocessCon">
                <!-- 換進度條圖片src -->
                <div class="processContainer"><img id="process" src="./images/publicImg/process1.svg" alt=""></div>
            </div>
            <!-- 題目選項按鈕區 -->
            <div class="questionAndbuttonCon">
                <!-- 題目 -->
                 <!-- .questionContainer換成圖片跟文字 -->
                 <div class="storyTextCtrl">
                    <div class="storyText"><h4 ></h4></div>
                </div>
                <div class="questionContainer">
                    <div class="questionIcon"></div>
                    <div class="questionTextCon">
                        <h4 id="questionline1"  class="textContent">有一顆寶貝球滾到你面前不斷閃爍.... </h4>
                        <h4 id="questionline2"  class="textContent">你會...？</h4>

                    </div>

                </div>
                <!-- 選項按鈕 -->
                <div class="btnContainer">
                    
                </div>
            </div>
            <div style="overflow: hidden;">

                <!-- 動畫區 -->
                <div class="chubbyaniCon">
                    <img class="micImg" src="./images/thirdPageImg/mic.svg" alt="">
                    <video class="chubbySing" src="./images/animation/chubbySing.webm"  autoplay loop muted></video>
                    
                </div>
                
            </div>

            </div>
        </div>



        <!-- 雲朵 -->
        <div class="thir_cloudscontainer">
            <div class="sec_cloud1container"><img width="100vw" src="./images/secondPageImg/cloudWhite1.svg" alt="">
            </div>
            <div class="sec_cloud2container"><img width="90vw" src="./images/secondPageImg/cloudWhite1.svg" alt="">
            </div>
            <div class="sec_cloud3container"><img width="110vw" src="./images/secondPageImg/cloudWhite2.svg" alt="">
            </div>
            <div class="sec_cloud4container"><img width="75vw" src="./images/secondPageImg/cloudWhite2.svg" alt="">
            </div>
            <!-- 草皮 -->
            <div class="grassContainer"><img src="./images/secondPageImg/grass.svg" alt=""></div>
            <!-- 音符 -->
             <div class="musicIcon1"></div>
             <div class="musicIcon2"></div>
        </div>

`]]

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
            //印出題目
            renderQuestion(currentQuestion)

        }
    })

    //
    //函數渲染出題目跟結果=========================

    function renderQuestion(currentQuestion) {
        //所有題目陣列索引裝到questionData
        let questionData = allQuestion[currentQuestion]
        //如果currentQuestion小於allQuestion陣列的長度就印出題目
        if (currentQuestion < allQuestion.length) {
            // console.log(questionData)

            // ==============測試時初版題目印出
            //印出題目跟對話框
            // $('#questionContainer').append(`<p>${questionData.text}</p><p>${questionData.question}</p>`)
            //暫時印出皮卡丘
            //             $('#questionContainer').append(`<video width="400px" src="./images/animation/pikaWalk.webm" autoplay loop muted>
            // </video>`)
            // $('#questionContainer').append(` <img style="border:2px solid black" src="./images/question1Img/cloudWhite.svg" alt="">`)

            //             // 尋訪每一個選項 印出每一個選項
            //             for (let i = 0; i < questionData.option.length; i++) {
            //                 $('#questionContainer').append(`<button class="option${i}">${questionData.option[i]}</button>`)
            //             }




            //迴圈長出大背景=======
            $('.superBigWebCon').append(
                allBackground[currentQuestion]
            )
            //呼叫控制bgm聲音
            CtrlSound()
            // 印出進度條============
            $('#process').attr('src', `./images/publicImg/process${currentQuestion}.svg`)

            //印出旁白文字=========
            // 透明度進入  消失 css控制
            $('.storyText h4').html(`${questionData.text}`)

            //功能 播放胖丁音樂===========
            CtrlSound()
            chubbysongCtrl()

            // 3.5秒後清空旁白文字框=====
            const emptyStoryText = function () {
                $('.storyTextCtrl').empty()
            }

            setTimeout(emptyStoryText, 3700)

            //========= 4秒後改變問題框跟選項框動畫框visibility hidden=>visable
            const showQuestionandbutton = function () {
                $('.chubbyaniCon,.pokeaniCon,.btnContainer,.questionContainer').css('visibility', 'visible')
            }
            setTimeout(showQuestionandbutton, 4000)

            //印出題數============
            $('.questionIcon').html(`${questionData.quesNumber}`)

            //印出題目=============
            //第一行
            $('#questionline1').html(`${questionData.questionLine1}`)
            //第二行
            $('#questionline2').html(`${questionData.questionLine2}`)


            //印出選項=============
            for (let i = 0; i < questionData.option.length; i++) {
                // 1到7題印出不同按鈕class
                switch (currentQuestion) {
                    case 0:
                        $('.btnContainer').append(`
                        <button class="btn1 option${i}">${questionData.option[i]}</button>`);
                        break;
                    case 1:
                        $('.btnContainer').append(`
                        <button class="btn2 option${i}">${questionData.option[i]}</button>`);
                        break;
                }
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

        $('.superBigWebCon').on('click', `.option${optionIndex}`, function () {
            currentQuestion++
            //把使用者的答案push到陣列裡
            userSelect.push(optionIndex)
            console.log(currentQuestion)
            $('.superBigWebCon').empty()
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

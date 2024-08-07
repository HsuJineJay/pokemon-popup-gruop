$(document).ready(function () {

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




    // 音樂音量
    chubbySong.volume = 1;
    bgmusic.volume = 0.4;
    guessWhoSong.volume = 0.6;

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
                guessWhoSong.muted = true
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

    //功能 播放猜猜我是誰音樂===========
    // #soundIcon是Off的時候 把靜音打開 然後播放音樂
    let guessWhoSongCtrl = async function () {
        if ($('#soundIcon').attr('src') === './images/publicImg/soundOff.svg') {
            $('#guessWhoSong').prop('muted', false)
            guessWhoSong.play().catch(e => console.log("猜猜我是播放失敗:", e))

        }
    }
    //初始就呼叫控制音樂
    CtrlSound()
    //把題目裝到陣列裡
    const allQuestion = [{ quesNumber: "Q1", questionLine1: '有一顆寶貝球滾到你面前不斷閃爍....', questionLine2: '你會...', text: 'WELCOME TO THE POKEMON ADVENTURE', option: ['默默把它撿起來帶走', '當作沒看到經過它', '站在原地觀察它'] }
        , { quesNumber: "Q2", questionLine1: '突然前方傳來熟悉的美妙旋律....', questionLine2: '你認為...', text: 'BO BO RO RO BO BO LI BO ~~', option: ['看來胖丁又在禍害人間了', '不錯喔 胖丁的歌藝越來越精湛了', '我不要聽！拿出耳塞 塞好塞滿', '最近都失眠 聽完睡著剛剛好'] }
        , { quesNumber: "Q3", questionLine1: '碰！極巨肥化皮卡丘掉到了你面前....', questionLine2: '你會...', text: '走著走著天空突然下起蛋糕雨', option: ['摸摸看他的大肚子', '餵他吃更多蛋糕', '警告他吃太胖會被殺掉'] }
        , { quesNumber: "Q4", questionLine1: '你在天空看見了喵喵熱氣球飄向你....', questionLine2: '你會....', text: '皮卡丘一巴掌把你拍上了天空', option: ['進到熱氣球裡一探究竟', '趕快拿手機拍下來留念', '不想被發現 躲到雲後面'] }
        , { quesNumber: "Q5", questionLine1: '你發現熱氣球裡有睡著的耿鬼....', questionLine2: '你認為....', text: '突然 你被抓進了熱氣球裡', option: ['他一定是被火箭隊抓住了', '一定有詐 他可是耿鬼', '太可愛了吧 反差萌', '大好機會 我要收服耿鬼'] }
        , { quesNumber: "Q6", questionLine1: '你掉在一群移動中的可達鴨裡....', questionLine2: '你想....', text: '耿鬼突然驚醒 嚇得你掉出熱氣球', option: ['跟著他們繼續走', '趁亂抱走一隻', '敲敲看他們的腦殼'] }
        , { quesNumber: "Q7", questionLine1: ' 可達鴨對你使出念力抬起你....', questionLine2: '你認為你會被送去....', text: '可達鴨發現你了！', option: ['真新鎮 ', '大木博士的研究所', '探望常磐森林的比雕'] }]


    // 結果屬性陣列=============
    const everyAttrText = [
        //0百變怪 
        { attrStament: '屬於??????????', tagContent: ['????????', '???????', '????????', '???????????', '????????'], representiveImg: './images/result_Images/百變怪.webp', representiveName: '百變怪' },
        //1超能力系
        { attrStament: '屬於超能力寶可夢', tagContent: ['#敏銳的洞察力', '#智慧的神', '#難以捉摸', '#好孤單', '#本質派'], representiveImg: './images/result_Images/果然翁.webp', representiveName: '果然翁', bestfriendText: ['水<br>屬<br>性', '火<br>屬<br>性'], bestfriendImg: ['./images/result_Images/傑尼龜.webp', './images/result_Images/小火龍.webp'] },
        //2岩屬性
        { attrStament: '屬於岩屬性寶可夢', tagContent: ['#無法撼動的保守派', '#值得信賴的', '#耐心', '#穩重的悶騷', '#堅韌不拔'], representiveImg: './images/result_Images/小拳石.webp', representiveName: '小拳石', bestfriendText: ['超<br>能<br>力'], bestfriendImg: ['./images/result_Images/果然翁.webp'], badfriendText: ['草<br>屬<br>性', '水<br>屬<br>性'], badfriendImg: ['./images/result_Images/傑尼龜.webp', './images/result_Images/菊草葉.webp'] },
        //3草屬性
        { attrStament: '屬於草屬性寶可夢', tagContent: ['#喜歡與大自然接觸', '#正能量大師', '#充滿活力', '#善於計劃', '#樂於助人'], representiveImg: './images/result_Images/菊草葉.webp', representiveName: '菊草葉', bestfriendText: ['雷<br>屬<br>性'], bestfriendImg: ['./images/result_Images/皮卡丘.webp'], badfriendText: ['岩<br>屬<br>性', '火<br>屬<br>性'], badfriendImg: ['./images/result_Images/小拳石.webp', './images/result_Images/小火龍.webp'] },
        //4雷屬性
        { attrStament: '屬於雷屬性寶可夢', tagContent: ['#偏愛獨自完成任務', '#自信心combo', '#反應迅速', '#頭腦靈活', '#富有創造力'], representiveImg: './images/result_Images/皮卡丘.webp', representiveName: '皮卡丘', bestfriendText: ['草<br>屬<br>性', '火<br>屬<br>性'], bestfriendImg: ['./images/result_Images/菊草葉.webp', './images/result_Images/小火龍.webp'], badfriendText: ['水<br>屬<br>性'], badfriendImg: ['./images/result_Images/傑尼龜.webp'] },
        //5水屬性
        { attrStament: '屬於水屬性寶可夢', tagContent: ['#性格溫和', '#包容力MAX達人', '#適應力強', '#高敏感', '#同理心'], representiveImg: './images/result_Images/傑尼龜.webp', representiveName: '傑尼龜', bestfriendText: ['超<br>能<br>力'], bestfriendImg: ['./images/result_Images/果然翁.webp'], badfriendText: ['雷<br>屬<br>性', '火<br>屬<br>性'], badfriendImg: ['./images/result_Images/皮卡丘.webp', './images/result_Images/小火龍.webp'] },
        //6火屬性
        { attrStament: '屬於火屬性寶可夢', tagContent: ['#冒險家精神', '#天生樂觀派', '#領導者', '#充滿熱情', '#勇敢向前衝'], representiveImg: './images/result_Images/小火龍.webp', representiveName: '小火龍', bestfriendText: ['雷<br>屬<br>性'], bestfriendImg: ['./images/result_Images/皮卡丘.webp'], badfriendText: ['草<br>屬<br>性', '岩<br>屬<br>性'], badfriendImg: ['./images/result_Images/菊草葉.webp', './images/result_Images/小拳石.webp'] }
    ]




    // 每一頁背景裝到陣列========
    const allBackground = [
        //=============第一題 陣列索引0==============
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
                 <div class="storyTextCtrlEmpty">
                 <div class="storyTextCtrl">
                    <div class="storyText"><h4 ></h4></div>
                </div>
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
        //==========第二題 陣列索引1==============
        [`<div class="superBigWebCon">
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
                 <div class="storyTextCtrlEmpty">
                 <div class="storyTextCtrl">
                    <div class="storyText"><h4 ></h4></div>
                </div>
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

`],
        // =========第三題 陣列索引2===========
        [`    <div class="superBigWebCon">
    <!-- 網頁版bg容器 -->
    <section class="webBgContainerfour">

        <div class="four_bgContainer" style="z-index: 1; ">




            <!-- process -->
            <div class="bigprocessCon">
                <!-- 換進度條圖片src -->
                <div class="processContainer"><img id="process" src="" alt=""></div>
            </div>
            <!-- 題目選項按鈕區 -->
            <div class="questionAndbuttonCon2">
                <!-- 題目 -->
                <!-- .questionContainer換成圖片跟文字 -->
                <div class="storyTextCtrlEmpty">
               <div class="storyTextCtrl">
                    <div class="storyText"><h4 ></h4></div>
                </div>
                </div>

                <div class="questionContainer">
                    <div class="questionIcon"></div>
                    <div class="questionTextCon">
                        <h4 id="questionline1"  class="textContent">有一顆寶貝球滾到你面前不斷閃爍.... </h4>
                        <h4 id="questionline2"  class="textContent">你會...？</h4>

                    </div>

                </div>
                <!-- 選項按鈕 -->
                <div class="btn3Container">

                </div>
            </ㄥdiv>
            

        </div>



        <!-- 蛋糕 -->
        <div class="cakeCon">

            <div  style=" position: absolute;">
                
                <div class="cake1"><img width="120vw" src="./images/fourthPageImg/cherryCake.svg" alt="">
                </div>
                <div class="cake2"><img width="90vw" src="./images/fourthPageImg/pancake1.svg" alt="">
                </div>
                <div class="cake3"><img width="130vw" src="./images/fourthPageImg/pancake2.svg" alt="">
                </div>
                <div class="cake4"><img width="85vw" src="./images/fourthPageImg/strawberryCake.svg" alt="">
                </div>
                <div class="cake5"><img width="75vw" src="./images/fourthPageImg/cherryCake.svg" alt="">
                </div>
                <div class="cake6"><img width="100vw" src="./images/fourthPageImg/pancake1.svg" alt="">
                </div>
            </div>
            <!-- 皮卡丘 -->
            <div class="fatpikaCon"><img class="pikafatAni" src="./images/fourthPageImg/fatPikaAni1.png" alt=""></div>

        </div>

    </section>
</div>
`],
        // =========第四題 陣列索引3==========
        [`    <div class="superBigWebCon">
    <!-- 網頁版bg容器 -->
    <section class="webBgContainerfifth">

        <div class="sec_bgContainer" style="z-index: 1; ">




            <!-- process -->
            <div class="bigprocessCon">
                <!-- 換進度條圖片src -->
                <div class="processContainer"><img id="process" src="" alt=""></div>
            </div>
            <!-- 題目選項按鈕區 -->
            <div class="questionAndbuttonCon3">
                <!-- 題目 -->
                 <!-- .questionContainer換成圖片跟文字 -->
                    <div class="storyTextCtrlEmpty">
                        <div class="storyTextCtrl">
                        <div class="storyText"><h4></h4></div>
                    </div>
                </div>
                <div class="questionContainer">
                    <div class="questionIcon"></div>
                    <div class="questionTextCon">
                        <h4 id="questionline1" class="textContent"></h4>
                        <h4 id="questionline2" class="textContent"></h4>

                    </div>

                </div>
                <!-- 選項按鈕 -->
                <div class="btnContainer2">
                    
                </div>
            </div>

            
        </div>



        <!-- 雲朵 -->
        <div class="fifth_cloudscontainer">
            <div class="fifth_cloud1container"><img width="100vw" src="./images/fifthPageImg/cloudWhite1.svg" alt="">
            </div>
            <div class="fifth_cloud2container"><img width="90vw" src="./images/fifthPageImg/cloudWhite1.svg" alt="">
            </div>
            <div class="fifth_cloud3container"><img width="130vw" src="./images/fifthPageImg/cloudWhite2.svg" alt="">
            </div>
            <div class="fifth_cloud4container"><img width="150vw" src="./images/fifthPageImg/cloudWhite2.svg" alt="">
            </div>
            <div class="fifth_cloud5container"><img width="75vw" src="./images/fifthPageImg/cloudWhite1.svg" alt="">
            </div>
            <div class="fifth_cloud6container"><img width="100vw" src="./images/fifthPageImg/cloudWhite2.svg" alt="">
            </div>
             <!-- 動畫區 -->
             <div class="meowaniCon"><img id="meowaniImg" src="./images/fifthPageImg/meowAirballoon.svg" alt="">
             </div>

        </div>

    </section>
</div>
`],
        //===========第5題 陣列索引4==============
        [
            `    <div class="superBigWebCon">
    <!-- 網頁版bg容器 -->
    <section class="webBgContainersixth">

        <div class="thir_bgContainer" style="z-index: 1; ">




            <!-- process -->
            <div class="bigprocessCon">
                <!-- 換進度條圖片src -->
                <div class="processContainer"><img id="process" src="./images/publicImg/process1.svg" alt=""></div>
            </div>
            <!-- 題目選項按鈕區 -->
            <div class="questionAndbuttonCon4">
                <!-- 題目 -->
                 <!-- .questionContainer換成圖片跟文字 -->
                  <div class="storyTextCtrlEmpty">
                 <div class="storyTextCtrl">
                    <div class="storyText"><h4></h4></div>
                </div>
                </div>
                <div class="questionContainer">
                    <div class="questionIcon"></div>
                    <div class="questionTextCon">
                        <h4 id="questionline1"  class="textContent"></h4>
                        <h4 id="questionline2"  class="textContent"></h4>

                    </div>

                </div>
                <!-- 選項按鈕 -->
                <div class="btnContainer3">
                    
                </div>
            </div>
            

            </div>
        </div>



        <!-- 動畫區 -->
         <div class="six_Anicontainer">
        <div class="ghoastAniCon">
            <video class="ghoastAni" src="./images/animation/ghoastSleep.webm" autoplay loop muted></video>
        </div>
        <div class="ghoastAniCon2">
            <video class="ghoastAni" src="./images/animation/ghoastSleep.webm" autoplay loop muted></video>
        </div>
        <div class="ghoastAniCon3">
            <video class="ghoastAni" src="./images/animation/ghoastSleep.webm" autoplay loop muted></video>
        </div>
        
    </div>
    </section>
</div>
`
        ],
        //=============第六題 陣列索引5========
        [`<div class="superBigWebCon">
    <!-- 網頁版bg容器 -->
    <section class="webBgContainerSeven">

        <div class="seven_bgContainer" style="z-index: 1; ">




            <!-- process -->
            <div class="bigprocessCon">
                <!-- 換進度條圖片src -->
                <div class="processContainer"><img id="process" src="" alt=""></div>
            </div>
            <!-- 題目選項按鈕區 -->
            <div class="questionAndbuttonCon">
                <!-- 題目 -->
                <!-- .questionContainer換成圖片跟文字 -->
                <div class="storyTextCtrlEmpty">
                <div class="storyTextCtrl">
                    <div class="storyText"><h4 ></h4></div>
                </div>
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
            <div style=" z-index: 1;">
                <!-- 網頁版動畫區 -->
                <div class="webduckaniCon">
                   <video class="duckAniWeb" src="./images/animation/duckWalk.webm" autoplay loop
                   muted></video>
                   <video class="duckAniWeb" src="./images/animation/duckWalk.webm" autoplay loop
                   muted></video>
                   <video class="duckAniWeb" src="./images/animation/duckWalk.webm" autoplay loop
                   muted></video>
                   <video class="duckAniWeb" src="./images/animation/duckWalk.webm" autoplay loop
                   muted></video>
                   <video class="duckAniWeb" src="./images/animation/duckWalk.webm" autoplay loop
                   muted></video>
               </div>
           </div>
        </div>

    
        <div class="seven_Anicontainer">
            <!-- 手機版動畫區 -->
            <div  class="duckaniCon1"><video class="duckAni" src="./images/animation/duckWalk.webm" autoplay loop
                    muted></video>
            </div>

            <div  class="duckaniCon2"><video class="duckAni" src="./images/animation/duckWalk.webm" autoplay loop
                    muted></video>
            </div>

            <div  class="duckaniCon3"><video class="duckAni" src="./images/animation/duckWalk.webm" autoplay loop
                    muted></video>
            </div>

            <div  class="duckaniCon4"><video class="duckAni" src="./images/animation/duckWalk.webm" autoplay loop
                    muted></video>
            </div>

            <div  class="duckaniCon5"><video class="duckAni" src="./images/animation/duckWalk.webm" autoplay loop
                    muted></video>
            </div>
         </div> 
               

        </div>
          <!-- 雲朵 -->
          <div class="seven_cloudscontainer">
            
            <!-- 草皮 -->
            <div class="grassContainer grassDisappear"><img src="./images/secondPageImg/grass.svg" alt=""></div>
           
        </div>




    </section>
</div>`],
        // ========第7題 陣列索引值6
        [`    <div class="superBigWebCon">
    <!-- 網頁版bg容器 -->
    <section class="webBgContainereight">

        <div class="sec_bgContainer" style="z-index: 1; ">




            <!-- process -->
            <div class="bigprocessCon">
                <!-- 換進度條圖片src -->
                <div class="processContainer"><img id="process" src="" alt=""></div>
            </div>
            <!-- 題目選項按鈕區 -->
            <div class="questionAndbuttonCon3">
                <!-- 題目 -->
                 <!-- .questionContainer換成圖片跟文字 -->
    <div class="storyTextCtrlEmpty">
                 <div class="storyTextCtrl">
                    <div class="storyText"><h4></h4></div>
                </div>
    </div>

                <div class="questionContainer">
                    <div class="questionIcon"></div>
                    <div class="questionTextCon">
                        <h4 id="questionline1"  class="textContent"></h4>
                        <h4 id="questionline2"  class="textContent"></h4>

                    </div>

                </div>
                <!-- 選項按鈕 -->
                <div class="btnContainer2">
                    
                </div>
            </div>

            
        </div>



        <!-- 雲朵 -->
        <div class="eight_cloudscontainer">
            
             <!-- 動畫區 -->
             <div class="ducklookaniCon"><video id="duckHappyAni" src="./images/animation/duckHappy.webm" loop autoplay muted></video>
             </div>

        </div>

    </section>
</div>
`]
    ]

    //猜猜我是誰背景
    const resultLoad = [`    <!-- 網頁版bg容器 -->
    <section class="webBgContainerload">

        <div class="load_bgContainer">






        </div>
        <!-- 猜猜我是誰區 -->
        <div style="display: flex;
    justify-content: center;">
        <div class="gueseWhoCon">

            <div>
            <img id="changePokemon" src="" alt="">
            </div>

        </div>
        <div class="guesstextCon">
        <h5 class="guessText1">我是誰</h5>
        <h5 class="guessText2">？？？？</h5>
        </div>
    </div>
    </section>
`]

    // 結果頁大背景
    const resultPageCon = [`        <section class="webBgContainerres">

            <div class="result_bgContainer">





                <!-- 題目選項按鈕區 -->
                <div class="questionAndbuttonConRe" style="height: 100%; justify-content: space-evenly;">
                    <!-- 題目 -->
                    <!-- .questionContainer換成圖片跟文字 -->

                    <div class="nameandattrContainer" style="height: 30%;">
                        <div class="bignameIcon">
                            <div class="nameIconCon"><img src="./images/result_Images/nameCon.svg" alt=""></div>
                            <h3 id="userNamePrint" class="nameText"></h3>
                        </div>
                        <div class="attrCon">
                            <h4 class="attrtextContent"></h4>


                        </div>

                        <!-- 標籤容器 -->
                        <div class="TagCon">
                        </div>

                    </div>


                    <section
                        style="height: 70%; display: flex; flex-direction: column; justify-content: space-evenly ; align-items: center; gap: 5px;">



                        <!-- 代表寶可夢容器 -->
                        <div class="nameandattrContainer">
                            <div class="pokeCon"><img src="" alt=""></div>

                            <div class="represent_Container">

                                <div class="represent_title">
                                    <h6>代表寶可夢</h6>
                                </div>
                                <div class="represent_name">
                                    <h4></h4>
                                </div>

                            </div>

                        </div>


                        <!-- 相剋相殺最佳拍檔容器 -->
                        <div class="friend_container">

                            <!-- 相剋相殺 -->
                            <div class="bad_friend">
                                <h6>相剋<br>相殺</h6>
                                <div class="friend_figure_container">
                                   
                                    
                                </div>
                            </div>
                            <!-- 最佳拍檔 -->
                            <div class="best_friend">
                               <h6>最佳<br>拍檔</h6>
                                <div class="friend_figure_container">
                                </div>
                            </div>
                        </div>
                        <!-- 按鈕區 -->
                        <div class="backReplaybtnCon">
                            <button id="backHome">官網逛逛</button>
                            <button id="Replay"><img src="./images/result_Images/ReplayIcon.png" alt=""> REPLAY</button>
                        </div>

                        <!-- 提醒字與分享按鈕 -->
                           <!-- AddToAny BEGIN -->
                        <div style="display: none;" class="ctrlShare">
                            <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
                                <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                                <a class="a2a_button_facebook"></a>
                                <a class="a2a_button_line"></a>
                            </div>
                            <script async src="https://static.addtoany.com/menu/page.js"></script>
                        </div>
                        <!-- AddToAny END -->
                        <div class="shareAndAlert">
                            <h4>長按螢幕可儲存結果圖片</h4>
                            <button id="shareIcon"><img src="./images/result_Images/ShareIcon.png" alt=""></button>
                        </div>
                        <!-- logo -->
                        <div class="footlogo">
                            <img src="./images/publicImg/logo.svg" alt="">
                        </div>
                    </section>
                </div>



            </div>


    </div>


    </div>




    </section>

        `
    ]





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
            // 控制字體大小rwd
            if ($(window).width() < 450){
                $('.storyText h4').css(
                    'font-size', '85%')
                }else{
                    $('.storyText h4').css(
                        'font-size', '90%')
                    }
            
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
                // $('.storyTextCtrl').empty()
                //移除文字框
                    $('.storyTextCtrlEmpty').remove()
                }
            

            setTimeout(emptyStoryText, 3300)

            //========= 3秒後改變問題框跟選項框動畫框visibility hidden=>visable
            const showQuestionandbutton = function () {
                $('.chubbyaniCon,.pokeaniCon,.btnContainer,.questionContainer,.btn3Container,.cakeCon,.meowaniCon,.btnContainer2,.six_Anicontainer,.btnContainer3').css('visibility', 'visible')
                // =======網頁版可達鴨容器透明度0=>1 
                $('.webduckaniCon').css('opacity', '1')
                // =======第八頁可達鴨快樂容器透明度0=>1
                $('.eight_cloudscontainer').css('opacity', '1')
            }
            setTimeout(showQuestionandbutton, 3500)

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
                    case 2:
                        $('.btn3Container').append(`
                            <button class="btn3_${i} option${i}">${questionData.option[i]}</button>`);

                        break;
                    case 3:
                        $('.btnContainer2').append(`
                                <button class="btn1 option${i}">${questionData.option[i]}</button>`);

                        break;
                    case 4:
                        $('.btnContainer3').append(`
                                    <button class="btn2 option${i}">${questionData.option[i]}</button>`);

                        break;
                    case 5:
                        $('.btnContainer').append(`
                                        <button class="btn1 option${i}">${questionData.option[i]}</button>`);

                        break;
                    case 6:
                        $('.btnContainer2').append(`
                                            <button class="btn1 option${i}">${questionData.option[i]}</button>`);

                        break;
                }
            }



        } else {
            //題目結束播放猜猜我是誰動畫跟結果印出userName
            // console.log('播放猜猜我是誰動畫跟結果')

            //印出結果加載頁load背景=======
            //背景音樂關閉===========
            bgmusic.muted = true


            $('.superBigWebCon').append(
                resultLoad[0]
            )
            // 清空結果加載頁==========
            function emptyLoadpage() {
                $('.superBigWebCon').empty()
                $('#soundContainer').css('visibility', 'hidden')
            }
            // 6秒後(猜猜我是誰音樂結束)清空容器內容
            setTimeout(emptyLoadpage, 5600)
            // 功能 播放猜猜我是誰音樂=======
            guessWhoSongCtrl()
            // console.log(`${userName}的寶可夢屬性是...`)
        }
    }

    //======== 結果加載頁圖片隨機功能
    function changePokemonImg() {
        //改變url
        let randomNum = Math.floor(Math.random() * 6)
        $('#changePokemon').attr("src", `./images/guessWhoPage/shadow${randomNum}.png`)
        // console.log(Math.floor(Math.random()*6))
    }

    //每80毫秒更換一次
    setInterval(function () {
        changePokemonImg()
    }, 80)
    //==================================



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

            //呼叫renderQuestion(currentQuestion)函數
            renderQuestion(currentQuestion)
            //呼叫showResult()函數 計算結果
            showResult()

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
    // ============顯示結果函式
    // 印出結果頁公版容器============

    function showresultCon() {
        // $('#soundContainer').css('visibility', 'visible')
        $('.superBigWebCon').append(resultPageCon[0])
        //印出使用者輸入的姓名 
        $('#userNamePrint').html(userName)
        // replay按鈕綁定重新加載
        $('#Replay').on('click',function(){
            location.reload()
        })
        //分享按鈕綁定切換顯示與關閉分享畫面
        $('#shareIcon').on('click', function () {
            $('.ctrlShare').toggle();
        });
        //判斷各屬性得分條件
        if (get3 == 2) {
            //索引值0=======百變怪

            //屬性描述=======
            $('.attrtextContent').html(everyAttrText[0].attrStament)
            //標籤內容==========
            for (let i = 0; i < 5; i++) {
                $('.TagCon').append(`<div id="Tag${i}">${everyAttrText[0].tagContent[i]}</div>
                        `)
            }
            //代表寶可夢圖片======
            $('.pokeCon img').attr('src', `${everyAttrText[0].representiveImg}`)
            //代表寶可夢名字======
            $('.represent_name h4').html(everyAttrText[0].representiveName)

            // 隱藏相剋相殺 最佳拍檔容器
            $('.friend_container').css('visibility', 'hidden')
            //改變顏色=======
            $('.attrtextContent,.represent_name h4,.friend_container h6').css('color', '#CBB9FA')
            $('.TagCon div,.webBgContainerres').css('background-color', '#CBB9FA')

            console.log('你是：百變怪')


        } else if (get0 == 7 || get1 == 7 || get2 == 7) {
            //索引值1=======超能力系
            //屬性描述=======
            $('.attrtextContent').html(everyAttrText[1].attrStament)
            //標籤內容==========
            for (let i = 0; i < 5; i++) {
                $('.TagCon').append(`<div id="Tag${i}">${everyAttrText[1].tagContent[i]}</div>
                        `)
            }
            //代表寶可夢圖片======
            $('.pokeCon img').attr('src', `${everyAttrText[1].representiveImg}`)
            //代表寶可夢名字======
            $('.represent_name h4').html(everyAttrText[1].representiveName)
            //相剋相殺圖片跟文字清空========
            $('.bad_friend').remove()
            //最佳拍檔圖片跟文字========
            for (let i = 0; i < everyAttrText[1].bestfriendImg.length; i++) {
                $('.best_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[1].bestfriendText[i]}</p>
                                        <img src="${everyAttrText[1].bestfriendImg[i]}">
                                    </figure>
                                
                            `)
            }
            //最佳拍檔畫面置中
            $('.friend_container').css('justify-content', 'center')

            //改變顏色=======
            $('.attrtextContent,.represent_name h4,.friend_container h6').css('color', '#6CDBFC')
            $('.TagCon div,.webBgContainerres').css('background-color', '#FFC4FA')

            console.log('你是：超能力屬性')


        } else if (get0 == 6 || get1 == 6 || get2 == 6) {
            //索引值2=======岩屬性
            //屬性描述=======
            $('.attrtextContent').html(everyAttrText[2].attrStament)
            //標籤內容==========
            for (let i = 0; i < 5; i++) {
                $('.TagCon').append(`<div id="Tag${i}">${everyAttrText[2].tagContent[i]}</div>
                        `)
            }
            //代表寶可夢圖片======
            $('.pokeCon img').attr('src', `${everyAttrText[2].representiveImg}`)
            //代表寶可夢名字======
            $('.represent_name h4').html(everyAttrText[2].representiveName)
            //相愛相殺圖片跟文字========
            for (let i = 0; i < everyAttrText[2].badfriendImg.length; i++) {
                $('.bad_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[2].badfriendText[i]}</p>
                                        <img src="${everyAttrText[2].badfriendImg[i]}">
                                    </figure>
                                
                            `)
            }
            //最佳拍檔圖片跟文字========
            for (let i = 0; i < everyAttrText[2].bestfriendImg.length; i++) {
                $('.best_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[2].bestfriendText[i]}</p>
                                        <img src="${everyAttrText[2].bestfriendImg[i]}">
                                    </figure>
                                
                            `)
            }

            //改變顏色=======
            $('.attrtextContent,.represent_name h4,.friend_container h6').css('color', '#CBCBBD')
            $('.TagCon div,.webBgContainerres').css('background-color', '#CBCBBD')



            console.log('你是：岩屬性')


        } else if (get0 == 5 || get1 == 5 || get2 == 5) {
            //索引值3=======草屬性
            //屬性描述=======
            $('.attrtextContent').html(everyAttrText[3].attrStament)
            //標籤內容==========
            for (let i = 0; i < 5; i++) {
                $('.TagCon').append(`<div id="Tag${i}">${everyAttrText[3].tagContent[i]}</div>
                        `)
            }
            //代表寶可夢圖片======
            $('.pokeCon img').attr('src', `${everyAttrText[3].representiveImg}`)
            //代表寶可夢名字======
            $('.represent_name h4').html(everyAttrText[3].representiveName)
            //相愛相殺圖片跟文字========
            for (let i = 0; i < everyAttrText[3].badfriendImg.length; i++) {
                $('.bad_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[3].badfriendText[i]}</p>
                                        <img src="${everyAttrText[3].badfriendImg[i]}">
                                    </figure>
                                
                            `)
            }
            //最佳拍檔圖片跟文字========
            for (let i = 0; i < everyAttrText[3].bestfriendImg.length; i++) {
                $('.best_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[3].bestfriendText[i]}</p>
                                        <img src="${everyAttrText[3].bestfriendImg[i]}">
                                    </figure>
                                
                            `)
            }
            //改變顏色=======
            $('.attrtextContent,.represent_name h4,.friend_container h6').css('color', '#E4EFB7')
            $('.TagCon div,.webBgContainerres').css('background-color', '#E4EFB7')


            console.log('你是：草屬性')

        } else if (get0 == 4 || get1 == 4 || get2 == 4) {
            //索引值4=======雷屬性
            //屬性描述=======
            $('.attrtextContent').html(everyAttrText[4].attrStament)
            //標籤內容==========
            for (let i = 0; i < 5; i++) {
                $('.TagCon').append(`<div id="Tag${i}">${everyAttrText[4].tagContent[i]}</div>
                        `)
            }
            //代表寶可夢圖片======
            $('.pokeCon img').attr('src', `${everyAttrText[4].representiveImg}`)
            //代表寶可夢名字======
            $('.represent_name h4').html(everyAttrText[4].representiveName)
            //相愛相殺圖片跟文字========
            for (let i = 0; i < everyAttrText[4].badfriendImg.length; i++) {
                $('.bad_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[4].badfriendText[i]}</p>
                                        <img src="${everyAttrText[4].badfriendImg[i]}">
                                    </figure>
                                
                            `)
            }
            //最佳拍檔圖片跟文字========
            for (let i = 0; i < everyAttrText[4].bestfriendImg.length; i++) {
                $('.best_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[4].bestfriendText[i]}</p>
                                        <img src="${everyAttrText[4].bestfriendImg[i]}">
                                    </figure>
                                
                            `)
            }

            //改變顏色=======
            $('.attrtextContent,.represent_name h4,.friend_container h6').css('color', '#FFE050')
            $('.TagCon div,.webBgContainerres').css('background-color', '#FFE050')


            console.log('你是：雷屬性')


        } else if (get0 == 3 || get1 == 3) {
            //索引值5=======水屬性
            //屬性描述=======
            $('.attrtextContent').html(everyAttrText[5].attrStament)
            //標籤內容==========
            for (let i = 0; i < 5; i++) {
                $('.TagCon').append(`<div id="Tag${i}">${everyAttrText[5].tagContent[i]}</div>
                        `)
            }
            //代表寶可夢圖片======
            $('.pokeCon img').attr('src', `${everyAttrText[5].representiveImg}`)
            //代表寶可夢名字======
            $('.represent_name h4').html(everyAttrText[5].representiveName)
            //相愛相殺圖片跟文字========
            for (let i = 0; i < everyAttrText[5].badfriendImg.length; i++) {
                $('.bad_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[5].badfriendText[i]}</p>
                                        <img src="${everyAttrText[5].badfriendImg[i]}">
                                    </figure>
                                
                            `)
            }
            //最佳拍檔圖片跟文字========
            for (let i = 0; i < everyAttrText[5].bestfriendImg.length; i++) {
                $('.best_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[5].bestfriendText[i]}</p>
                                        <img src="${everyAttrText[5].bestfriendImg[i]}">
                                    </figure>
                                
                            `)
            }


            //改變顏色=======
            $('.attrtextContent,.represent_name h4,.friend_container h6').css('color', '#92E2FB')
            $('.TagCon div,.webBgContainerres').css('background-color', '#92E2FB')


            console.log('你是：水屬性')

        } else {
            //索引值6=======火屬性
            //屬性描述=======
            $('.attrtextContent').html(everyAttrText[6].attrStament)
            //標籤內容==========
            for (let i = 0; i < 5; i++) {
                $('.TagCon').append(`<div id="Tag${i}">${everyAttrText[6].tagContent[i]}</div>
                        `)
            }
            //代表寶可夢圖片======
            $('.pokeCon img').attr('src', `${everyAttrText[6].representiveImg}`)
            //代表寶可夢名字======
            $('.represent_name h4').html(everyAttrText[6].representiveName)
            //相愛相殺圖片跟文字========
            for (let i = 0; i < everyAttrText[6].badfriendImg.length; i++) {
                $('.bad_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[6].badfriendText[i]}</p>
                                        <img src="${everyAttrText[6].badfriendImg[i]}">
                                    </figure>
                                
                            `)
            }
            //最佳拍檔圖片跟文字========
            for (let i = 0; i < everyAttrText[6].bestfriendImg.length; i++) {
                $('.best_friend div').append(` 
                               
                                    <figure>
                                        <p>${everyAttrText[6].bestfriendText[i]}</p>
                                        <img src="${everyAttrText[6].bestfriendImg[i]}">
                                    </figure>
                                
                            `)
            }

           

            console.log('你是：火屬性')
        }
    }


    //=======================判斷答題是否完成 完成就顯示結果函式
    async function showResult() {


        //判斷答題是否完成 答案長度 ＝ 題目長度
        if (userSelect.length == allQuestion.length) {




            //結果加載頁播放並清空後5601毫秒後 呼叫顯示結果 
            setTimeout(showresultCon, 5601)
        }



    }





})

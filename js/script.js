$(function () {
    const panelNumber = 10;
    let nextPanelNum = 1;
    let currentTime = 0;
    const panelNumArr = [];
    let startWatch = '';
    let isRunning = false;
    //ゲームをスタートする関数
    function gameStart() {
        for (let i = 1; i <= panelNumber; i++) {
            panelNumArr.push(i);
        }
        console.log(panelNumArr);
        //シャッフルのアルゴリズムを利用
        for (let i = panelNumArr.length - 1; i > 0; i--) {
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = panelNumArr[i];
            panelNumArr[i] = panelNumArr[r];
            panelNumArr[r] = tmp;
        }
        //panelNumberで指定した数だけカードを表示させる処理
        for (let j = 0; j < panelNumber; j++) {
            $(".panelarea").append(`<div class="btn" data-panelNum="${panelNumArr[j]}">${panelNumArr[j]}</div>`);
        }
        //生成させた数字のパネルにクリックイベントを付与し、正しい順番でクリックされた時は黒くする(inactiveというクラスをつける)
        $(document).on("click", ".btn", function () {
            let val = $(this).attr("data-panelNum");
            if (val != nextPanelNum) {
                return false;
            }
            else {
                $(this).addClass("inactive");
                nextPanelNum = calculateNextPanelNum(nextPanelNum);
                console.log(nextPanelNum);
                if (nextPanelNum == panelNumber + 1) {
                    checkScore();
                }
            }
        });
        //クリックされるたび、１を足して次に押されるべき数字を返す
        function calculateNextPanelNum(nextPanelNum) {
            nextPanelNum = nextPanelNum + 1;
            return nextPanelNum;
        }
        //（すべて終わった時に呼び出し、スコアを表示させる）
        function checkScore() {
            clearInterval(startWatch);
            alert(`おめでとう！スコア ${currentTime}`)
        }
    }
    
    //スタートボタンを押したときの処理。タイマーをスタートさせ、isRunningをtrueにする
    $("#startBtn").on('click', function () {
        if(isRunning == false) {
            isRunning = true;
        }else{
            return false;
        }
        gameStart();
        startWatch = setInterval(function () {
            currentTime += 1;
            $("#score").html(Math.floor(currentTime))
        }, 10);
    });
});
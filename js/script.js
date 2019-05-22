$(function () {
    const panelNumber = 10;
    let nextPanelNum = 1;
    let currentTime = 0;
    let panelNumArr = [];
    let startWatch;
    let isRunning = false;

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

        for (let j = 0; j < panelNumber; j++) {
            $(".panelarea").append(`<div class="btn" data-panelNum="${panelNumArr[j]}">${panelNumArr[j]}</div>`);
        }
        
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

        function calculateNextPanelNum(nextPanelNum) {
            nextPanelNum = nextPanelNum + 1;
            return nextPanelNum;
        }

        function checkScore() {
            clearInterval(startWatch);
            alert(`おめでとう！スコア ${currentTime}`)
        }
    }
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
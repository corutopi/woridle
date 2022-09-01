
const FORM = document.getElementById("submit-button");
const ANSWER = "いのおけい";
const MAX_REPLAY_NUM = 5;

let finishFlg = 0;
let inputCounter = 1;

FORM.addEventListener("click", submitIdleName, false);
loadReplay();

function submitIdleName(event) {
    event.preventDefault();

    const s = document.getElementById("input").value;

    if (finishFlg == 1) {return};
    // if (MAX_REPLY_NUM < inputCounter) return;
    if (s == "") return;

    const d = document.getElementById("result" + inputCounter);
    console.log(inputCounter)

    d.innerText = checkString(s.split(""), ANSWER.split(""));
    document.getElementById("input").value = "";
    inputCounter++;
    saveReplay();

    // ゲーム終了判定
    if (s == ANSWER) {
        document.getElementById("finish").innerText = "Congraturation!";
        finishFlg = 1;
        saveResult();
    } else if (inputCounter > MAX_REPLAY_NUM) {
        document.getElementById("finish").innerText = `You are Faild... Answer is ${ANSWER}`;
        finishFlg = 1;
        saveResult();
    }
}

function checkString(idle, ans) {
    // 引数チェック
    if (!(idle instanceof Array)) {
        throw new TypeError("${idle} is not Array.")
    }
    if (!(ans instanceof Array)) {
        throw new TypeError("${ans} is not Array.")
    }

    // 判定処理
    res = []
    for (let i = 0; i < idle.length; i++) {
        let tmp = ""
        if (i < ans.length && idle[i] == ans[i]) {
            tmp = "○"
        } else if (ans.includes(idle[i])) {
            tmp = "△"
        } else {
            tmp = "×"
        }
        res.push(tmp)
    }
    return res
};

function saveReplay(){
    let xxx = [];
    for (let i = 1; i <= MAX_REPLAY_NUM; i++) {
        xxx.push(document.getElementById("result" + i).innerText);
    }
    localStorage.setItem("woridle", JSON.stringify(xxx));
}

function loadReplay(){
    let xxx = JSON.parse(localStorage.getItem("woridle"))
    for (let i = 1; i <= MAX_REPLAY_NUM; i++) {
        document.getElementById("result" + i).innerText = xxx[i - 1];
        if (xxx[i - 1] != "　") {
            console.log(xxx[i - 1]);
            inputCounter++;
        }
    }
    console.log(inputCounter);
}

function saveResult(){

}
const wordsList = [
  "ability",
  "able",
  "above",
  "anywhere",
  "badly",
  "busy",
  "chicken",
  "country",
  "drink",
  "expectation",
  "explain",
  "forward",
  "found",
  "govern",
  "government",
  "holder",
  "mistake",
  "month",
  "powerful",
  "preparation",
  "protection",
  "flowing",
  "scientist",
  "secondary",
  "silly",
  "single",
  "suddenly",
];

const displayQuestion = document.getElementById("question");
const displayInput = document.getElementById("input");
const displayTime = document.getElementById("timer");
const displayMessage = document.getElementById("message");
const displayScore = document.getElementById("score");
const displayMistake = document.getElementById("mistake");
const button = document.getElementById("start");

//制限時間
let time = 30;
//単語のindex
let charIndex = 0;
//配列のindex
let wordIndex = 1;
//スコア
let score = 0;
//ミスタイプの数
let mistake = 0;

/**
 * スタートボタンが押されたら初期化処理が実行される
 */
function onButtonClick() {
  init();
  //ボタンが非表示になる
  button.style.display = "none";
}

/**
 * 初期化処理
 */
function init() {
  pickAndShowQuestion();
  setInterval(countdown, 1000);
}

/**
 * 配列をシャッフルして最初の問題文を表示する。
 */
function shuffleAndShowQuestion() {
  for (i = wordsList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = wordsList[i];
    wordsList[i] = wordsList[j];
    wordsList[j] = tmp;
  }
  displayQuestion.innerHTML = wordsList[0];
}

/**
 * 次の問題文を表示する。
 */
function nextQuestion() {
  displayQuestion.innerHTML = wordsList[wordIndex];
  displayInput.innerHTML = "";
  charIndex = 0;
  score++;
  wordIndex++;
}

/**
 * カウントダウン処理
 */
function countdown() {
  displayTime.innerHTML = time;
  if (time === 0) {
    finishGame();
    return;
  }
  time--;
}

//キーボードを押した時の処理
document.onkeydown = function (e) {
  //押したキーボードと問題文の文字が合っているいるかどうかをチェック
  if (e.key === displayQuestion.innerHTML[charIndex]) {
    displayInput.innerHTML = displayInput.innerHTML + e.key;
    charIndex++;
    //入力文字数が問題文の文字数と同じになったら（最後まで入力したら）、次の問題へ
    if (displayQuestion.innerHTML.length === displayInput.innerHTML.length) {
      nextQuestion();
    }
  } else {
    mistake++;
  }
};

function finishGame() {
  displayMessage.innerHTML = "Finish!!";
  displayQuestion.innerHTML = "";
  displayInput.innerHTML = "";
  displayScore.innerHTML = "得点は" + score + "点でした";
  displayMistake.innerHTML = "ミスタイプ数は" + mistake + "回でした";
}

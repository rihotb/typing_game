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
  "against",
  "further",
  "husband",
  "mainly",
  "ownership",
  "rather",
  "south",
  "suggestion",
];

const displayQuestion = document.getElementById("question");
const displayInput = document.getElementById("input");
const displayTime = document.getElementById("timer");
const displayMessage = document.getElementById("message");
const displayResult = document.getElementById("result");
const button = document.getElementById("start");

//制限時間
let time = 30;
//単語のindex
let charIndex;
//配列のindex
let wordIndex;
//タイプミス数
let mistake;
//総タイプ数
let allType;
//正解率
let correctRate;
//残り時間
let timeLeft;
let score;

/**
 * スタートボタンが押されたら初期化処理が実行される
 */
function onButtonClick() {
  init();
  //ボタンが非表示になる
  button.style.visibility = "hidden";
}

/**
 * 初期化処理
 */
function init() {
  shuffleAndShowQuestion();
  timeLeft = time;
  timer = setInterval(countdown, 1000);
  clearData();
}

function clearData() {
  displayMessage.innerHTML = "";
  displayResult.innerHTML = "";
  correctRate = 0;
  mistake = 0;
  allType = 0;
  score = 0;
  charIndex = 0;
  wordIndex = 1;
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
  wordIndex++;
}

/**
 * カウントダウン処理
 */
function countdown() {
  if (timeLeft === 0) {
    clearInterval(timer);
    finishGame();
    return;
  }
  displayTime.innerHTML = timeLeft;
  timeLeft--;
}

/**
 * キーボードを押した時に動く
 */
document.onkeydown = function (e) {
  if (!displayQuestion.innerHTML) {
    return;
  }
  allType++;
  //押したキーボードと問題文の文字が合っているいるかどうかをチェック
  if (e.key === displayQuestion.innerHTML[charIndex]) {
    displayInput.innerHTML = displayInput.innerHTML + e.key;
    charIndex++;
    score++;
    //入力文字数が問題文の文字数と同じになったら（最後まで入力したら）、次の問題へ
    if (displayQuestion.innerHTML.length === displayInput.innerHTML.length) {
      nextQuestion();
      correctSound();
    }
  } else {
    mistake++;
    missSound();
  }
};

/**
 * 単語を入力し終わったら正解音が鳴る
 */
function correctSound() {
  const correct = new Audio();
  correct.src = "./sound/correct.mp3";
  correct.play();
}

/**
 * タイプミスしたらブザー音が鳴る
 */
function missSound() {
  const buzzer = new Audio();
  buzzer.src = "./sound/buzzer.mp3";
  buzzer.play();
}

/**
 * ゲームが終了したら動く
 */
function finishGame() {
  //正解率を計算する
  correctRate = Math.round(((allType - mistake) / allType) * 100);
  displayTime.innerHTML = "";
  displayMessage.innerHTML = "結果";
  displayQuestion.innerHTML = "";
  displayInput.innerHTML = "";
  displayResult.innerHTML =
    "スコアは" +
    score +
    "点でした<br>" +
    "正解率は" +
    correctRate +
    "%でした<br>" +
    "タイプミス数は" +
    mistake +
    "回でした";
  button.style.visibility = "visible";
}

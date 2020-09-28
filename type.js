let countriesList = [
  "アフガニスタン",
  "アルバニア",
  "アルジェリア",
  "アンゴラ",
  "アルゼンチン",
  "アルメニア",
  "オーストラリア",
  "オーストリア",
  "アゼルバイジャン",
  "バハマ",
  "バーレーン",
  "バングラデシュ",
  "バルバドス",
  "ベラルーシ",
  "ベルギー",
  "ブータン",
  "ボリビア",
  "カンボジア",
  "カメルーン",
  "カナダ",
  "チリ",
  "中国",
  "コロンビア",
  "コンゴ",
  "コスタリカ",
  "メキシコ",
  "インドネシア",
  "タイ",
  "ラオス",
  "フランス",
];

//配列の値をシャッフルする
for (i = countriesList.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  let tmp = countriesList[i];
  countriesList[i] = countriesList[j];
  countriesList[j] = tmp;
}

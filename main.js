// 変数の初期化
let untyped = '';
let typed = '';

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield   = document.getElementById('typed');
const wrap         = document.getElementById('wrap');
const start        = document.getElementById('start');
const count        = document.getElementById('count');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {

  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;


  // 配列のインデックス数からランダムな数値を生成し、変数に代入する
  let random = Math.floor(Math.random() * textLists.length);

  // 変数untypedに配列textListsからテキストを代入する
  // 代入するテキストは上記ランダムで生成したrandomな数値の序列のテキストを代入する
  untyped = textLists[random];
  // untypedfieldに上記untypedに代入したテキストを追加する
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {

  // 誤タイプの場合
  // もしe.key(キー入力した文字)とuntypedの先頭文字が異なれば、終了する。
  if (e.key !== untyped.substring(0, 1)) {

    // wrapのHTML要素を取得し、そこに`mistyped`というclassを加える
    // cssで`mistyped`クラスの背景色を設定しておく。
    wrap.classList.add('mistyped');

    // 100ms後に背景色をもとに戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合
  // wrapのHTML要素を取得し、そこに`mistyped`というclassがあれば取り除く
  wrap.classList.remove('mistyped');
  typed  += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent   = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if (untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  console.log('ゲーム終了!');
};

// カウントダウンタイマー
const timer = () => {

  // タイマー部分のHTML要素(p要素)を取得する
  let time = count.textContent;

  const id = setInterval(() => {

    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
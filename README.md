# Typing Game

JavaScriptでタイピングゲームを作成する。

## 機能分解

必要な機能を分解して考える

- ランダムなテキストを表示  
  順番に表示するだけでは次のテキストがわかってゲームとして面白くない

- キー入力の判定  
  キー入力とタイピングテキストの文字が合致するか判定。
  大文字・小文字の区別も判定

- タイピングスキルのランクを判定  
  正しく入力した文字数をカウントして、結果をランク分け

- ゲームを終了する  
  一定時間経過後にゲームを終了させる

- カウントダウンタイマー  
  残り時間をカウントダウンする

## テキストを表示
### キーワード
- `getElementById`メソッド: id属性を指定し、合致するHTML要素を取得
- `Math.random()`メソッド: 0以上1未満の小数点以下の値をランダムに取得
- `Math.floor()`メソッド: 小数点以下を切り捨てる
- `Math.ceil()`メソッド: 小数点以下を切り上げる
- `Math.random()`と`Math.floor()`を組み合わせてテキストランダムに表示

### 手順
- JavaScriptに複数のテキストを格納する配列を作成する。

- 格納された文字列を画面に表示する

1. `getElementById()`メソッドでHTML要素を取得する

`getElementById()`メソッド: HTML要素のid属性の値を指定して、一致する要素を取得するメソッド
```
document.getElementByid(id 属性の値);
```
`getElementById()`メソッドの引数(id属性の値)にuntypedを指定。

2. `getElementById()`で取得したHTML要素に対し、`textContent`プロパティを設定し、画面にテキストを表示する。

`textContent`プロパティ: HTML要素にテキストを追加する。

## ランダムに表示する仕組みを作成

配列のインデックス番号をランダムに指定するようにする。
`Math.random()`メソッドを使う。

`Math.random()`メソッド: 0以上1未満のランダムな数値を作る。
`配列.length`プロパティ: 配列の要素数を取得する。
`Mth.floor()`メソッド':小数点以下を切り捨てる。

上記を組み合わせて、格納した配列の数を上限として、整数値をランダムに出力できる。
```
console.log(Math.floor(Math.random() * textLists.length));
```

## キー入力で文字列を取得
やること
- 入力した文字を取得する
- 正タイプであれば文字色を変える

### 入力された文字を取得

#### イベントとイベントリスナー
- イベント: ボタンをクリックしたり、キーを入力したりすること
- イベントリスナー: イベントをきっかけに介しする処理のこと

イベントとイベントリスナーを対応づける`addEventListener()`メソッド
書き方
```
対象要素.addEventListener(イベント, イベント発生時に呼び出す関数);
```

キーを入力したら関数`keyPress`を呼び出す場合
```
document.addEventListener('keypress', keyPress);
```

イベントの種類
- click
- mousedown
- mouseup
- mousemove
- keypress
- submit
- focus
- scroll

#### イベントオブジェクト
イベントオブジェクト: イベントのすべての情報が詰まったもの
すべての情報とは「何の要素に」「何をきっかけに」「何のキーが入力された」など。

`addEventListener()`メソッドで呼び出す関数には、イベントオブジェクトが渡される。  
イベントオブジェクトは通常、`e`や`event`という引数で渡される。  
  
このイベントオブジェクト`e`から「どのキーが入力されたか」という情報を取得すれば良い。  
「どのキーが入力されたか」という情報は`key`プロパティに入っているので、`e.key`で取り出せる。

### 正タイプで文字色を変える

`substring()`メソッドを使う

`substring()`メソッド: 文字列の一部を抽出する

```
let text = 'Hello World';
text.substring(開始インデックス, 終了インデックス);
```
「開始インデックス」から「終了インデックス」までの文字列を抽出する。  
「終了インデックス」は省略可能。省略すると開始インデックス以降すべて抽出。

```
let text = 'Hello World';
text.substring(0, 1); // Hが抽出
```

- 入力済み文字列を入れる変数を作る(今回は`typed`という名前)
- `getElementById()`メソッドで入力済み文字列を表示するためのHTML洋をを取得する(今回は`typedfield`という名前)
- 変数`untyped`の先頭文字を取得し、変数`typed`の末尾に追加
- 変数`untyped`に2文字目以降の文字列を再代入(変数`untyped`の先頭文字を削除)
- 定数`typedfield`の`textContent`プロパティに変数`typed`を代入する
- 定数`untypedfield`の`textContent`プロパティに変数`untyped`を代入する

## キー入力で入力されたキーを判定

### 誤タイプのときは反応させないという処理
入力された文字は`e.key`で取得できる。
入力された文字と比較するテキストの先頭文字を取得する必要がある。
→`substring(0,1)`で取得できる。

関数`keyPress`を編集
- 入力された文字(`e.key`)と変数`untyped`の先頭文字を比較
- 不一致の場合、終了(`return`)する

### 誤タイプであることを示す
1. `getElementById()`メソッドで背景部分のHTML要素を取得する
2. 関数`keyPress`を編集し、誤タイプのときに背景色を変更する。
    `classList.add()`メソッドでclass属性(`mistyped`)を追加し、背景色変更。
3. 関数`keyPress`を編集し、正タイプのときに背景色を元に戻す。
    `classList.remove()`メソッドでclass属性(`mistyped`)を削除し、背景色を元に戻す。

## タイマー機能

やること
1. スタートボタンでカウントダウンタイマーを起動
2. 誤タイプ時にもタイマー処理を入れる
3. ゲームオーバー処理を作成

### スタートボタンでゲームを開始

スタートボタンをクリックしてから以下を実行
- 関数createText(): ランダムなテキストを表示する
- document.addEventListener('keypres', keyPress): キー入力イベントを受け付ける

スタートボタンをクリックして、「スタート」ボタンを非表示にする
-> `style.display`プロパティに`none`を代入して非表示

### タイマー

#### setInterval()メソッド

5秒間隔や10秒間隔など一定の間隔で処理を実行し続けるメソッド

タイマーとして処理する場合、以下の処理間隔と処理を実行
- 処理間隔: 1000ミリ秒 (1秒)
- 処理: カウントダウンタイマーの値を1ずつ減らす

#### clearInterval()メソッド

タイマー処理を止めるメソッド
`setInterval()`メソッドの処理が永久に実行され続けるのは問題なので止める必要がある。

`clearInterval()`メソッドの書き方
```
const id = setInterval(() => {
  処理;
  if(タイマーを止めるための条件) {
    clearInterval(id);
  }
}, 処理間隔);
```

今回のカウントダウンタイマーは以下の設定が必要
- 処理間隔: 1000ミリ秒 (1秒)
- 処理: カウントダウンタイマーの値を1ずつ減らす
- タイマーを止めるための条件: カウントダウンタイマーの値が0以下

## 誤タイプ時の処理を一種にする

- `setInterval()`メソッド: 一定時間ごとに特定の処理を繰り返す
- `setTimeout()`メソッド: 一定時間後に一度だけ特定の処理を行う

`setIimeout()`メソッドを使って、誤タイプ時に一定時間だけ背景色を変更する。

## ゲームオーバー処理
関数`timer`
- カウントが0担ったときに関数`gameOver`を呼び出す
- 関数`gameOver`の引数に`id`(`setInterval()`メソッドの戻り値)を渡す

関数`gameOver`
- 引数`id`(`setInterval()`メソッドの戻り値)を受け取って、カウントダウンを停止してコンソールログにメッセージを表示する

## 振り返り
- JavaScriptには2種類のタイマー処理がある
  - `setInterval()`メソッド: 指定時間毎に特定の処理を繰り返す
  - `setTimeout()`メソッド: 指定時間後に一度だけ特定の処理を行う
- `setInterval()`メソッドと`clearInterval()`メソッドはセットで使う
- `setInterval()`メソッドはカウントダウンタイマーに使う
- `setTimeout()`メソッドは誤タイプ時に背景色を変更するときに使う

## 判定結果

- テンプレートリテラル: バッククオートで文字列を囲むJavaScriptの機能
  テンプレートリテラルで囲った文字列内に`${変数名}`と記述すると、文字列に変数を埋め込むことができる。

```
return `${score}`文字打てました!;
```

### `confirm()`メソッド
- 処理の内容: 「OK」「キャンセル」ボタン付きのダイアログを表示する。
    戻り地でとちらのボタンがクリックされたかを判別できる
- 引数: ダイアログに表示する文字列
- 戻り値
   - 「OK」ボタンがクリックされた場合->`true`
   - 「キャンセル」ボタンがクリックされた場合->`false`

## ランク判定機能
1. テキストを格納する変数を作る
2. スコアに応じて異なるメッセージを変数textに格納する
3. 「OK」ボタンをクリックしたら、ブラウザをリロードするように記述する
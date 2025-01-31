"use strict";

export let ja: any = {
    "sample": "こんちゃーす！",
    "description": {
        "headline": "チャプターの始まりを示します。\n\"= 見出し\" という形式で書きます。",
        "column": "コラムの始まりを示します。\n\"===[column] 見出し\" という形式で書きます。\n\"===[/column]\"を使うか、次の見出しが始まるとコラムの終わりになります。",
        "ulist": "番号なし箇条書きを示します。*記号をつなげて書くとさらにインデントした箇条書きにする事ができます。\n * 食料品を買うこと。\n ** 牛乳\n ** にんじん\nという形式で書きます。行頭に必ず半角スペースが必要です。",
        "olist": "数字付き箇条書きを示します。\n 1. はじめに神は天と地とを想像された。\n 2. 地は形なく、むなしく、やみが淵のおもてにあり、神の霊が水のおもてをおおっていた。\nという形式で書きます。行頭に必ず半角スペースが必要です。",
        "dlist": "用語リストを示します。\n: レバガチャ\n  レバーをガチャガチャ動かすこと。熟練者はレバガチャすべき時としない時を明確に使い分け勝利を掴み取る。\nという形式で書きます。本文の行は先頭に半角スペースかタブが必要です。",
        "block_list": "リストを示します。技術書ではプログラムコードの掲載に使います。\n//list[label][caption]{\nalert(\"Hello!\");\n//}\nという形式で書きます。",
        "inline_list": "リストへの参照を示します。\n//list[hoge][caption]{alert(\"Hello!\");\n//}\n を参照する時は @<list>{hoge} と書きます。",
        "block_listnum": "行番号付きのリストを示します。\n//listnum[hello.js][ハローワールド]{\nconsole.log(\"Hello world!\");\n//}\nという形式で書きます。",
        "block_emlist": "非採番のリストを示します。\n//emlist[ハローワールド]{\nconsole.log(\"Hello world\");\n//}\nという形式で書きます。",
        "block_emlistnum": "行番号付きの非採番のリストを示します。\n//emlistnum{\nconsole.log(\"Hello world\");\n//}\nという形式で書きます。",
        "block_image": "図表を示します。\n//image[sample][サンプル][scale=0.3]{\nメモ\n//}\nという形式で書きます。\n章のファイル名がtest.reの場合、images/test/sample.jpgが参照されます。\n画像のサイズを調整したい場合、scaleで倍率が指定できます。\n中に書かれているメモは無視されます。",
        "block_indepimage": "非採番の図表を示します。\n//image[sample][サンプル][scale=0.3]{\nメモ\n//}\nという形式で書きます。詳細は //image と同様です。",
        "block_graph": "グラフを示します。\n//graph[sample][ツール名][サンプル]{\nメモ\n//}\nという形式で書きます。\n文章中から参照する時は@<img>{sample}が利用できます。\n中に書かれているメモは無視されます。",
        "inline_img": "図表への参照を示します。\n//image[sample][サンプル]{\n//}\nを参照するときは @<img>{sample} と書きます。",
        "inline_icon": "文中に表示される図表を示します。\n@<icon>{sample}という形式で書きます。章のファイル名がtest.reの場合、images/test-sample.jpenが参照されます。",
        "block_footnote": "脚注を示します。\n//footnote[sample][サンプルとしてはいささか豪華すぎるかも！]\nという形式で書きます。",
        "inline_fn": "脚注への参照を示します。\n//footnote[sample][サンプルというにはショボすぎる]\nを参照するときは @<fn>{sample} と書きます。",
        "block_lead": "リード分を示します。\n//lead{\n世界を変えたくはないか？\n//}\nという形式で書きます。lead記法中では、全てのインライン構文やブロック構文が利用できます。",
        "block_noindent": "パラグラフを切らずに次の要素を続けることを示します。\n//noindent\nという形式で書きます。",
        "block_source": "ソースコードの引用を示します。\n//source[hello.js]{\nconsole.log(\"Hello world!\");\n//}\nという形式で書きます。",
        "block_cmd": "コマンドラインのキャプチャを示します。\n//cmd{\n$ git clone git@github.com:vvakame/review.js.git\n//}\nという形式で書きます。",
        "block_quote": "引用を示します。\n//quote{\n神は言っている…ここで死ぬ定めではないと…\n//}\nという形式で書きます。",
        "inline_hd": "TODO 後で書く。見出し参照を作成する。",
        "inline_code": "短いプログラムコードを記述します。\n@<code>{alert(\"Hello!\");}\n長いソースコードにはlist記法を使いましょう。",
        "inline_br": "改行を示します。リスト内での改行や、段落を変えずに改行をしたい場合に使います。",
        "inline_u": "下線にします。\n@<u>{この部分が下線になる}",
        "inline_ruby": "読み仮名を振ります。\n@<ruby>{羊,ひつじ}",
        "inline_b": "ボールド(太字)にします。\n@<b>{この部分が太字になる}",
        "inline_href": "リンクを示します。\nURLを書きたい場合に使います。\n@<href>{https://github.com/vvakame/review.js} または @<href>{https://github.com/vvakame/review.js, review.js} という形式で書きます。",
        "block_label": "アンカーを示します。\n@<href>{#anchor}から飛んで来られるようにするためには\n//label[anchor]\nという形式で書きます。",
        "inline_kw": "キーワードを示します。\nそれはおかしいだろう@<kw>{JK, 常識的に考えて}。\nという形式で書きます。",
        "inline_tti": "テレタイプ文字(等幅フォント)のイタリックで出力することを示します。\n@<tti>{keyword}\nという形式で書きます。",
        "inline_ttb": "テレタイプ文字(等幅フォント)のボールドで出力することを示します。\n@<ttb>{class}\nという形式で書きます。",
        "inline_ami": "網掛け有りで出力することを示します。\n@<ami>{重点！}\nという形式で書きます。",
        "inline_bou": "傍点有りで出力することを示します。\n@<bou>{なんだって？}\nという形式で書きます。",
        "inline_i": "イタリックで出力することを示します。\n@<i>{斜体}\nという形式で書きます。",
        "inline_m": "TeXの式を挿入することを示します。\n@<m>{TeX式}\nという形式で書きます。",
        "inline_strong": "ボールドで出力することを示します。\n@<strong>{強調！}\nという形式で書きます。",
        "inline_uchar": "指定された値を16進数の値として扱い、Unicode文字として出力することを示します。\n@<uchar>{1F64B}\nという形式で書きます。",
        "inline_tt": "囲まれたテキストを等幅フォントで表示します。",
        "inline_em": "テキストを強調します。\n@<em>{このように強調されます}",
        "block_raw": "生データを表します。\n//raw[|html,text|ほげ]と書くと、出力先がhtmlかtextの時のみ内容がそのまま出力されます。\nRe:VIEWの記法を超えてそのまま出力されるので、構造を壊さぬよう慎重に使ってください。",
        "inline_raw": "生データを表します。\n@<raw>{|html,text|ほげ}と書くと、出力先がhtmlかtextの時のみ内容がそのまま出力されます。\nRe:VIEWの記法を超えてそのまま出力されるので、構造を壊さぬよう慎重に使ってください。",
        "block_comment": "コメントを示します。\n//comment{\nコメントですよー\n//}\nと書くことにより、文書には出力されない文を書くことができます。",
        "inline_comment": "コメントを示します。\n@<comment>{コメントですよー}と書くことにより、文書には出力されない文を書くことができます。",
        "inline_chap": "章番号を示します。\nファイル名の.reの前の部分か =={sample} タイトル の{}部分を参照します。@<chap>{sample} と書きます。",
        "inline_title": "章タイトルを示します。\nファイル名の.reの前の部分か =={sample} タイトル の{}部分を参照します。@<title>{sample} と書きます。",
        "inline_chapref": "章番号+章タイトルを示します。\nファイル名の.reの前の部分か =={sample} タイトル の{}部分を参照します。@<chapref>{sample} と書きます。",
        "block_flushright": "右寄せを示します。\n//flushright{\n神は言っている…ここで左へ行く定めではないと…\n//}\nという形式で書きます。",

        // TODO 以下は今後書き直す
        "block_table": "テーブルを示します。\nTODO 正しく実装した後に書く",
        "inline_table": "テーブルへの参照を示します。\nTODO 正しく実装した後に書く",
        "block_tsize": "テーブルの大きさを指定します。\nTODO 正しく実装した後に書く"
    },
    "compile": {
        "file_not_exists": "ファイル %s が開けません。",
        "block_not_supported": "%s というブロック構文はサポートされていません。",
        "inline_not_supported": "%s というインライン構文はサポートされていません。",
        "part_is_missing": "パート %s が見つかりません。",
        "chapter_is_missing": "チャプター %s が見つかりません。",
        "reference_is_missing": "参照先 %s の %s が見つかりません。",
        "duplicated_label": "ラベルに重複があるようです。",
        "duplicated_label_headline": "ラベルに重複があるようです。 =={a-label} ラベル のように明示的にラベルを指定することを回避することができます。",
        // TODO できれば 引数 という言葉を避けたい…
        "args_length_mismatch": "引数の数に齟齬があります。 期待値 %s, 実際 %s",
        "body_string_only": "内容は全て文字でなければいけません。",
        "chapter_not_toplevel": "深さ1のチャプターは最上位になければいけません。",
        "chapter_topleve_eq1": "最上位のチャプターは深さ1のものでなければいけません。",
        "deprecated_inline_symbol": "%s というインライン構文は非推奨です。",
        "graph_tool_is_not_recommended": "graph用ツールにはgraphvizをおすすめします。",
        "unknown_graph_tool": "%s というgraph用ツールはサポートされていません。"
    },
    "builder": {
        "chapter_not_found": "深さ %d にマッチするチャプターが見つかりませんでした。",
        "image_not_found": "ID: %s にマッチする画像が見つかりませんでした。",
        "chapter": "第%d章",
        "list": "リスト%s.%s",
        "table": "表%s.%s"
    }
};

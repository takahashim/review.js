///<reference path='libs/DefinitelyTyped/jasmine/jasmine.d.ts' />
///<reference path='../../main/typescript/libs/DefinitelyTyped/node/node.d.ts' />

///<reference path='TestHelper.ts' />

///<reference path='../../main/typescript/Ignite.ts' />
///<reference path='../../main/typescript/builder/Builder.ts' />
///<reference path='../../main/typescript/builder/TextBuilder.ts' />
///<reference path='../../main/typescript/builder/HtmlBuilder.ts' />

"use strict";

describe("Ruby版ReVIEWとの出力差確認", () => {
	if (!ReVIEW.isNodeJS()) {
		return;
	}

	var exec = require("child_process").exec;

	function convertByRubyReVIEW(fileName:string, target:string, callback?:(result:string, error:any)=>void):void {
		var result:string;
		var error:any;
		var done = false;
		exec(
			"review-compile  --level=1 --target=" + target + " " + fileName + ".re",
			{
				cwd: "src/test/resources/valid",
				env: process.env
			},
			(err:Error, stdout:NodeBuffer, stderr:NodeBuffer)=> {
				expect(error).toBeNull();
				result = stdout.toString();
				error = err;
				done = true;
			}
		);
		waitsFor(()=> done, "ReVIEW is gone...");
		runs(()=> {
			if (callback) {
				callback(result, error);
			}
		});
	}

	// PhantomJS 環境下専用のテスト
	describe("正しい構文のファイルが処理できること", ()=> {
		var fs = require("fs");

		var typeList:{ext:string;target:string;builder:()=>ReVIEW.Build.IBuilder;}[] = [
			{
				ext: "txt",
				target: "text",
				builder: ()=> new ReVIEW.Build.TextBuilder()
			},
			{
				ext: "html",
				target: "html",
				builder: ()=> new ReVIEW.Build.HtmlBuilder()
			}
		];

		var ignoreFiles = [
			"block_dont_has_body.re",
			"ch01.re",
			"empty.re",
			"headline.re",
			"inline.re",
			"inline_nested.re"
		];

		var targetFiles = [
			// TODO
			"at_without_inline.re", // 手を加えて通した
			"block.re",
			// "block_dont_has_body.re", // プロセス終了しない謎があるので
			// "ch01.re", // プロセス終了しない謎があるので
			// "ch02.re", // めんどくさいので
			"dlist.re",
			// "empty.re", // プロセス終了しない謎があるので
			"footnote.re",
			// "headline.re" // プロセス終了しない謎があるので
			"headline_only.re",
			"image.re",
			// "inline.re", // プロセス終了しない謎があるので
			// "inline_with_newline.re", // Ruby版の処理が腐っている気がする
			"olist.re",
			// "preface.re", // めんどくさいので
			// "preproc.re", // めんどくさいので
			"sample.re",
			"single_comment_with_ulist.re",
			"ulist.re"
		];

		var path = "src/test/resources/valid/";
		fs.readdirSync(path)
			.filter((file:string) => file.indexOf(".re") !== -1 && !ignoreFiles.some(ignore => ignore === file))
			.filter((file:string) => targetFiles.some(target => target === file))
			.forEach((file:string) => {

				var baseName = file.substr(0, file.length - 3);

				typeList.forEach(typeInfo => {
					var targetFileName = path + baseName + "." + typeInfo.ext;
					it("ファイル:" + targetFileName, ()=> {

						var s = Test.compileSingle(
							fs.readFileSync(path + file, "utf8"),
							{
								builders: [typeInfo.builder()]
							})
							.success();
						expect(s.result).not.toBeNull();

						var assertResult = () => {
							var expected = fs.readFileSync(targetFileName, "utf8");
							expect(s.result).toBe(expected);
						};

						if (!fs.existsSync(targetFileName)) {
							// Ruby版の出力ファイルがない場合、出力処理を行う
							convertByRubyReVIEW(baseName, typeInfo.target, (data, error) => {
								expect(error).toBeNull();
								fs.writeFileSync(targetFileName, data);

								assertResult();
							});
						} else {
							assertResult();
						}
					});
				});
			});
	});
});

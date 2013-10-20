///<reference path='../utils/Utils.ts' />
///<reference path='../parser/Walker.ts' />
///<reference path='Builder.ts' />
///<reference path='../i18n/i18n.ts' />

module ReVIEW.Build {

import t = ReVIEW.i18n.t;

import SyntaxTree = ReVIEW.Parse.SyntaxTree;
import NodeSyntaxTree = ReVIEW.Parse.NodeSyntaxTree;
import BlockElementSyntaxTree = ReVIEW.Parse.BlockElementSyntaxTree;
import InlineElementSyntaxTree = ReVIEW.Parse.InlineElementSyntaxTree;
import HeadlineSyntaxTree = ReVIEW.Parse.HeadlineSyntaxTree;
import UlistElementSyntaxTree = ReVIEW.Parse.UlistElementSyntaxTree;
import OlistElementSyntaxTree = ReVIEW.Parse.OlistElementSyntaxTree;
import DlistElementSyntaxTree = ReVIEW.Parse.DlistElementSyntaxTree;
import TextNodeSyntaxTree = ReVIEW.Parse.TextNodeSyntaxTree;
import ChapterSyntaxTree = ReVIEW.Parse.ChapterSyntaxTree;

import nodeContentToString = ReVIEW.nodeContentToString;
import findChapter = ReVIEW.findChapter;

	export class TextBuilder extends DefaultBuilder {

		chapterPost(process:BuilderProcess, node:ChapterSyntaxTree):any {
			if (node.headline.cmd) {
				// column
				process.out("◆→終了:←◆\n");
			}
		}

		headlinePre(process:BuilderProcess, name:string, node:HeadlineSyntaxTree) {
			// TODO no の採番がレベル別になっていない
			// TODO 2.3.2 みたいな階層を返せるメソッドが何かほしい
			if (!node.cmd) {
				// 非 column
				process.out("■H").out(node.level).out("■");
				if (node.level === 1) {
					var text = i18n.t("builder.chapter", node.parentNode.no);
					process.out(text).out("　");
				} else if (node.level === 2) {
					process.out(node.parentNode.toChapter().fqn).out("　");
				}
			} else {
				// column
				process.out("◆→開始:←◆\n");
				process.out("■");
				return (v:ITreeVisitor) => {
					ReVIEW.visit(node.caption, v);
				};
			}
		}

		headlinePost(process:BuilderProcess, name:string, node:HeadlineSyntaxTree) {
			process.out("\n\n");
		}

		paragraphPre(process:BuilderProcess, name:string, node:NodeSyntaxTree) {
			process.out("");
		}

		paragraphPost(process:BuilderProcess, name:string, node:NodeSyntaxTree) {
			process.out("\n");
		}

		ulistPre(process:BuilderProcess, name:string, node:UlistElementSyntaxTree) {
			this.ulistParentHelper(process, node, ()=> {
				process.out("\n\n●\t");
			});
			if (node.parentNode instanceof UlistElementSyntaxTree && node.prev instanceof UlistElementSyntaxTree === false) {
				process.out("\n\n");
			} else if (node.parentNode instanceof UlistElementSyntaxTree) {
				process.out("");
			}
			process.out("●\t");
		}

		ulistPost(process:BuilderProcess, name:string, node:UlistElementSyntaxTree) {
			process.out("\n");
		}

		olistPre(process:BuilderProcess, name:string, node:OlistElementSyntaxTree) {
			process.out(node.no).out("\t");
		}

		olistPost(process:BuilderProcess, name:string, node:OlistElementSyntaxTree) {
			process.out("\n");
		}

		dlistPre(process:BuilderProcess, name:string, node:DlistElementSyntaxTree) {
			return (v:ITreeVisitor)=> {
				process.out("★");
				ReVIEW.visit(node.text, v);
				process.out("☆\n");
				process.out("\t");
				ReVIEW.visit(node.content, v);
				process.out("\n");
			};
		}

		dlistPost(process:BuilderProcess, name:string, node:DlistElementSyntaxTree) {
			process.out("\n");
		}

		block_list_pre(process:BuilderProcess, node:BlockElementSyntaxTree) {
			process.out("◆→開始:リスト←◆\n");
			var chapter = findChapter(node, 1);
			var text = i18n.t("builder.list", chapter.fqn, node.no);
			process.out(text).out("　").out(node.args[1].arg).out("\n\n");
			return (v:ITreeVisitor)=> {
				// name, args はパスしたい
				node.childNodes.forEach((node)=> {
					ReVIEW.visit(node, v);
				});
			};
		}

		block_list_post(process:BuilderProcess, node:BlockElementSyntaxTree) {
			process.out("\n◆→終了:リスト←◆\n");
		}

		inline_list(process:BuilderProcess, node:InlineElementSyntaxTree) {
			var chapter = findChapter(node, 1);
			var listNode = this.findReference(process, node).referenceTo.referenceNode.toBlockElement();
			var text = i18n.t("builder.list", chapter.fqn, listNode.no);
			process.out(text);
			return false;
		}

		inline_hd_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("「");
			var chapter = findChapter(node);
			if (chapter.level === 1) {
				process.out(chapter.fqn).out("章 ");
			} else {
				process.out(chapter.fqn).out(" ");
			}
			process.out(nodeContentToString(process, chapter.headline));
			return false;
		}

		inline_hd_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("」");
		}

		inline_br(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("\n");
		}

		inline_b_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("★");
		}

		inline_b_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("☆");
		}

		inline_code_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("△");
		}

		inline_code_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("☆");
		}

		inline_href_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("△");
		}

		inline_href_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("☆");
		}

		//TODO textの出力を確認して実装する
		inline_ruby_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("★");
		}

		//TODO textの出力を確認して実装する
		inline_ruby_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("★");
		}

		//TODO textの出力を確認して実装する
		inline_u_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("★");
		}

		//TODO textの出力を確認して実装する
		inline_u_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("☆");
		}

		inline_kw_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("★");
			return (v) => {
				// name, args はパス
				node.childNodes.forEach(node=> {
					var contentString = nodeContentToString(process, node);
					var keywordData = contentString.split(",");
					process.out(keywordData[0] + "(" + keywordData[1] + ")");
				});
			};
		}

		inline_kw_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("☆");
		}

		inline_tt_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("△");
		}

		inline_tt_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("☆");
		}

		inline_em_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.warn(t("compile.deprecated_inline_symbol", "em"), node);
			process.out("@<em>{");
		}

		inline_em_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("}");
		}

		block_image(process:BuilderProcess, node:BlockElementSyntaxTree) {
			// TODO ファイル名探索ロジックをもっと頑張る(jpgとかsvgとか)
			var chapterFileName = process.base.chapter.name;
			var chapterName = chapterFileName.substring(0, chapterFileName.length - 3);
			var imagePath = "./images/" + chapterName + "-" + node.args[0].arg + ".png";
			var caption = node.args[1].arg;
			process.out("◆→開始:図←◆\n");
			process.out("図").out(process.base.chapter.no).out(".").out(node.no).out("　").out(caption).out("\n");
			process.out("\n");
			process.out("◆→").out(imagePath).out("←◆\n");
			process.out("◆→終了:図←◆\n");
			return false;
		}

		inline_img(process:BuilderProcess, node:InlineElementSyntaxTree) {
			var imgNode = this.findReference(process, node).referenceTo.referenceNode.toBlockElement();
			process.out("図").out(process.base.chapter.no).out(".").out(imgNode.no).out("\n");
			return false;
		}

		block_footnote(process:BuilderProcess, node:BlockElementSyntaxTree) {
			process.out("【注").out(node.no).out("】").out(node.args[1].arg).out("\n");
			return false;
		}

		inline_fn(process:BuilderProcess, node:InlineElementSyntaxTree) {
			var footnoteNode = this.findReference(process, node).referenceTo.referenceNode.toBlockElement();
			process.out("【注").out(footnoteNode.no).out("】");
			return false;
		}

		block_lead_pre(process:BuilderProcess, node:BlockElementSyntaxTree) {
			process.out("◆→開始:リード←◆\n");
		}

		block_lead_post(process:BuilderProcess, node:BlockElementSyntaxTree) {
			process.out("◆→終了:リード←◆\n\n");
		}

		inline_tti_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("▲");
		}

		inline_tti_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("☆◆→等幅フォントイタ←◆");
		}

		inline_ttb_pre(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("★");
		}

		inline_ttb_post(process:BuilderProcess, node:InlineElementSyntaxTree) {
			process.out("☆◆→等幅フォント太字←◆");
		}

		block_noindent(process:BuilderProcess, node:BlockElementSyntaxTree) {
			process.out("◆→DTP連絡:次の1行インデントなし←◆\n");
			return false;
		}
	}
}

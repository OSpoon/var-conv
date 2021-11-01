import * as vscode from "vscode";
import VarConv from "./var-conv";

/**
 * 指令集合
 */
const commands = {
  upperCamelCase: {
    title: "大驼峰写法 (帕斯卡命名法)",
    search: "dtf,datuofeng,psk,pasika,ucc,uppercamelcase",
  },
  camelCase: {
    title: "小驼峰写法 (驼峰命名法)",
    search: "xtf,xiaotuofeng,cc,camelcase",
  },
  snake: {
    title: "蛇形写法 (下划线命名法)",
    search: "sx,shexing,xhx,xiahuaxian,snake,_",
  },
  hyphen: {
    title: "连字符写法 (中划线命名法)",
    search: "l,h,lzf,lianzifu,zhx,zhonghuaxian,hyphen,-",
  },
  constant: { title: "常量名", search: "clm,changliangming,const" },
  localeLowerCase: {
    title: "全小写",
    search: "qxx,quanxiaoxie,llc,localelowercase",
  },
  localeUpperCase: {
    title: "全大写",
    search: "qdx,quandaxie,luc,localeuppercase",
  },
  spaceUpperCase: {
    title: "空格 全大写",
    search: " dx, qdx,kdx,kqd,kgqdx,kongquandaxie,konggequandaxie",
  },
  spaceLowerCase: {
    title: "空格 全小写",
    search: " xx, qxx,kxx,kqx,kgqxx,kongquanxiao,konggequanxiaoxie",
  },
  spaceUpperCamelCase: {
    title: "空格 大驼峰",
    search: " dtf,kdtf,kgdtf,kongdatuofeng,konggedatuofeng",
  },
  spaceCamelCase: {
    title: "空格 小驼峰",
    search: " xtf,kxtf,kongxiaotuofeng,konggexiaotuofeng",
  },
};

export function activate(context: vscode.ExtensionContext) {
  Reflect.ownKeys(commands).forEach((key) => {
    if (typeof key === "string") {
      const commandId = key.replace(key[0], key[0].toUpperCase());
      context.subscriptions.push(
        registerCommand(`var-conv.${commandId}`, (args) =>
          handler(commandId, args)
        )
      );
    }
  });
}

export function deactivate() {}

/**
 * 注册指令
 *
 * @param command
 * @param fn
 * @returns
 */
function registerCommand(
  command: string,
  fn: (
    textEditor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    ...args: any[]
  ) => void
): vscode.Disposable {
  return vscode.commands.registerTextEditorCommand(command, fn);
}

/**
 * 处理函数
 *
 * @param key
 * @param args
 */
function handler(key: string, args: vscode.TextEditor) {
  const origin = args.document.getText(args.selection);
  if (isNoEmpty(origin)) {
    const conv = new VarConv(origin);
    const value = conv.fns?.get(key)?.call(conv, null);
    if (value) {
      replace(value);
    }
  }
}

function isNoEmpty(str: string) {
  return str !== "";
}

function replace(value: string) {
  let editor = vscode.window.activeTextEditor;
  editor
    ?.edit((edit) => {
      editor?.selections.forEach((v) => edit.replace(v, value));
    })
    .then((success) => {
      vscode.window.showInformationMessage(
        success ? "😂变量转换成功！" : "🤕变量转换失败！"
      );
    });
}

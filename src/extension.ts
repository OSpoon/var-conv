import * as vscode from "vscode";
import VarConv from "./var-conv";

export function activate(context: vscode.ExtensionContext) {
  let upperCamelCase = vscode.commands.registerTextEditorCommand(
    "var-conv.UpperCamelCase",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toUpperCamelCase(null);
        if (value) {
          replace(value);
        }
      }
    }
  );
  let camelCase = vscode.commands.registerTextEditorCommand(
    "var-conv.CamelCase",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toCamelCase(null);
        if (value) {
          replace(value);
        }
      }
    }
  );
  let snake = vscode.commands.registerTextEditorCommand(
    "var-conv.Snake",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toSnake();
        if (value) {
          replace(value);
        }
      }
    }
  );
  let hyphen = vscode.commands.registerTextEditorCommand(
    "var-conv.Hyphen",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toHyphen();
        if (value) {
          replace(value);
        }
      }
    }
  );
  let constant = vscode.commands.registerTextEditorCommand(
    "var-conv.Const",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toConst();
        if (value) {
          replace(value);
        }
      }
    }
  );
  let localeLowerCase = vscode.commands.registerTextEditorCommand(
    "var-conv.LocaleLowerCase",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toLocaleLowerCase();
        if (value) {
          replace(value);
        }
      }
    }
  );
  let localeUpperCase = vscode.commands.registerTextEditorCommand(
    "var-conv.LocaleUpperCase",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toLocaleUpperCase();
        if (value) {
          replace(value);
        }
      }
    }
  );
  let spaceUpperCase = vscode.commands.registerTextEditorCommand(
    "var-conv.SpaceUpperCase",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toSpaceUpperCase();
        if (value) {
          replace(value);
        }
      }
    }
  );
  let spaceLowerCase = vscode.commands.registerTextEditorCommand(
    "var-conv.SpaceLowerCase",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toSpaceLowerCase();
        if (value) {
          replace(value);
        }
      }
    }
  );
  let spaceUpperCamelCase = vscode.commands.registerTextEditorCommand(
    "var-conv.SpaceUpperCamelCase",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toSpaceUpperCamelCase();
        if (value) {
          replace(value);
        }
      }
    }
  );
  let spaceCamelCase = vscode.commands.registerTextEditorCommand(
    "var-conv.SpaceCamelCase",
    (args) => {
      const origin = args.document.getText(args.selection);
      if (isNoEmpty(origin)) {
        const value = new VarConv(origin).toSpaceCamelCase();
        if (value) {
          replace(value);
        }
      }
    }
  );

  context.subscriptions.push(upperCamelCase);
  context.subscriptions.push(camelCase);
  context.subscriptions.push(snake);
  context.subscriptions.push(hyphen);
  context.subscriptions.push(constant);
  context.subscriptions.push(localeLowerCase);
  context.subscriptions.push(localeUpperCase);
  context.subscriptions.push(spaceUpperCase);
  context.subscriptions.push(spaceLowerCase);
  context.subscriptions.push(spaceUpperCamelCase);
  context.subscriptions.push(spaceCamelCase);
}

export function deactivate() {}

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

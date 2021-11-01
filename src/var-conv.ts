// 解析对象
class VarConv {
  fns: Map<string, Function> | undefined;
  originVarName: string;
  varSplit: string[] | undefined;

  constructor(varName: string) {
    this.initCommandMap();
    // 保留原始字符串
    this.originVarName = varName;
    // 尝试拆分
    let varSplit: string[] | RegExpMatchArray | null = [];
    ["-", "_", " "].forEach((splitter) => {
      if (varName.indexOf(splitter) > 0) {
        varSplit = varName.split(splitter);
      }
    });
    // 不行就 正则表达式 大小写拆
    if (varSplit.length <= 0) {
      varSplit = varName.match(/(^[A-Z]|^|[A-Z])([a-z]+)?/g);
    }
    this.varSplit = varSplit?.join("-").toLocaleLowerCase().split("-");
  }

  initCommandMap(): void {
    this.fns = new Map<string, Function>();
    this.fns.set("UpperCamelCase", this.toUpperCamelCase);
    this.fns.set("CamelCase", this.toCamelCase);
    this.fns.set("Snake", this.toSnake);
    this.fns.set("Hyphen", this.toHyphen);
    this.fns.set("Constant", this.toConstant);
    this.fns.set("LocaleLowerCase", this.toLocaleLowerCase);
    this.fns.set("LocaleUpperCase", this.toLocaleUpperCase);
    this.fns.set("SpaceUpperCase", this.toSpaceUpperCase);
    this.fns.set("SpaceLowerCase", this.toSpaceLowerCase);
    this.fns.set("SpaceUpperCamelCase", this.toSpaceUpperCamelCase);
    this.fns.set("SpaceCamelCase", this.toSpaceCamelCase);
  }

  // 大驼峰写法 (帕斯卡命名法) UserName
  toUpperCamelCase(separator: any) {
    let vars: any[] = [];
    this.varSplit?.forEach((item) => {
      item = item.replace(/(^[a-z])/, (match) => {
        return match.toLocaleUpperCase();
      });
      vars.push(item);
    });
    return vars.join(separator || "");
  }

  // 小驼峰写法 (驼峰命名法) userName
  toCamelCase(separator: any) {
    let vars: any[] = [];
    this.varSplit?.forEach((item, index) => {
      if (index !== 0) {
        item = item.replace(/(^[a-z])/, (match) => {
          return match.toLocaleUpperCase();
        });
      }
      vars.push(item);
    });
    return vars.join(separator || "");
  }

  // 蛇形写法 (下划线) user_name
  toSnake() {
    return this.varSplit?.join("_");
  }

  // 连字符 user-name
  toHyphen() {
    return this.varSplit?.join("-");
  }

  // 常量写法 (全大写下划线) USER_NAME
  toConstant() {
    return this.varSplit?.join("_").toLocaleUpperCase();
  }

  // 全小写
  toLocaleLowerCase() {
    return this.originVarName.toLocaleLowerCase();
  }

  // 全大写
  toLocaleUpperCase() {
    return this.originVarName.toLocaleUpperCase();
  }

  // 空格 全小写
  toSpaceLowerCase() {
    return this.varSplit?.join(" ").toLocaleLowerCase();
  }

  // 空格 全大写
  toSpaceUpperCase() {
    return this.varSplit?.join(" ").toLocaleUpperCase();
  }

  // 空格 大驼峰
  toSpaceUpperCamelCase() {
    return this.toUpperCamelCase(" ");
  }

  // 空格 小驼峰写法
  toSpaceCamelCase() {
    return this.toCamelCase(" ");
  }
}

export default VarConv;

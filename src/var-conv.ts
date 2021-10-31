// 解析对象
class VarConv {
  maps = {
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

  originVarName: string;
  varSplit: string[] | undefined;
  constructor(varName: string) {
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
  toConst() {
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

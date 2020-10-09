import { action, observable, } from "mobx";

class State {
  @observable dataSource = {};
  @action.bound
  setDataSourceByCode = (props, data) => {
    let { code, outputFun } = props;
    let outputBack;
    // 调用 outputFun 函数
    if(outputFun && typeof outputFun === "string") {
      // eslint-disable-next-line no-new-func
      outputBack = new Function(`return ${outputFun}`)();
      if(typeof outputBack === "function") {
        this.dataSource[code] = outputBack(data);
      }else {
        console.error(`输出数据过滤脚本定义有误`);
      }
    }else {
      this.dataSource[code] = data;
    }
  }

  

}


const store = new State()

export default store;

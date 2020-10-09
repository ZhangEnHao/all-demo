import { typeJudgment } from './typeJudgment';

// 遍历解析多层嵌套 JSON 取出所有 value
export const parseJson = (jsonObj, callback) => {
  let list = [];
  // 循环所有键
  for (let key in jsonObj) {
    //如果对象类型为 数组 或者 对象 ，继续递归解析
    let element = jsonObj[key];
    if (typeJudgment(element) === "array" || typeJudgment(element) === "object") {
      list = list.concat(parseJson(element, callback));
    } else { //不是对象或数组、直接输出
      if(typeJudgment(callback) === "function" ) {
        if(callback(key, element)) list.push(callback(key, element))
      }else {
        if(element) list.push(element)
      }
    }
  }
  return list
}
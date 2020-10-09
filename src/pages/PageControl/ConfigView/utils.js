import { parseJson, typeJudgment } from '../utils';

// 属性分类： 依赖其他控件数据的属性 + 控件私有属性
export const attrClass = list => {
  let attrList = [];
  list.forEach(privateItem => {
    let props = parseJson(privateItem, (key, value) => {
      if(key === "code") {return value}
    });
    attrList = attrList.concat(props)
  })
  return attrList
}

// 根据 数组元素 获取属性 并赋值给新 JSON
export const attrAssignment = (list, values, code) => {
  let attrJson = code ? { [code]: {} } : {};
  list.forEach((item, index) => {
    attrJson[code][item] = values[item];
    delete values[item]
  })

  return {...values, ...attrJson}
}

// 扁平化 JSON 
export const attrFlat = (obj, code) => {
  for(let key in obj) {
    if(key === code && typeJudgment(obj[key]) === "object") {
      let unfold = obj[key];
      obj = {...obj, ...unfold};
    }
  }
  delete obj[code];
  return obj
}
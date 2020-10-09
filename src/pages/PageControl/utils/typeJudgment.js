// 数据类型判断
export const typeJudgment = data => {
  let toString = Object.prototype.toString;
  
  let dataType = (data instanceof Element ? 
    "element" //  统一 DOM 节点类型输出 
    : 
    toString.call(data).replace(/\[object\s(.+)]/, "$1").toLowerCase());

  return dataType  

}

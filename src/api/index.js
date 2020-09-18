import ajax from './ajax';

const BASE = "";

// 最新数据用于实时显示电流，温度值等
export const getTestJSX = (file) => ajax(`${BASE}/${file}`);

import ajax from './ajax';

const BASE = "";

// 最新数据用于实时显示电流，温度值等
export const getLatestDataByController = controllerNo => ajax(`${BASE}/temp/getLatestDataByController`, {controllerNo});
export const getTodayDataByControllerNo = controllerNo => ajax(`${BASE}/temp/getTodayDataByControllerNo`, {controllerNo});
export const getWaterTempDataByMachine = () => ajax(`${BASE}/temp/getWaterTempDataByMachine`);

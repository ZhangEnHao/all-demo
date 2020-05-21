import ajax from './ajax';

const BASE = "";

// 最新数据用于实时显示电流，温度值等
export const getLatestDataByController = controllerNo => ajax(`${BASE}/temp/getLatestDataByController`, {controllerNo});
// 1. 当天的数据（以昨天的数据对比显示）
export const getTodayDataByControllerNo = controllerNo => ajax(`${BASE}temp/getTodayDataByControllerNo`, {controllerNo});
// 2. 昨天的数据（以当天的数据对比显示）
export const getYesterdayDataByControllerNo = controllerNo => ajax(`${BASE}/temp/getYesterdayDataByControllerNo`, {controllerNo});

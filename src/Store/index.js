/* eslint-disable array-callback-return */
import { observable, action } from 'mobx';
import {
  getLatestDataByController,
  getTodayDataByControllerNo,
  getWaterTempDataByMachine,
} from "../api";

class State {
  
  // 存储资源池页面存储设备级别命名查询
  @observable latestData = {};
  @action.bound
  reqLatestDataByController = async (controllerNo="C1681125076") => {
    const result = await getLatestDataByController(controllerNo);
    this.latestData = result[0];
  }
  
  // 当天的数据（以昨天的数据对比显示）
  @observable todayData = [];
  @action.bound
  reqTodayDataByControllerNo = async (controllerNo="C1681125076") => {
    this.todayData = await getTodayDataByControllerNo(controllerNo);
  }

  // 出入水温度
  @observable wterTempData = [];
  @action.bound
  reqWaterTempDataByMachine = async () => {
    this.wterTempData = await getWaterTempDataByMachine();
  }



}


const state = new State()

export default state;

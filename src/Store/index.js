/* eslint-disable array-callback-return */
import { observable, action, toJS } from 'mobx';
import {
  getLatestDataByController,
  getTodayDataByControllerNo,
  getYesterdayDataByControllerNo,
} from "../api";

class State {
  
  // 存储资源池页面存储设备级别命名查询
  @observable latestData = {};
  @action.bound
  reqLatestDataByController = async (controllerNo="C1681125076") => {
    const result = await getLatestDataByController(controllerNo);
    this.latestData = {
      temperature: result[0].ai3001,
      eumulativeElectricity: 220,
      online: 0,
      voltage: 0,
      malfunction: 0
    };
  }
  
  // 当天的数据（以昨天的数据对比显示）
  @observable todayData = [];
  @action.bound
  reqTodayDataByControllerNo = async (controllerNo="C1681125076") => {
    this.todayData = await getTodayDataByControllerNo(controllerNo);
  }
  // 昨天的数据（以当天的数据对比显示）
  @observable yesterdayData = [];
  @action.bound
  reqYesterdayDataByControllerNo = async (controllerNo="C1681125076") => {
    this.todayData = await getYesterdayDataByControllerNo(controllerNo);
  }
}


const state = new State()

export default state;

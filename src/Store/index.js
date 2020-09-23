// import { observable, action, toJS } from 'mobx';
// import ajax from '../api/ajax';

import { action, observable } from "mobx";


class State {
  @observable dataSource = {};
  @action.bound
  setDataSourceByCode = (code, data, callback) => {
    this.dataSource[code] = data;
    // eslint-disable-next-line no-unused-expressions
    typeof callback === "function" ? callback() : null;
  }
  

}


const store = new State()

export default store;

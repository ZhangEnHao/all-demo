import React, { Component } from 'react';
import './imgBox.less';

class ImgBox extends Component {

  render() {
    let { dataSource } = this.props;
    let { aI3010, aI3034, aI3025, aI3027, aI3039, aI3040, aI3001, aI3003, aI3002, aI3041, aI3011, } = dataSource;

    return (
      <div className="img-box">
        <div className="img-floor img-layer">
          <span style={{ marginRight: 70 }}>{aI3010}°C</span>
          <span>{aI3034}°C</span>
        </div>
        <div className="img-floor img-second">
          <span style={{ marginRight: 20 }}>{aI3025}°C</span>
          <span style={{ marginRight: 20 }}>{aI3027}°C</span>
          <span style={{ marginRight: 20 }}>{aI3039}°C</span>
          <span style={{ marginRight: 20 }}>{aI3040}°C</span>
        </div>
        <div className="img-floor img-three">
          <span style={{ marginRight: 60 }}>{aI3001}°C</span>
          <span>{aI3003}°C</span>
        </div>
        <div className="img-new-fan">
          <span style={{ marginRight: 70 }}>{aI3041}°C</span>
          <span>{aI3002}°C</span>
        </div>
        <div className="img-port">
          <span>{aI3011}°C</span>
          <br/>
          <br/>
          <br/>
          <span>{aI3010}°C</span>
        </div>
      </div>
    )
  }
}

export default ImgBox

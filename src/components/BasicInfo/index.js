import React, { Component } from "react";
import { Row, Col, Tooltip } from 'antd';
import "./index.less";

export default class BasicInfo extends Component {
  render() {
    const { infos, dataSource } = this.props;        
    return (
      <div>
        <Row>
          {
            infos.map((info, index) => {              
              return <Col className="basic-info-col" span={8} key={index}>
                <span>{info.label}{info.label ? ":" : null}</span>
                {info.key ? <span>
                  {
                    info.render ? 
                      info.render(dataSource[info.key])
                    : dataSource[info.key]?.length < 25 ? dataSource[info.key] :
                    <Tooltip title={dataSource[info.key]} className="tool-tip">
                      <span>{ dataSource[info.key] }</span>
                    </Tooltip>
                  }
                </span> : null}
              </Col>
            })
          }
        </Row>
      </div>
    )
  }
}
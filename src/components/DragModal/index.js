import React, { Component } from 'react';
import { Button, } from 'antd'
import WilRnd from "wil-react-rnd";
import "./index.less";

class DragModal extends Component {

  render() {
    let { visible, title, isClose = false, onCancel, children } = this.props;
    let dragWidth = document.body.clientWidth;
    // let dragHeight = document.body.clientHeight;
    return (
      visible ?
        <>
          <div className="drag-mask" />
          <WilRnd
            defaultMeasure={{ width: dragWidth * 0.6, height: "auto", top: 50, left: (dragWidth / 2) - (dragWidth * 0.3) }}
            widthRange={[200, 1200]}
            heightRange={[200, 1000]}
            dragHorizontalRange={[0, window.innerWidth - 200]}
            dragVerticalRange={[0, window.innerHeight - 200]}
          >
            {({ dragRef, isStartResizable, isStartDraggable }) => (
              <div className="drag-modal">
                <div ref={dragRef} className="drag-modal-header" >
                  {title}
                  {isClose ? <Button onClick={e => { e.preventDefault(); onCancel(); }} type="link" icon="close" className="drag-modal-header-close" /> : null}
                </div>
                <div className="drag-modal-body">
                  {children}
                </div>
              </div>
            )}
          </WilRnd>

        </>

        : null
    )
  }
}

export default DragModal
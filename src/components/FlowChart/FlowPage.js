import React, { Component } from "react";
import { Row, Col } from "antd";
import GGEditor, { Flow } from "gg-editor";
import { FlowContextMenu, FlowToolbar, FlowItemPanel, FlowDetailPanel, EditorMinimap } from "./Layout";
import styles from "./FlowPage.module.css";
import { SaveCommand, LoadCommand } from './Custom/Command';
import { CustomNode, StartEvent, TimerEvent, MessageEvent, SignalEvent, EndEvent, UserTask, ScriptTask, MailTask, ReceiveTask, ExclusiveGateway, ParallelGateway, InclusiveGateway, TimerCatch, MessageCatch, SignalCatch, CustomizeItem, } from './Custom/Shape';

class FlowPage extends Component {

  render() {
    const { defaultPanel, customizePanele, data } = this.props;
    return (
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <FlowToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
          <Col span={4} className={styles.editorSidebar}>
            <FlowItemPanel defaultPanel={defaultPanel} customizePanele={customizePanele} />
          </Col>
          <Col span={16} className={styles.editorContent}>
            <Flow data={data}
              className={styles.flow}
              graph={{ edgeDefaultShape: 'flow-polyline', }}
              grid={'line'} />
            <SaveCommand />
            <LoadCommand />
            <CustomNode />
            <StartEvent />
            <TimerEvent />
            <MessageEvent />
            <SignalEvent />
            <EndEvent />
            <UserTask />
            <ScriptTask />
            <MailTask />
            <ReceiveTask />
            <ExclusiveGateway />
            <TimerCatch />
            <MessageCatch />
            <SignalCatch />
            <ParallelGateway />
            <InclusiveGateway />
            <CustomizeItem />
          </Col>
          <Col span={4} className={styles.editorSidebar}>
            <FlowDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    );
  }
}

export default FlowPage

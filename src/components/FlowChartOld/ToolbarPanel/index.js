import React, { Component } from 'react';
import { Icon, Divider, Tooltip } from '../../../pages/change/DragModel/antd';
import IconFontJS from "../IconFont";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: IconFontJS,
});

class ToolbarPanel extends Component {

  render() {
    const { Command, constants } = this.props.options;
    const { EditorCommand } = constants;
    const FLOW_COMMAND_LIST = [
      EditorCommand.Undo,
      EditorCommand.Redo,
      '|',
      EditorCommand.Copy,
      EditorCommand.Paste,
      EditorCommand.Remove,
      '|',
      EditorCommand.ZoomIn,
      EditorCommand.ZoomOut,
      // EditorCommand.Add,
      // EditorCommand.Fold,
      // EditorCommand.PasteHere,
      // EditorCommand.Subtopic,
      // EditorCommand.Topic,
      // EditorCommand.Unfold,
      // EditorCommand.Update,
    ];

    return (
      <>
        {FLOW_COMMAND_LIST.map((name, index) => {
          if (name === '|') {
            return <Divider key={index} type="vertical" />;
          }
          return (
            <Command key={name} name={name} className="command" disabledClassName="commandDisabled">
              <Tooltip title={name}>
                <IconFont type={`icon-${name}`} />
              </Tooltip>
            </Command>
          );
        })}
      </>
    )
  }
}

export default ToolbarPanel

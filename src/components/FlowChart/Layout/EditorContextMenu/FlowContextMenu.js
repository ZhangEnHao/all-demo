import React from 'react';
import { NodeMenu, EdgeMenu, GroupMenu, MultiMenu, CanvasMenu, ContextMenu } from 'gg-editor';
import { MenuItem } from './MenuItem';
import styles from './index.module.css';

export const FlowContextMenu = () => {
  return (
    <ContextMenu className={styles.contextMenu}>
      <NodeMenu>
        <MenuItem command="copy" text="复制" />
        <MenuItem command="delete" text="删除" />
      </NodeMenu>
      <EdgeMenu>
        <MenuItem command="delete" text="删除" />
      </EdgeMenu>
      <GroupMenu>
        <MenuItem command="copy" text="复制" />
        <MenuItem command="delete" text="删除" />
        <MenuItem command="unGroup" icon="ungroup" text="取消分组" />
      </GroupMenu>
      <MultiMenu>
        <MenuItem command="copy" text="复制" />
        <MenuItem command="paste" text="" />
        <MenuItem command="addGroup" icon="group" text="新增群组" />
        <MenuItem command="delete" text="删除" />
      </MultiMenu>
      <CanvasMenu>
        <MenuItem command="undo" text="撤消" />
        <MenuItem command="redo" text="重做" />
        <MenuItem command="pasteHere" icon="paste" text="贴在这里" />
      </CanvasMenu>
    </ContextMenu>
  );
};

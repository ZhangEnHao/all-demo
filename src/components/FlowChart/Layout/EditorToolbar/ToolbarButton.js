import React from 'react';
import { Tooltip,Button } from 'antd';
import { Command } from 'gg-editor';
import upperFirst from 'lodash/upperFirst';
import IconFont from '../../Common/IconFont';
import styles from './index.module.css';

export const ToolbarButton = (props) => {
  const { command, icon, text } = props;

  return (
    <Command name={command}>
      <Tooltip
        title={text || upperFirst(command)}
        placement="bottom"
        overlayClassName={styles.tooltip}
      >
        { command === 'save' || command === 'load' ? <Button className={styles.button} >{command}</Button> : <IconFont type={`icon-${icon || command}`} />  }
      </Tooltip>
    </Command>
  );
};
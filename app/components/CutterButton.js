import React from 'react';
import styles from './CutterButton.css';
import styled from 'styled-components';
import CutterIcon from './CutterIcon';

const CutterButton = ({ name, active, enable = false, ...other }) => {
  var button = null;
  switch (name) {
    case 'home':
      button = (
        <div
          className={`${styles.btn_small} ${styles.btn} ${
            active ? styles.active : ''
          }`}
          {...other}
        >
          <CutterIcon name="home" />
        </div>
      );
      break;
    case 'export':
      button = (
        <div
          className={`${styles.btn_small} ${styles.btn} ${
            active ? styles.active : ''
          }`}
          {...other}
        >
          <CutterIcon name="export" />
        </div>
      );
      break;
    case 'delete':
      button = (
        <div className={`${styles.btn_large} ${styles.btn}`} {...other}>
          <CutterIcon name="delete" />
        </div>
      );
      break;
    case 'plus':
      button = (
        <div
          className={`${styles.btn_large} ${styles.btn} ${
            enable ? styles.btn_yellow : ''
          }`}
          {...other}
        >
          <CutterIcon name="plus" />
        </div>
      );
      break;
    case 'start':
      button = (
        <div
          className={`${styles.btn_large} ${styles.btn} ${styles.btn_yellow}`}
          {...other}
        >
          <CutterIcon name="start" style={{ marginLeft: 10 }} />
        </div>
      );
      break;
    case 'stop':
      button = (
        <div className={`${styles.btn_large} ${styles.btn}`} {...other}>
          <CutterIcon name="stop" />
        </div>
      );
      break;
    case 'btn_export':
      button = (
        <div className={`${styles.btn_large} ${styles.btn}`} {...other}>
          <CutterIcon name="btn_export" />
        </div>
      );
      break;
    default:
      return <div>{name}</div>;
  }

  return button;
};

export default CutterButton;

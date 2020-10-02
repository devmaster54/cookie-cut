import React from 'react';
import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

export const MainBoard = styled.div`
  background: rgba(238, 238, 238, 0.498039);
  border: 0.5px solid #eeeeee;
  box-shadow: inset 0px -2px 5px rgba(100, 100, 100, 0.498039),
    inset 0px 2px 5px rgba(100, 100, 100, 0.498039);
  border-radius: 5px;
  padding: 13px;
  margin: 0 35px;
  height: calc(100vh - 200px - 150px);
  overflow-y: auto;
`;
export const CutterTable = styled(Table)`
  &.ui.table {
    text-transform: uppercase;
  }
  &.ui.table thead tr {
    border: 1px solid #84bd00;
    box-shadow: 0px 2px 4px rgba(100, 100, 100, 0.498039);
    border-radius: 5px;
  }
  &.ui.table thead th {
    background: #84bd00;
    color: white;
    text-transform: uppercase;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    align-items: center;
    text-align: center;
    letter-spacing: 1px;
    padding: 5px 0px;
    width: 20px;
  }
  &.ui.table tbody tr {
    border: 2px solid rgb(0, 0, 0, 0.5);
    box-shadow: 0px 2px 4px rgba(100, 100, 100, 0.498039);
    border-radius: 5px;
  }
  &.ui.table tbody td {
    background: white;
    text-transform: uppercase;
    align-items: center;
    text-align: center;
    border-bottom: 2px solid #c1c1c1;
  }
  &.ui.table tbody td.site-cell {
    color: #474747;
    font-size: 20px;
    text-shadow: 0px 1px 1px rgba(100, 100, 100, 0.498039);
    letter-spacing: 0.5px;
    line-height: 29px;
    font-weight: bold;
  }
  &.ui.table tbody td.status-cell {
    font-size: 16px;
    width: 200px;
  }
  &.ui.table tbody td.status-cell.bake {
    color: #ff8f32;
  }
  &.ui.table tbody td.status-cell.done {
    color: #84bd00;
  }
  &.ui.table tbody td.status-cell.error {
    color: #474747;
  }
  &.ui.table tbody td.status-cell.idle {
    color: #cccccc;
  }
  &.ui.table tbody td.proxy-cell {
    width: 250px;
  }
  &.ui.table tbody td.proxy-cell div {
    width: 100%;
    background: #eeeeee;
    box-shadow: inset 0px 1px 3px rgba(100, 100, 100, 0.498039);
    border-radius: 5px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.ui.table tbody td.cookie-cell {
    font-size: 16px;
    color: #474747;
  }
`;
const inputStyle = {
  background: '#EEEEEE',
  boxShadow: 'inset 0px 1px 3px rgba(100, 100, 100, 0.498039)',
  borderRadius: '5px',
  height: 40,
  textAlign: 'center',
  width: 100,
  fontWeight: 'bold',
  fontSize: 18
};

export const NumberInput = ({ value = 0, ...others }) => {
  return <input type="number" value={value} style={inputStyle} {...others} />;
};

export const DropdownInput = styled.select`
  background: #eeeeee;
  box-shadow: inset 0px 1px 3px rgba(100, 100, 100, 0.498039);
  border-radius: 5px;
  height: 40px;
  width: 300px;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
`;
const optionStyle = {
  width: 200,
  textTransformation: 'uppercase',
  textAlign: 'center',
  boxShadow: '0px 2px 4px rgba(100, 100, 100, 0.498039)',
  borderRadius: 8,
  cursor: 'pointer'
};
export const OptionButton = ({
  text = 'text',
  active = false,
  left = false,
  ...others
}) => {
  if (active) {
    return (
      <div
        style={{
          ...optionStyle,
          background: '#84BD00',
          color: 'white',
          fontSize: 18,
          padding: '12px 0'
        }}
        {...others}
      >
        {text}
      </div>
    );
  }

  return (
    <div
      style={{
        ...optionStyle,
        background: '#D3D3D3',
        color: '#474747',
        fontSize: 16,
        padding: '8px 0',
        borderRadius: left ? '8px 0 0 8px' : '0 8px 8px 0'
      }}
      {...others}
    >
      {text}
    </div>
  );
};

/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { Checkbox, Table } from 'semantic-ui-react';
import styles from './Home.css';
import CutterButton from '../components/CutterButton';
import {
  MainBoard,
  CutterTable,
  NumberInput
} from '../components/MainComponents';
import routes from '../constants/routes.json';
import { task_status } from '../constants/cookie.json';
import {
  setDelay,
  setTaskChecked,
  startTasks,
  stopTasks,
  removeTasks
} from '../actions/cutter';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  onChangeDelay = e => {
    const { dispatch } = this.props;
    const value = parseInt(e.target.value);
    dispatch(setDelay(value >= 0 ? value : 0));
  };
  onPlus = () => {
    const { history, dispatch } = this.props;
    history.push(routes.SETTING);
  };
  onDelete = () => {
    const { dispatch } = this.props;
    dispatch(removeTasks());
  };
  onCheckBox = key => {
    const { dispatch } = this.props;
    dispatch(setTaskChecked(key));
  };
  onStart = () => {
    const { delay, dispatch } = this.props;
    if (delay === 0) {
      alert('Please set the delay!');
      return;
    }
    dispatch(startTasks());
  };
  onStop = () => {
    const { dispatch } = this.props;
    dispatch(stopTasks());
  };
  getCookiesCount = () => {
    const { cookies } = this.props;
    var count = 0;
    Object.keys(cookies).map(item => {
      count += cookies[item].length;
    });
    return count;
  };
  render() {
    const { tasks, delay } = this.props;
    const total_cookies = this.getCookiesCount();
    return (
      <div className={styles.container}>
        <MainBoard>
          <CutterTable singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Checkbox />
                </Table.HeaderCell>
                <Table.HeaderCell>Site</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Proxy</Table.HeaderCell>
                <Table.HeaderCell>Cookies</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {tasks.map((task, key) => (
                <Table.Row key={key}>
                  <Table.Cell>
                    <Checkbox
                      checked={task.checked}
                      onChange={() => this.onCheckBox(key)}
                    />
                  </Table.Cell>
                  <Table.Cell className="site-cell">{task.site}</Table.Cell>
                  <Table.Cell className={`status-cell ${task.status}`}>
                    {task_status[task.status]}
                  </Table.Cell>
                  <Table.Cell className="proxy-cell">
                    <div>{task.proxy}</div>
                  </Table.Cell>
                  <Table.Cell className="cookie-cell">
                    {task.cookies}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </CutterTable>
        </MainBoard>
        <div className={styles.footer_container}>
          <div className={styles.btn_group}>
            <CutterButton
              name="delete"
              active={false}
              style={{ marginLeft: 45 }}
              onClick={this.onDelete}
            />
            <CutterButton
              name="plus"
              active={false}
              style={{ marginLeft: 45 }}
              onClick={this.onPlus}
            />
          </div>

          <div>
            <div className={styles.text_container}>
              <p>Delay</p>
              <NumberInput value={delay} onChange={this.onChangeDelay} />
              <p>Secs</p>
            </div>
            <div className={styles.text_container}>
              <p className={styles.total_cookie}>Total Cookies</p>
              <p>:</p>
              <p>{total_cookies}</p>
            </div>
          </div>
          <div className={styles.btn_group}>
            <CutterButton
              name="start"
              active={false}
              style={{ marginRight: 45 }}
              onClick={this.onStart}
            />
            <CutterButton
              name="stop"
              active={false}
              style={{ marginRight: 45 }}
              onClick={this.onStop}
            />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  delay: PropTypes.number.isRequired,
  cookies: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  const { tasks, delay, cookies } = state.cutter;
  return {
    tasks,
    delay,
    cookies
  };
}
export default connect(mapStateToProps)(withRouter(Home));

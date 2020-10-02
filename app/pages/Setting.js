import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Setting.css';
import {
  MainBoard,
  NumberInput,
  DropdownInput,
  OptionButton
} from '../components/MainComponents';
import CutterButton from '../components/CutterButton';
import { sites } from '../constants/cookie.json';
import { addTask } from '../actions/cutter';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: 0,
      site: '',
      use_proxy: false,
      proxy: '',
      showMessage: false,
      plus_button_enabled: false
    };
  }
  componentDidMount() {}
  checkFormState = () => {
    const { site, tasks, use_proxy, proxy } = this.state;
    if (site !== '' && tasks > 0 && (!use_proxy || (use_proxy && proxy !== '')))
      this.setState({ plus_button_enabled: true, showMessage: false });
    else this.setState({ plus_button_enabled: false });
  };
  onChangeTasks = e => {
    const value = e.target.value;
    this.setState({ tasks: value >= 0 ? value : 0 }, () => {
      this.checkFormState();
    });
  };
  onSiteChoose = e => {
    this.setState({ site: e.target.value }, () => {
      this.checkFormState();
    });
  };
  onProxyChange = e => {
    this.setState({ proxy: e.target.value }, () => {
      this.checkFormState();
    });
  };
  onProxyBtn = flag => {
    this.setState({ use_proxy: flag }, () => {
      this.checkFormState();
    });
  };
  onPlusButton = () => {
    const { plus_button_enabled, site, use_proxy, tasks, proxy } = this.state;
    const { dispatch } = this.props;
    if (!plus_button_enabled) return;
    const proxy_list = use_proxy ? proxy.split(/\r?\n/) : [];
    dispatch(addTask(site, proxy_list, tasks));
    this.setState({
      showMessage: true,
      site: '',
      tasks: 0,
      use_proxy: false,
      plus_button_enabled: false
    });
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
    const {
      site,
      tasks,
      use_proxy,
      proxy,
      plus_button_enabled,
      showMessage
    } = this.state;
    const total_cookies = this.getCookiesCount();
    return (
      <div className={styles.container}>
        <MainBoard style={{ display: 'flex' }}>
          <div className={styles.sub_board}>
            <p className={styles.title}>Add New Task</p>
            <div className={styles.task_container}>
              <OptionButton
                text="No Proxy"
                active={!use_proxy}
                left={use_proxy}
                onClick={() => this.onProxyBtn(false)}
              />
              <OptionButton
                text="Use Proxy"
                active={use_proxy}
                onClick={() => this.onProxyBtn(true)}
              />
            </div>
            <div className={styles.task_container}>
              <p>Site</p>
              <DropdownInput value={site} onChange={this.onSiteChoose}>
                <option value="" style={{ display: 'none' }}></option>
                {sites.map((item, key) => (
                  <option value={item} key={key}>
                    {item}
                  </option>
                ))}
              </DropdownInput>
            </div>
            <div className={styles.task_container}>
              <p>Number Of Tasks</p>
              <NumberInput value={tasks} onChange={this.onChangeTasks} />
            </div>
            <CutterButton
              name="plus"
              active={false}
              style={{ margin: '30px auto' }}
              enable={plus_button_enabled}
              onClick={this.onPlusButton}
            />
          </div>
          <div className={styles.sub_board}>
            <p className={styles.title}>Proxy List</p>
            <textarea
              className={styles.proxy_list}
              disabled={!use_proxy}
              value={proxy}
              onChange={this.onProxyChange}
            />
          </div>
        </MainBoard>
        <div className={styles.footer_container}>
          <div
            className={styles.message_container}
            style={{ display: showMessage ? 'block' : 'none' }}
          >
            Success - (Message)
          </div>
          <div className={styles.text_container}>
            <p className={styles.total_cookie}>Total Cookies</p>
            <p>:</p>
            <p>{total_cookies}</p>
          </div>
        </div>
      </div>
    );
  }
}

Setting.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  const { cookies } = state.cutter;
  return {
    cookies
  };
}
export default connect(mapStateToProps)(Setting);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import styles from './Export.css';
import {
  MainBoard,
  CutterTable,
  DropdownInput
} from '../components/MainComponents';
import CutterButton from '../components/CutterButton';
import { formats, sites } from '../constants/cookie.json';
import { deleteCookies, exportCookies } from '../actions/cutter';

class Export extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getCookiesCount = () => {
    const { cookies } = this.props;
    var count = 0;
    Object.keys(cookies).map(item => {
      count += cookies[item].length;
    });
    return count;
  };
  onDelete = () => {
    const { dispatch } = this.props;
    dispatch(deleteCookies());
  };
  onExport = () => {
    const { dispatch } = this.props;
    dispatch(exportCookies());
  };
  render() {
    const { tasks, cookies } = this.props;
    const total_cookies = this.getCookiesCount();
    return (
      <div className={styles.container}>
        <MainBoard>
          <CutterTable singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Site</Table.HeaderCell>
                <Table.HeaderCell>Total Cookies</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(cookies).map((item, key) => (
                <Table.Row key={key}>
                  <Table.Cell className="site-cell">{item}</Table.Cell>
                  <Table.Cell className="cookie-cell">
                    {cookies[item].length}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </CutterTable>
        </MainBoard>
        <div className={styles.footer_container}>
          <div>
            <div className={styles.text_container}>
              <p>Format</p>
              <DropdownInput>
                {formats.map((item, key) => (
                  <option value={item} key={key}>
                    {item}
                  </option>
                ))}
              </DropdownInput>
            </div>
            <div className={styles.text_container}>
              <p className={styles.total_cookie}>Total Cookies</p>
              <p>:</p>
              <p>{total_cookies}</p>
            </div>
          </div>
          <div className={styles.btn_group}>
            <CutterButton
              name="delete"
              active={false}
              style={{ marginRight: 45 }}
              onClick={this.onDelete}
            />
            <CutterButton
              name="btn_export"
              active={false}
              style={{ marginRight: 45 }}
              onClick={this.onExport}
            />
          </div>
        </div>
      </div>
    );
  }
}

Export.propTypes = {
  cookies: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  const { cookies, tasks } = state.cutter;
  return {
    tasks,
    cookies
  };
}
export default connect(mapStateToProps)(Export);

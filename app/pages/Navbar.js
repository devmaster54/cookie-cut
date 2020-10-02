import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Navbar.css';

import CutterIcon from '../components/CutterIcon';
import CutterButton from '../components/CutterButton';
import routes from '../constants/routes.json';

function Navbar({ history, location }) {
  const onButton = url => {
    if (location.pathname === url) return;
    history.push(url);
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <CutterIcon name="logo" />
      </div>
      <div className={styles.btn_container}>
        <CutterButton
          name="home"
          active={location.pathname === routes.HOME}
          style={{ marginRight: 45 }}
          onClick={() => onButton(routes.HOME)}
        />
        <CutterButton
          name="export"
          active={location.pathname === routes.EXPORT}
          onClick={() => onButton(routes.EXPORT)}
        />
      </div>
    </div>
  );
}

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Navbar);

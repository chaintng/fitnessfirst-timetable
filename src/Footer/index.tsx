import React from 'react';
import styles from './Footer.module.css';

const Footer = React.memo(() => {
  return <div className={styles.container}>
    <a href="https://github.com/chaintng/fitnessfirst-timetable">GitHub</a> | <a href="mailto:chaintng@gmail.com">Contact</a>
  </div>
});

export default Footer;
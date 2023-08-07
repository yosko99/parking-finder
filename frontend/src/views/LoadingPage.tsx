import React from 'react';

import styles from '../styles/loading.module.css';

interface Props {
  loadingText?: string;
}

const LoadingPage = ({ loadingText }: Props) => {
  return (
    <div className={styles.holder}>
      <div className={styles.loader}></div>
      <p>{loadingText !== undefined ? loadingText : 'Зареждане'}</p>
    </div>
  );
};

export default LoadingPage;

import React from 'react';
import styles from './LoadingScreen.module.css';

// @ts-ignore
const LoadingScreen = (props) => {

    if (!props.enabled) {
        return null;
    }
    return <div className={styles.container}>
        <img className={styles.backgroundImage} src="/loading-screen.gif" alt=""/>
    </div>

}

export default LoadingScreen;

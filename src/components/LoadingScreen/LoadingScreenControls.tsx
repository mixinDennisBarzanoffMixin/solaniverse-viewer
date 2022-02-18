import React, { useEffect } from 'react';
import styles from './LoadingScreen.module.css';
import ProgressIndicator from './ProgessIndicator';
import wasdImage from '../../assets/wasd.png';
import escImage from '../../assets/esc.png';
import mouseImage from '../../assets/mouse.png';
import qImage from '../../assets/q.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const FullProgressIndicator = styled(ProgressIndicator)`
    width: 100%;
`;

// @ts-ignore
const LoadingScreenControls = (props) => {
    if (!props.enabled) {
        return null;
    }
    return <div className={styles.container} >
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} >
            <div style={{height: '60vh', minWidth: '20em', width: '60vw', backgroundColor: 'hsl(209, 82%, 17%)', display: 'flex', flexDirection: 'column', borderRadius: '20px', padding: '1em', flex: 1, transform: 'scale(0.8, 0.8)'}}>
                <span className="typography-h2" style={{color: 'hsl(180, 2%, 92%)', flexShrink: 1}}>Controls</span>
                <div className={styles.controls} style={{width: '100%', height: '100%', flexGrow: 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gridArea: 'a', placeContent: 'flex-end'}}>
                        <img src={wasdImage} alt="WASD keyboard keys" style={{maxWidth: '100%', width: '10em'}}/>
                        <div style={{width: '3em'}}></div>
                        <h4 className="typography-h3" style={{color: 'hsl(180, 2%, 92%)'}}>Move around</h4>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gridArea: 'b', placeContent: 'flex-end'}}>
                        <img src={mouseImage} alt="computer mouse" style={{maxWidth: '100%', height: '3em'}}/>
                        <div style={{width: '3em'}}></div>
                        <h4 className="typography-h3" style={{color: 'hsl(180, 2%, 92%)'}}>Camera movement</h4>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gridArea: 'c', placeContent: 'flex-end'}}>
                        <img src={qImage} alt="Q key" style={{maxWidth: '100%', height: '3em'}}/>
                        <div style={{width: '3em'}}></div>
                        <h4 className="typography-h3" style={{color: 'hsl(180, 2%, 92%)'}}>Switch camera</h4>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gridArea: 'd', placeContent: 'flex-end'}}>
                        <img src={escImage} alt="esc key" style={{maxWidth: '100%', height: '3em'}}/>
                        <div style={{width: '3em'}}></div>
                        <h4 className="typography-h3" style={{color: 'hsl(180, 2%, 92%)'}}>Exit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    </div>
                </div>
                <FullProgressIndicator></FullProgressIndicator>
            </div>
            {/* <video autoPlay muted loop className={styles.backgroundImage}>
                <source src="rotating-planet.mp4" type="video/mp4" />
                </video> */}
        </div>
    </div>
}

export default LoadingScreenControls;


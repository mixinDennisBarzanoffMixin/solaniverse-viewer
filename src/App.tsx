import React, {MouseEventHandler, useEffect, useState} from 'react';
import Unity, {UnityContext} from "react-unity-webgl";
import Wallet from "./components/Wallet/Wallet";
import Player from "./components/Player/Player";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import styles from "./App.module.css"


const unityContext = new UnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
    companyName: "Solverse",
    productName: "Solverse",
    productVersion: "0.1",
});

function App() {

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        unityContext.on("SceneInitialized", () => {
            setInitialized(true);
        });
    }, []);

    const GeneratePlanet = (seed: number) => {
        unityContext.send("GameController", "GeneratePlanet", seed);
    }

    return (
        <div style={{position: "relative"}}>
            <LoadingScreen enabled={!initialized}/>
            {/*TODO: get the seed of the NFT and pass it to the method*/}
            <Wallet/>
            <Player enabled={initialized} url={"background_audio.mp3"}/>
            <Unity
                unityContext={unityContext}
                tabIndex={1}
                className={styles.unity}
            />
        </div>
    );
}

export default App;


import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faWallet, faBoxes, faEye } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/logo.jpeg';
import React, {MouseEventHandler, useEffect, useState} from 'react';
import Unity, {UnityContext} from "react-unity-webgl";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const unityContext = new UnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
    companyName: "Solverse",
    productName: "Solverse",
    productVersion: "0.1",
});


const Viewer = () => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        unityContext.on("SceneInitialized", () => {
            setInitialized(true);
        });
        setTimeout(() => {
            setInitialized(true);
        }, 2000);
    }, []);

    const GeneratePlanet = (seed: number) => {
        unityContext.send("GameController", "GeneratePlanet", seed);
    }

    return (
        <div>
            <div className="viewer">
                <LoadingScreen enabled={!initialized}/> 
                <Unity
                    unityContext={unityContext}
                    tabIndex={1}
                    className="unity"
                /> 
            </div>
        </div>
    );
  };
  
  export default Viewer;
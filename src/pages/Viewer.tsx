
import React, {FC, useEffect, useRef, useState} from 'react';
import LoadingScreenControls from "../components/LoadingScreen/LoadingScreenControls";
import { usePlanetConfig } from '../providers/planet_config_provider';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SquareIconButton from '../components/Button/SquareIconButton';



const Viewer = () => {
    const [initialized, setInitialized] = useState(false);
    const { seed } = usePlanetConfig();
    const [fullscreen, setFullscreen] = useState(false);

    return (
        <div>
            <div className="viewer">
                <div style={{width: '100%', height: '100%'}} className={fullscreen ? 'fullscreen' : ''}><UnityComponent setInitialized={setInitialized} seed={seed}/></div>
                <div style={{width: '100%', height: '100%'}}>
                    <LoadingScreenControls enabled={!initialized} onClick={() => console.log('sleep')}/> 
                </div>
                <div className="fullscreen-button"><SquareIconButton onClick={() => setFullscreen(!fullscreen)}><FontAwesomeIcon icon={fullscreen ? faCompress : faExpand} size="2x" color="#697277" /></SquareIconButton></div>
            </div>
        </div>
    );
  };

  interface UnityComponentInt {
      setInitialized: Function;
      seed: string | undefined;
  }

  interface UnityBundle {
      element: JSX.Element;
      onShouldGenerate: Function;
  }

  const UnityComponent: FC<UnityComponentInt> = (props) => {
    
    const [component,setComponent] = useState<UnityBundle>() //add const

    const mounted = useRef(false);
    useEffect(() => {
    if (!mounted.current) {
        // do componentDidMount logic
        import('react-unity-webgl').then(module => {
            const unityContext = new module.UnityContext({
                loaderUrl: "Build/Build.loader.js",
                dataUrl: "Build/Build.data",
                frameworkUrl: "Build/Build.framework.js",
                codeUrl: "Build/Build.wasm",
                companyName: "Solverse",
                productName: "Solverse",
                productVersion: "0.1",
            });
            unityContext.on("SceneInitialized", () => {
                props.setInitialized(true);
            });
            const Unity = module.default;
            const GeneratePlanet = (seed: number) => {
                unityContext.send("GameController", "GeneratePlanet", seed);
            }
            
            setComponent( 
                {
                    element:  <Unity 
                        unityContext={unityContext}
                        tabIndex={1}
                        className="unity"
                    />,
                    onShouldGenerate: GeneratePlanet,
                }
            );
        });
        mounted.current = true;
    } else {
        // do componentDidUpdate logic
        // seed changed
        component?.onShouldGenerate(props.seed);
        console.log('regenerating planet for ' + props.seed);
    }
    });
    
    if (component == null) return null;
    return (
        component.element
    );
  }
  
  export default Viewer;
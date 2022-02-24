
import React, {FC, useEffect, useRef, useState} from 'react';
import LoadingScreenControls from "../components/LoadingScreen/LoadingScreenControls";
import { usePlanetConfig } from '../providers/planet_config_provider';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SquareIconButton from '../components/Button/SquareIconButton';
import { useSearchParams } from 'react-router-dom';
import state from '@project-serum/anchor/dist/program/namespace/state';



const Viewer = () => {
    const [initialized, setInitialized] = useState(false);
    const { seed } = usePlanetConfig();
    const [searchParams, setSearchParams] = useSearchParams();
    const [fullscreen, setFullscreen] = useState(false);
    useEffect(() => {
        if (!initialized) {
            return;
        }
        if (searchParams.get('fullscreen') == 'true') {
            setFullscreen(true);
        }
    }, [initialized]);

    return (
        <div>
            <div className="viewer">
                <div style={{width: '100%', height: '100%'}} className={fullscreen ? 'fullscreen' : ''}><UnityComponent setInitialized={setInitialized} seed={seed}/></div>
                {!initialized &&
                    <div style={{width: '100%', height: '100%'}}>
                        <LoadingScreenControls enabled={!initialized} onClick={() => console.log('sleep')}/> 
                    </div>
                }
                <div className="fullscreen-button"><SquareIconButton onClick={() => {
                    return setFullscreen(!fullscreen);
                }}><FontAwesomeIcon icon={fullscreen ? faCompress : faExpand} size="2x" color="#697277" /></SquareIconButton></div>
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
    const [searchParams, setSearchParams] = useSearchParams();
    const [initialized, setInitialized] = useState(false);
    const id = searchParams.get('id');
    console.log('varss');
    console.log(id);
    console.log(component);
    console.log('varss');

    const mounted = useRef(false);
    useEffect(() => {
        console.log(`url planet chnage id: ${id}`);
        if (id != null) {
            component?.onShouldGenerate(id);
        }
    }, [id, initialized]);
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
                setInitialized(true);
                setTimeout(() =>
                    props.setInitialized(true), 1000
                );
            });
            const Unity = module.default;
            const GeneratePlanet = (seed: string) => {
                if(!seed)
                {
                    console.log("No seed supplied for planet generation");
                    return;
                }
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
    } 
    });
    
    if (component == null) return null;
    return (
        component.element
    );
  }
  
  export default Viewer;

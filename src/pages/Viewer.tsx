
import React, {FC, useEffect, useRef, useState} from 'react';
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { usePlanetConfig } from '../providers/planet_config_provider';



const Viewer = () => {
    const [initialized, setInitialized] = useState(false);
    const { seed } = usePlanetConfig();


    return (
        <div>
            <div className="viewer">
                <LoadingScreen enabled={!initialized}/> 
                <UnityComponent setInitialized={setInitialized} seed={seed}/>
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
                    element: <Unity 
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
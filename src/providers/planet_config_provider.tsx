import React, { useState } from "react";

const PlanetConfigContext = React.createContext<PlanetConfig>({setSeed: () => {}});

interface PlanetConfig {
    seed?: string;
    setSeed: (value: string) => void;
    // add more config here
}

const PlanetConfigProvider: React.FC = (props) => {
    const [seed, setSeed] = useState<string>();
    return (
        <PlanetConfigContext.Provider value={
            {seed, setSeed}
        }>{props.children}</PlanetConfigContext.Provider>
    )
}

const usePlanetConfig = () => React.useContext(PlanetConfigContext);

export {usePlanetConfig, PlanetConfigProvider};
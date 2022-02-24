import { useLocation, Location, matchPath } from "react-router-dom";
import {Drawer, DrawerItem, DrawerMain, DrawerSection} from './Drawer/Drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxes, faEye, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import {faTwitter,faDiscord} from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logo.jpeg';
import { SelectWalletButton } from "../views/SelectWalletButton";
import { FC, Suspense, useEffect, useState } from "react";
import Viewer from "../pages/Viewer";
import Inventory from "../pages/Inventory";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Mint from "../pages/Mint/Mint";
import { candyMachineId, connection, rpcHost, txTimeout } from "../config";
import React from "react";
import { create } from "canvas-confetti";
import LoadingScreenPlanet from "./LoadingScreen/LoadingScreenPlanet";

const ThemeProvider = React.lazy(() =>import('../util/material_theme'));

const Layout:FC = (props) => {
    const location = useLocation();
    const [pages, setPages] = useState<{[string: string]: JSX.Element}>({});
    const pageCondition = (location: Location, key: string) => !!matchPath(location.pathname, key);
    const noSuchPage = <p>no such page</p>
    useEffect(() => {
        const allPages = {
            '/viewer': <Viewer></Viewer>,
            '/inventory': <Inventory></Inventory>,
            '/mint': 
            <Suspense fallback={<LoadingScreenPlanet></LoadingScreenPlanet>}>
                <ThemeProvider>
                    <Mint
                        candyMachineId={candyMachineId}
                        connection={connection}
                        txTimeout={txTimeout}
                        rpcHost={rpcHost}
                    />
                </ThemeProvider>
            </Suspense>
              ,
            '*': noSuchPage,
        }
        const match = Object.entries(allPages).find(([key, value]) => pageCondition(location, key));
        if (match !== undefined) {
            const [key, element] = match;
            setPages({...pages, [key]: element});
        }
    }, [location]);

  return (
    <>
        <div className="container">
            <div className="drawer-space">
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                    {Object.entries(pages).map((entry) => {
                        const [key, element] = entry;
                        return <div style={
                            {
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                ...(pageCondition(location, key) ? {display: 'block'} : {display: 'none'})
                            }
                        }>{element}</div>
                    })}
                    {!Object.keys(pages).find((key) => pageCondition(location, key)) && noSuchPage}
                </div>
            </div>
            <Drawer>
                <DrawerMain logo={logo} wallet={
                    <div>
                        <SelectWalletButton />
                    </div>
                }></DrawerMain>
                <DrawerSection title="interact">
                    <DrawerItem to="/viewer" icon={<FontAwesomeIcon icon={faEye} size="1x"/>}>Viewer</DrawerItem>
                </DrawerSection>
                <DrawerSection title="misc">
                    <DrawerItem to="/inventory" icon={<FontAwesomeIcon icon={faBoxes} size="1x"></FontAwesomeIcon>}>Inventory</DrawerItem>
                    <DrawerItem to="/mint" icon={<FontAwesomeIcon icon={faShoppingBag} size="1x"></FontAwesomeIcon>}>Mint</DrawerItem>
                </DrawerSection>
                <div style={{height: '1em'}}></div>
                <DrawerSection title="social">
                    <DrawerItem external to="https://twitter.com/laserverse" icon={<FontAwesomeIcon icon={faTwitter}/>}>Twitter</DrawerItem>
                    <DrawerItem external to="https://discord.com/invite/AWnP7ZkaYk" icon={<FontAwesomeIcon icon={faDiscord} size="1x"/>}>Discord</DrawerItem>
                </DrawerSection>
            </Drawer>
        </div>
    </>
  )
};

export default Layout;

import { Outlet } from "react-router-dom";
import {Drawer, DrawerItem, DrawerMain, DrawerSection} from './Drawer/Drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faWallet, faBoxes, faEye } from '@fortawesome/free-solid-svg-icons';
import {faTwitter,faDiscord} from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logo.jpeg';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SelectWalletButton } from "../views/SelectWalletButton";
// import '@font-awesome/css/font-awesome.css';


// const MaxWidthSelectWalletButton

const Layout = () => {

  return (
    <>
        <div className="container">
            <div className="drawer-space">
                <Outlet />
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
                    <DrawerItem to="/market" icon={<FontAwesomeIcon icon={faShoppingBag} size="1x" />}>Market</DrawerItem>
                    <DrawerItem to="/" icon={<FontAwesomeIcon icon={faBoxes} size="1x"></FontAwesomeIcon>}>Inventory</DrawerItem>
                    <DrawerItem to="/wallet" icon={<FontAwesomeIcon icon={faWallet} size="1x"/>}>Wallet</DrawerItem>
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

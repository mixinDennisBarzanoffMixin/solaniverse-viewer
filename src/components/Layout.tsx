import { Outlet, Link } from "react-router-dom";
import {Drawer, DrawerItem, DrawerMain, DrawerSection} from './Drawer/Drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faWallet, faBoxes, faEye } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/logo.jpeg';
import React, {MouseEventHandler, useEffect, useState} from 'react';
import Unity, {UnityContext} from "react-unity-webgl";


const Layout = () => {

  return (
    <>
        <div className="container">
            <Outlet />
            <Drawer>
                <DrawerMain logo={logo}></DrawerMain>
                <DrawerSection title="interact">
                    <DrawerItem to="/" icon={<FontAwesomeIcon icon={faEye} size="1x"/>}>Viewer</DrawerItem>
                </DrawerSection>
                <DrawerSection title="misc">
                    <DrawerItem to="/market" icon={<FontAwesomeIcon icon={faShoppingBag} size="1x" />}>Market</DrawerItem>
                    <DrawerItem to="/inventory" icon={<FontAwesomeIcon icon={faBoxes} size="1x"></FontAwesomeIcon>}>Inventory</DrawerItem>
                    <DrawerItem to="/wallet" icon={<FontAwesomeIcon icon={faWallet} size="1x"/>}>Wallet</DrawerItem>
                </DrawerSection>
            </Drawer>
        </div>
    </>
  )
};

export default Layout;

import { FC, ReactNode } from "react";
import { Link, matchPath, NavLink, To, useLocation } from "react-router-dom";
import { JsxElement } from "typescript";

interface DrawerInt {
    // onClose: Function;
    // visible: boolean;
}
interface DrawerItemInt {
    icon?: ReactNode;
    to: To;
    external?: boolean;
}
interface DrawerMainInt {
    logo: string;
}
interface DrawerSectionInt {
    title: string;
}

const Drawer:FC<DrawerInt> = (props) => {
    return (
        <div className="drawer">
            {props.children}
        </div>
    );
}

const DrawerItem:FC<DrawerItemInt> = (props) => {
    const location = useLocation();
    const isActiveRoute = !!matchPath(
        location.pathname, 
        props.to.toString(),
      ); 
    const linkStyle = `drawer__item ${isActiveRoute ? 'active' : ''}`;
    const inner = (
        <>
            <div className={`drawer__item__text ${isActiveRoute ? 'active' : ''}`}>
                {props.children}
            </div>
            <div className={`drawer__item__icon ${isActiveRoute ? 'active' : ''}`}>{props.icon ?? <></>}</div>
        </>
    );
    if (props.external) {
        return (
            <a href={props.to.toString()} className={linkStyle}>{inner}</a>
        );
    }
    return (
        <Link to={props.to} className={linkStyle}>{inner}</Link>
    );
}

DrawerItem.defaultProps = {
    external: false,
}


const DrawerMain: FC<DrawerMainInt> = (props) => {
    return (
        <div className="drawer__main">
            <img className="drawer__main__logo" src={props.logo} />
        </div>
    );
}

const DrawerSection: FC<DrawerSectionInt> = (props) => {
    return (
        <div className="drawer__section">
            <div className="drawer__section__title"><span>{props.title}</span></div>
            {props.children}
        </div>
    );
}

export {DrawerItem, Drawer, DrawerMain, DrawerSection};
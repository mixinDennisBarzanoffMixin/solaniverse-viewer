import { FC, ReactNode } from "react";
import styles from "./SquareIconButton.module.css";

interface SquareIconButtonProps {
    onClick?: () => void;
}
const SquareIconButton: FC<SquareIconButtonProps> = (props) => {
    console.log('hellooooo')
    return (
        <button className={styles.squareIconButton} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default SquareIconButton;
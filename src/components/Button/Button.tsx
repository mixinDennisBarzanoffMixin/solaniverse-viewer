import { FC, ReactNode } from "react";
import styles from './Button.module.css'; // Import css modules stylesheet as styles


interface ButtonInt {
    color: string;
    children: ReactNode[] | ReactNode | undefined;
}

const Button:FC<ButtonInt> = (props) => {
    return (
        <a href="#" className={`${styles.pushable} stars__button-group__button--view-on-solana`}>
            <span className={`${styles.front} stars__button-group__button--view-on-solana-light typography-h3 typography-bold`}>{props.children}</span>
        </a>
    )
}

export default Button;
// import { FC, ReactNode } from "react";

// interface ButtonInt {
//     color: string;
//     colorLight: string;
//     children: ReactNode[] | ReactNode | undefined;
// }

// const Button:FC<ButtonInt> = (props) => {
//     return (
//         <a href="#" className="pushable" style={{backgroundColor: props.color}}>
//             <span className="front typography-h3 typography-bold" style={{backgroundColor: props.color}}>{props.children}</span>
//         </a>
//     )
// }

// export default Button;
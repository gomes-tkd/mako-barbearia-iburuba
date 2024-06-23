import React from "react";
import styles from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
    return (
      <button className={styles.button} {...props}>
          { children }
      </button>
    );
}

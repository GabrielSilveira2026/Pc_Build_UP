import React, { forwardRef } from 'react'
import styles from './button.module.css'

type ButtonProps = {
    text: string,
    type?: "button" | "submit" | "reset",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ type="button" , text = "", ...props }, ref) => {
        return (
            <button
                className={styles.button}
                ref={ref}
                type={type}
                {...props}
            >
                {text}
            </button>
        )
    }
)

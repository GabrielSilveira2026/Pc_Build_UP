import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import styles from './button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
    style?: any,
    text: string,
    type?: "button" | "submit" | "reset",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ style, type="button" , text = "", ...props }, ref) => {
        return (
            <button
                className={`${styles.button} ${style}`}
                ref={ref}
                type={type}
                {...props}
            >
                {text}
            </button>
        )
    }
)

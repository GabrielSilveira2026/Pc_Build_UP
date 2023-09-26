import React, { forwardRef, InputHTMLAttributes, useId } from 'react';
import styles from './input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    textoAjuda?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = "text", label = "", textoAjuda = "", name = "", ...props }, ref) => {
        const inputId = useId();
        const erro = textoAjuda.length > 0
        return (
            <div className={styles.boxInput}>
                <label htmlFor={inputId}>{label}</label>
                <input
                    id={inputId}
                    className={`${styles.input} ${erro ? styles['erro'] : ""}`}
                    name={name}
                    type={type}
                    ref={ref}
                    {...props}
                />
                {
                    erro &&
                    <p>{textoAjuda}</p>
                }
            </div>
        );
    }
)

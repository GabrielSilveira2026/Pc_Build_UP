import React, { forwardRef, InputHTMLAttributes, useId, useState } from 'react';
import styles from './input.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    textoAjuda?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = "", label = "", textoAjuda = "", name = "", ...props }, ref) => {
        const inputId = useId();
        const erro = textoAjuda.length > 0
        const [verSenha, setVerSenha] = useState<Boolean>(false)

        return (
            <div className={styles.boxInput}>
                {label && <label htmlFor={inputId}>{label}:</label>}

                <div className={`${styles.inputLine}  ${erro ? styles['erro'] : ""}`}>
                    <input
                        id={inputId}
                        className={styles.input}
                        name={name}
                        type={
                            type === "password" ?
                                verSenha ?
                                    "text" :
                                    "password"
                                :
                                type
                        }
                        autoComplete="on"
                        ref={ref}
                        {...props}
                    />
                    {
                        type === "password" &&
                        <FontAwesomeIcon
                            className={styles.verSenhas}
                            onClick={() => { setVerSenha(!verSenha) }}
                            icon={verSenha ? faEye : faEyeSlash}
                        />
                    }
                </div>
                {
                    erro &&
                    <p className={styles.textoAjuda}>{textoAjuda}</p>
                }
            </div>
        );
    }
)

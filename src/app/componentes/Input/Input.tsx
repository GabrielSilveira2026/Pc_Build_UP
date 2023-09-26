import React, { forwardRef, InputHTMLAttributes, useId, useState } from 'react';
import styles from './input.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    textoAjuda?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = "", label = "", textoAjuda = "", name = "", ...props }, ref) => {
        const inputId = useId();
        const erro = textoAjuda.length > 0
        const [verSenha, setVerSenha] = useState(false)

        console.log("RENDER");
        
        return (
            <div className={styles.boxInput}>
                <label htmlFor={inputId}>{label}</label>

                <div className={styles.linhaInput}>
                    <input
                        id={inputId}
                        className={`${styles.input} ${erro ? styles['erro'] : ""}`}
                        name={name}
                        type={
                            type === "password" ?
                                verSenha ?
                                    "text" :
                                    "password"
                                :
                                "text"

                        }
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

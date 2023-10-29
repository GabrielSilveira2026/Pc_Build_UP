"use client"

import styles from "./form.module.css"
import { Input } from "../Input/Input";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import { AxiosResponse } from "axios";
import { autenticaUser } from "@/app/api/httpservices";
import { UserProps } from "../types";

const schema = z.object({
    email: z.string().nonempty("Insira um email ").email("Insira um email válido"),

    senha: z.string().nonempty("Insira uma senha")
        // .min(6, 'Insira uma senha com no mínimo 6 caracteres')
        // .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula.' })
        // .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número.' })
        // .regex(/[@$!%*?&]/, { message: 'A senha deve conter pelo menos um caractere especial.' }),
})

type FormProps = z.infer<typeof schema>

const FormLogin = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormProps>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema)
    })

    const handleForm = async (data: FormProps) => {
        const user: UserProps = {
            email: data.email,
            senha: data.senha
        }
        const response: AxiosResponse = await autenticaUser(user)

        if (response.status === 200) {
            console.log("Logado, token:", response.data.token);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleForm)}>

            <Input
                {...register('email')}
                label="Email"
                type="email"
                placeholder="exemplo@gmail.com"
                textoAjuda={errors.email?.message}
            />

            <Input
                {...register('senha')}
                label="Senha"
                type="password"
                placeholder="***********"
                textoAjuda={errors.senha?.message}
            />
            <Button type="submit" text="Login"/>
        </form>
    )
}

export default FormLogin
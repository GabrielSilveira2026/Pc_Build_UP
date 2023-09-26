"use client"

import styles from "./form.module.css"
import { Input } from "../Input/Input";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form"
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    nomeUsuario: z.string().nonempty("Insira um nome de usuário").min(3, "Insira um nome com no mínimo 3 caracteres"),

    email: z.string().nonempty("Insira um email ").email("Insira um email válido"),

    senha: z.string().nonempty("Insira uma senha")
        .min(6, 'Insira uma senha com no mínimo 6 caracteres')
        .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula.' })
        .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número.' })
        .regex(/[@$!%*?&]/, { message: 'A senha deve conter pelo menos um caractere especial.' }),

    confirmaSenha: z.string().nonempty("Insira uma senha")
        .min(6, 'Insira uma senha com no mínimo 6 caracteres')
        .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula.' })
        .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número.' })
        .regex(/[@$!%*?&]/, { message: 'A senha deve conter pelo menos um caractere especial.' }),
})
    .refine(({ senha, confirmaSenha }) => senha === confirmaSenha, {
        message: "As senhas não são iguais",
        path: ["confirmaSenha"]
    })

type FormProps = z.infer<typeof schema>

function Form() {
    const [verSenha, setVerSenha] = useState(false)
    const [verConfirmaSenha, setVerConfirmaSenha] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormProps>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema)
    })

    const handleForm = (data: FormProps) => {
        console.log({ data });
    }

    console.log(errors);

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
            <Input
                {...register('nomeUsuario')}
                label="Nome de Usuário: "
                type="text"
                placeholder="Nome de Usuário"
                textoAjuda={errors.nomeUsuario?.message}
            />

            <Input
                {...register('email')}
                label="Email: "
                type="email"
                placeholder="exemplo@gmail.com"
                textoAjuda={errors.email?.message}
            />

            <Input
                {...register('senha')}
                label="Senha: "
                type={verSenha ? "text" : "password"}
                placeholder="***********"
                textoAjuda={errors.senha?.message}
            />

            <Input
                {...register('confirmaSenha')}
                label="Confirme a senha"
                type={verConfirmaSenha ? "text" : "password"}
                placeholder="***********"
                textoAjuda={errors.confirmaSenha?.message}
            />

            <button type="submit">Cadastrar</button>
        </form>
    )
}

export default Form
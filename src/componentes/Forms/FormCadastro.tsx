"use client"

import styles from "./form.module.css"
import { Input } from "../Input/Input";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    nome: z.string().nonempty("Insira um nome de usuário").min(3, "Insira um nome com no mínimo 3 caracteres"),

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

    const handleForm = async(data: FormProps) => {
        console.log(data);
        // router.push(`/login/${data}`);
    }

    console.log(errors);

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
            <Input
                {...register('nome')}
                label="Nome de Usuário"
                type="text"
                placeholder="Nome de Usuário"
                textoAjuda={errors.nome?.message}
            />

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

            <Input
                {...register('confirmaSenha')}
                label="Confirme a senha"
                type="password"
                placeholder="***********"
                textoAjuda={errors.confirmaSenha?.message}
            />

            <button type="submit">Cadastrar</button>
        </form>
    )
}

export default Form
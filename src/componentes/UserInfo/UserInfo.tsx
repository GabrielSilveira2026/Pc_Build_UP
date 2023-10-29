import Link from "next/link";

interface UserInfoProps{
    user: {
        nome?: string | null;
        email?: string | null;
    } | undefined
}

export const UserInfo = ({user}: UserInfoProps) => {
  return (
    <div>
      Olá {user?.nome}
      <Link style={{ color: "white", textDecoration: "none" }} href="/api/auth/signout"> Sair</Link>
    </div>
  )
}

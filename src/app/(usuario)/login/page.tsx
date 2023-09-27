import React from 'react'
type dataProps = {
    nomeUsuario: string
    email: string
    senha: string
    confirmaSenha: string
}
function login( params: any) {
  console.log(JSON.stringify(params.data));
  return (
    <div>
      Login
    </div>
  )
}

export default login
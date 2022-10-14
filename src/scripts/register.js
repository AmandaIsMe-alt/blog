import {
  Api
} from "./api.js"
export class Register {

  static createNewUser() {

    const inputName     = document.getElementById('inputName')
    const inputMail     = document.getElementById('inputMail')
    const inputPhoto    = document.getElementById('inputPhoto')
    const inputPassword = document.getElementById('inputPassword')
    const btnRegister   = document.getElementById('btnRegister')

    btnRegister.addEventListener('click', async event => {
      event.preventDefault()

      const data = {
        username:  inputName.value,
        email:     inputMail.value,
        avatarUrl: inputPhoto.value,
        password:  inputPassword.value
      }

      if (
        inputName.value.trim()      == "" ||
        inputMail.value.trim()      == "" ||
        inputPhoto.value.trim()     == "" ||
        inputPassword.value.trim()  == ""
      ) {
        Api.mensagem("Preencha todos os campos! Não deixe campos vazios.")

      } else {

        const erro = await Api.createUser(data)

        if (erro.message == "An user with the same username is already registered") {
          Api.mensagem("Este nome de usuário já esta sendo utilizado.")

        } else if (erro.message == "An user with the same email is already registered") {
          Api.mensagem("Já existe um usuário cadastro com esse e-mail")

        } else if (erro.message == "password must have at least six digits, one capital letter and one number"){
          Api.mensagem("A senha deve ter oito ou mais caracteres, com pelo menos uma letra minúscula e uma maiúscula.")
        } else{
          Api.mensagem(erro)
        }
      }
    })
  }
}

Register.createNewUser()
import {
  Api
} from "./api.js"

class Login {

  static systemLogin(){

    const token = localStorage.getItem("@blogTumblr:token")

    if (!token) {

      const emailInput    = document.getElementById('inputMailLogin')
      const passwordInput = document.getElementById('inputPassLogin')
      const btnLogin      = document.getElementById('btnLogin')

      btnLogin.addEventListener("click", async event => {
        event.preventDefault()

        if (emailInput.value.trim() == "" || passwordInput.value.trim() == "") {

          Api.mensagem("Preencha todos os campos! Não deixe campos vazios.")

        } else {

          const data = {
            email:    emailInput.value,
            password: passwordInput.value
          }

          const erro = await Api.login(data)

          if (erro.message == "User not found") {
            Api.mensagem("Usuário não encontrado.")

          } else if (erro.message == "Invalid email or password") {
            Api.mensagem("E-mail ou senha inválidos.")
          }
        }

      })

    }else{
      window.location.assign("src/pages/homepage.html")
    }
  }
}

Login.systemLogin()
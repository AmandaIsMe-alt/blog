export class Api {

  static url = "https://blog-m2.herokuapp.com"
  static token = localStorage.getItem("@blogTumblr:token")
  static headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`
  });

  static async createUser(body) {

    const newUser = await fetch(`${this.url}/users/register`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(res => {
          if(res.id) {
            setTimeout(() => {
              window.location.assign('../../index.html')
            }, 2000)
            
            this.mensagem("Cadastrado com sucesso! Agora faça o login.")
          }

        return res
      })
      .catch(err => this.mensagem(err))

    return newUser
  }

  static async login(body) {

    const userLogin = await fetch(`${this.url}/users/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: this.headers
      })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem("@blogTumblr:token",   res.token)
        localStorage.setItem("@blogTumblr:User_id", res.userId)

          if (res.token) {
            window.location.assign('src/pages/homepage.html')
          }

        return res
      })
      .catch(err => {
        
        localStorage.removeItem('@blogTumblr:token')
        localStorage.removeItem('@blogTumblr:User_id')

        console.log(err)

        return this.mensagem("E-mail ou senhas inválidas!")
      })


    return userLogin
  }

  static async getAllPosts(num) {

    const page = num || 1
    const posts = await fetch(`${this.url}/posts?page=${page}`, {
        method: "GET",
        headers: this.headers
      })
      .then(res => res.json())
      .catch(err => {
        
        localStorage.removeItem('@blogTumblr:token')
        localStorage.removeItem('@blogTumblr:User_id')

        console.log(err)})

    return posts
  }

  static async newPost(content) {

    await fetch(this.url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(content)
      })
      .then(this.mensagem("Poster criado com sucesso!"))
      .catch(err => console.log(err))
  }

  static async findUser(idUser) {

    const activeUser = await fetch(`${this.url}/users/${idUser}`, {
        method: "GET",
        headers: this.headers
      })
      .then(res => res.json())
      .then(res => {
          if (!res.id) {
            window.location.assign('../../index.html')
          }

        return res
      })
      .catch(err => console.log(err))

    return activeUser
  }

  static async findPost(idPost) {

    const resultPost = await fetch(`${this.url}/posts/${idPost}`, {
      method: "GET",
      headers: this.headers
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return resultPost
  }

  static async createPost(contentPost) {
    
    await fetch(`${this.url}/posts`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(contentPost)
      })
      .then(this.mensagem("Poster criado com sucesso!"))
      .catch(err => this.mensagem(err))

  }

  static async changePost(idPost, contentPost) {
      
    await fetch(`${this.url}/posts/${idPost}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(contentPost)
    })
    .then(res => res.json())
    .catch(err => console.log(err))

  }

  static async deletePost(idPost) {

    await fetch(`${this.url}/posts/${idPost}`, {
      method: "DELETE",
      headers: this.headers
    })
    .then(res => res.json())
    .catch(err => console.log(err))

  }

  /* ESTA É A FUNÇÃO QUE IRÁ ADICIONAR AS MENSAGENS DE AVISO NO SITE
  ELA RECEBE COMO PARÂMETRO UM TEXTO QUALQUER, A MENSAGEM QUE DESEJA DAR AO USUÁRIO*/
  static mensagem (text) {

    const body = document.querySelector('body')

    if(!document.querySelector('#mensagem__aviso')) {
      const div = document.createElement('div')
      const p = document.createElement('p')
      div.id = "mensagem__aviso"

      p.innerText = text
      div.append(p)

      body.append(div)
      
      setTimeout(() => {
          document.getElementById('mensagem__aviso').remove();
      }, "1200")
    }
  }

}
import {Api} from "./api.js"
import { Render } from "./render.js"
export class Modals {  
    static async showEditModal(post) {
        const modal = document.getElementById('section__modalEdit')
        const postEditInput = document.getElementById("inputEditContentPost")

        const valorDoPost = await Api.findPost(post)
        postEditInput.value = valorDoPost.content

        modal.classList.remove('hidden');
        modal.addEventListener('click', async (event) => {

            const btnClicado = event.target

            if(btnClicado.id == 'btnProductEdit') {

              const data = {
                content: postEditInput.value.trim()
              }

              if(postEditInput.value.trim() == ""){
                this.showAvisoText("Não deixe o campo vazio!", "#section__modalEdit .form__modal")

              } else{
                await Api.changePost(post, data)
                modal.classList.add('hidden')

                await Api.mensagem("Poster editado com sucesso!")
  
                const posts = await Api.getAllPosts()
                Render.renderPagePosts(posts.data)
              }

            } else if(btnClicado.id == 'spanBtnCloseEdit'){
                modal.classList.add('hidden')
            }
        })
    }

  
    static showDeleteModal(idPoster) {
      
      const modal = document.getElementById('section__modalDelete')

      modal.classList.remove('hidden');

      modal.addEventListener('click', async event => {
              event.preventDefault()
              
            if (event.target.id == 'btnProductDelete') {
              
              await Api.deletePost(idPoster)
              modal.classList.add('hidden')
              
              await Api.mensagem("Poster deletado com sucesso!")

              const posts = await Api.getAllPosts()
              Render.renderPagePosts(posts.data)

            } else if (event.target.id == 'spanBtnCloseDelete') {

              modal.classList.add('hidden')
            }

      })
    }

    static showAvisoText (text, local){

      if(!document.querySelector("#aviso")) {
        const aviso = document.createElement('p')
        aviso.id = "aviso"

        aviso.innerText = text

        const localAviso = document.querySelector(local)
        localAviso.append(aviso)

        setTimeout(() => {
            document.getElementById('aviso').remove();
        }, "1500")
      }
    }

}
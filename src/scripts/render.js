import { Api } from "./api.js"
export class Render {


    static renderPagePosts(arr){
        
        const sectionPosts = document.getElementById("section__posts")

        sectionPosts.innerHTML = ""

        arr.forEach( post =>{
            return sectionPosts.appendChild(Render.renderPosts(post))
        })
    }

    static renderPosts(post) {

        const user          = localStorage.getItem('@blogTumblr:User_id')

        const divPost       = document.createElement("div")
        const divPhoto      = document.createElement("div")
        const figure        = document.createElement("figure")
        const img           = document.createElement("img")
        const divContent    = document.createElement("div")
        const h2Name        = document.createElement("h2")
        const pPost         = document.createElement("p")
        const spanDate      = document.createElement("span")
        const divButtonsMob = document.createElement("div")
        const btnEditMob    = document.createElement("button")
        const imgEditMob    = document.createElement("img")
        const btnTrashMob   = document.createElement("button")
        const imgTrashMob   = document.createElement("img")


        divPost.className       = "div__post"
        divPost.key             = post.id
        divPost.id              = post.id
        divPhoto.className      = "div__photo__posts"
        img.src                 = post.user.avatarUrl
        img.alt                 = `imagem de perfil de ${post.user.username}`
        divContent.className    = "div__content__posts"
        h2Name.innerText        = post.user.username
        pPost.innerText         = post.content
        spanDate.innerText      = post.createdAt.replace("T00:00:00.000Z", "").split("-").reverse().join("/")
        divButtonsMob.className = "btnsMobile"
        imgEditMob.className    = "btnEditPoster"
        imgEditMob.id           = post.id
        imgEditMob.src          = "../assets/imgs/edit 1.png"
        imgEditMob.alt          = `botão editar post de ${post.user.username}`
        imgTrashMob.className   = "btnTrashPoster"
        imgTrashMob.id          = post.id
        imgTrashMob.src         = "../assets/imgs/trash-bin 1.png"
        imgTrashMob.alt         = `botão excluir post de ${post.user.username}`


            if (user == post.user.id) {
                btnTrashMob.appendChild(imgTrashMob)
                btnEditMob.appendChild(imgEditMob)
                divButtonsMob.append(btnEditMob, btnTrashMob)

                divPost.classList.add('meu__post')
            }

        divContent.append(h2Name, pPost, spanDate)
        figure.appendChild(img)
        divPhoto.append(figure)
        divPost.append(divPhoto, divContent, divButtonsMob)


    return divPost
    }

   
    static async renderUser() {

        const idUser = localStorage.getItem('@blogTumblr:User_id')

        const userEncountered = await Api.findUser(idUser)

        if (!userEncountered.id) {
            window.location.assign('../../index.html')
        }

        const imgUser  = document.querySelector("#header__div__user figure img")
        const nameUser = document.querySelector("#header__div__user h2")

        imgUser.src        = userEncountered.avatarUrl
        imgUser.alt        = `imagem de usuário de ${userEncountered.username}`
        nameUser.innerText = userEncountered.username
    }
}

                               
import {
    Api
} from "./api.js"
import {
    Modals
} from "./modals.js"
import {
    Render
} from "./render.js"

class Homepage {

    static renderHomepage(posts) {

        const token = localStorage.getItem('@blogTumblr:token')
        const sectionPosts = document.getElementById("section__posts")

        sectionPosts.innerHTML = ''

        if (!token) {
            window.location.assign('../../index.html')
        } else{
            Render.renderPagePosts(posts)
        }
    }

    
    static async changePage() {

        let thisPage

        const btnsPages = document.querySelector(".div__pagination")
        
        btnsPages.addEventListener("click", async event => {
            
            const allPosts = await Api.getAllPosts(thisPage)
            
            const prevNum = allPosts.previousPage
            const nextNum = allPosts.nextPage
            

           if (event.target.id == "btnFisrtPage") {
            
                if(thisPage != 1){
                    thisPage = 1
                    const posts = await Api.getAllPosts(thisPage)
                    Homepage.renderHomepage(posts.data)
                    
                }
            
            } else if (event.target.id == "btnPrev") {
                
                if (prevNum != null) {
                    thisPage = prevNum.replace("page=", "")
                    const posts = await Api.getAllPosts(thisPage)
                    Homepage.renderHomepage(posts.data)
                    
                }

            } else if (event.target.id == "btnNext") {
                
                if (nextNum != null) {
                    thisPage = nextNum.replace("page=", "")
                    const posts = await Api.getAllPosts(thisPage)
                    Homepage.renderHomepage(posts.data)
                
                }

            } else if (event.target.id == "btnLastPage") {
                thisPage = allPosts.totalPages
                const posts = await Api.getAllPosts(thisPage)
                Homepage.renderHomepage(posts.data)
            }
            
        })
    }

    static createPost() {
        const btnNewPost = document.querySelector("#section__blankField span")

        btnNewPost.addEventListener("click", async () => {

            const contentPost = document.querySelector("#section__blankField textarea").value

            if (contentPost.trim() == "") {

                Api.mensagem("O conteúdo não pode ser vazio, ou conter apenas espaços.")

            } else {

                await Api.createPost({
                    content: contentPost.trim()
                })
                const posts = await Api.getAllPosts()
                Homepage.renderHomepage(posts.data)
            }

            document.querySelector("#section__blankField textarea").value = ""

        })
    }

    static logout() {
        const btnLogout = document.querySelector("header > span")

        btnLogout.addEventListener('click', () => {

            Api.mensagem("Logout realizado! Volte sempre.")

            localStorage.removeItem('@blogTumblr:token')
            localStorage.removeItem('@blogTumblr:User_id')

            setTimeout(() => {
                window.location.assign('../../index.html')
            }, 1000)
        })

    }


    static editPoster() {
        const boxes = document.querySelector('#section__posts');

        boxes.addEventListener('click', (event) => {
            event.preventDefault()

            if (event.target.className == 'btnEditPoster') {
                Modals.showEditModal(event.target.id)
            }
        })
    }

    static deletePost() {

        const sectionPosts = document.getElementById("section__posts")

        sectionPosts.addEventListener("click", async event => {

            if (event.target.className == "btnTrashPoster") {
                await Modals.showDeleteModal(event.target.id)
            }
        })
    }
}


await Render.renderUser()
const posts = await Api.getAllPosts()
Homepage.renderHomepage(posts.data)
Homepage.createPost()
Homepage.logout()
Homepage.editPoster()
Homepage.deletePost()
Homepage.changePage()


 
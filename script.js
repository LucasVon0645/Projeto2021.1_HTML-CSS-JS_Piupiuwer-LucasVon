let postWrite = document.querySelector('.postWrite');
let filterArray = [];
let selectResultOnClick = false;



const getPosts = async () => 
{
    try {

        let response = await fetch("https://next.json-generator.com/api/json/get/EkyZfHLU_");
        response = await response.json();

        console.log(response);
        addPostsfromOtherUsers(response);
        
        } catch {
            console.log('Error')
        }
}




function showNumberOfChars () 
{
    let postTextArea = document.querySelector('.postWrite');
    let number = postTextArea.value.length;
    let error = document.querySelector('.postWriteErrorHidden');
    let cont = document.querySelector('.cont');
    cont.innerHTML = number+'/140';

    if (number > 140) {

        error.classList.add('postWriteErrorVisible');
        cont.classList.add("warning");
        postTextArea.classList.add("postWriteError")
        error.innerHTML = 'O limite máximo de <br>caracteres é 140'}

    else  {

        postTextArea.classList.remove("postWriteError")
        cont.classList.remove("warning");
        error.classList.remove('postWriteErrorVisible')}
}

function addPostsfromOtherUsers (response) 
{
    response.forEach(postInformation => {

        let post = document.createElement("div");
        post.classList.add("postOther");
        post.classList.add("post");
        post.classList.add("postOtherLargeHeight");
        post.classList.add("postOtherMobile");
        post.classList.add("postOtherMobileSmall");

        addProfileInfo(post, postInformation, false);
        addMessagePost(post, postInformation);
        addInteractionToPost(post);

        let postArea = document.querySelector(".postArea");
        postArea.appendChild(post);
    });

}

function addMyPost (event) 
{
    event.preventDefault();
    let postInformation = getDataMyPost();
    console.log(postInformation);
    if (typeof postInformation === "number" ) {
        if (postInformation == 0) {
            let error = document.querySelector('.postWriteErrorHidden');
            error.classList.add('postWriteErrorVisible');
            error.innerHTML = 'Posts vazios não <br> são permitidos';
        }}

    else {
        let post = document.createElement("div");
        post.classList.add("myPost");
        post.classList.add("post");

        addProfileInfo(post, postInformation, true);
        addMessagePost(post, postInformation);
        addInteractionToMyPost(post);

        let postArea = document.querySelector(".postArea");
        postArea.prepend(post);}
}


function getDataMyPost () 
{
    let message = document.querySelector(".postWrite").value;
    let postInformation = new Object ();

    if (message.length <= 140 && message.length != 0 ) {
        postInformation.mensagem = message;
        postInformation.nome = "Lucas Von";
        postInformation.username = "@LucasVon";
        postInformation.imagem = 'imagens/Lucas.jpg'
        return postInformation;
    }
    
    if (message.length == 0) return 0;

    return 1;
}

function currentDate () 
{

    let today = new Date();
    let day = String(today.getUTCDate());
    let month = String(today.getMonth() + 1);
    let year = String(today.getFullYear());
    let hour = String(today.getHours());
    let minutes = String(today.getUTCMinutes());
    console.log(today)
    return day + "/" + month + "/"  + year + " " + hour + "h" + minutes + "min";

}


function addProfileInfo (post, postInformation, myPost) 
{

    let imageProfile = document.createElement("img");
    if (postInformation.imagem) {
        imageProfile.src = postInformation.imagem;
        if (myPost) imageProfile.classList.add("myImagePost");
        else imageProfile.classList.add("imagePost");}
    else {
        imageProfile.src = "imagens/user_none.svg";
        imageProfile.classList.add("imagePostNone");}

    

    let imageProfileContainer = document.createElement("div");
    imageProfileContainer.classList.add("imageProfileContainer");
    imageProfileContainer.appendChild(imageProfile);
    
    let fullName = document.createElement("p");
    fullName.classList.add("fullName");
    fullName.classList.add("fullNameMobile");
    fullName.innerHTML = postInformation.nome;

    let username = document.createElement("p");
    username.classList.add("userName");
    username.innerHTML = postInformation.username + " - "+currentDate();

    let userOfThePost = document.createElement("div");
    userOfThePost.classList.add("userOfThePost")
    userOfThePost.appendChild(fullName);
    userOfThePost.appendChild(username);

    let profileInfo = document.createElement("div");
    profileInfo.classList.add("profileInfo");
    if (postInformation.imagem) profileInfo.appendChild(imageProfileContainer);
    else profileInfo.appendChild(imageProfile);
    profileInfo.appendChild(userOfThePost);

    post.appendChild(profileInfo);
}

function addMessagePost (post, postInformation)
{
    let message = document.createElement("p");
    message.classList.add("otherContent");
    message.innerHTML = postInformation.mensagem;

    post.appendChild(message);
}

function addLikesToPost (interaction, className) 
{
    let numberLikes = document.createElement("p");
    numberLikes.innerHTML = "0";

    let imageLike = document.createElement("img");
    imageLike.src = "imagens/like.svg";
    imageLike.alt = "like";
    imageLike.addEventListener("click", function () {
        number = Number(this.parentNode.childNodes[0].innerHTML);
        if (number)
            this.parentNode.childNodes[0].innerHTML = 0;
        else 
        this.parentNode.childNodes[0].innerHTML = 1;

    })

    let likes = document.createElement("div");
    likes.classList.add(className);
    likes.appendChild(numberLikes);
    likes.appendChild(imageLike);
    interaction.appendChild(likes);
}


function addHighlightToPost (interaction, myPost) 
{

    let highlight = document.createElement("img");
    highlight.src="imagens/highlight.svg";
    highlight.alt = "highlight";

    highlight.addEventListener("click", function () {

        let post = this.parentNode.parentNode;
        if (myPost) post = post.parentNode;

        if (post.classList.contains('postHighlight')){
            post.classList.remove("postHighlight");
            this.src = "imagens/highlight.svg";
        }

        else {
            post.classList.add("postHighlight");
            this.src = "imagens/star_highlighted.svg";
            post.remove();
            document.querySelector(".postArea").prepend(post);}

        })

    interaction.appendChild(highlight);

}



function addInteractionToPost (post) 
{
    let interaction = document.createElement("div");
    interaction.classList.add("interaction");

    addLikesToPost(interaction, "likes");
    addHighlightToPost(interaction,false);

    post.appendChild(interaction);
}

function addInteractionToMyPost (post) {

    let interaction = document.createElement("div");
    interaction.classList.add("interactionMyPost");

    let divLikeHighlight = document.createElement("div");
    divLikeHighlight.classList.add("LikeHighlightmyPost");
    addLikesToPost(divLikeHighlight, "likesMyPost");
    addHighlightToPost(divLikeHighlight, true);

    let span = document.createElement("span");
    span.classList.add("saveChangeHidden")
    span.innerHTML = "Salvar";
    span.addEventListener("click", savePostChange);



    let edit = document.createElement('img');
    edit.classList.add("edit");
    edit.src = "imagens/editar.svg";
    edit.alt = "editar";
    edit.addEventListener("click", function () {
        let postText = this.parentNode.parentNode.parentNode.childNodes[1];
        if (!this.classList.contains("editableModeIcon")){
            this.classList.add("editableModeIcon");
            this.src = "imagens/salvar.svg";
            postText.contentEditable = "true";
            postText.classList.add("editableBoxActive");
            this.parentNode.childNodes[1].classList.add("showUp");
        }
        else {
            this.classList.remove("editableModeIcon");
            this.src = "imagens/editar.svg";
            postText.contentEditable = "false";
            postText.classList.remove("editableBoxActive")
            this.parentNode.childNodes[1].classList.remove("showUp");}    
    })


    let erase = document.createElement('img');
    erase.classList.add("erase");
    erase.src = "imagens/trash.svg";
    erase.alt = "deletar";
    erase.addEventListener("click", function () {
        this.parentNode.parentNode.parentNode.remove();
    })



    let divEditDelete = document.createElement("div");
    divEditDelete.classList.add("editDelete");
    divEditDelete.appendChild(edit);
    divEditDelete.appendChild(span);
    divEditDelete.appendChild(erase);

    interaction.appendChild(divEditDelete);
    interaction.appendChild(divLikeHighlight);

    post.appendChild(interaction);
    

}



function cleanPostWrite (event) {
    event.preventDefault();
    document.querySelector(".postWrite").value = "";
    showNumberOfChars();
}


getPosts();

function openMenu() {
    document.querySelector(".menu").style.width = "400px";
  }

function closeMenu() {
    document.querySelector(".menu").style.width = "0";
  }


function bringResult () {
    let result = this.innerHTML;
    let searchResults = document.querySelector('.searchResultsDefault');
    let searchBar = document.querySelector(".searchDefault")
    searchBar.value = result;
    searchUser();
    searchResults.innerHTML = "";
    searchBar.classList.remove("onSearch");

}

function searchUser () 
{   
    let searchResults = document.querySelector('.searchResultsDefault');
    let searchBar = document.querySelector(".searchDefault");
    let word = searchBar.value;
    searchResults.innerHTML = "";
    let listOfPosts = document.querySelectorAll(".post")
    if (word.length > 0) {
        document.querySelector(".searchIcon").classList.add("invisible");
        if (searchBar) searchBar.classList.add("onSearch");
        searchResults.classList.add("visible")
        let expression = new RegExp(word, "i");
        listOfPosts.forEach(element => {
            nome = element.childNodes[0].childNodes[1].childNodes[0].innerHTML;
            if (expression.test(nome)) {
                let span = document.createElement('span');
                span.innerHTML = nome;
                span.addEventListener("click", bringResult);
                searchResults.appendChild(span);
                element.classList.remove("invisible");
            }
            else {
                element.classList.add("invisible");
            }
        });
    
        if (Object.keys(searchResults.childNodes).length == 0) {
            let span = document.createElement('span');
            span.innerHTML = "Nenhum resultado encontrado";
            searchResults.appendChild(span);}}
    
    else {
        document.querySelector(".searchIcon").classList.remove("invisible");
        searchBar.classList.remove("onSearch");
        searchResults.classList.remove("visible");
        listOfPosts.forEach( element => {
            element.classList.remove("invisible");
        })

    }
}

function savePostChange () 
{
    let postText = this.parentNode.parentNode.parentNode.childNodes[1];
    postText.contentEditable = "false";
    postText.classList.remove("editableBoxActive");
    this.classList.remove("showUp");
    this.parentNode.childNodes[0].src = "imagens/editar.svg";
}

$(window).resize(() => {
    if (this.screen.width > 480) {
        let menu = document.querySelector(".menu");
        menu.style = "";
    }
})





document.querySelector(".postWrite").addEventListener("input", showNumberOfChars);
document.querySelector("#publishButton").addEventListener("click", addMyPost);
document.querySelector("#cleanButton").addEventListener("click", cleanPostWrite);
document.querySelector(".searchDefault").addEventListener("input", searchUser);


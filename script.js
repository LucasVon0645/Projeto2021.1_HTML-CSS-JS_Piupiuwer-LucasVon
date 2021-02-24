let postWrite = document.querySelector('#postWrite');
let usersList;

function showNumberOfChars () 
{
    let number = this.value.length;
    let error = document.querySelector('.postWriteErrorHidden');

    document.querySelector('#cont').innerHTML = number+'/140';

    if (number > 140) {
        error.classList.add('postWriteErrorVisible');
        error.innerHTML = 'O limite máximo de caracteres é 140'}
    else  {
        error.classList.remove('postWriteErrorVisible')}
}

function addPostsfromOtherUsers (response) 
{
    response.forEach(postInformation => {

        let post = document.createElement("div");
        post.classList.add("postOther");
        addProfileInfo(post, postInformation);
        addMessagePost(post, postInformation);
        addInteractionToPost(post);

        let postArea = document.querySelector("#postArea");
        postArea.appendChild(post);
    });

}

function addMyPost () 
{
    let postInformation = getDataMyPost();
    console.log(postInformation);
    if (typeof postInformation === "number" ) {
        if (postInformation == 0) {
            let error = document.querySelector('.postWriteErrorHidden');
            error.classList.add('postWriteErrorVisible');
            error.innerHTML = 'Posts vazios não são permitidos';
        }}
    else {
        let post = document.createElement("div");
        post.classList.add("postOther");

        addProfileInfo(post, postInformation);
        addMessagePost(post, postInformation);
        addInteractionToPost(post);

        let postArea = document.querySelector("#postArea");
        postArea.prepend(post);}
    

}


function getDataMyPost () 
{
    let message = document.querySelector("#postWrite").value;
    let postInformation = new Object ();
    if (message.length <= 140 && message.length != 0 ) {
        postInformation.mensagem = message;
        postInformation.nome = "Lucas Von";
        postInformation.username = "@LucasVon";
        return postInformation;
    }
    
    if (message.length == 0) return 0;

    return 1;
}

function currentDate () 
{

    let today = new Date();
    let day = String(today.getDay());
    let month = String(today.getMonth() + 1);
    let year = String(today.getFullYear());
    let hour = String(today.getUTCDate());
    let minutes = String(today.getUTCMinutes());

    return day + "/" + month + "/"  + year + " " + hour + "h" + minutes + "min";

}


function addProfileInfo (post, postInformation) 
{

    let imageProfile = document.createElement("img");
    imageProfile.classList.add("imagePost");
    if (postInformation.imagem) imageProfile.src = postInformation.imagem;
    else imageProfile.src = "imagens/user_none.svg";
    
    let fullName = document.createElement("p");
    fullName.classList.add("fullName");
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
    profileInfo.appendChild(imageProfile);
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


function addInteractionToPost (post) 
{

    let numberLikes = document.createElement("p");
    numberLikes.innerHTML = "0";

    let imageLike = document.createElement("img");
    imageLike.src = "imagens/like.svg";
    imageLike.alt = "like";
    imageLike.addEventListener("click", function () {
        number = Number(this.parentNode.childNodes[0].innerHTML);
        number += 1;
        this.parentNode.childNodes[0].innerHTML = number;

    })

    let likes = document.createElement("div");
    likes.classList.add("likes");
    likes.appendChild(numberLikes);
    likes.appendChild(imageLike);
    
    let highlight = document.createElement("img");
    highlight.src="imagens/highlight.svg";
    highlight.alt = "highlight";
    highlight.addEventListener("click", function () {
        let post = this.parentNode.parentNode;
        post.remove();
        document.querySelector("#postArea").prepend(post);

    })

    let interaction = document.createElement("div");
    interaction.classList.add("interaction");
    interaction.appendChild(likes);
    interaction.appendChild(highlight);

    post.appendChild(interaction);
}


function cleanPostWrite () {
    document.querySelector("#postWrite").value = "";
    document.querySelector('#cont').innerHTML = '0'+'/140';
}

function getPosts () {

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://next.json-generator.com/api/json/get/EkyZfHLU_");

    xhr.addEventListener("load", function () {
        let response = JSON.parse(xhr.responseText);
        usersList = response;
        console.log(response);
        addPostsfromOtherUsers(response);
    })

    xhr.send();
}

getPosts();

function searchUser () 
{   
    let searchResults = document.querySelector('.searchResultsDefault');
    let word = this.value;
    searchResults.innerHTML = "";
    let searchBar = document.querySelector(".searchDefault")
    if (word.length > 0) {
        if (searchBar) searchBar.classList.add("onSearch");
        searchResults.classList.add("visible")
        let expression = new RegExp(word, "i");
        usersList.forEach(element => {
            if (expression.test(element.nome)) {
                let span = document.createElement('span');
                span.innerHTML = element.nome;
                searchResults.appendChild(span);
            };
        });}
    else searchBar.classList.remove("onSearch")
}


document.querySelector("#postWrite").addEventListener("input", showNumberOfChars);
document.querySelector("#publishButton").addEventListener("click", addMyPost);
document.querySelector("#cleanButton").addEventListener("click", cleanPostWrite);
document.querySelector(".searchDefault").addEventListener("input", searchUser);
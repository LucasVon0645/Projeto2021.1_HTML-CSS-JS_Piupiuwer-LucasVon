/**
 *  Nome: Lucas von Ancken Garcia
 *  Email: lucas.ancken@polijunior.com.br
 *  Entrega: Piupiwer/ Summer 2021
 */


let postWrite = document.querySelector('.postWrite');
let filterArray = [];


/** A função a seguir realiza a requisição 'GET' para obter os
 * dados de todos os posts. Em seguida, esses posts são adicionados
 * na página uma vez que a resposta foi recebida.
 **/

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

getPosts();


/** A função a seguir é acionada toda vez que o usuário digitar algo no 
 * campo para adicionar novos posts. Ela é utilizada para atualizar o contador
 * de número de caracteres e imprimir uma mensagem de erro caso o número
 * de caracteres seja superior a 140. A mensagem de erro é mostrada da
 * seguinte forma:
 *  - o campo de digitação fica vermelho (classe = postWriteErrorVisible)
 *  -uma div é revelada com uma mensagem de erro (classe = postWriteErrorVisible)
 *  - o contador permanece em vermelho (classe = warning)
 **/

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


/** A função a seguir percorre a resposta obtida na API e cria, para 
 * cada post, elementos HTML para abranger as informações e os botões
 * de interação. 'response' é passada como parâmetro pela função
 * 'get post'.
 **/

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


/** A função a seguir é responsável por publicar o post do usuário 
 * quando o botão "publicar" é apertado. Como a função só é usada no 
 * evento desse botão, o parâmetro 'event' é utilizado.
 **/

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


/** A função a seguir é utilizada dentro da função 'addMyPost' para recuperar
 * a mensagem escrita na TextArea da publicação. A função retorna: 
 * 
 * - um objeto ('postInformation') com as informações necessárias para criar o post, somente caso 
 * o número de caracteres seja inferior a 140.
 * - 0 caso a mensagem esteja vazia
 * - 1 quando a mensagem tenha ultrapassado o número máximo de caracteres.
 **/

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


/** A função retorna uma string correspondendo ao dia e ao horário
 * atual. Essa data é adicionada aos posts no momento de sua 
 * criação.
 **/

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


/** A função abaixo recebe um post (elemento HTML div) 
 * e adiciona nesse elemento uma nova div 'profileInfo' contendo todas 
 * as informações presentes em postInformation (objeto obtido na API ou criado em getDataMyPost).
 * myPost é do tipo boolean e indica se o post vem do usuário (true) 
 * ou da API (false).
 **/

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


/** A função a seguir recebe um elemento HTML div ('post') e  um objeto
 * contendo as informações presentes em postInformation (objeto obtido na 
 * API ou criado em getDataMyPost).
 **/

function addMessagePost (post, postInformation)
{
    let message = document.createElement("p");
    message.classList.add("otherContent");
    message.innerHTML = postInformation.mensagem;

    post.appendChild(message);
}


/** A função a seguir recebe  uma div 'interaction' e adiciona
 * nela os elementos necessários para construir a ferramenta
 * de like. A string className recebe o nome da classe
 * que será adicionada a div de likes (a div de likes de um 
 * post vindo da API é diferente daquela que vem do usuário em 
 * termos de estrutura HTML/CSS).
 * Além disso, um evento é adicionada ao botão/ícone de likes
 * que funciona como toogle.  
 * **/

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


/** A função a seguir recebe  uma div 'interaction' e adiciona
 * nela os elementos necessários para construir a ferramenta
 * de destaque. A string className recebe o nome da classe
 * que será adicionada a div de destaque (a div de destaque de um 
 * post vindo da API é diferente daquela que vem do usuário em 
 * termos de estrutura HTML/CSS).  myPost é do tipo boolean
 * e indica se o post vem da API ou não.
 * Além disso, um evento é adicionada ao botão/ícone de likes
 * que funciona como toogle. 
 * */

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


/** A função abaixo adiciona as divs de interação
 * para os posts  vindos da API (somente as divs de 
 * likes e de destaque). 'Post' é uma div criada em 
 * addPostsfromOtherUsers a partir da API.
 **/

function addInteractionToPost (post) 
{
    let interaction = document.createElement("div");
    interaction.classList.add("interaction");

    addLikesToPost(interaction, "likes");
    addHighlightToPost(interaction,false);

    post.appendChild(interaction);
}

/** A função abaixo adiciona as divs de interação
 * para os posts vindos do usuário (divs de 
 * likes, destaque, apagar e editar) na div de post. 
 * 'Post' é uma div criada em  'addMyPosts'
 * a ppartir da mensagem do usuário.
 * Além disso, ela também adiciona os 
 * eventos para o botão de edição e para o botão de apagar
 * são inseridos.
 **/

function addInteractionToMyPost (post)
{

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



/** A função a seguir é utlizada no evento do botão
 * 'Limpar' da área de publicação do usuário.
 **/

function cleanPostWrite (event) 
{
    event.preventDefault();
    document.querySelector(".postWrite").value = "";
    showNumberOfChars();
}



/** A função abaixo é somente útil para a versão mobile do site.
 * Ela é utilizada para mostrar o "menu  que permanece escondido"
 * na lateral. Por padrão na versão mobile, o menu tem largura
 * igual a zero.
 **/

function openMenu() 
{
    document.querySelector(".menu").style.width = "400px";
}



/** A função abaixo é somente útil para a versão mobile do site.
 * Ela é utilizada para esconder o menu quando o usuário o fecha.
 * Por padrão na versão mobile, o menu tem largura
 * igual a zero. 
 **/

function closeMenu() 
{
    document.querySelector(".menu").style.width = "0";
}

/** A função abaixo é usada para colocar na barra de pesquisa 
 * a "sugestão" de pesquisa/filtro que o usuário clicou na barra de 
 * resultados da pesquisa (logo abaixo do campo de digitação). 
 * Consequentemente, os posts são filtrados. A função atua no evento
 * das tags span no campo de resultados.
 **/

function bringResult () 
{
    let result = this.innerHTML;
    let searchResults = document.querySelector('.searchResultsDefault');
    let searchBar = document.querySelector(".searchDefault")
    searchBar.value = result;
    searchUser();
    searchResults.innerHTML = "";
    searchBar.classList.remove("onSearch");

}

/** A função a seguir procura nos posts da página o posts dos 
 * usuários que contém a palavra digtada pelo usuário. Além disso, 
 * essa função também filtra (só mostra os posts condizentes com 
 * a pesquisa.Adiciona-se também o evento em cada uma das tags
 * span da lista de resultados para permitir o uso da função
 * bringResults;
 **/

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

/** A função a seguir desativa o modo de edição do posto do usuário 
 * quando este aperta no botão salvar ou no ícone. Além disso, a 
 * função deixa invsivel a palavra 'salvar' depois disso.
 */
function savePostChange () 
{
    let postText = this.parentNode.parentNode.parentNode.childNodes[1];
    postText.contentEditable = "false";
    postText.classList.remove("editableBoxActive");
    this.classList.remove("showUp");
    this.parentNode.childNodes[0].src = "imagens/editar.svg";
}


/** A função a seguir só é utilizada apenas na versão mobile.
 * Ela é utilizada para evitar que o menu desapareça quando 
 * o usuário vira a tela do celular.
*/

$(window).resize(() => {
    if (this.screen.width > 480) {
        let menu = document.querySelector(".menu");
        menu.style = "";
    }
})


/** Todos os eventos adicionados fora das 
 * funções estão listados abaixo 
 */


document.querySelector(".postWrite").addEventListener("input", showNumberOfChars);
document.querySelector("#publishButton").addEventListener("click", addMyPost);
document.querySelector("#cleanButton").addEventListener("click", cleanPostWrite);
document.querySelector(".searchDefault").addEventListener("input", searchUser);


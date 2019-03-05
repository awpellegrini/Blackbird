var tapThreeDots = document.querySelectorAll("#message-list .tap-threedots");
var cardActions = document.querySelector("#card-action-tmpl > *");
var card = document.querySelectorAll("#message-list .message-card");
var username = document.querySelector("#chatting-username");
var messageCardUsername = document.querySelectorAll("#message-list .message-card-username");
var inputKeyboard = document.querySelector("#input-keyboard");
var singleChat = document.querySelector("#single-chat");

//forEach chiamante vuole 3 elementi, poi magari non li userò ma se li aspetta
card.forEach(function(elemento,i,array) {
    elemento.addEventListener("click", function(){
        highlightCard(elemento);
    });
    elemento.addEventListener("click", function(){
        firstChat(elemento);
    });
})

function firstChat(e) {
    for (i=0; i<card.length; i++) {
        card[i].classList.remove("upper");
    }
    e.childNodes[7].innerHTML = '';
    e.childNodes[7].innerHTML = convertToMyDate();
    e.classList.add("upper");
    e.parentNode.prepend(e);
}

function highlightCard(e) {
    username.innerHTML=e.querySelector(".message-card-username").textContent;
    for (i=0; i<card.length; i++) {
        card[i].classList.remove("highlight");
    }
    e.classList.add("highlight");
}

tapThreeDots.forEach(function(elemento,i,array) {
    elemento.addEventListener("click", function(){
        appendSelectedCard(elemento.parentNode);
    });
})

function appendSelectedCard(contenitore) {
    contenitore.appendChild(cardActions);
}

function convertToMyDate () {
    var date = new Date();
    console.log(date);
    var hoursPure = date.getHours();
    var hours;
    if(hoursPure < 10) hours = "0" + hoursPure;
    else hours = hoursPure;
    // Minutes part from the timestamp
    var minutesPure = date.getMinutes();
    if(minutesPure < 10) minutes = "0" + minutesPure;
    else minutes = minutesPure;
    // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes;
    return formattedTime;
}

function appendLastMessage(contenitore) {
    if(!inputKeyboard.value == '') {
    var lastMessage = document.createElement("div");
    lastMessage.setAttribute("class", "message message-sent");
    lastMessage.innerHTML = ' <div class="box-message"><div class="message-text">'+inputKeyboard.value+'</div><div class="message-time">'+convertToMyDate()+'</div></div>';
    contenitore.appendChild(lastMessage);
    inputKeyboard.value = '';
    }
}

document.querySelector("#send-icon").addEventListener("click", function(){
    appendLastMessage(singleChat);
});



